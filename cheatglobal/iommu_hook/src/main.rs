//! Launcher: starts the target suspended with explorer.exe as its parent (spoofed),
//! injects iommu_hook.dll, then resumes it.
//!
//! Usage:  launch_iommu.exe  <target.exe>  [args...]
//! iommu_hook.dll must sit next to launch_iommu.exe.

use std::env;
use std::ffi::c_void;
use std::os::windows::ffi::OsStrExt;
use std::path::PathBuf;

const CREATE_SUSPENDED: u32 = 0x0000_0004;
const EXTENDED_STARTUPINFO_PRESENT: u32 = 0x0008_0000;
const PROC_THREAD_ATTRIBUTE_PARENT_PROCESS: usize = 0x0002_0000;
const PROCESS_CREATE_PROCESS: u32 = 0x0080;
const TH32CS_SNAPPROCESS: u32 = 0x0000_0002;

const MEM_COMMIT: u32 = 0x0000_1000;
const MEM_RESERVE: u32 = 0x0000_2000;
const PAGE_READWRITE: u32 = 0x04;
const MEM_RELEASE: u32 = 0x0000_8000;
const INFINITE: u32 = 0xFFFF_FFFF;

#[repr(C)]
struct StartupInfoW {
    cb: u32,
    lp_reserved: *mut u16,
    lp_desktop: *mut u16,
    lp_title: *mut u16,
    dw_x: u32,
    dw_y: u32,
    dw_xsize: u32,
    dw_ysize: u32,
    dw_xcount: u32,
    dw_ycount: u32,
    dw_fill: u32,
    dw_flags: u32,
    w_show: u16,
    cb_reserved2: u16,
    lp_reserved2: *mut u8,
    h_stdin: *mut c_void,
    h_stdout: *mut c_void,
    h_stderr: *mut c_void,
}

#[repr(C)]
struct StartupInfoExW {
    startup_info: StartupInfoW,
    lp_attribute_list: *mut c_void,
}

#[repr(C)]
struct ProcessInformation {
    h_process: *mut c_void,
    h_thread: *mut c_void,
    dw_pid: u32,
    dw_tid: u32,
}

#[repr(C)]
struct ProcessEntry32W {
    dw_size: u32,
    cnt_usage: u32,
    th32_process_id: u32,
    th32_default_heap_id: usize,
    th32_module_id: u32,
    cnt_threads: u32,
    th32_parent_process_id: u32,
    pc_pri_class_base: i32,
    dw_flags: u32,
    sz_exe_file: [u16; 260],
}

extern "system" {
    fn CreateProcessW(
        app: *const u16,
        cmd: *mut u16,
        pa: *mut c_void,
        ta: *mut c_void,
        inherit: i32,
        flags: u32,
        env: *mut c_void,
        cwd: *const u16,
        si: *mut StartupInfoW,
        pi: *mut ProcessInformation,
    ) -> i32;
    fn InitializeProcThreadAttributeList(
        lp_attribute_list: *mut c_void,
        dw_attribute_count: u32,
        dw_flags: u32,
        lp_size: *mut usize,
    ) -> i32;
    fn UpdateProcThreadAttribute(
        lp_attribute_list: *mut c_void,
        dw_flags: u32,
        attribute: usize,
        lp_value: *mut c_void,
        cb_size: usize,
        lp_previous_value: *mut c_void,
        lp_return_size: *mut usize,
    ) -> i32;
    fn DeleteProcThreadAttributeList(lp_attribute_list: *mut c_void);
    fn OpenProcess(dw_desired_access: u32, b_inherit_handle: i32, dw_process_id: u32) -> *mut c_void;
    fn CreateToolhelp32Snapshot(dw_flags: u32, th32_process_id: u32) -> *mut c_void;
    fn Process32FirstW(h_snapshot: *mut c_void, lppe: *mut ProcessEntry32W) -> i32;
    fn Process32NextW(h_snapshot: *mut c_void, lppe: *mut ProcessEntry32W) -> i32;

    fn VirtualAllocEx(p: *mut c_void, addr: *mut c_void, size: usize, typ: u32, prot: u32) -> *mut c_void;
    fn VirtualFreeEx(p: *mut c_void, addr: *mut c_void, size: usize, typ: u32) -> i32;
    fn WriteProcessMemory(p: *mut c_void, addr: *mut c_void, buf: *const c_void, size: usize, written: *mut usize) -> i32;
    fn CreateRemoteThread(p: *mut c_void, sa: *mut c_void, stack: usize, start: *mut c_void, param: *mut c_void, flags: u32, tid: *mut u32) -> *mut c_void;
    fn GetModuleHandleW(name: *const u16) -> *mut c_void;
    fn GetProcAddress(module: *mut c_void, name: *const u8) -> *mut c_void;
    fn WaitForSingleObject(h: *mut c_void, ms: u32) -> u32;
    fn ResumeThread(h: *mut c_void) -> u32;
    fn CloseHandle(h: *mut c_void) -> i32;
    fn GetLastError() -> u32;
}

