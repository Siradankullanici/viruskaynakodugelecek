//! Background Injector: Waits for the user to manually launch the target executable
//! from Windows Explorer (double-clicking), freezes the new process immediately,
//! injects iommu_hook.dll, and then resumes execution.
//!
//! Usage:  wait_and_inject.exe [target_name]
//! Default target: "TestCrackMe"

use std::env;
use std::ffi::c_void;
use std::os::windows::ffi::OsStrExt;
use std::path::PathBuf;

const TH32CS_SNAPPROCESS: u32 = 0x0000_0002;
const TH32CS_SNAPMODULE: u32 = 0x0000_0008;
const TH32CS_SNAPMODULE32: u32 = 0x0000_0010;
const PROCESS_ALL_ACCESS: u32 = 0x001F_0FFF;
const PROCESS_QUERY_LIMITED_INFORMATION: u32 = 0x0000_1000;
const SYNCHRONIZE: u32 = 0x0010_0000;

const MEM_COMMIT: u32 = 0x0000_1000;
const MEM_RESERVE: u32 = 0x0000_2000;
const PAGE_READWRITE: u32 = 0x04;
const MEM_RELEASE: u32 = 0x0000_8000;
const INFINITE: u32 = 0xFFFF_FFFF;
const CLEANUP_WAIT_MS: u32 = 120_000;

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

#[repr(C)]
struct ModuleEntry32W {
    dw_size: u32,
    th32_module_id: u32,
    th32_process_id: u32,
    glbl_cnt_usage: u32,
    proc_cnt_usage: u32,
    mod_base_addr: *mut u8,
    mod_base_size: u32,
    h_module: *mut c_void,
    sz_module: [u16; 256],
    sz_exe_path: [u16; 260],
}

extern "system" {
    fn CreateToolhelp32Snapshot(dw_flags: u32, th32_process_id: u32) -> *mut c_void;
    fn Process32FirstW(h_snapshot: *mut c_void, lppe: *mut ProcessEntry32W) -> i32;
    fn Process32NextW(h_snapshot: *mut c_void, lppe: *mut ProcessEntry32W) -> i32;
    fn Module32FirstW(h_snapshot: *mut c_void, lpme: *mut ModuleEntry32W) -> i32;
    fn Module32NextW(h_snapshot: *mut c_void, lpme: *mut ModuleEntry32W) -> i32;
    fn OpenProcess(dw_desired_access: u32, b_inherit_handle: i32, dw_process_id: u32) -> *mut c_void;
    fn VirtualAllocEx(p: *mut c_void, addr: *mut c_void, size: usize, typ: u32, prot: u32) -> *mut c_void;
    fn VirtualFreeEx(p: *mut c_void, addr: *mut c_void, size: usize, typ: u32) -> i32;
    fn WriteProcessMemory(p: *mut c_void, addr: *mut c_void, buf: *const c_void, size: usize, written: *mut usize) -> i32;
    fn CreateRemoteThread(p: *mut c_void, sa: *mut c_void, stack: usize, start: *mut c_void, param: *mut c_void, flags: u32, tid: *mut u32) -> *mut c_void;
    fn GetModuleHandleW(name: *const u16) -> *mut c_void;
    fn GetProcAddress(module: *mut c_void, name: *const u8) -> *mut c_void;
    fn GetModuleHandleExW(flags: u32, name_or_address: *const u16, module: *mut *mut c_void) -> i32;
    fn GetModuleFileNameW(module: *mut c_void, path: *mut u16, size: u32) -> u32;
    fn CreateEventW(attrs: *mut c_void, manual_reset: i32, initial_state: i32, name: *const u16) -> *mut c_void;
    fn WaitForSingleObject(h: *mut c_void, ms: u32) -> u32;
    fn GetExitCodeThread(thread: *mut c_void, exit_code: *mut u32) -> i32;
    fn GetExitCodeProcess(process: *mut c_void, exit_code: *mut u32) -> i32;
    fn CloseHandle(h: *mut c_void) -> i32;
    fn Sleep(ms: u32);
}

type FnNtSuspendProcess = unsafe extern "system" fn(*mut c_void) -> i32;
type FnNtResumeProcess = unsafe extern "system" fn(*mut c_void) -> i32;

fn wide(s: &str) -> Vec<u16> {
    std::ffi::OsStr::new(s).encode_wide().chain(std::iter::once(0)).collect()
}