fn wide(s: &str) -> Vec<u16> {
    std::ffi::OsStr::new(s).encode_wide().chain(std::iter::once(0)).collect()
}

unsafe fn find_explorer_pid() -> u32 {
    let snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if snap.is_null() || snap == (-1isize as *mut c_void) {
        return 0;
    }
    let mut pe: ProcessEntry32W = std::mem::zeroed();
    pe.dw_size = std::mem::size_of::<ProcessEntry32W>() as u32;

    let mut explorer_pid = 0;
    if Process32FirstW(snap, &mut pe) != 0 {
        loop {
            let mut name = String::new();
            for &c in &pe.sz_exe_file {
                if c == 0 { break; }
                name.push(c as u8 as char);
            }
            if name.eq_ignore_ascii_case("explorer.exe") {
                explorer_pid = pe.th32_process_id;
                break;
            }
            if Process32NextW(snap, &mut pe) == 0 {
                break;
            }
        }
    }
    CloseHandle(snap);
    explorer_pid
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: launch_iommu.exe <target.exe> [args...]");
        std::process::exit(2);
    }
    let target = &args[1];

    let dll_path: PathBuf = {
        let mut exe = env::current_exe().expect("current_exe");
        exe.pop();
        exe.push("iommu_hook.dll");
        exe
    };
    if !dll_path.exists() {
        eprintln!("[launch] iommu_hook.dll not found next to launcher: {}", dll_path.display());
        std::process::exit(3);
    }
    let dll_w = wide(&dll_path.to_string_lossy());
    let dll_bytes = (dll_w.len() * 2) as usize;

    let mut cmd = String::new();
    cmd.push('"');
    cmd.push_str(target);
    cmd.push('"');
    for a in &args[2..] {
        cmd.push(' ');
        cmd.push_str(a);
    }
    let app_w = wide(target);
    let mut cmd_w = wide(&cmd);

    unsafe {
        let mut pi: ProcessInformation = std::mem::zeroed();
        let explorer_pid = find_explorer_pid();
        println!("[launch] Detected explorer.exe PID: {}", explorer_pid);

        let mut h_explorer: *mut c_void = std::ptr::null_mut();
        if explorer_pid != 0 {
            h_explorer = OpenProcess(PROCESS_CREATE_PROCESS, 0, explorer_pid);
            if !h_explorer.is_null() {
                println!("[launch] Acquired explorer.exe handle for parent process spoofing");
            }
        }

        let mut siex: StartupInfoExW = std::mem::zeroed();
        siex.startup_info.cb = std::mem::size_of::<StartupInfoExW>() as u32;

        let mut flags = CREATE_SUSPENDED;
        let mut attr_buf: Vec<u8> = Vec::new();

        if !h_explorer.is_null() {
            let mut attr_size = 0usize;
            let _ = InitializeProcThreadAttributeList(std::ptr::null_mut(), 1, 0, &mut attr_size);
            attr_buf.resize(attr_size, 0);
            let attr_list = attr_buf.as_mut_ptr() as *mut c_void;
            let init_ok = InitializeProcThreadAttributeList(attr_list, 1, 0, &mut attr_size);
            if init_ok != 0 {
                let update_ok = UpdateProcThreadAttribute(
                    attr_list,
                    0,
                    PROC_THREAD_ATTRIBUTE_PARENT_PROCESS,
                    &mut h_explorer as *mut _ as *mut c_void,
                    std::mem::size_of::<*mut c_void>(),
                    std::ptr::null_mut(),
                    std::ptr::null_mut(),
                );
                if update_ok != 0 {
                    siex.lp_attribute_list = attr_list;
                    flags |= EXTENDED_STARTUPINFO_PRESENT;
                    println!("[launch] Parent process successfully set to explorer.exe (PID: {})", explorer_pid);
                }
            }
        }

        let ok = CreateProcessW(
            app_w.as_ptr(),
            cmd_w.as_mut_ptr(),
            std::ptr::null_mut(),
            std::ptr::null_mut(),
            0,
            flags,
            std::ptr::null_mut(),
            std::ptr::null(),
            &mut siex.startup_info,
            &mut pi,
        );
        if ok == 0 {
            eprintln!("[launch] CreateProcessW failed, error={}", GetLastError());
            std::process::exit(4);
        }

        println!("[launch] Target started suspended (PID: {}, Thread: {:?})", pi.dw_pid, pi.h_thread);

        // 1. Allocate remote memory for DLL path
        let remote_buf = VirtualAllocEx(
            pi.h_process,
            std::ptr::null_mut(),
            dll_bytes,
            MEM_COMMIT | MEM_RESERVE,
            PAGE_READWRITE,
        );
        if remote_buf.is_null() {
            eprintln!("[launch] VirtualAllocEx failed, error={}", GetLastError());
            CloseHandle(pi.h_thread);
            CloseHandle(pi.h_process);
            std::process::exit(5);
        }

        // 2. Write DLL path to target process
        let mut written = 0usize;
        let wr_ok = WriteProcessMemory(
            pi.h_process,
            remote_buf,
            dll_w.as_ptr() as *const c_void,
            dll_bytes,
            &mut written,
        );
        if wr_ok == 0 {
            eprintln!("[launch] WriteProcessMemory failed, error={}", GetLastError());
            VirtualFreeEx(pi.h_process, remote_buf, 0, MEM_RELEASE);
            CloseHandle(pi.h_thread);
            CloseHandle(pi.h_process);
            std::process::exit(6);
        }

        // 3. Resolve LoadLibraryW
        let k32 = GetModuleHandleW(wide("kernel32.dll").as_ptr());
        let load_library_w = GetProcAddress(k32, b"LoadLibraryW\0".as_ptr());
        if load_library_w.is_null() {
            eprintln!("[launch] Failed to find LoadLibraryW");
            VirtualFreeEx(pi.h_process, remote_buf, 0, MEM_RELEASE);
            CloseHandle(pi.h_thread);
            CloseHandle(pi.h_process);
            std::process::exit(7);
        }

        // 4. Inject DLL via CreateRemoteThread
        println!("[launch] Injecting iommu_hook.dll into target...");
        let remote_thread = CreateRemoteThread(
            pi.h_process,
            std::ptr::null_mut(),
            0,
            load_library_w,
            remote_buf,
            0,
            std::ptr::null_mut(),
        );
        if remote_thread.is_null() {
            eprintln!("[launch] CreateRemoteThread failed, error={}", GetLastError());
            VirtualFreeEx(pi.h_process, remote_buf, 0, MEM_RELEASE);
            CloseHandle(pi.h_thread);
            CloseHandle(pi.h_process);
            std::process::exit(8);
        }

        // Wait for DllMain in injected thread to finish
        WaitForSingleObject(remote_thread, INFINITE);
        CloseHandle(remote_thread);
        VirtualFreeEx(pi.h_process, remote_buf, 0, MEM_RELEASE);
        println!("[launch] iommu_hook.dll successfully loaded and hooks installed!");

        // Resume main thread
        ResumeThread(pi.h_thread);
        println!("[launch] Main thread resumed. Target is now executing with all hooks active!");

        if !siex.lp_attribute_list.is_null() {
            DeleteProcThreadAttributeList(siex.lp_attribute_list);
        }
        if !h_explorer.is_null() {
            CloseHandle(h_explorer);
        }
        CloseHandle(pi.h_thread);
        CloseHandle(pi.h_process);
    }
}