unsafe fn inject_dll(
    h_proc: *mut c_void,
    dll_bytes: &[u16],
    nt_resume: FnNtResumeProcess,
    resumed: &mut bool,
) -> bool {
    let raw_len = dll_bytes.len() * 2;
    let remote_buf = VirtualAllocEx(
        h_proc,
        std::ptr::null_mut(),
        raw_len,
        MEM_COMMIT | MEM_RESERVE,
        PAGE_READWRITE,
    );
    if remote_buf.is_null() {
        return false;
    }

    let mut written = 0usize;
    let wr_ok = WriteProcessMemory(
        h_proc,
        remote_buf,
        dll_bytes.as_ptr() as *const c_void,
        raw_len,
        &mut written,
    );
    if wr_ok == 0 {
        VirtualFreeEx(h_proc, remote_buf, 0, MEM_RELEASE);
        return false;
    }

    let k32 = GetModuleHandleW(wide("kernel32.dll").as_ptr());
    let load_library_w = GetProcAddress(k32, b"LoadLibraryW\0".as_ptr());
    if load_library_w.is_null() {
        VirtualFreeEx(h_proc, remote_buf, 0, MEM_RELEASE);
        return false;
    }

    let remote_thread = CreateRemoteThread(
        h_proc,
        std::ptr::null_mut(),
        0,
        load_library_w,
        remote_buf,
        0,
        std::ptr::null_mut(),
    );
    if remote_thread.is_null() {
        VirtualFreeEx(h_proc, remote_buf, 0, MEM_RELEASE);
        return false;
    }

    let wait = WaitForSingleObject(remote_thread, 3_000);
    if wait != 0 {
        // The target was frozen while holding the loader lock, so LoadLibraryW
        // cannot proceed. Let the process run so the lock is released.
        nt_resume(h_proc);
        *resumed = true;
        if WaitForSingleObject(remote_thread, 15_000) != 0 {
            CloseHandle(remote_thread);
            VirtualFreeEx(h_proc, remote_buf, 0, MEM_RELEASE);
            return false;
        }
    }
    CloseHandle(remote_thread);
    VirtualFreeEx(h_proc, remote_buf, 0, MEM_RELEASE);
    true
}

fn wide_string(buf: &[u16]) -> String {
    let end = buf.iter().position(|&c| c == 0).unwrap_or(buf.len());
    String::from_utf16_lossy(&buf[..end])
}

unsafe fn remote_module_base(pid: u32, wanted_name: &str) -> Option<usize> {
    let snap = CreateToolhelp32Snapshot(TH32CS_SNAPMODULE | TH32CS_SNAPMODULE32, pid);
    if snap.is_null() || snap == (-1isize as *mut c_void) {
        return None;
    }
    let mut entry: ModuleEntry32W = std::mem::zeroed();
    entry.dw_size = std::mem::size_of::<ModuleEntry32W>() as u32;
    let mut found = None;
    if Module32FirstW(snap, &mut entry) != 0 {
        loop {
            if wide_string(&entry.sz_module).eq_ignore_ascii_case(wanted_name) {
                found = Some(entry.mod_base_addr as usize);
                break;
            }
            if Module32NextW(snap, &mut entry) == 0 {
                break;
            }
        }
    }
    CloseHandle(snap);
    found
}

unsafe fn remote_unload_dll(pid: u32, dll_name: &str) -> bool {
    let process = OpenProcess(PROCESS_ALL_ACCESS, 0, pid);
    if process.is_null() {
        eprintln!("[-] DLL unload skipped: OpenProcess failed for PID {pid}");
        return false;
    }

    if WaitForSingleObject(process, 0) == 0 {
        CloseHandle(process);
        println!("[diag] PID {pid} already exited; no DLL unload needed");
        return false;
    }

    let target_dll = match remote_module_base(pid, dll_name) {
        Some(base) => base,
        None => {
            CloseHandle(process);
            eprintln!("[-] DLL unload skipped: {dll_name} is no longer loaded in PID {pid}");
            return false;
        }
    };

    let kernel32 = GetModuleHandleW(wide("kernel32.dll").as_ptr());
    let free_library = GetProcAddress(kernel32, b"FreeLibrary\0".as_ptr());
    if free_library.is_null() {
        CloseHandle(process);
        return false;
    }

    // FreeLibrary may be forwarded to KernelBase. Resolve its owning local
    // module, then apply the same export RVA to that module in the target.
    let mut owner = std::ptr::null_mut();
    if GetModuleHandleExW(0x0000_0006, free_library as *const u16, &mut owner) == 0 || owner.is_null() {
        CloseHandle(process);
        return false;
    }
    let mut owner_path = [0u16; 260];
    let owner_len = GetModuleFileNameW(owner, owner_path.as_mut_ptr(), owner_path.len() as u32) as usize;
    let owner_file = std::path::PathBuf::from(wide_string(&owner_path[..owner_len.min(owner_path.len())]));
    let owner_name = match owner_file.file_name().and_then(|v| v.to_str()) {
        Some(name) => name,
        None => {
            CloseHandle(process);
            return false;
        }
    };
    let (remote_free_library, used_ldr_unload) =
        if let Some(target_owner) = remote_module_base(pid, owner_name) {
            let rva = free_library as usize - owner as usize;
            ((target_owner + rva) as *mut c_void, false)
        } else {
            // The target may not expose the same KERNEL32 owner module (for
            // example across a WOW64/module-snapshot race). Fall back to the
            // stable ntdll export and resolve its base inside the target.
            let local_ntdll = GetModuleHandleW(wide("ntdll.dll").as_ptr());
            let ldr_unload = GetProcAddress(local_ntdll, b"LdrUnloadDll\0".as_ptr());
            let target_ntdll = remote_module_base(pid, "ntdll.dll");
            if local_ntdll.is_null() || ldr_unload.is_null() || target_ntdll.is_none() {
                CloseHandle(process);
                eprintln!("[-] DLL unload skipped: neither {owner_name} nor target ntdll.dll was available");
                return false;
            }
            let rva = ldr_unload as usize - local_ntdll as usize;
            ((target_ntdll.unwrap() + rva) as *mut c_void, true)
        };

    let remote_thread = CreateRemoteThread(
        process,
        std::ptr::null_mut(),
        0,
        remote_free_library,
        target_dll as *mut c_void,
        0,
        std::ptr::null_mut(),
    );
    if remote_thread.is_null() {
        CloseHandle(process);
        eprintln!("[-] DLL unload failed: CreateRemoteThread failed for PID {pid}");
        return false;
    }
    let wait_result = WaitForSingleObject(remote_thread, 10_000);
    let mut result = 0u32;
    let got_exit_code = wait_result == 0 && GetExitCodeThread(remote_thread, &mut result) != 0;
    let thread_exit_ok = if used_ldr_unload { result == 0 } else { result != 0 };
    let ok = got_exit_code && thread_exit_ok;
    CloseHandle(remote_thread);
    CloseHandle(process);
    ok
}

fn write_diag(message: &str) {
    use std::io::Write;
    let mut path = env::current_exe().unwrap_or_default();
    path.pop();
    path.push("wait_and_inject.log");
    if let Ok(mut file) = std::fs::OpenOptions::new().create(true).append(true).open(path) {
        let _ = writeln!(file, "{message}");
    }
}

fn monitor_target_exit(pid: u32) {
    unsafe {
        let process = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION | SYNCHRONIZE, 0, pid);
        if process.is_null() {
            write_diag(&format!("[diag] PID {pid}: could not open process for exit monitoring"));
            return;
        }
        let wait = WaitForSingleObject(process, INFINITE);
        let mut exit_code = 0u32;
        if wait == 0 && GetExitCodeProcess(process, &mut exit_code) != 0 {
            write_diag(&format!("[diag] PID {pid} exited with code 0x{exit_code:08X}"));
        } else {
            write_diag(&format!("[diag] PID {pid}: failed to read exit status (wait={wait})"));
        }
        CloseHandle(process);
    }
}
fn wait_for_completion_and_unload(pid: u32, event: usize, dll_name: String) {
    let event = event as *mut c_void;
    let wait = unsafe { WaitForSingleObject(event, CLEANUP_WAIT_MS) };
    if wait == 0 {
        // Give the final hook callback time to return; this delay is only in
        // the injector, so it never blocks the target UI thread.
        std::thread::sleep(std::time::Duration::from_millis(50));
        if unsafe { remote_unload_dll(pid, &dll_name) } {
            println!("[+] Hooks completed; {dll_name} unloaded from PID {pid}");
        }
    } else {
        eprintln!("[-] Cleanup signal timed out for PID {pid}; DLL left loaded");
    }
    unsafe { CloseHandle(event); }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let target_keyword = if args.len() > 1 {
        args[1].to_lowercase()
    } else {
        // Default matches the whole CrackMe family: "testcrackme.exe",
        // "crackme (2).exe", "crackme2.code75fix.exe", ... (substring match below).
        "crackme".to_string()
    };

    let dll_path: PathBuf = {
        let mut exe = env::current_exe().expect("current_exe");
        exe.pop();
        exe.push("iommu_hook.dll");
        exe
    };
    if !dll_path.exists() {
        eprintln!("[!] HATA: iommu_hook.dll bulunamadı: {}", dll_path.display());
        std::process::exit(1);
    }
    let dll_w = wide(&dll_path.to_string_lossy());

    // Resolve NtSuspendProcess & NtResumeProcess from ntdll
    let (nt_suspend, nt_resume): (FnNtSuspendProcess, FnNtResumeProcess) = unsafe {
        let ntdll = GetModuleHandleW(wide("ntdll.dll").as_ptr());
        let p_suspend = GetProcAddress(ntdll, b"NtSuspendProcess\0".as_ptr());
        let p_resume = GetProcAddress(ntdll, b"NtResumeProcess\0".as_ptr());
        if p_suspend.is_null() || p_resume.is_null() {
            eprintln!("[!] HATA: ntdll suspend/resume API'leri çözülemedi!");
            std::process::exit(2);
        }
        (core::mem::transmute(p_suspend), core::mem::transmute(p_resume))
    };

    println!("====================================================================");
    println!("[*] WATCHER VE INJECTOR AKTIF!");
    println!("[*] Hedef Filtresi : '{}'", target_keyword);
    println!("[*] Enjekte DLL    : {}", dll_path.display());
    println!("--------------------------------------------------------------------");
    println!("[*] ŞİMDİ HEDEF EXEYİ WINDOWS EXPLORER'DAN (ÇİFT TIKLAYARAK) BAŞLATIN!");
    println!("[*] Başlatıldığı an yakalanıp dondurulacak ve DLL enjekte edilecektir.");
    println!("====================================================================");

    let mut injected_pids = std::collections::HashSet::new();

    loop {
        unsafe {
            let snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
            if !snap.is_null() && snap != (-1isize as *mut c_void) {
                let mut pe: ProcessEntry32W = std::mem::zeroed();
                pe.dw_size = std::mem::size_of::<ProcessEntry32W>() as u32;

                if Process32FirstW(snap, &mut pe) != 0 {
                    loop {
                        let mut name = String::new();
                        for &c in &pe.sz_exe_file {
                            if c == 0 { break; }
                            name.push(c as u8 as char);
                        }

                        let pid = pe.th32_process_id;
                        let lname = name.to_lowercase();
        // Substring match so any CrackMe-family name is caught regardless of
        // suffix/spacing ("crackme (2).exe", "crackme2.code75fix.exe", ...).
        let is_exact = lname.contains(&target_keyword);
        if is_exact && !injected_pids.contains(&pid) {
                            println!("\n[+] HEDEF SÜREÇ TESPİT EDİLDİ! Adı: '{}' | PID: {}", name, pid);

                            let h_proc = OpenProcess(PROCESS_ALL_ACCESS, 0, pid);
                            if !h_proc.is_null() {
                                let event_name = format!("Local\\iommu_hook_done_{pid}");
                                let event_w = wide(&event_name);
                                let done_event = CreateEventW(
                                    std::ptr::null_mut(),
                                    1,
                                    0,
                                    event_w.as_ptr(),
                                );
                                if done_event.is_null() {
                                    eprintln!("[-] Cleanup event oluşturulamadı; DLL enjekte edilmedi.");
                                } else {
                                    // 1. Dondur (süreç çalışmadan hook'ları atmak için)
                                    println!("[*] Süreç donduruluyor (NtSuspendProcess)...");
                                    nt_suspend(h_proc);

                                    // 2. Enjekte et
                                    println!("[*] iommu_hook.dll enjekte ediliyor...");
                                    let mut resumed = false;
                                    if inject_dll(h_proc, &dll_w, nt_resume, &mut resumed) {
                                        println!("[+] DLL yüklendi; tamamlanma sinyalinde injector boşaltacak.");
                                        injected_pids.insert(pid);
                                        if let Err(err) = std::thread::Builder::new().name(format!("exit-watch-{pid}")).spawn(move || monitor_target_exit(pid)) {
                                            eprintln!("[-] Exit monitor could not start: {err}");
                                        }
                                        let event_handle = done_event as usize;
                                        let dll_name = dll_path
                                            .file_name()
                                            .unwrap_or_default()
                                            .to_string_lossy()
                                            .into_owned();
                                        if let Err(err) = std::thread::Builder::new()
                                            .name(format!("iommu-unload-{pid}"))
                                            .spawn(move || wait_for_completion_and_unload(pid, event_handle, dll_name))
                                        {
                                            eprintln!("[-] Unload worker başlatılamadı: {err}");
                                            CloseHandle(done_event);
                                        }
                                    } else {
                                        eprintln!("[-] DLL enjeksiyonu başarısız oldu!");
                                        CloseHandle(done_event);
                                    }

                                    // 3. Devam ettir
                                    if !resumed {
                                        println!("[*] Süreç çözülüyor ve devam ettiriliyor (NtResumeProcess)...");
                                        nt_resume(h_proc);
                                    } else {
                                        println!("[*] Süreç loader-lock beklemesi nedeniyle zaten devam ettirildi.");
                                    }
                                }
                                CloseHandle(h_proc);
                            } else {
                                eprintln!("[-] OpenProcess başarısız! Yönetici (Administrator) izni gerekebilir.");
                            }
                        }

                        if Process32NextW(snap, &mut pe) == 0 {
                            break;
                        }
                    }
                }
                CloseHandle(snap);
            }
            Sleep(5); // 5ms loop to catch process immediately at startup
        }
    }
}
