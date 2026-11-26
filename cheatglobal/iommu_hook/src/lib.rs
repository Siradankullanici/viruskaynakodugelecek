//! IOMMU/DMA registry-value hook for CrackMe.
//!
//! Installed entry points:
//! - ntdll!NtQuerySystemInformation (class 0x95: IOMMU/DMA reports Available & InUse)
//! - KernelBase!RegOpenKeyExW / RegOpenKeyExA (real implementations behind advapi32)
//! - KernelBase!RegQueryValueExW / RegQueryValueExA
//! - KernelBase!RegCloseKey
//!
//! Only `DmaProtectionStatus` under `DmaSecurity` is emulated (DWORD 1). All hooks
//! are restored and the injector is signalled once the value has been returned.
//!
//! AV fixes:
//! - Real (original) code is called through a trampoline, never through the
//!   patched address. Previously advapi32 exports forward to the very same
//!   KernelBase address that was patched, so calling the "real" function
//!   re-entered the hook and overflowed the stack (access violation).
//! - `jmp [rip+disp32]` forwarder stubs are followed so only the real
//!   implementation is patched (12-byte patch no longer stomps the next
//!   6-byte advapi32 stub).
//! - Patches/restores are written with two 8-byte stores instead of
//!   byte-by-byte writes, so a racing thread cannot execute a half-written
//!   prologue (which jumped into garbage = access violation).

#![allow(non_snake_case)]

use core::arch::asm;
use core::ffi::c_void;
use core::sync::atomic::{AtomicBool, AtomicUsize, Ordering};
use std::sync::Mutex;

const PAGE_EXECUTE_READWRITE: u32 = 0x40;
const MEM_COMMIT: u32 = 0x1000;
const MEM_RESERVE: u32 = 0x2000;
const MEM_RELEASE: u32 = 0x8000;
const SYSTEM_KERNEL_DMA_PROTECTION_INFORMATION: u32 = 0x95; // 149

const STATUS_SUCCESS: i32 = 0;
const STATUS_INFO_LENGTH_MISMATCH: i32 = 0xC000_0004u32 as i32;

static FAKE_KEY_HANDLES: Mutex<Vec<usize>> = Mutex::new(Vec::new());
static DMA_VALUE_SEEN_HANDLES: Mutex<Vec<usize>> = Mutex::new(Vec::new());

fn remember_fake_key_handle(handle: *mut c_void) {
    let value = handle as usize;
    if value == 0 {
        return;
    }
    let mut handles = FAKE_KEY_HANDLES.lock().unwrap_or_else(|e| e.into_inner());
    if !handles.contains(&value) {
        handles.push(value);
    }
}

fn is_fake_key_handle(handle: *mut c_void) -> bool {
    FAKE_KEY_HANDLES
        .lock()
        .unwrap_or_else(|e| e.into_inner())
        .contains(&(handle as usize))
}

fn forget_fake_key_handle(handle: *mut c_void) {
    let mut handles = FAKE_KEY_HANDLES.lock().unwrap_or_else(|e| e.into_inner());
    if let Some(index) = handles.iter().position(|&value| value == handle as usize) {
        handles.swap_remove(index);
    }
}

fn mark_dma_value_seen(handle: *mut c_void) {
    let value = handle as usize;
    let mut handles = DMA_VALUE_SEEN_HANDLES.lock().unwrap_or_else(|e| e.into_inner());
    if !handles.contains(&value) {
        handles.push(value);
    }
}

fn take_dma_value_seen(handle: *mut c_void) -> bool {
    let mut handles = DMA_VALUE_SEEN_HANDLES.lock().unwrap_or_else(|e| e.into_inner());
    if let Some(index) = handles.iter().position(|&value| value == handle as usize) {
        handles.swap_remove(index);
        true
    } else {
        false
    }
}

extern "system" {
    fn GetModuleHandleA(name: *const u8) -> *mut c_void;
    fn GetProcAddress(module: *mut c_void, name: *const u8) -> *mut c_void;
    fn LoadLibraryA(name: *const u8) -> *mut c_void;
    fn VirtualAlloc(addr: *mut c_void, size: usize, alloc_type: u32, protect: u32) -> *mut c_void;
    fn VirtualFree(addr: *mut c_void, size: usize, free_type: u32) -> i32;
    fn VirtualQuery(addr: *const c_void, info: *mut u8, len: usize) -> usize;
    fn SetThreadContext(h: *mut c_void, ctx: *const c_void) -> i32;
    fn GetCurrentThread() -> *mut c_void;
    fn ReadProcessMemory(
        h: *mut c_void,
        base: *const c_void,
        buf: *mut c_void,
        size: usize,
        read: *mut usize,
    ) -> i32;
    fn CreateThread(
        attrs: *const c_void,
        stack: usize,
        start: Option<unsafe extern "system" fn(*mut c_void) -> u32>,
        param: *mut c_void,
        flags: u32,
        tid: *mut u32,
    ) -> *mut c_void;
    fn VirtualProtect(addr: *mut c_void, size: usize, new_prot: u32, old_prot: *mut u32) -> i32;
    fn FlushInstructionCache(proc: *mut c_void, addr: *const c_void, size: usize) -> i32;
    fn GetCurrentProcess() -> *mut c_void;
    fn GetCurrentProcessId() -> u32;
    fn OpenEventW(access: u32, inherit: i32, name: *const u16) -> *mut c_void;
    fn SetEvent(event: *mut c_void) -> i32;
    fn CloseHandle(handle: *mut c_void) -> i32;
    fn AddVectoredExceptionHandler(first: u32, handler: *const c_void) -> *mut c_void;
    fn RemoveVectoredExceptionHandler(handler: *const c_void) -> u32;
}

#[link(name = "kernel32")]
extern "system" {
    fn OpenThread(access: u32, inherit: i32, tid: u32) -> *mut c_void;
    fn SuspendThread(thread: *mut c_void) -> u32;
    fn ResumeThread(thread: *mut c_void) -> u32;
    fn GetCurrentThreadId() -> u32;
    fn Sleep(ms: u32);
}

const TH32CS_SNAPTHREAD: u32 = 0x0000_0004;
const THREAD_SUSPEND_RESUME: u32 = 0x0000_0002;

#[repr(C)]
struct ThreadEntry32 {
    dw_size: u32,
    cnt_usage: u32,
    thread_id: u32,
    owner_process_id: u32,
    tp_base_pri: i32,
    tp_delta_pri: i32,
    dw_flags: u32,
}

type FnCreateToolhelp32Snapshot = unsafe extern "system" fn(u32, u32) -> *mut c_void;
type FnThread32FirstW = unsafe extern "system" fn(*mut c_void, *mut ThreadEntry32) -> i32;
type FnThread32NextW = unsafe extern "system" fn(*mut c_void, *mut ThreadEntry32) -> i32;

/// Suspend every other thread of this process (two snapshot passes so freshly
/// created threads are caught too). The patch/restore rewrite must not run
/// while target threads can execute the affected code bytes: a caller that
/// enters between the two 8-byte stores executes a torn prologue and jumps
/// into garbage (0xC0000005).
unsafe fn suspend_other_threads() -> Vec<*mut c_void> {
    let k32 = GetModuleHandleA(b"kernel32.dll\0".as_ptr());
    if k32.is_null() {
        return Vec::new();
    }
    let create_snap: FnCreateToolhelp32Snapshot =
        match core::mem::transmute::<*mut c_void, Option<FnCreateToolhelp32Snapshot>>(GetProcAddress(
            k32,
            b"CreateToolhelp32Snapshot\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return Vec::new(),
        };
    let t32_first: FnThread32FirstW =
        match core::mem::transmute::<*mut c_void, Option<FnThread32FirstW>>(GetProcAddress(
            k32,
            // NOTE: the Toolhelp thread APIs are exported WITHOUT the W suffix
            // (no string parameters -> no Unicode variant).
            b"Thread32First\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return Vec::new(),
        };
    let t32_next: FnThread32NextW =
        match core::mem::transmute::<*mut c_void, Option<FnThread32NextW>>(GetProcAddress(
            k32,
            b"Thread32Next\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return Vec::new(),
        };

    let mut handles: Vec<*mut c_void> = Vec::with_capacity(32);
    let mut tids: Vec<u32> = Vec::with_capacity(32);
    let mut seen = 0usize;
    let my_tid = GetCurrentThreadId();
    let my_pid = GetCurrentProcessId();
    for _ in 0..2 {
        let snap = create_snap(TH32CS_SNAPTHREAD, 0);
        if snap.is_null() || snap as isize == -1 {
            continue;
        }
        let mut entry = ThreadEntry32 {
            dw_size: core::mem::size_of::<ThreadEntry32>() as u32,
            cnt_usage: 0,
            thread_id: 0,
            owner_process_id: 0,
            tp_base_pri: 0,
            tp_delta_pri: 0,
            dw_flags: 0,
        };
        if t32_first(snap, &mut entry) != 0 {
            loop {
                if entry.owner_process_id == my_pid {
                    seen += 1;
                }
                if entry.owner_process_id == my_pid
                    && entry.thread_id != my_tid
                    && !tids.contains(&entry.thread_id)
                {
                    let h = OpenThread(THREAD_SUSPEND_RESUME, 0, entry.thread_id);
                    if !h.is_null() {
                        if SuspendThread(h) != 0xFFFF_FFFF {
                            handles.push(h);
                            tids.push(entry.thread_id);
                        } else {
                            CloseHandle(h);
                        }
                    }
                }
                if t32_next(snap, &mut entry) == 0 {
                    break;
                }
            }
        }
        CloseHandle(snap);
    }
    log_msg(&format!(
        "[hook] suspend_other_threads: seen {} own threads, suspended {}",
        seen,
        handles.len()
    ));
    handles
}

unsafe fn resume_threads(handles: &[*mut c_void]) {
    for &h in handles {
        ResumeThread(h);
        CloseHandle(h);
    }
}

static mut REAL_SYSCALL_NQSI: u32 = 0;
static NQSI_PATCH_ADDR: AtomicUsize = AtomicUsize::new(0);
static SCANNED_DMA_SYSCALL: AtomicBool = AtomicBool::new(false);

/// Scan all committed executable memory for a direct syscall stub that
/// selects syscall number 0x95 (NtQuerySystemInformation). The VM generates
/// its stubs at runtime, so the file on disk contains no such pattern.
unsafe fn scan_for_dma_syscall() {
    if SCANNED_DMA_SYSCALL.swap(true, Ordering::AcqRel) {
        return;
    }
    let mut info = [0u8; 56];
    let mut addr = 0usize;
    let mut total_0f05 = 0usize;
    let mut matches = 0usize;
    loop {
        let got = VirtualQuery(addr as *const c_void, info.as_mut_ptr(), info.len());
        if got == 0 {
            break;
        }
        let base = usize::from_ne_bytes(info[0..8].try_into().unwrap());
        let size = usize::from_ne_bytes(info[24..32].try_into().unwrap());
        let state = u32::from_ne_bytes(info[32..36].try_into().unwrap());
        let protect = u32::from_ne_bytes(info[36..40].try_into().unwrap());
        let next = match base.checked_add(size) {
            Some(n) if n > addr => n,
            _ => break,
        };
        let exec = matches!(protect & 0xFF, 0x10 | 0x20 | 0x40 | 0x80);
        if state == 0x1000 && exec && size >= 64 && size <= (256 << 20) {
            let mem = core::slice::from_raw_parts(base as *const u8, size);
            let mut i = 0usize;
            while i + 40 < size {
                if mem[i] == 0x0F && mem[i + 1] == 0x05 {
                    total_0f05 += 1;
                }
                // mov eax, 0x95 (B8 95 00 00 00) followed by syscall within 32 bytes
                if mem[i] == 0xB8
                    && mem[i + 1] == 0x95
                    && mem[i + 2] == 0
                    && mem[i + 3] == 0
                    && mem[i + 4] == 0
                {
                    for j in 1..=32usize {
                        if mem[i + j] == 0x0F && mem[i + j + 1] == 0x05 {
                            let lo = i.saturating_sub(8);
                            let hi = (i + j + 10).min(size);
                            let mut hex = String::new();
                            for b in &mem[lo..hi] {
                                hex.push_str(&format!("{:02X} ", b));
                            }
                            log_msg(&format!(
                                "[scan] MATCH at {:#x} (syscall at +{}) ctx: {}",
                                base + i,
                                j,
                                hex
                            ));
                            matches += 1;
                            break;
                        }
                    }
                }
                i += 1;
            }
        }
        addr = next;
        if addr > 0x7FFF_FFFF_FFFF {
            break;
        }
    }
    log_msg(&format!(
        "[scan] done: total syscall(0F 05) bytes={} , mov eax,0x95+syscall matches={}",
        total_0f05, matches
    ));
}

/// Log every syscall instruction inside the crackme module and RWX private
/// regions with context, to locate VM-generated syscall stubs at runtime.
unsafe fn scan_all_rwx_syscalls() {
    let mut info = [0u8; 56];
    let mut addr = 0usize;
    let mut logged = 0usize;
    let mut total = 0usize;
    loop {
        let got = VirtualQuery(addr as *const c_void, info.as_mut_ptr(), info.len());
        if got == 0 {
            break;
        }
        let base = usize::from_ne_bytes(info[0..8].try_into().unwrap());
        let size = usize::from_ne_bytes(info[24..32].try_into().unwrap());
        let state = u32::from_ne_bytes(info[32..36].try_into().unwrap());
        let protect = u32::from_ne_bytes(info[36..40].try_into().unwrap());
        let mtype = u32::from_ne_bytes(info[40..44].try_into().unwrap());
        let next = match base.checked_add(size) {
            Some(n) if n > addr => n,
            _ => break,
        };
        let exec = matches!(protect & 0xFF, 0x10 | 0x20 | 0x40 | 0x80);
        let is_crackme = base >= 0x1400_0000_00 && base < 0x1500_0000_00;
        let is_rwx_private = state == 0x1000 && mtype == 0x40000 && (protect & 0xFF) == 0x40;
        if exec && size >= 64 && size <= (256 << 20) && (is_crackme || is_rwx_private) {
            let mem = core::slice::from_raw_parts(base as *const u8, size);
            let mut i = 0usize;
            while i + 16 < size {
                if mem[i] == 0x0F && mem[i + 1] == 0x05 {
                    total += 1;
                    if logged < 60 {
                        let lo = i.saturating_sub(10);
                        let hi = (i + 10).min(size);
                        let mut hex = String::new();
                        for b in &mem[lo..hi] {
                            hex.push_str(&format!("{:02X} ", b));
                        }
                        log_msg(&format!(
                            "[scan2] syscall at {:#x} (region base {:#x}) ctx: {}",
                            base + i,
                            base,
                            hex
                        ));
                        logged += 1;
                    }
                }
                i += 1;
            }
        }
        addr = next;
        if addr > 0x7FFF_FFFF_FFFF {
            break;
        }
    }
    log_msg(&format!(
        "[scan2] done: syscall bytes in crackme/RWX regions={} logged={}",
        total, logged
    ));
}

#[derive(Clone, Copy)]
struct HookPatch {
    addr: usize,
    original: [u8; 16],
    active: bool,
}
const EMPTY_HOOK_PATCH: HookPatch = HookPatch { addr: 0, original: [0; 16], active: false };
static HOOK_PATCHES: Mutex<[HookPatch; HOOK_PATCH_CAPACITY]> =
    Mutex::new([EMPTY_HOOK_PATCH; HOOK_PATCH_CAPACITY]);
const HOOK_PATCH_CAPACITY: usize = 96;
static HOOKS_RESTORED: AtomicBool = AtomicBool::new(false);
static ACTIVE_HOOK_CALLS: AtomicUsize = AtomicUsize::new(0);
static CLEANUP_READY: AtomicBool = AtomicBool::new(false);
static TRAMPOLINES: Mutex<Vec<usize>> = Mutex::new(Vec::new());

static mut VEH_HANDLE: *mut c_void = core::ptr::null_mut();

#[repr(C)]
struct ExceptionRecord {
    code: u32,
    _flags: u32,
    _record: *mut c_void,
    address: *mut c_void,
}
#[repr(C)]
struct ExceptionPointers {
    record: *mut ExceptionRecord,
    _context: *mut c_void,
}

/// Log fatal exceptions with the faulting address so a crash can be pinned to
/// the exact module+offset from hook_log.txt.
static WATCH_HITS: std::sync::atomic::AtomicUsize = std::sync::atomic::AtomicUsize::new(0);
static PW_REGION_DUMPED: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);
static PW_WATCH_ARMED: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);
static mut BINARY_HITS: [usize; 2] = [0; 2];

/// Arm a hardware watchpoint (DR0, break on 4-byte read/write) on the current
/// thread. Used to catch the code that reads the clipboard / input buffer.
unsafe fn arm_dr0_watchpoint(addr: usize) {
    if addr < 0x10000 {
        return;
    }
    #[repr(C, align(16))]
    struct CtxBuf([u8; 1232]);
    let mut buf = CtxBuf([0u8; 1232]);
    let c = buf.0.as_mut_ptr();
    core::ptr::write_unaligned(c.add(0x30) as *mut u32, 0x0010_0010); // CONTEXT_DEBUG_REGISTERS|AMD64
    core::ptr::write_unaligned(c.add(0x48) as *mut u64, addr as u64); // Dr0
    // Dr7: L0=1, R/W0=11 (read/write), LEN0=11 (4 bytes) -> 0xF0001
    core::ptr::write_unaligned(c.add(0x70) as *mut u64, 0xF0001);
    let ok = SetThreadContext(GetCurrentThread(), c as *const c_void);
    log_msg(&format!(
        "[watch] DR0 armed at {:#x} (SetThreadContext={})",
        addr, ok
    ));
}

#[repr(C)]
struct ThreadEntry32Pw {
    dw_size: u32,
    cnt_usage: u32,
    th32_thread_id: u32,
    th32_owner_process_id: u32,
    tp_base_pri: i32,
    tp_delta_pri: i32,
    dw_flags: u32,
}

/// DR registers are per-thread: arm DR0/DR1 on every thread of this process
/// (the VM's inline compare may run on a worker thread).
unsafe fn arm_dr_watchpoints_all_threads(a1: usize, a2: usize) {
    let k32 = GetModuleHandleA(b"kernel32.dll\0".as_ptr());
    if k32.is_null() {
        return;
    }
    let create_snap: FnCreateToolhelp32Snapshot =
        match core::mem::transmute::<*mut c_void, Option<FnCreateToolhelp32Snapshot>>(GetProcAddress(
            k32,
            b"CreateToolhelp32Snapshot\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return,
        };
    let thr_first: unsafe extern "system" fn(*mut c_void, *mut ThreadEntry32Pw) -> i32 =
        match core::mem::transmute::<*mut c_void, Option<unsafe extern "system" fn(*mut c_void, *mut ThreadEntry32Pw) -> i32>>(GetProcAddress(
            k32,
            b"Thread32First\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return,
        };
    let thr_next: unsafe extern "system" fn(*mut c_void, *mut ThreadEntry32Pw) -> i32 =
        match core::mem::transmute::<*mut c_void, Option<unsafe extern "system" fn(*mut c_void, *mut ThreadEntry32Pw) -> i32>>(GetProcAddress(
            k32,
            b"Thread32Next\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return,
        };
    let my_tid = GetCurrentThreadId();
    let my_pid = GetCurrentProcessId();
    let snap = create_snap(0x0000_0004 /* TH32CS_SNAPTHREAD */, 0);
    if snap.is_null() || snap as isize == -1 {
        return;
    }
    let mut te = ThreadEntry32Pw {
        dw_size: core::mem::size_of::<ThreadEntry32Pw>() as u32,
        cnt_usage: 0,
        th32_thread_id: 0,
        th32_owner_process_id: 0,
        tp_base_pri: 0,
        tp_delta_pri: 0,
        dw_flags: 0,
    };
    let mut armed = 0usize;
    let mut threads_seen = 0usize;
    let mut open_fail = 0usize;
    let mut susp_fail = 0usize;
    if thr_first(snap, &mut te) != 0 {
        loop {
            if te.th32_owner_process_id == my_pid {
                threads_seen += 1;
            }
            if te.th32_owner_process_id == my_pid && te.th32_thread_id != my_tid {
                let h = OpenThread(0x1F03FF /* THREAD_ALL_ACCESS */, 0, te.th32_thread_id);
                if h.is_null() {
                    open_fail += 1;
                }
                if !h.is_null() {
                    if SuspendThread(h) != 0xFFFF_FFFF {
                        #[repr(C, align(16))]
                        struct CtxBuf([u8; 1232]);
                        let mut buf = CtxBuf([0u8; 1232]);
                        let c = buf.0.as_mut_ptr();
                        core::ptr::write_unaligned(c.add(0x30) as *mut u32, 0x0010_0010);
                        core::ptr::write_unaligned(c.add(0x48) as *mut u64, a1 as u64);
                        core::ptr::write_unaligned(c.add(0x50) as *mut u64, a2 as u64);
                        core::ptr::write_unaligned(c.add(0x70) as *mut u64, 0x00F0_005);
                        if SetThreadContext(h, c as *const c_void) != 0 {
                            armed += 1;
                        }
                        ResumeThread(h);
                    } else {
                        susp_fail += 1;
                        ResumeThread(h);
                    }
                    CloseHandle(h);
                }
            }
            if thr_next(snap, &mut te) == 0 {
                break;
            }
        }
    }
    CloseHandle(snap);
    log_msg(&format!(
        "[watch] DR0/DR1 armed on {} threads (seen={}, open_fail={}, susp_fail={})",
        armed, threads_seen, open_fail, susp_fail
    ));
}

/// Arm TWO watchpoints: DR0 + DR1 (4-byte read/write each).
unsafe fn arm_dr_watchpoints(a1: usize, a2: usize) {
    #[repr(C, align(16))]
    struct CtxBuf([u8; 1232]);
    let mut buf = CtxBuf([0u8; 1232]);
    let c = buf.0.as_mut_ptr();
    core::ptr::write_unaligned(c.add(0x30) as *mut u32, 0x0010_0010);
    core::ptr::write_unaligned(c.add(0x48) as *mut u64, a1 as u64); // Dr0
    core::ptr::write_unaligned(c.add(0x50) as *mut u64, a2 as u64); // Dr1
    // L0|L1, R/W0=R/W1=11, LEN0=LEN1=11 -> 0x00F0005
    core::ptr::write_unaligned(c.add(0x70) as *mut u64, 0x00F0_005);
    let ok = SetThreadContext(GetCurrentThread(), c as *const c_void);
    log_msg(&format!(
        "[watch] DR0={:#x} DR1={:#x} armed (SetThreadContext={})",
        a1, a2, ok
    ));
}

unsafe extern "system" fn veh_handler(info: *mut ExceptionPointers) -> i32 {
    if !info.is_null() && !(*info).record.is_null() {
        let rec = &*(*info).record;
        let code = rec.code;
        // Hardware watchpoint hit (single-step from DR0 match): log the reader,
        // disarm DR7 in the context, and resume.
        if code == 0x8000_0004 {
            let ctx = (*info)._context as *const u8;
            if !ctx.is_null() {
                let dr6 = core::ptr::read_unaligned(ctx.add(0x68) as *const u64);
                if dr6 & 3 != 0 {
                    // Only report hits whose RIP is in PRIVATE executable
                    // memory (the VM code pool). memcmp hits (image modules)
                    // are the sliding search - stay silent and keep armed.
                    let rip = core::ptr::read_unaligned(ctx.add(0xF8) as *const u64);
                    let mut mq = [0u8; 56];
                    let mut private_hit = false;
                    if VirtualQuery(rip as *const c_void, mq.as_mut_ptr(), 56) != 0 {
                        let mtype = u32::from_ne_bytes(mq[40..44].try_into().unwrap());
                        let prot = u32::from_ne_bytes(mq[36..40].try_into().unwrap());
                        private_hit = mtype == 0x20000 && (prot & 0xF0) != 0;
                    }
                    if !private_hit {
                        return -1; // keep the watchpoint armed
                    }
                    let hits = WATCH_HITS.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
                    if hits < 60 {
                        let rd = |off: usize| -> u64 { core::ptr::read_unaligned(ctx.add(off) as *const u64) };
                        let rip = rd(0xF8);
                        log_msg(&format!(
                            "[watch] HIT#{} dr0={:#x} rip={:#x} rax={:#x} rcx={:#x} rdx={:#x} rbx={:#x} rsp={:#x} rsi={:#x} rdi={:#x} r8={:#x} r9={:#x} r10={:#x} r11={:#x}",
                            hits,
                            rd(0x48),
                            rip,
                            rd(0x78),
                            rd(0x80),
                            rd(0x88),
                            rd(0x90),
                            rd(0x98),
                            rd(0xA8),
                            rd(0xB0),
                            rd(0xB8),
                            rd(0xC0),
                            rd(0xC8),
                            rd(0xD0),
                        ));
                        // dump code around rip
                        let start = rip.wrapping_sub(16) as *const u8;
                        let mut hex = String::new();
                        for b in core::slice::from_raw_parts(start, 48) {
                            hex.push_str(&format!("{:02X} ", b));
                        }
                        log_msg(&format!("[watch] code@rip-16: {}", hex));
                        // dump memory pointed by the most likely operand regs
                        for (name, v) in [("rax", rd(0x78)), ("rcx", rd(0x80)), ("rdx", rd(0x88)), ("rsi", rd(0xA8)), ("rdi", rd(0xB0)), ("r8", rd(0xB8))] {
                            let mut infoq = [0u8; 56];
                            let valid = v > 0x10000 && v < 0x7FFFFFFF_FFFF
                                && VirtualQuery(v as *const c_void, infoq.as_mut_ptr(), 56) != 0
                                && u32::from_ne_bytes(infoq[32..36].try_into().unwrap()) == 0x1000;
                            if valid {
                                let mut hx = String::new();
                                for b in core::slice::from_raw_parts(v as *const u8, 48) {
                                    if (0x20..0x7f).contains(b) {
                                        hx.push(*b as char);
                                    } else if *b == 0 {
                                        hx.push('.');
                                    } else {
                                        hx.push_str(&format!("\\x{:02X}", b));
                                    }
                                }
                                log_msg(&format!("[watch] [{}] '{:?}'", name, hx));
                            }
                        }
                    }
                    {
                        let rdx2 = |off: usize| -> u64 { core::ptr::read_unaligned(ctx.add(off) as *const u64) };
                        log_msg(&format!(
                            "[watch] r12={:#x} r13={:#x} r14={:#x} r15={:#x} dr6={:#x}",
                            rdx2(0xD8),
                            rdx2(0xE0),
                            rdx2(0xE8),
                            rdx2(0xF0),
                            rdx2(0x68),
                        ));
                    }
                    // disarm + scrub all DRs so later exception handlers (the
                    // VM's own) cannot detect the watchpoint
                    let cmut = ctx as *mut u8;
                    core::ptr::write_unaligned(cmut.add(0x70) as *mut u64, 0);
                    core::ptr::write_unaligned(cmut.add(0x68) as *mut u64, 0);
                    return -1; // EXCEPTION_CONTINUE_EXECUTION
                }
            }
        }

        let rec = &*(*info).record;
        let code = rec.code;
        let fatal = matches!(code,
            0xC000_0005 | 0xC000_0009 | 0xC000_0094 | 0xC000_00FD | 0xC000_0409
            | 0xC000_001D | 0x8000_0003 | 0xC000_0194);
        if fatal {
            let mut where_ = format!("{:p}", rec.address);
            for (name, base) in [
                ("KernelBase.dll", GetModuleHandleA(b"KernelBase.dll\0".as_ptr())),
                ("ntdll.dll", GetModuleHandleA(b"ntdll.dll\0".as_ptr())),
                ("advapi32.dll", GetModuleHandleA(b"advapi32.dll\0".as_ptr())),
                ("iommu_hook.dll", GetModuleHandleA(b"iommu_hook.dll\0".as_ptr())),
                ("TestCrackMe.exe", GetModuleHandleA(b"TestCrackMe.exe\0".as_ptr())),
                ("TestCrackMe", GetModuleHandleA(b"TestCrackMe\0".as_ptr())),
                ("kernel32.dll", GetModuleHandleA(b"kernel32.dll\0".as_ptr())),
                ("user32.dll", GetModuleHandleA(b"user32.dll\0".as_ptr())),
            ] {
                let base = base as usize;
                let addr = rec.address as usize;
                if base != 0 && addr >= base && addr < base + 0x1000000 {
                    where_ = format!("{}+0x{:X} (base {:p})", name, addr - base, base as *const c_void);
                    break;
                }
            }
            log_msg(&format!("[veh] FATAL exception code=0x{:08X} at {}", code, where_));
            // CONTEXT x64 register offsets (winnt.h)
            let ctx = (*info)._context as *const u8;
            // EXCEPTION_RECORD: NumberParameters @0x18, ExceptionInformation[] @0x20.
            // For 0xC0000005: [0]=0 read / 1 write, [1]=faulting virtual address.
            let nparams = core::ptr::read_unaligned(core::ptr::from_ref(rec).add(0x18) as *const u32);
            if code == 0xC000_0005 && nparams >= 2 {
                let rw = core::ptr::read_unaligned(core::ptr::from_ref(rec).add(0x20) as *const u32);
                let fault_addr = core::ptr::read_unaligned(core::ptr::from_ref(rec).add(0x28) as *const usize);
                log_msg(&format!(
                    "[veh]   access={} ({}) at {:#x}",
                    rw,
                    if rw == 0 { "READ" } else { "WRITE" },
                    fault_addr
                ));
            }
            if !ctx.is_null() {
                let rd = |off: usize| -> usize { core::ptr::read_unaligned(ctx.add(off) as *const usize) };
                let rsp = rd(0x98);
                log_msg(&format!(
                    "[veh]   rip={:p} rsp={:p} rax={:p} rcx={:p} rdx={:p} r8={:p} r9={:p} rsi={:p} rdi={:p} r15={:p}",
                    rd(0xF8) as *const c_void, rsp as *const c_void, rd(0x78) as *const c_void,
                    rd(0x80) as *const c_void, rd(0x88) as *const c_void, rd(0xB8) as *const c_void,
                    rd(0xC0) as *const c_void, rd(0xA8) as *const c_void, rd(0xB0) as *const c_void,
                    rd(0xF0) as *const c_void,
                ));
                // peek stack around rsp (the home slots the callee reads)
                for delta in [0x08usize, 0x20, 0x28, 0xC0] {
                    let v = core::ptr::read_unaligned((rsp + delta) as *const usize);
                    log_msg(&format!("[veh]   [rsp+0x{:X}] = {:#x}", delta, v));
                }
            }
        }
    }
    0 // EXCEPTION_CONTINUE_SEARCH
}

unsafe fn install_veh() {
    VEH_HANDLE = AddVectoredExceptionHandler(1, veh_handler as *const c_void);
}

/// Free every trampoline page. Only safe once no thread can still be
/// executing inside one (see DllMain detach drain).
unsafe fn free_all_trampolines() {
    let mut freed = 0usize;
    if let Ok(mut tramps) = TRAMPOLINES.lock() {
        for &mem in tramps.iter() {
            if VirtualFree(mem as *mut c_void, 0, MEM_RELEASE) != 0 {
                freed += 1;
            }
        }
        tramps.clear();
    }
    log_msg(&format!("[hook] Freed {} trampoline pages", freed));
}

static VERBOSE_LOG: AtomicBool = AtomicBool::new(true); // TEMP: diagnosis

/// Per-call logging (thousands of registry calls x disk I/O) massively slows
/// the hooked phase and can trip the protector's timing checks; gate it.
fn log_verbose(msg: &str) {
    if VERBOSE_LOG.load(Ordering::Relaxed) {
        unsafe { log_msg(msg) };
    }
}

unsafe fn log_msg(msg: &str) {
    use std::io::Write;
    if let Ok(mut f) = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open("C:\\Users\\semae\\Downloads\\dumped\\hook_log.txt")
    {
        let _ = writeln!(f, "{}", msg);
    }
}

struct HookCallGuard;

impl HookCallGuard {
    fn enter() -> Self {
        ACTIVE_HOOK_CALLS.fetch_add(1, Ordering::AcqRel);
        Self
    }
}

impl Drop for HookCallGuard {
    fn drop(&mut self) {
        let previous = ACTIVE_HOOK_CALLS.fetch_sub(1, Ordering::AcqRel);
        if previous == 1 && CLEANUP_READY.load(Ordering::Acquire) {
            unsafe { signal_injector_cleanup_ready(); }
        }
    }
}

unsafe fn signal_injector_cleanup_ready() {
    let name = format!("Local\\iommu_hook_done_{}", GetCurrentProcessId());
    let wide_name: Vec<u16> = name.encode_utf16().chain(std::iter::once(0)).collect();
    let event = OpenEventW(0x0002, 0, wide_name.as_ptr());
    if !event.is_null() {
        SetEvent(event);
        CloseHandle(event);
    }
}

unsafe fn remember_hook_patch(addr: *mut u8) -> bool {
    let address = addr as usize;
    let mut patches = HOOK_PATCHES.lock().unwrap_or_else(|e| e.into_inner());
    for patch in patches.iter() {
        if patch.active && patch.addr == address {
            return true;
        }
    }
    for patch in patches.iter_mut() {
        if !patch.active {
            let mut original = [0u8; 16];
            core::ptr::copy_nonoverlapping(addr, original.as_mut_ptr(), original.len());
            *patch = HookPatch { addr: address, original, active: true };
            return true;
        }
    }
    false
}

/// Write the `mov rax, target; jmp rax` patch (12 bytes) with two 8-byte
/// stores so a racing caller never observes a torn instruction. The trailing
/// 4 original bytes (12..16) are preserved inside the second store.
unsafe fn write_jmp_patch(p: *mut u8, target: u64, orig_tail: &[u8; 4]) {
    let t = target.to_le_bytes();
    let mut first = [0u8; 8];
    first[0] = 0x48;
    first[1] = 0xB8;
    first[2..8].copy_from_slice(&t[..6]);
    let mut second = [0u8; 8];
    second[0] = t[6];
    second[1] = t[7];
    second[2] = 0xFF;
    second[3] = 0xE0;
    second[4..8].copy_from_slice(orig_tail);
    core::ptr::write_unaligned(p as *mut u64, u64::from_le_bytes(first));
    core::ptr::write_unaligned(p.add(8) as *mut u64, u64::from_le_bytes(second));
}

/// Restore the saved original 16 bytes with two 8-byte stores (same rationale
/// as write_jmp_patch: no torn instruction window).
unsafe fn restore_original_bytes(p: *mut u8, original: &[u8; 16]) {
    let first = u64::from_le_bytes(original[0..8].try_into().unwrap());
    let second = u64::from_le_bytes(original[8..16].try_into().unwrap());
    core::ptr::write_unaligned(p as *mut u64, first);
    core::ptr::write_unaligned(p.add(8) as *mut u64, second);
}

/// Restore all patches EXCEPT the ntdll NtQuerySystemInformation stub
/// (which must stay active for the kernel-side DMA cross-check).
unsafe fn restore_registry_patches_only() -> bool {
    let nqsi = NQSI_PATCH_ADDR.load(Ordering::Acquire);
    let mut restored = 0usize;
    let mut failed = false;

    let suspended = suspend_other_threads();

    let mut patches = HOOK_PATCHES.lock().unwrap_or_else(|e| e.into_inner());
    for patch in patches.iter_mut() {
        if !patch.active || patch.addr == nqsi {
            continue;
        }
        let addr = patch.addr as *mut u8;
        let mut old = 0u32;
        if VirtualProtect(addr as *mut c_void, patch.original.len(), PAGE_EXECUTE_READWRITE, &mut old) != 0 {
            restore_original_bytes(addr, &patch.original);
            let mut tmp = 0u32;
            VirtualProtect(addr as *mut c_void, patch.original.len(), old, &mut tmp);
            FlushInstructionCache(GetCurrentProcess(), addr as *const c_void, patch.original.len());
            patch.active = false;
            restored += 1;
        } else {
            failed = true;
        }
    }
    drop(patches);

    resume_threads(&suspended);

    log_msg(&format!(
        "[hook] Restored {} registry patches (ntdll 0x95 kept, suspended {} threads)",
        restored,
        suspended.len()
    ));
    !failed
}

unsafe fn restore_all_hook_patches() -> bool {
    if HOOKS_RESTORED
        .compare_exchange(false, true, Ordering::AcqRel, Ordering::Acquire)
        .is_err()
    {
        return HOOKS_RESTORED.load(Ordering::Acquire);
    }

    let mut restored = 0usize;
    let mut failed = false;

    // Suspend every other thread so nobody can execute the bytes while they
    // are rewritten (a torn prologue = wild jump = access violation).
    let suspended = suspend_other_threads();

    let mut patches = HOOK_PATCHES.lock().unwrap_or_else(|e| e.into_inner());
    for patch in patches.iter_mut() {
        if !patch.active {
            continue;
        }
        let addr = patch.addr as *mut u8;
        let mut old = 0u32;
        if VirtualProtect(addr as *mut c_void, patch.original.len(), PAGE_EXECUTE_READWRITE, &mut old) != 0 {
            restore_original_bytes(addr, &patch.original);
            let mut tmp = 0u32;
            VirtualProtect(addr as *mut c_void, patch.original.len(), old, &mut tmp);
            FlushInstructionCache(GetCurrentProcess(), addr as *const c_void, patch.original.len());
            patch.active = false;
            restored += 1;
        } else {
            failed = true;
        }
    }
    drop(patches);

    resume_threads(&suspended);

    log_msg(&format!(
        "[hook] Restored {} patched API entrypoints after final check (suspended {} threads)",
        restored,
        suspended.len()
    ));
    if failed {
        HOOKS_RESTORED.store(false, Ordering::Release);
    }
    !failed
}

// ============================================================================
// Export/forwarder resolution + trampoline
// ============================================================================

/// Follow forwarder stubs down to the real implementation code:
/// - `48 FF 25 disp32` = jmp [rip+disp32] (REX.W-prefixed indirect jmp, what
///   advapi32 uses: Reg* exports are 6-byte stubs followed by CC padding).
/// - `E9 rel32` = jmp rel32.
/// Patching such a stub with a 12-byte patch produces a broken trampoline
/// (RIP-relative target + jump into CC padding) -> access violation.
unsafe fn resolve_export_target(mut p: *mut u8) -> *mut u8 {
    for _ in 0..8 {
        let mut off = 0usize;
        loop {
            let b = *p.add(off);
            if (0x40..=0x4F).contains(&b) || matches!(b, 0x2E | 0x3E | 0x64 | 0x65 | 0x66 | 0x67 | 0xF2 | 0xF3) {
                off += 1;
                continue;
            }
            break;
        }
        let op = *p.add(off);
        if op == 0xFF && *p.add(off + 1) == 0x25 {
            // jmp [rip+disp32]: the memory slot holds the absolute target VA.
            let disp = core::ptr::read_unaligned(p.add(off + 2) as *const i32);
            let slot = p.add(off + 6).offset(disp as isize) as *const u64;
            let next = core::ptr::read_unaligned(slot) as usize as *mut u8;
            if next.is_null() || next == p {
                return p;
            }
            p = next;
            continue;
        }
        if op == 0xE9 {
            // jmp rel32
            let rel = core::ptr::read_unaligned(p.add(off + 1) as *const i32);
            let next = p.add(off + 5).offset(rel as isize);
            if next.is_null() || next == p {
                return p;
            }
            p = next;
            continue;
        }
        return p;
    }
    p
}

/// Length of the ModRM(+SIB+disp) block that follows an opcode.
/// Returns (block_len, disp_offset) where disp_offset is Some only when the
/// addressing is RIP-relative (mod=00, rm=101).
unsafe fn modrm_block_len(p: *const u8, off: usize) -> Option<(usize, Option<usize>)> {
    let modrm = *p.add(off);
    let m = (modrm >> 6) & 3;
    let rm = modrm & 7;
    if m == 3 {
        return Some((1, None));
    }
    let mut len = 1usize;
    let mut rip_disp = None;
    if rm == 4 {
        let sib = *p.add(off + len);
        len += 1;
        if m == 0 && (sib & 7) == 5 {
            len += 4; // absolute disp32 via SIB base
        }
    } else if m == 0 && rm == 5 {
        rip_disp = Some(len);
        len += 4;
    }
    match m {
        1 => len += 1,
        2 => len += 4,
        _ => {}
    }
    Some((len, rip_disp))
}

/// Minimal x86-64 instruction decoder, enough for function prologues.
/// Returns Some((instr_len, rip_disp_offset_in_instr)) or None for anything
/// unsupported. On None the caller must NOT build a trampoline (a broken
/// trampoline jumps into the middle of an instruction = access violation).
unsafe fn decode_instruction(p: *const u8) -> Option<(usize, Option<usize>)> {
    let mut off = 0usize;
    loop {
        let b = *p.add(off);
        match b {
            0x66 | 0x67 | 0xF2 | 0xF3 | 0x2E | 0x3E | 0x64 | 0x65 | 0x26 | 0x36 => off += 1,
            0x40..=0x4F => off += 1, // REX
            _ => break,
        }
    }
    let op = *p.add(off);
    off += 1;
    match op {
        // push/pop r64
        0x50..=0x5F => Some((off, None)),
        // group with imm8 (sub rsp, imm8 is the classic prologue opener)
        0x83 => {
            let (blk, rip) = modrm_block_len(p, off)?;
            Some((off + blk + 1, rip))
        }
        // group with imm32 (incl. C7 /0 mov [mem], imm32)
        0x81 | 0xC7 => {
            let (blk, rip) = modrm_block_len(p, off)?;
            Some((off + blk + 4, rip))
        }
        // reg/mem <-> reg, lea, movsxd, test rm,r
        0x03 | 0x0B | 0x63 | 0x84 | 0x85 | 0x88 | 0x89 | 0x8A | 0x8B | 0x8D => {
            let (blk, rip) = modrm_block_len(p, off)?;
            Some((off + blk, rip))
        }
        // test rm, imm8 / imm32
        0xF6 | 0xF7 => {
            let modrm = *p.add(off);
            let (blk, rip) = modrm_block_len(p, off)?;
            let extra = if (modrm >> 3) & 7 == 0 {
                if op == 0xF6 { 1 } else { 4 }
            } else {
                0
            };
            Some((off + blk + extra, rip))
        }
        // multi-byte NOP (0F 1F /r)
        0x0F => {
            let op2 = *p.add(off);
            if op2 == 0x1F {
                let (blk, rip) = modrm_block_len(p, off + 1)?;
                Some((off + 1 + blk, rip))
            } else {
                None
            }
        }
        // call/jmp rel32 (RIP-relative, relocated when copied)
        0xE8 | 0xE9 => Some((off + 4, Some(off))),
        _ => None,
    }
}

/// Allocate RWX memory containing the original prologue (whole instructions,
/// covering at least the 12 bytes the patch overwrites) followed by
/// `mov rax, target+total; jmp rax`. RIP-relative instructions inside the
/// copied prologue are relocated. The hook calls THIS instead of the patched
/// address, otherwise the hook re-enters itself forever (infinite recursion
/// -> stack overflow -> access violation).
unsafe fn make_trampoline(p: *mut u8) -> Option<*mut c_void> {
    // Decode whole instructions until at least the patched 12 bytes are
    // covered. Copying a partial instruction continues execution in the
    // middle of an instruction -> wild jump -> access violation.
    let mut src_off = 0usize;
    let mut plan: Vec<(usize, usize, Option<usize>)> = Vec::new();
    while src_off < 12 {
        let (len, rip) = decode_instruction(p.add(src_off))?;
        plan.push((src_off, len, rip));
        src_off += len;
        if src_off > 40 {
            return None;
        }
    }
    let mem = VirtualAlloc(core::ptr::null_mut(), 64, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if mem.is_null() {
        return None;
    }
    let dst = mem as *mut u8;
    for &(s, len, rip) in &plan {
        core::ptr::copy_nonoverlapping(p.add(s), dst.add(s), len);
        if let Some(disp_off) = rip {
            // RIP-relative disp targets the address AFTER the instruction.
            // delta = src_next_ip - dst_next_ip = (p + s) - (dst + s).
            let delta = (p.add(s) as isize).wrapping_sub(dst.add(s) as isize);
            if delta < i32::MIN as isize || delta > i32::MAX as isize {
                VirtualFree(mem, 0, MEM_RELEASE);
                return None;
            }
            let disp_pos = s + disp_off;
            let old = core::ptr::read_unaligned(dst.add(disp_pos) as *const i32);
            core::ptr::write_unaligned(dst.add(disp_pos) as *mut i32, old.wrapping_add(delta as i32));
        }
    }
    // Append the back-jump WITHOUT clobbering any register. The original
    // prologue may have left live values in registers (e.g. KernelBase!
    // RegOpenKeyExW holds arg5 in RAX across the prologue, RegQueryValueExW
    // holds its frame pointer in RAX), so a `mov rax, back; jmp rax` tail
    // corrupts them -> access violation deep inside the original function.
    // `FF 25 00 00 00 00` = jmp [rip+0] reads the 8-byte absolute target
    // that follows it and touches no register and no stack.
    let back = p.add(src_off) as usize as u64;
    core::ptr::write(dst.add(src_off), 0xFF);
    core::ptr::write(dst.add(src_off + 1), 0x25);
    core::ptr::write(dst.add(src_off + 2), 0x00);
    core::ptr::write(dst.add(src_off + 3), 0x00);
    core::ptr::write(dst.add(src_off + 4), 0x00);
    core::ptr::write(dst.add(src_off + 5), 0x00);
    core::ptr::write_unaligned(dst.add(src_off + 6) as *mut u64, back);
    Some(mem)
}

// ============================================================================
// Registry emulation
// ============================================================================

unsafe fn u16_to_string(p: *const u16, max_len: usize) -> String {
    if p.is_null() {
        return String::new();
    }
    let mut s = String::new();
    let mut curr = p;
    while *curr != 0 && s.len() < max_len {
        if let Some(ch) = char::from_u32(*curr as u32) {
            s.push(ch);
        }
        curr = curr.add(1);
    }
    s
}

unsafe fn u8_to_string(p: *const u8, max_len: usize) -> String {
    if p.is_null() {
        return String::new();
    }
    let mut s = String::new();
    let mut curr = p;
    while *curr != 0 && s.len() < max_len {
        s.push(*curr as char);
        curr = curr.add(1);
    }
    s
}

type FnRegOpenKeyExW = unsafe extern "system" fn(*mut c_void, *const u16, u32, u32, *mut *mut c_void) -> i32;
type FnRegOpenKeyExA = unsafe extern "system" fn(*mut c_void, *const u8, u32, u32, *mut *mut c_void) -> i32;
type FnRegQueryValueExW = unsafe extern "system" fn(*mut c_void, *const u16, *mut u32, *mut u32, *mut u8, *mut u32) -> i32;
type FnRegQueryValueExA = unsafe extern "system" fn(*mut c_void, *const u8, *mut u32, *mut u32, *mut u8, *mut u32) -> i32;
type FnRegCloseKey = unsafe extern "system" fn(*mut c_void) -> i32;
type FnRegGetValueW = unsafe extern "system" fn(*mut c_void, *const u16, *const u16, u32, *mut u32, *mut u8, *mut u32) -> i32;
type FnRegGetValueA = unsafe extern "system" fn(*mut c_void, *const u8, *const u8, u32, *mut u32, *mut u8, *mut u32) -> i32;
type FnNtQueryValueKey = unsafe extern "system" fn(*mut c_void, *mut UnicodeString, u32, *mut u8, u32, *mut u32) -> i32;

static mut REAL_REG_GET_VALUE_W: Option<FnRegGetValueW> = None;
static mut REAL_REG_GET_VALUE_A: Option<FnRegGetValueA> = None;
static mut REAL_NT_QUERY_VALUE_KEY: Option<FnNtQueryValueKey> = None;

static mut REAL_REG_OPEN_KEY_EX_W: Option<FnRegOpenKeyExW> = None;
static mut REAL_REG_OPEN_KEY_EX_A: Option<FnRegOpenKeyExA> = None;
static mut REAL_REG_QUERY_VALUE_EX_W: Option<FnRegQueryValueExW> = None;
static mut REAL_REG_QUERY_VALUE_EX_A: Option<FnRegQueryValueExA> = None;
static mut REAL_REG_CLOSE_KEY: Option<FnRegCloseKey> = None;

/// Fallback pointers straight to the un-hooked KernelBase implementations.
/// Overwritten with trampolines once the corresponding hook installs.
unsafe fn init_real_registry_ptrs() {
    let kb = LoadLibraryA(b"KernelBase.dll\0".as_ptr());
    if !kb.is_null() {
        let p = GetProcAddress(kb, b"RegOpenKeyExW\0".as_ptr());
        if !p.is_null() { REAL_REG_OPEN_KEY_EX_W = Some(core::mem::transmute(p)); }
        let p = GetProcAddress(kb, b"RegOpenKeyExA\0".as_ptr());
        if !p.is_null() { REAL_REG_OPEN_KEY_EX_A = Some(core::mem::transmute(p)); }
        let p = GetProcAddress(kb, b"RegQueryValueExW\0".as_ptr());
        if !p.is_null() { REAL_REG_QUERY_VALUE_EX_W = Some(core::mem::transmute(p)); }
        let p = GetProcAddress(kb, b"RegQueryValueExA\0".as_ptr());
        if !p.is_null() { REAL_REG_QUERY_VALUE_EX_A = Some(core::mem::transmute(p)); }
        let p = GetProcAddress(kb, b"RegCloseKey\0".as_ptr());
        if !p.is_null() { REAL_REG_CLOSE_KEY = Some(core::mem::transmute(p)); }
        let p = GetProcAddress(kb, b"RegGetValueW\0".as_ptr());
        if !p.is_null() { REAL_REG_GET_VALUE_W = Some(core::mem::transmute(p)); }
        let p = GetProcAddress(kb, b"RegGetValueA\0".as_ptr());
        if !p.is_null() { REAL_REG_GET_VALUE_A = Some(core::mem::transmute(p)); }
    }
}

fn is_iommu_key_name(lower: &str) -> bool {
    lower.trim_end_matches('\\') == "system\\currentcontrolset\\control\\dmasecurity"
        || lower.trim_end_matches('\\').ends_with("\\control\\dmasecurity")
}

fn finish_iommu_check() {
    // PERSISTENT HOOKS: do NOT restore patches and do NOT signal the injector.
    // The DLL and every hook stay active for the whole process lifetime, so
    // any later DMA-state check also sees the emulated value.
    unsafe {
        log_msg("[hook] DmaProtectionStatus returned; hooks stay active (persistent mode)");
    }
}

unsafe extern "system" fn hook_reg_open_key_ex_w(
    hkey: *mut c_void,
    subkey: *const u16,
    opts: u32,
    sam: u32,
    result: *mut *mut c_void,
) -> i32 {
    let _active = HookCallGuard::enter();
    let name = u16_to_string(subkey, 300);
    let lower = name.to_lowercase();
    log_verbose(&format!("[hook] RegOpenKeyExW: subkey='{}'", name));

    if is_iommu_key_name(&lower) {
        if let Some(real_fn) = REAL_REG_OPEN_KEY_EX_W {
            let status = real_fn(hkey, subkey, opts, sam, result);
            if status == 0 && !result.is_null() {
                remember_fake_key_handle(*result);
                log_verbose(&format!("[hook] -> Opened real key; values will be emulated for '{}'", name));
                hook_anti_debug_all(); // late-loaded ntdll copies (manual map)
                dump_vm_pool_fields();
            }
            return status;
        }
        return 2;
    }

    if let Some(real_fn) = REAL_REG_OPEN_KEY_EX_W {
        real_fn(hkey, subkey, opts, sam, result)
    } else {
        2
    }
}

unsafe extern "system" fn hook_reg_open_key_ex_a(
    hkey: *mut c_void,
    subkey: *const u8,
    opts: u32,
    sam: u32,
    result: *mut *mut c_void,
) -> i32 {
    let _active = HookCallGuard::enter();
    let name = u8_to_string(subkey, 300);
    let lower = name.to_lowercase();
    log_verbose(&format!("[hook] RegOpenKeyExA: subkey='{}'", name));

    if is_iommu_key_name(&lower) {
        if let Some(real_fn) = REAL_REG_OPEN_KEY_EX_A {
            let status = real_fn(hkey, subkey, opts, sam, result);
            if status == 0 && !result.is_null() {
                remember_fake_key_handle(*result);
                log_verbose(&format!("[hook] -> Opened real key; values will be emulated for '{}'", name));
                hook_anti_debug_all(); // late-loaded ntdll copies (manual map)
                dump_vm_pool_fields();
            }
            return status;
        }
        return 2;
    }

    if let Some(real_fn) = REAL_REG_OPEN_KEY_EX_A {
        real_fn(hkey, subkey, opts, sam, result)
    } else {
        2
    }
}

unsafe extern "system" fn hook_reg_query_value_ex_w(
    hkey: *mut c_void,
    val_name: *const u16,
    reserved: *mut u32,
    val_type: *mut u32,
    data: *mut u8,
    cb_data: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    let name = u16_to_string(val_name, 100);
    log_msg(&format!("[hook] RegQueryValueExW: val='{}', hkey={:?}", name, hkey));

    if is_fake_key_handle(hkey) && name.eq_ignore_ascii_case("DmaProtectionStatus") {
        if !val_type.is_null() {
            *val_type = 4; // REG_DWORD
        }
        if cb_data.is_null() {
            return 87; // ERROR_INVALID_PARAMETER
        }
        if data.is_null() {
            *cb_data = 4;
            log_verbose("[hook] DmaProtectionStatus size probe; keeping hooks until data is returned");
            return 0;
        }
        if *cb_data < 4 {
            *cb_data = 4;
            return 234; // ERROR_MORE_DATA
        }
        core::ptr::write_unaligned(data as *mut u32, 1u32);
        *cb_data = 4;
        log_verbose("[hook] DmaProtectionStatus DWORD returned; restoring hooks now");
        scan_for_dma_syscall();
        scan_for_dma_syscall();
        scan_all_rwx_syscalls();
        mark_dma_value_seen(hkey);
        finish_iommu_check();
        return 0;
    }

    if let Some(real_fn) = REAL_REG_QUERY_VALUE_EX_W {
        real_fn(hkey, val_name, reserved, val_type, data, cb_data)
    } else {
        2
    }
}

unsafe extern "system" fn hook_reg_query_value_ex_a(
    hkey: *mut c_void,
    val_name: *const u8,
    reserved: *mut u32,
    val_type: *mut u32,
    data: *mut u8,
    cb_data: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    let name = u8_to_string(val_name, 100);
    log_msg(&format!("[hook] RegQueryValueExA: val='{}', hkey={:?}", name, hkey));

    if is_fake_key_handle(hkey) && name.eq_ignore_ascii_case("DmaProtectionStatus") {
        if !val_type.is_null() {
            *val_type = 4; // REG_DWORD
        }
        if cb_data.is_null() {
            return 87; // ERROR_INVALID_PARAMETER
        }
        if data.is_null() {
            *cb_data = 4;
            log_verbose("[hook] DmaProtectionStatus size probe; keeping hooks until data is returned");
            return 0;
        }
        if *cb_data < 4 {
            *cb_data = 4;
            return 234; // ERROR_MORE_DATA
        }
        core::ptr::write_unaligned(data as *mut u32, 1u32);
        *cb_data = 4;
        log_verbose("[hook] DmaProtectionStatus DWORD returned; restoring hooks now");
        scan_for_dma_syscall();
        mark_dma_value_seen(hkey);
        scan_for_dma_syscall();
        scan_all_rwx_syscalls();
        finish_iommu_check();
        return 0;
    }

    if let Some(real_fn) = REAL_REG_QUERY_VALUE_EX_A {
        real_fn(hkey, val_name, reserved, val_type, data, cb_data)
    } else {
        2
    }
}

// ============================================================================
// RegGetValue / NtQueryValueKey hooks (the crackme re-reads the value
// through a second API; a mismatch between the hooked read and the raw
// read trips its anti-tamper)
// ============================================================================

const DMA_STATUS_TRUE: u32 = 1;

unsafe fn emulated_dma_query(pdw_type: *mut u32, data: *mut u8, cb_data: *mut u32) -> i32 {
    if !pdw_type.is_null() {
        core::ptr::write_unaligned(pdw_type, 4); // REG_DWORD
    }
    if cb_data.is_null() {
        return 87; // ERROR_INVALID_PARAMETER
    }
    if data.is_null() {
        core::ptr::write_unaligned(cb_data, 4);
        return 0;
    }
    if core::ptr::read_unaligned(cb_data) < 4 {
        core::ptr::write_unaligned(cb_data, 4);
        return 234; // ERROR_MORE_DATA
    }
    core::ptr::write_unaligned(data as *mut u32, DMA_STATUS_TRUE);
    core::ptr::write_unaligned(cb_data, 4);
    log_verbose("[hook] DmaProtectionStatus emulated (RegGetValue/NtQueryValueKey path)");
    0
}

unsafe fn name_eq_dma_status_w(p: *const u16, max_chars: usize) -> bool {
    let s = u16_to_string(p, max_chars);
    s.eq_ignore_ascii_case("DmaProtectionStatus")
}

unsafe fn name_eq_dma_status_a(p: *const u8, max_chars: usize) -> bool {
    let s = u8_to_string(p, max_chars);
    s.eq_ignore_ascii_case("DmaProtectionStatus")
}

unsafe extern "system" fn hook_reg_get_value_w(
    hkey: *mut c_void,
    subkey: *const u16,
    val: *const u16,
    flags: u32,
    pdw_type: *mut u32,
    data: *mut u8,
    cb_data: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    let sub = u16_to_string(subkey, 300);
    let val_name = u16_to_string(val, 100);
    log_verbose(&format!("[hook] RegGetValueW: subkey='{}' val='{}'", sub, val_name));
    let sub_is_dma = !sub.is_empty() && is_iommu_key_name(&sub.to_lowercase());
    if (sub_is_dma && name_eq_dma_status_w(val, 100))
        || (subkey.is_null() && is_fake_key_handle(hkey) && name_eq_dma_status_w(val, 100))
    {
        return emulated_dma_query(pdw_type, data, cb_data);
    }
    if let Some(real_fn) = REAL_REG_GET_VALUE_W {
        real_fn(hkey, subkey, val, flags, pdw_type, data, cb_data)
    } else {
        2
    }
}

unsafe extern "system" fn hook_reg_get_value_a(
    hkey: *mut c_void,
    subkey: *const u8,
    val: *const u8,
    flags: u32,
    pdw_type: *mut u32,
    data: *mut u8,
    cb_data: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    let sub = u8_to_string(subkey, 300);
    let val_name = u8_to_string(val, 100);
    log_verbose(&format!("[hook] RegGetValueA: subkey='{}' val='{}'", sub, val_name));
    let sub_is_dma = !sub.is_empty() && is_iommu_key_name(&sub.to_lowercase());
    if (sub_is_dma && name_eq_dma_status_a(val, 100))
        || (subkey.is_null() && is_fake_key_handle(hkey) && name_eq_dma_status_a(val, 100))
    {
        return emulated_dma_query(pdw_type, data, cb_data);
    }
    if let Some(real_fn) = REAL_REG_GET_VALUE_A {
        real_fn(hkey, subkey, val, flags, pdw_type, data, cb_data)
    } else {
        2
    }
}

#[repr(C)]
struct UnicodeString {
    length: u16,
    maximum_length: u16,
    buffer: *mut u16,
}

unsafe extern "system" fn hook_nt_query_value_key(
    key: *mut c_void,
    value_name: *mut UnicodeString,
    info_class: u32,
    info: *mut u8,
    length: u32,
    result_length: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    let mut name = String::new();
    if !value_name.is_null() && !(*value_name).buffer.is_null() {
        let chars = ((*value_name).length as usize) / 2;
        let mut i = 0usize;
        while i < chars {
            let c = core::ptr::read_unaligned((*value_name).buffer.add(i));
            if c == 0 {
                break;
            }
            if let Some(ch) = char::from_u32(c as u32) {
                name.push(ch);
            }
            i += 1;
        }
    }
    log_verbose(&format!("[hook] NtQueryValueKey: val='{}' class={}", name, info_class));
    if name.eq_ignore_ascii_case("DmaProtectionStatus") && info_class == 1 {
        // KEY_VALUE_PARTIAL_INFORMATION: { ULONG Type; ULONG DataLength; UCHAR Data[]; }
        if !result_length.is_null() {
            core::ptr::write_unaligned(result_length, 12u32);
        }
        if length < 12 {
            return 0x8000_0005u32 as i32; // STATUS_BUFFER_OVERFLOW
        }
        if !info.is_null() {
            core::ptr::write_unaligned(info as *mut u32, 4); // Type = REG_DWORD
            core::ptr::write_unaligned(info.add(4) as *mut u32, 4); // DataLength
            core::ptr::write_unaligned(info.add(8) as *mut u32, DMA_STATUS_TRUE); // Data
        }
        log_verbose("[hook] DmaProtectionStatus emulated (NtQueryValueKey partial)");
        return 0; // STATUS_SUCCESS
    }
    if let Some(real_fn) = REAL_NT_QUERY_VALUE_KEY {
        real_fn(key, value_name, info_class, info, length, result_length)
    } else {
        0xC000_0002u32 as i32 // STATUS_NOT_IMPLEMENTED
    }
}

unsafe extern "system" fn hook_reg_close_key(hkey: *mut c_void) -> i32 {
    let _active = HookCallGuard::enter();
    let completed_iommu_check = take_dma_value_seen(hkey);
    if is_fake_key_handle(hkey) {
        forget_fake_key_handle(hkey);
    }
    let result = if let Some(real_fn) = REAL_REG_CLOSE_KEY {
        real_fn(hkey)
    } else {
        0
    };
    if completed_iommu_check {
        finish_iommu_check();
    }
    result
}

// ============================================================================
// NtQuerySystemInformation hook
// ============================================================================

#[inline(never)]
unsafe fn passthrough_nqsi(class: u32, buf: *mut c_void, len: u32, retlen: *mut u32) -> i32 {
    let num = REAL_SYSCALL_NQSI;
    let status: i32;
    asm!(
        "mov r10, rcx",
        "syscall",
        in("eax") num,
        inlateout("rcx") class as u64 => _,
        in("rdx") buf,
        in("r8") len as u64,
        in("r9") retlen,
        lateout("rax") status,
        lateout("r10") _,
        lateout("r11") _,
        options(nostack),
    );
    status
}

unsafe extern "system" fn hook_nqsi(
    class: u32,
    buf: *mut c_void,
    len: u32,
    retlen: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    if class == SYSTEM_KERNEL_DMA_PROTECTION_INFORMATION {
        log_msg("[hook] NtQuerySystemInformation(0x95 - IOMMU/DMA) intercepted -> SUCCESS");
        if !retlen.is_null() {
            core::ptr::write_unaligned(retlen, 2u32);
        }
        if len < 2 {
            return STATUS_INFO_LENGTH_MISMATCH;
        }
        if !buf.is_null() {
            let p = buf as *mut u8;
            core::ptr::write(p, 1u8);
            core::ptr::write(p.add(1), 1u8);
        }
        return STATUS_SUCCESS;
    }

    passthrough_nqsi(class, buf, len, retlen)
}

// ============================================================================
// Hook helpers
// ============================================================================

unsafe fn hook_stub_syscall(mod_name: &[u8], proc_name: &[u8], hook_fn: *const (), out_syscall: *mut u32) -> bool {
    let h_mod = GetModuleHandleA(mod_name.as_ptr());
    if h_mod.is_null() {
        return false;
    }
    hook_stub_syscall_at(h_mod, proc_name, hook_fn, out_syscall)
}

/// Same as hook_stub_syscall but on an explicit module handle (extra ntdll
/// copies loaded by the target).
unsafe fn hook_stub_syscall_at(h_mod: *mut c_void, proc_name: &[u8], hook_fn: *const (), out_syscall: *mut u32) -> bool {
    let addr = GetProcAddress(h_mod, proc_name.as_ptr());
    if addr.is_null() {
        return false;
    }
    let p = addr as *mut u8;

    // ntdll syscall stub: mov r10, rcx (4C 8B D1); mov eax, SSN (B8 ....)
    if core::ptr::read(p) != 0x4C
        || core::ptr::read(p.add(1)) != 0x8B
        || core::ptr::read(p.add(2)) != 0xD1
        || core::ptr::read(p.add(3)) != 0xB8
    {
        return false;
    }
    *out_syscall = core::ptr::read_unaligned(p.add(4) as *const u32);

    let mut old = 0u32;
    if VirtualProtect(addr, 16, PAGE_EXECUTE_READWRITE, &mut old) == 0 {
        return false;
    }
    if !remember_hook_patch(p) {
        let mut tmp = 0u32;
        VirtualProtect(addr, 16, old, &mut tmp);
        return false;
    }
    NQSI_PATCH_ADDR.store(p as usize, Ordering::Release);
    let tail: [u8; 4] = {
        let mut t = [0u8; 4];
        core::ptr::copy_nonoverlapping(p.add(12), t.as_mut_ptr(), 4);
        t
    };
    write_jmp_patch(p, hook_fn as usize as u64, &tail);

    let mut tmp = 0u32;
    VirtualProtect(addr, 16, old, &mut tmp);
    FlushInstructionCache(GetCurrentProcess(), addr as *const c_void, 16);
    true
}

/// Patch one export and return a trampoline for calling the original code.
/// `None` means the hook was NOT installed and must not be used.
unsafe fn hook_export_jmp(mod_name: &[u8], proc_name: &[u8], hook_fn: *const ()) -> Option<*mut c_void> {
    let mut h_mod = GetModuleHandleA(mod_name.as_ptr());
    if h_mod.is_null() {
        h_mod = LoadLibraryA(mod_name.as_ptr());
        if h_mod.is_null() {
            return None;
        }
    }
    hook_export_at(h_mod, proc_name, hook_fn)
}

/// Patch an export's entry DIRECTLY (no trampoline): write
/// `mov rax, hook; jmp rax` over the first 12 bytes. The hook must not call
/// the original through a trampoline. Returns true on success.
unsafe fn patch_entry_direct(h_mod: *mut c_void, proc_name: &[u8], hook_fn: *const ()) -> bool {
    let addr = GetProcAddress(h_mod, proc_name.as_ptr());
    if addr.is_null() {
        return false;
    }
    let p = resolve_export_target(addr as *mut u8);
    if is_hook_already_active(p) {
        return false;
    }
    let mut old = 0u32;
    if VirtualProtect(p as *mut c_void, 16, PAGE_EXECUTE_READWRITE, &mut old) == 0 {
        return false;
    }
    if !remember_hook_patch(p) {
        let mut tmp = 0u32;
        VirtualProtect(p as *mut c_void, 16, old, &mut tmp);
        return false;
    }
    let tail: [u8; 4] = {
        let mut t = [0u8; 4];
        core::ptr::copy_nonoverlapping(p.add(12), t.as_mut_ptr(), 4);
        t
    };
    write_jmp_patch(p, hook_fn as usize as u64, &tail);
    let mut tmp = 0u32;
    VirtualProtect(p as *mut c_void, 16, old, &mut tmp);
    FlushInstructionCache(GetCurrentProcess(), p as *const c_void, 16);
    true
}

/// Is this target already patched by us? Prevents duplicate trampolines when
/// the anti-debug installer runs repeatedly (late-loaded ntdll copies).
unsafe fn is_hook_already_active(addr: *mut u8) -> bool {
    let address = addr as usize;
    let patches = HOOK_PATCHES.lock().unwrap_or_else(|e| e.into_inner());
    patches.iter().any(|p| p.active && p.addr == address)
}

/// Patch one export on an explicit module handle and return a trampoline for
/// calling the original code. `None` = not installed / already hooked.
unsafe fn hook_export_at(h_mod: *mut c_void, proc_name: &[u8], hook_fn: *const ()) -> Option<*mut c_void> {
    let addr = GetProcAddress(h_mod, proc_name.as_ptr());
    if addr.is_null() {
        return None;
    }
    // Never patch a 6-byte jmp stub: follow it to the real implementation.
    let target = resolve_export_target(addr as *mut u8);
    if is_hook_already_active(target) {
        return None;
    }

    // Build the trampoline BEFORE patching, otherwise the hook has no safe way
    // to reach the original code (it would call the patched address and
    // recurse forever -> access violation).
    let trampoline = make_trampoline(target)?;

    let mut old = 0u32;
    if VirtualProtect(target as *mut c_void, 16, PAGE_EXECUTE_READWRITE, &mut old) == 0 {
        VirtualFree(trampoline, 0, MEM_RELEASE);
        return None;
    }
    if !remember_hook_patch(target) {
        let mut tmp = 0u32;
        VirtualProtect(target as *mut c_void, 16, old, &mut tmp);
        VirtualFree(trampoline, 0, MEM_RELEASE);
        return None;
    }
    let tail: [u8; 4] = {
        let mut t = [0u8; 4];
        core::ptr::copy_nonoverlapping(target.add(12), t.as_mut_ptr(), 4);
        t
    };
    write_jmp_patch(target, hook_fn as usize as u64, &tail);

    let mut tmp = 0u32;
    VirtualProtect(target as *mut c_void, 16, old, &mut tmp);
    FlushInstructionCache(GetCurrentProcess(), target as *const c_void, 16);
    if let Ok(mut tramps) = TRAMPOLINES.lock() {
        tramps.push(trampoline as usize);
    }
    let mut hex_t = String::new();
    let tb = core::slice::from_raw_parts(trampoline as *const u8, 32);
    for b in tb { hex_t.push_str(&format!("{:02X} ", b)); }
    let mut hex_p = String::new();
    let pb = core::slice::from_raw_parts(target, 16);
    for b in pb { hex_p.push_str(&format!("{:02X} ", b)); }
    log_msg(&format!(
        "[hook] {} hooked: target={:p} trampoline={:p} tramp=[{}] patched=[{}]",
        proc_name_str(proc_name), target as *const c_void, trampoline as *const c_void, hex_t, hex_p,
    ));
    Some(trampoline)
}

fn proc_name_str(proc_name: &[u8]) -> &str {
    let end = proc_name.iter().position(|&b| b == 0).unwrap_or(proc_name.len());
    core::str::from_utf8(&proc_name[..end]).unwrap_or("?")
}

// ============================================================================
// Anti-debug hooks (NtQueryInformationProcess / NtSetInformationThread /
// NtTerminateProcess / NtSetInformationProcess / RtlSetProcessIsCritical)
// ============================================================================

type FnNtQueryInformationProcess = unsafe extern "system" fn(*mut c_void, u32, *mut c_void, u32, *mut u32) -> i32;
type FnNtSetInformationThread = unsafe extern "system" fn(*mut c_void, u32, *mut c_void, u32) -> i32;
type FnNtTerminateProcess = unsafe extern "system" fn(*mut c_void, u32) -> i32;
type FnNtSetInformationProcess = unsafe extern "system" fn(*mut c_void, u32, *mut c_void, u32) -> i32;
type FnRtlSetProcessIsCritical = unsafe extern "system" fn(i32, *mut i32, i32) -> i32;

static mut REAL_NT_QUERY_INFORMATION_PROCESS: Option<FnNtQueryInformationProcess> = None;
static mut REAL_NT_SET_INFORMATION_THREAD: Option<FnNtSetInformationThread> = None;
static mut REAL_NT_TERMINATE_PROCESS: Option<FnNtTerminateProcess> = None;
static mut REAL_NT_SET_INFORMATION_PROCESS: Option<FnNtSetInformationProcess> = None;
static mut REAL_RTL_SET_PROCESS_IS_CRITICAL: Option<FnRtlSetProcessIsCritical> = None;

const PROCESS_DEBUG_PORT: u32 = 7;
const PROCESS_DEBUG_OBJECT_HANDLE: u32 = 0x1E;
const PROCESS_DEBUG_FLAGS: u32 = 0x1F;
const PROCESS_BREAK_ON_TERMINATION: u32 = 0x1D;
const THREAD_HIDE_FROM_DEBUGGER: u32 = 0x11;
const STATUS_PORT_NOT_SET: i32 = 0xC000_0353u32 as i32;

unsafe extern "system" fn hook_nt_query_information_process(
    handle: *mut c_void,
    class: u32,
    buf: *mut c_void,
    len: u32,
    ret_len: *mut u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    log_verbose(&format!("[hook] NtQueryInformationProcess class={}", class));
    match class {
        PROCESS_DEBUG_PORT => {
            if !buf.is_null() && len >= 8 {
                core::ptr::write_unaligned(buf as *mut usize, 0usize);
            }
            if !ret_len.is_null() {
                core::ptr::write_unaligned(ret_len, 8u32);
            }
            0 // not debugged
        }
        PROCESS_DEBUG_OBJECT_HANDLE => STATUS_PORT_NOT_SET, // no debug object
        PROCESS_DEBUG_FLAGS => {
            if !buf.is_null() && len >= 4 {
                core::ptr::write_unaligned(buf as *mut u32, 1); // 1 = no debugger
            }
            if !ret_len.is_null() {
                core::ptr::write_unaligned(ret_len, 4u32);
            }
            0
        }
        _ => match REAL_NT_QUERY_INFORMATION_PROCESS {
            Some(real_fn) => real_fn(handle, class, buf, len, ret_len),
            None => 0xC000_0001u32 as i32,
        },
    }
}

unsafe extern "system" fn hook_nt_set_information_thread(
    handle: *mut c_void,
    class: u32,
    buf: *mut c_void,
    len: u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    if class == THREAD_HIDE_FROM_DEBUGGER {
        log_verbose("[hook] NtSetInformationThread(ThreadHideFromDebugger) swallowed");
        return 0; // pretend it worked; the debugger keeps its visibility
    }
    match REAL_NT_SET_INFORMATION_THREAD {
        Some(real_fn) => real_fn(handle, class, buf, len),
        None => 0xC000_0001u32 as i32,
    }
}

unsafe extern "system" fn hook_nt_terminate_process(handle: *mut c_void, status: u32) -> i32 {
    let _active = HookCallGuard::enter();
    log_msg(&format!("[hook] NtTerminateProcess handle={:p} status={:#x}", handle, status));
    if handle.is_null() {
        // Kill-all-other-threads variant used as an anti-debug punishment:
        // swallow it so the process keeps running.
        log_msg("[hook] NtTerminateProcess(NULL) swallowed");
        return 0;
    }
    match REAL_NT_TERMINATE_PROCESS {
        Some(real_fn) => real_fn(handle, status),
        None => 0xC000_0001u32 as i32,
    }
}

unsafe extern "system" fn hook_nt_set_information_process(
    handle: *mut c_void,
    class: u32,
    buf: *mut c_void,
    len: u32,
) -> i32 {
    let _active = HookCallGuard::enter();
    if class == PROCESS_BREAK_ON_TERMINATION {
        log_verbose("[hook] NtSetInformationProcess(BreakOnTermination) swallowed");
        return 0;
    }
    match REAL_NT_SET_INFORMATION_PROCESS {
        Some(real_fn) => real_fn(handle, class, buf, len),
        None => 0xC000_0001u32 as i32,
    }
}

unsafe extern "system" fn hook_rtl_set_process_is_critical(new_value: i32, old_value: *mut i32, need_breaks: i32) -> i32 {
    let _active = HookCallGuard::enter();
    log_msg(&format!("[hook] RtlSetProcessIsCritical({}) swallowed", new_value));
    if !old_value.is_null() {
        core::ptr::write_unaligned(old_value, 0);
    }
    let _ = need_breaks;
    0 // pretend success; the process is never marked critical
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

/// Hook the anti-debug exports on one ntdll instance. Returns how many new
/// hooks were installed.
unsafe fn hook_anti_debug_module(h_mod: *mut c_void) -> usize {
    if h_mod.is_null() {
        return 0;
    }
    let mut n = 0usize;
    // NtQuerySystemInformation: the real ntdll is already patched by
    // hook_stub_syscall (dedup by address); extra copies get patched here.
    if hook_export_at(h_mod, b"NtQuerySystemInformation\0", hook_nqsi as *const ()).is_some() {
        let mut ssn = 0u32;
        let _ = hook_stub_syscall_at(h_mod, b"NtQuerySystemInformation\0", hook_nqsi as *const (), &mut ssn);
        n += 1;
    }
    if let Some(t) = hook_export_at(h_mod, b"NtQueryInformationProcess\0", hook_nt_query_information_process as *const ()) {
        REAL_NT_QUERY_INFORMATION_PROCESS = Some(core::mem::transmute(t));
        n += 1;
    }
    if let Some(t) = hook_export_at(h_mod, b"NtSetInformationThread\0", hook_nt_set_information_thread as *const ()) {
        REAL_NT_SET_INFORMATION_THREAD = Some(core::mem::transmute(t));
        n += 1;
    }
    if let Some(t) = hook_export_at(h_mod, b"NtTerminateProcess\0", hook_nt_terminate_process as *const ()) {
        REAL_NT_TERMINATE_PROCESS = Some(core::mem::transmute(t));
        n += 1;
    }
    if let Some(t) = hook_export_at(h_mod, b"NtSetInformationProcess\0", hook_nt_set_information_process as *const ()) {
        REAL_NT_SET_INFORMATION_PROCESS = Some(core::mem::transmute(t));
        n += 1;
    }
    if let Some(t) = hook_export_at(h_mod, b"RtlSetProcessIsCritical\0", hook_rtl_set_process_is_critical as *const ()) {
        REAL_RTL_SET_PROCESS_IS_CRITICAL = Some(core::mem::transmute(t));
        n += 1;
    }
    n
}

/// Hook the real ntdll plus every additional ntdll copy the target loaded
/// (the crackme maps its own so patched-API checks bypass the real one).
unsafe fn hook_anti_debug_all() {
    let real = GetModuleHandleA(b"ntdll.dll\0".as_ptr());
    hook_anti_debug_module(real);

    let k32 = GetModuleHandleA(b"kernel32.dll\0".as_ptr());
    if k32.is_null() {
        return;
    }
    let create_snap: FnCreateToolhelp32Snapshot =
        match core::mem::transmute::<*mut c_void, Option<FnCreateToolhelp32Snapshot>>(GetProcAddress(
            k32,
            b"CreateToolhelp32Snapshot\0".as_ptr(),
        )) {
            Some(f) => f,
            None => return,
        };
    let mod_first: unsafe extern "system" fn(*mut c_void, *mut ModuleEntry32W) -> i32 =
        match core::mem::transmute::<*mut c_void, Option<unsafe extern "system" fn(*mut c_void, *mut ModuleEntry32W) -> i32>>(
            GetProcAddress(k32, b"Module32FirstW\0".as_ptr()),
        ) {
            Some(f) => f,
            None => return,
        };
    let mod_next: unsafe extern "system" fn(*mut c_void, *mut ModuleEntry32W) -> i32 =
        match core::mem::transmute::<*mut c_void, Option<unsafe extern "system" fn(*mut c_void, *mut ModuleEntry32W) -> i32>>(
            GetProcAddress(k32, b"Module32NextW\0".as_ptr()),
        ) {
            Some(f) => f,
            None => return,
        };
    let snap = create_snap(0x0000_0008 /* TH32CS_SNAPMODULE */, GetCurrentProcessId());
    if snap.is_null() || snap as isize == -1 {
        return;
    }
    let mut entry = ModuleEntry32W {
        dw_size: core::mem::size_of::<ModuleEntry32W>() as u32,
        th32_module_id: 0,
        th32_process_id: 0,
        glbl_cnt_usage: 0,
        proc_cnt_usage: 0,
        mod_base_addr: core::ptr::null_mut(),
        mod_base_size: 0,
        h_module: core::ptr::null_mut(),
        sz_module: [0; 256],
        sz_exe_path: [0; 260],
    };
    if mod_first(snap, &mut entry) != 0 {
        loop {
            let mut name = String::new();
            for &c in entry.sz_module.iter() {
                if c == 0 {
                    break;
                }
                if let Some(ch) = char::from_u32(c as u32) {
                    name.push(ch);
                }
            }
            if name.eq_ignore_ascii_case("ntdll.dll") && entry.h_module != real {
                let hooked = hook_anti_debug_module(entry.h_module);
                if hooked > 0 {
                    log_msg(&format!(
                        "[hook] Extra ntdll copy at {:p} ({}): {} hooks installed",
                        entry.h_module as *const c_void, name, hooked
                    ));
                }
            }
            if mod_next(snap, &mut entry) == 0 {
                break;
            }
        }
    }
    CloseHandle(snap);
}


// ============================================================================
// String-compare / hash hooks (password-check tracing)
// ============================================================================

unsafe fn dump_buf(buf: *const u8, len: usize) -> String {
    if buf.is_null() || len == 0 || len > 256 {
        return String::new();
    }
    let sl = core::slice::from_raw_parts(buf, len);
    let printable = sl.iter().filter(|&&b| (0x20..0x7f).contains(&b) || b == b'\n' || b == b'\r' || b == b'\t').count();
    let mut out = String::new();
    if printable * 10 >= len * 9 {
        // mostly ascii text
        for &b in sl {
            if (0x20..0x7f).contains(&b) {
                out.push(b as char);
            } else if b == b'\n' {
                out.push_str("\\n");
            } else {
                out.push_str(&format!("\\x{:02X}", b));
            }
        }
    } else {
        for b in sl.iter().take(64) {
            out.push_str(&format!("{:02X}", b));
        }
        if len > 64 {
            out.push_str("...");
        }
    }
    out
}

unsafe fn log_compare(tag: &str, a: *const u8, b: *const u8, len: usize, extra: &str) {
    if a.is_null() || b.is_null() || len == 0 || len > 4096 {
        return;
    }
    let sa = dump_buf(a, len);
    let sb = dump_buf(b, len);
    if sa.is_empty() && sb.is_empty() {
        return;
    }
    log_msg(&format!("[cmp] {} len={} A='{}' B='{}' {}", tag, len, sa, sb, extra));
}

type FnRtlCompareMemory = unsafe extern "system" fn(*const c_void, *const c_void, usize) -> usize;
static mut REAL_RTL_COMPARE_MEMORY: Option<FnRtlCompareMemory> = None;

unsafe extern "system" fn hook_rtl_compare_memory(a: *const c_void, b: *const c_void, len: usize) -> usize {
    let _active = HookCallGuard::enter();
    if (4..=512).contains(&len) {
        log_compare("RtlCompareMemory", a as *const u8, b as *const u8, len, &format!("matched={}", {
            let f = REAL_RTL_COMPARE_MEMORY;
            match f {
                Some(f) => f(a, b, len),
                None => 0,
            }
        }));
        return {
            match REAL_RTL_COMPARE_MEMORY {
                Some(f) => f(a, b, len),
                None => 0,
            }
        };
    }
    match REAL_RTL_COMPARE_MEMORY {
        Some(f) => f(a, b, len),
        None => 0,
    }
}

#[repr(C)]
struct AnsiString {
    length: u16,
    max_length: u16,
    buffer: *mut u8,
}

type FnRtlEqualString = unsafe extern "system" fn(*mut AnsiString, *mut AnsiString, i32) -> u32;
static mut REAL_RTL_EQUAL_STRING: Option<FnRtlEqualString> = None;

unsafe extern "system" fn hook_rtl_equal_string(a: *mut AnsiString, b: *mut AnsiString, ci: i32) -> u32 {
    let _active = HookCallGuard::enter();
    if !a.is_null() && !b.is_null() {
        let la = (*a).length as usize;
        let lb = (*b).length as usize;
        if la > 0 && la <= 512 && lb > 0 && lb <= 512 {
            log_compare("RtlEqualString", (*a).buffer, (*b).buffer, la.max(lb), &format!("ci={} eq={}", ci, {
                match REAL_RTL_EQUAL_STRING {
                    Some(f) => f(a, b, ci),
                    None => 0,
                }
            }));
        }
    }
    match REAL_RTL_EQUAL_STRING {
        Some(f) => f(a, b, ci),
        None => 0,
    }
}

type FnRtlEqualUnicodeString = unsafe extern "system" fn(*mut UnicodeString, *mut UnicodeString, i32) -> u32;
static mut REAL_RTL_EQUAL_UNICODE_STRING: Option<FnRtlEqualUnicodeString> = None;

unsafe extern "system" fn hook_rtl_equal_unicode_string(a: *mut UnicodeString, b: *mut UnicodeString, ci: i32) -> u32 {
    let _active = HookCallGuard::enter();
    if !a.is_null() && !b.is_null() {
        let la = ((*a).length as usize) / 2;
        let lb = ((*b).length as usize) / 2;
        if la > 0 && la <= 512 && lb > 0 && lb <= 512 {
            // convert A to utf8-ish ascii
            let wa = core::slice::from_raw_parts((*a).buffer, la);
            let wb = core::slice::from_raw_parts((*b).buffer, lb);
            let sa: String = wa.iter().map(|&c| if c < 0x80 { c as u8 as char } else { '?' }).collect();
            let sb: String = wb.iter().map(|&c| if c < 0x80 { c as u8 as char } else { '?' }).collect();
            let eq = match REAL_RTL_EQUAL_UNICODE_STRING {
                Some(f) => f(a, b, ci),
                None => 0,
            };
            log_msg(&format!("[cmp] RtlEqualUnicodeString A='{}' B='{}' ci={} eq={}", sa, sb, ci, eq));
        }
    }
    match REAL_RTL_EQUAL_UNICODE_STRING {
        Some(f) => f(a, b, ci),
        None => 0,
    }
}

type FnCompareStringA = unsafe extern "system" fn(u32, u32, *const u8, i32, *const u8, i32) -> i32;
static mut REAL_COMPARE_STRING_A: Option<FnCompareStringA> = None;

unsafe extern "system" fn hook_compare_string_a(lcid: u32, flags: u32, s1: *const u8, c1: i32, s2: *const u8, c2: i32) -> i32 {
    let _active = HookCallGuard::enter();
    let l1 = if c1 == -1 { if s1.is_null() { 0 } else { strlen_safe(s1) } } else { c1.max(0) as usize };
    let l2 = if c2 == -1 { if s2.is_null() { 0 } else { strlen_safe(s2) } } else { c2.max(0) as usize };
    if (2..=512).contains(&l1) && (2..=512).contains(&l2) {
        let r = match REAL_COMPARE_STRING_A {
            Some(f) => f(lcid, flags, s1, c1, s2, c2),
            None => 0,
        };
        log_compare("CompareStringA", s1, s2, l1.max(l2), &format!("r={}", r));
        return r;
    }
    match REAL_COMPARE_STRING_A {
        Some(f) => f(lcid, flags, s1, c1, s2, c2),
        None => 0,
    }
}

unsafe fn strlen_safe(p: *const u8) -> usize {
    let mut n = 0usize;
    while n < 1024 && core::ptr::read(p.add(n)) != 0 {
        n += 1;
    }
    n
}

type FnCompareStringW = unsafe extern "system" fn(u32, u32, *const u16, i32, *const u16, i32) -> i32;
static mut REAL_COMPARE_STRING_W: Option<FnCompareStringW> = None;

unsafe extern "system" fn hook_compare_string_w(lcid: u32, flags: u32, s1: *const u16, c1: i32, s2: *const u16, c2: i32) -> i32 {
    let _active = HookCallGuard::enter();
    let l1 = if c1 == -1 { if s1.is_null() { 0 } else { strlenw_safe(s1) } } else { c1.max(0) as usize };
    let l2 = if c2 == -1 { if s2.is_null() { 0 } else { strlenw_safe(s2) } } else { c2.max(0) as usize };
    if (2..=512).contains(&l1) && (2..=512).contains(&l2) {
        let wa = core::slice::from_raw_parts(s1, l1);
        let wb = core::slice::from_raw_parts(s2, l2);
        let sa: String = wa.iter().map(|&c| if c < 0x80 { c as u8 as char } else { '?' }).collect();
        let sb: String = wb.iter().map(|&c| if c < 0x80 { c as u8 as char } else { '?' }).collect();
        let r = match REAL_COMPARE_STRING_W {
            Some(f) => f(lcid, flags, s1, c1, s2, c2),
            None => 0,
        };
        log_msg(&format!("[cmp] CompareStringW A='{}' B='{}' r={}", sa, sb, r));
        return r;
    }
    match REAL_COMPARE_STRING_W {
        Some(f) => f(lcid, flags, s1, c1, s2, c2),
        None => 0,
    }
}

unsafe fn strlenw_safe(p: *const u16) -> usize {
    let mut n = 0usize;
    while n < 1024 && core::ptr::read(p.add(n)) != 0 {
        n += 1;
    }
    n
}

type FnStrCmpA = unsafe extern "system" fn(*const u8, *const u8) -> i32;
static mut REAL_STRCMP_A: Option<FnStrCmpA> = None;

unsafe fn manual_strcmp(s1: *const u8, s2: *const u8) -> i32 {
    let mut i = 0usize;
    loop {
        let x = core::ptr::read_unaligned(s1.add(i));
        let y = core::ptr::read_unaligned(s2.add(i));
        if x != y {
            return x as i32 - y as i32;
        }
        if x == 0 {
            return 0;
        }
        i += 1;
    }
}

unsafe extern "system" fn hook_strcmp_a(s1: *const u8, s2: *const u8) -> i32 {
    let _active = HookCallGuard::enter();
    if !s1.is_null() && !s2.is_null() {
        let l1 = strlen_safe(s1);
        let l2 = strlen_safe(s2);
        if (2..=512).contains(&l1) && (2..=512).contains(&l2) {
            let r = match REAL_STRCMP_A {
                Some(f) => f(s1, s2),
                None => manual_strcmp(s1, s2),
            };
            if ACTIVE_HOOK_CALLS.load(Ordering::Acquire) <= 1 {
                log_compare("strcmp", s1, s2, l1.max(l2), &format!("r={}", r));
            }
            return r;
        }
    }
    match REAL_STRCMP_A {
        Some(f) => f(s1, s2),
        None => manual_strcmp(s1, s2),
    }
}

type FnMemCmp = unsafe extern "system" fn(*const c_void, *const c_void, usize) -> i32;
static mut REAL_MEMCMP: Option<FnMemCmp> = None;

unsafe fn manual_memcmp(a: *const u8, b: *const u8, n: usize) -> i32 {
    let mut i = 0usize;
    while i < n {
        let x = core::ptr::read_unaligned(a.add(i));
        let y = core::ptr::read_unaligned(b.add(i));
        if x != y {
            return x as i32 - y as i32;
        }
        i += 1;
    }
    0
}

unsafe fn is_typed_buffer(p: *const u8, n: usize) -> bool {
    let l = TYPED_LEN;
    if l == 0 || n < l {
        return false;
    }
    let mut i = 0usize;
    while i < l {
        if core::ptr::read_unaligned(p.add(i)) != TYPED_CHARS[i] {
            return false;
        }
        i += 1;
    }
    true
}

unsafe extern "system" fn hook_memcmp(a: *const c_void, b: *const c_void, n: usize) -> i32 {
    let _active = HookCallGuard::enter();
    let do_cmp = |a: *const c_void, b: *const c_void, n: usize| -> i32 {
        match REAL_MEMCMP {
            Some(f) => f(a, b, n),
            None => manual_memcmp(a as *const u8, b as *const u8, n),
        }
    };
    if (4..=512).contains(&n) {
        let typed_a = !a.is_null() && is_typed_buffer(a as *const u8, n);
        let typed_b = !b.is_null() && is_typed_buffer(b as *const u8, n);
        if typed_a || typed_b {
            static mut PW_PATCHED: bool = false;
            unsafe {
                if !PW_PATCHED {
                    // The server-side password for this session lives in the
                    // search buffer (starts with the stable 'yDJYYNBTnpFTU'
                    // marker). Find it and overwrite it with the typed text:
                    // the search then finds the typed text at that offset and
                    // the login passes naturally.
                    let search_a = a as usize;
                    let scan_len = 0x40000usize;
                    let mut buf = vec![0u8; scan_len];
                    let mut got = 0usize;
                    if ReadProcessMemory(
                        GetCurrentProcess(),
                        search_a as *const c_void,
                        buf.as_mut_ptr() as *mut c_void,
                        scan_len,
                        &mut got,
                    ) != 0
                        && got > 0
                    {
                        let marker = b"yDJYYNBTnpFTU";
                        let mut found: Option<usize> = None;
                        let mut field_len = 0usize;
                        let mut i = 0usize;
                        while i + marker.len() <= got {
                            if &buf[i..i + marker.len()] == marker {
                                // field = printable run starting at i
                                let mut j = i;
                                while j < got && (0x20..0x7f).contains(&buf[j]) {
                                    j += 1;
                                }
                                found = Some(i);
                                field_len = j - i;
                                break;
                            }
                            i += 1;
                        }
                        if let Some(off) = found {
                            let abs = search_a + off;
                            // save the real password for the user
                            let pw: String = buf[off..off + field_len].iter().map(|&c| c as char).collect();
                            log_msg(&format!(
                                "[autopass] session password at {:#x} len={} '{}'",
                                abs, field_len, pw
                            ));
                            let _ = std::fs::write(
                                "C:\\Users\\semae\\Downloads\\dumped\\PASSWORD.txt",
                                &pw,
                            );
                            // overwrite the field with the typed text
                            let l = TYPED_LEN;
                            if l > 0 {
                                let mut oldp = 0u32;
                                let p = abs as *mut u8;
                                if VirtualProtect(p as *mut c_void, 64, 0x40 /* RWX */, &mut oldp) != 0 {
                                    for k in 0..core::cmp::min(l, field_len) {
                                        core::ptr::write_unaligned(p.add(k), TYPED_CHARS[k]);
                                    }
                                    for k in core::cmp::min(l, field_len)..field_len {
                                        core::ptr::write_unaligned(p.add(k), 0);
                                    }
                                    let mut tmp = 0u32;
                                    VirtualProtect(p as *mut c_void, 64, oldp, &mut tmp);
                                    log_msg(&format!(
                                        "[autopass] field at {:#x} overwritten with typed text (len={})",
                                        abs, l
                                    ));
                                    PW_PATCHED = true;
                                    // let the search run NATURALLY: no forcing
                                    return do_cmp(a, b, n);
                                }
                            }
                        } else {
                            log_msg("[autopass] password marker not found in search range");
                        }
                    }
                    PW_PATCHED = true; // don't retry every call
                }
            }
            // Fallback: force every comparison that involves the typed text.
            static mut FORCED_COUNT: u32 = 0;
            unsafe {
                FORCED_COUNT += 1;
                if FORCED_COUNT <= 20 {
                    let da = if !a.is_null() { dump_buf(a as *const u8, core::cmp::min(n + 8, 64)) } else { String::new() };
                    let db = if !b.is_null() { dump_buf(b as *const u8, core::cmp::min(n + 8, 64)) } else { String::new() };
                    log_msg(&format!(
                        "[force] memcmp len={} forced=0 a={:p} b={:p} A='{}' B='{}'",
                        n, a, b, da, db
                    ));
                }
            }
            return 0;
        }
        let r = do_cmp(a, b, n);
        if ACTIVE_HOOK_CALLS.load(Ordering::Acquire) <= 1 && !(typed_a || typed_b) {
            // Only log text-like content: binary GUID/struct compares flood
            // the log without value.
            let sa = dump_buf(a as *const u8, n);
            if !sa.is_empty() && sa.bytes().filter(|&c| c.is_ascii_alphanumeric() || c == b' ' || c == b'_').count() * 2 >= sa.len() {
                log_compare("memcmp", a as *const u8, b as *const u8, n, &format!("r={}", r));
            }
        }
        return r;
    }
    do_cmp(a, b, n)
}

type FnCryptHashData = unsafe extern "system" fn(usize, *const u8, u32, u32) -> i32;
static mut REAL_CRYPT_HASH_DATA: Option<FnCryptHashData> = None;

unsafe extern "system" fn hook_crypt_hash_data(h: usize, data: *const u8, len: u32, flags: u32) -> i32 {
    let _active = HookCallGuard::enter();
    if !data.is_null() && len > 0 && len <= 512 {
        log_msg(&format!("[cmp] CryptHashData len={} data='{}'", len, dump_buf(data, len as usize)));
    }
    match REAL_CRYPT_HASH_DATA {
        Some(f) => f(h, data, len, flags),
        None => 0xC000_0001u32 as i32,
    }
}

type FnBCryptHashData = unsafe extern "system" fn(usize, *const u8, u32, u32) -> i32;
static mut REAL_BCRYPT_HASH_DATA: Option<FnBCryptHashData> = None;

unsafe extern "system" fn hook_bcrypt_hash_data(h: usize, data: *const u8, len: u32, flags: u32) -> i32 {
    let _active = HookCallGuard::enter();
    if !data.is_null() && len > 0 && len <= 512 {
        log_msg(&format!("[cmp] BCryptHashData len={} data='{}'", len, dump_buf(data, len as usize)));
    }
    match REAL_BCRYPT_HASH_DATA {
        Some(f) => f(h, data, len, flags),
        None => 0xC000_0001u32 as i32,
    }
}

unsafe fn hook_strcmp_set(h_mod: *mut c_void, tag: &str) {
    if h_mod.is_null() {
        return;
    }
    if patch_entry_direct(h_mod, b"memcmp\0", hook_memcmp as *const ()) {
        log_msg(&format!("[hook] memcmp hooked direct ({})", tag));
    }
    if patch_entry_direct(h_mod, b"strcmp\0", hook_strcmp_a as *const ()) {
        log_msg(&format!("[hook] strcmp hooked direct ({})", tag));
    }
}

unsafe fn install_compare_hooks() {
    let ntdll = GetModuleHandleA(b"ntdll.dll\0".as_ptr());
    if patch_entry_direct(ntdll, b"memcmp\0", hook_memcmp as *const ()) {
        // REAL_MEMCMP stays None: hook_memcmp compares manually, so no
        // trampoline is needed (memcmp's prologue has short jumps the
        // trampoline decoder cannot copy safely).
        log_msg("[hook] ntdll!memcmp hooked (direct patch)");
    }
    if let Some(t) = hook_export_at(ntdll, b"RtlCompareMemory\0", hook_rtl_compare_memory as *const ()) {
        REAL_RTL_COMPARE_MEMORY = Some(core::mem::transmute(t));
    }
    if let Some(t) = hook_export_at(ntdll, b"RtlEqualString\0", hook_rtl_equal_string as *const ()) {
        REAL_RTL_EQUAL_STRING = Some(core::mem::transmute(t));
    }
    if let Some(t) = hook_export_at(ntdll, b"RtlEqualUnicodeString\0", hook_rtl_equal_unicode_string as *const ()) {
        REAL_RTL_EQUAL_UNICODE_STRING = Some(core::mem::transmute(t));
    }
    let k32 = GetModuleHandleA(b"kernel32.dll\0".as_ptr());
    if let Some(t) = hook_export_at(k32, b"CompareStringA\0", hook_compare_string_a as *const ()) {
        REAL_COMPARE_STRING_A = Some(core::mem::transmute(t));
    }
    if let Some(t) = hook_export_at(k32, b"CompareStringW\0", hook_compare_string_w as *const ()) {
        REAL_COMPARE_STRING_W = Some(core::mem::transmute(t));
    }
    // CRT modules (whichever the target loaded)
    let ucrt = GetModuleHandleA(b"ucrtbase.dll\0".as_ptr());
    if ucrt.is_null() {
        let ucrt = LoadLibraryA(b"ucrtbase.dll\0".as_ptr());
        hook_strcmp_set(ucrt, "ucrtbase");
    } else {
        hook_strcmp_set(ucrt, "ucrtbase");
    }
    let msvcrt = GetModuleHandleA(b"msvcrt.dll\0".as_ptr());
    hook_strcmp_set(msvcrt, "msvcrt");
    // Sweep EVERY loaded module: any module exporting memcmp/strcmp gets the
    // direct patch (vcruntime140.dll, api-ms-win-crt-*, third-party CRTs...).
    // Dedup happens by implementation address.
    if let Some(create_snap) = core::mem::transmute::<*mut c_void, Option<FnCreateToolhelp32Snapshot>>(GetProcAddress(
        k32,
        b"CreateToolhelp32Snapshot\0".as_ptr(),
    )) {
        if let Some(mod_first) = core::mem::transmute::<*mut c_void, Option<unsafe extern "system" fn(*mut c_void, *mut ModuleEntry32W) -> i32>>(GetProcAddress(
            k32,
            b"Module32FirstW\0".as_ptr(),
        )) {
            if let Some(mod_next) = core::mem::transmute::<*mut c_void, Option<unsafe extern "system" fn(*mut c_void, *mut ModuleEntry32W) -> i32>>(GetProcAddress(
                k32,
                b"Module32NextW\0".as_ptr(),
            )) {
                let snap = create_snap(0x0000_0008, GetCurrentProcessId());
                if !snap.is_null() && snap as isize != -1 {
                    let mut entry = ModuleEntry32W {
                        dw_size: core::mem::size_of::<ModuleEntry32W>() as u32,
                        th32_module_id: 0,
                        th32_process_id: 0,
                        glbl_cnt_usage: 0,
                        proc_cnt_usage: 0,
                        mod_base_addr: core::ptr::null_mut(),
                        mod_base_size: 0,
                        h_module: core::ptr::null_mut(),
                        sz_module: [0; 256],
                        sz_exe_path: [0; 260],
                    };
                    if mod_first(snap, &mut entry) != 0 {
                        loop {
                            let mut name = String::new();
                            for &c in entry.sz_module.iter() {
                                if c == 0 {
                                    break;
                                }
                                if let Some(ch) = char::from_u32(c as u32) {
                                    name.push(ch);
                                }
                            }
                            hook_strcmp_set(entry.h_module, &name);
                            if mod_next(snap, &mut entry) == 0 {
                                break;
                            }
                        }
                    }
                    CloseHandle(snap);
                }
            }
        }
    }
    let adv = GetModuleHandleA(b"advapi32.dll\0".as_ptr());
    if let Some(t) = hook_export_at(adv, b"CryptHashData\0", hook_crypt_hash_data as *const ()) {
        REAL_CRYPT_HASH_DATA = Some(core::mem::transmute(t));
        log_msg("[hook] CryptHashData hooked");
    }
    let bcd = LoadLibraryA(b"bcrypt.dll\0".as_ptr());
    if let Some(t) = hook_export_at(bcd, b"BCryptHashData\0", hook_bcrypt_hash_data as *const ()) {
        REAL_BCRYPT_HASH_DATA = Some(core::mem::transmute(t));
        log_msg("[hook] BCryptHashData hooked");
    }
    log_msg("[hook] compare/hash hooks installed");
}


// ============================================================================
// Enter-key trigger + whole-memory string snapshot (password hunt)
// ============================================================================

#[repr(C)]
struct MSG {
    hwnd: *mut c_void,
    message: u32,
    _pad: u32,
    wparam: usize,
    lparam: isize,
    time: u32,
    pt_x: i32,
    pt_y: i32,
    _pad2: u32,
}

type FnGetMessageW = unsafe extern "system" fn(*mut MSG, *mut c_void, u32, u32) -> i32;
static mut REAL_GET_MESSAGE_W: Option<FnGetMessageW> = None;
type FnPeekMessageW = unsafe extern "system" fn(*mut MSG, *mut c_void, u32, u32, u32) -> i32;
static mut REAL_PEEK_MESSAGE_W: Option<FnPeekMessageW> = None;
static mut REAL_GET_MESSAGE_A: Option<FnGetMessageW> = None;
static mut REAL_PEEK_MESSAGE_A: Option<FnPeekMessageW> = None;

type FnIsDialogMessage = unsafe extern "system" fn(*mut c_void, *mut MSG) -> i32;
static mut REAL_IS_DIALOG_MESSAGE_W: Option<FnIsDialogMessage> = None;
static mut REAL_IS_DIALOG_MESSAGE_A: Option<FnIsDialogMessage> = None;

type FnGetAsyncKeyState = unsafe extern "system" fn(i32) -> i16;
static mut REAL_GET_ASYNC_KEY_STATE: Option<FnGetAsyncKeyState> = None;
static ASYNC_ENTER_SEEN: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);
type FnGetKeyState = unsafe extern "system" fn(i32) -> i16;
static mut REAL_GET_KEY_STATE: Option<FnGetKeyState> = None;
static KEYSTATE_ENTER_SEEN: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);

unsafe extern "system" fn hook_get_key_state(vk: i32) -> i16 {
    let r = match REAL_GET_KEY_STATE {
        Some(f) => f(vk),
        None => 0,
    };
    if vk == 0x0D && !KEYSTATE_ENTER_SEEN.swap(true, std::sync::atomic::Ordering::SeqCst) {
        log_msg("[msg] GetKeyState(VK_RETURN) polled");
    }
    r
}

unsafe extern "system" fn hook_is_dialog_message(hwnd: *mut c_void, msg: *mut MSG) -> i32 {
    if !msg.is_null() {
        let m = (*msg).message;
        let wp = (*msg).wparam;
        if m == 0x100 && wp == 0x0D {
            log_msg("[msg] ENTER via IsDialogMessage");
            spawn_string_scan();
        }
    }
    // W and A behave identically for our purposes; one real pointer is enough.
    let real = REAL_IS_DIALOG_MESSAGE_W.or(REAL_IS_DIALOG_MESSAGE_A);
    match real {
        Some(f) => f(hwnd, msg),
        None => 0,
    }
}

unsafe extern "system" fn hook_get_async_key_state(vk: i32) -> i16 {
    let r = match REAL_GET_ASYNC_KEY_STATE {
        Some(f) => f(vk),
        None => 0,
    };
    if vk == 0x0D && !ASYNC_ENTER_SEEN.swap(true, std::sync::atomic::Ordering::SeqCst) {
        log_msg("[msg] GetAsyncKeyState(VK_RETURN) polled");
    }
    r
}

static mut TYPED_CHARS: [u8; 64] = [0; 64];
static mut TYPED_LEN: usize = 0;
static SCAN_RUNNING: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);

unsafe fn note_typed_char(c: u8) {
    let l = TYPED_LEN;
    if l < 64 {
        TYPED_CHARS[l] = c;
        TYPED_LEN = l + 1;
    } else {
        // shift left, keep the last 64
        for i in 1..64 {
            TYPED_CHARS[i - 1] = TYPED_CHARS[i];
        }
        TYPED_CHARS[63] = c;
    }
}

unsafe fn typed_string() -> String {
    let l = TYPED_LEN;
    let mut out = String::new();
    for i in 0..l {
        let b = TYPED_CHARS[i];
        if (0x20..0x7f).contains(&b) {
            out.push(b as char);
        }
    }
    out
}

unsafe fn spawn_string_scan() {
    if SCAN_RUNNING.swap(true, std::sync::atomic::Ordering::SeqCst) {
        return;
    }
    let typed = typed_string();
    log_msg(&format!("[scan3] Enter detected (typed='{}'); scanning memory synchronously", typed));
    scan_strings_now(&typed, 15);
    SCAN_RUNNING.store(false, std::sync::atomic::Ordering::SeqCst);
}

/// Synchronous memory scan: find the typed password in memory (needle) and
/// log string-like runs in private memory.
unsafe fn scan_strings_now(typed: &str, seconds: u64) {
    let start = std::time::Instant::now();
    let deadline = start + std::time::Duration::from_secs(seconds);
    let needle = typed.as_bytes();
    let mut seen: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut logged = 0usize;
    let mut needle_hits = 0usize;
    let mut addr: usize = 0x10000;
    let mut info = [0u8; 56];
    while addr < 0x7FFE_FFFF_FFFF && std::time::Instant::now() < deadline {
        if VirtualQuery(addr as *const c_void, info.as_mut_ptr(), info.len()) == 0 {
            break;
        }
        let region_size = usize::from_ne_bytes(info[24..32].try_into().unwrap());
        if region_size == 0 {
            break;
        }
        let state = u32::from_ne_bytes(info[32..36].try_into().unwrap());
        let protect = u32::from_ne_bytes(info[36..40].try_into().unwrap());
        let mtype = u32::from_ne_bytes(info[40..44].try_into().unwrap());
        let next = match addr.checked_add(region_size) {
            Some(n) if n > addr => n,
            _ => break,
        };
        if state == 0x1000 && mtype == 0x20000 && (protect & 0x100) == 0 && matches!(protect & 0xFF, 0x04 | 0x40 | 0x08) {
            let mut off = 0usize;
            while off < region_size && std::time::Instant::now() < deadline {
                let chunk_len = core::cmp::min(0x400000usize, region_size - off);
                let p = (addr + off) as *const u8;
                if !p.is_null() {
                    // Read via ReadProcessMemory: guard pages (used by the VM
                    // obfuscator as control flow) raise an unhandled exception
                    // on direct reads and kill the process; RPM just fails.
                    let mut buf = vec![0u8; chunk_len];
                    let mut got_bytes = 0usize;
                    let ok = ReadProcessMemory(
                        GetCurrentProcess(),
                        p as *const c_void,
                        buf.as_mut_ptr() as *mut c_void,
                        chunk_len,
                        &mut got_bytes,
                    );
                    if ok == 0 || got_bytes == 0 {
                        off += chunk_len;
                        continue;
                    }
                    let sl = &buf[..got_bytes];
                    // needle search
                    if !needle.is_empty() && needle.len() >= 4 && needle_hits < 64 {
                        let mut idx = 0usize;
                        while idx + needle.len() <= sl.len() && needle_hits < 64 {
                            if sl[idx..idx + needle.len()] == *needle {
                                needle_hits += 1;
                                let abs = addr + off + idx;

                                let ctx_start = idx.saturating_sub(48);
                                let ctx_end = core::cmp::min(idx + needle.len() + 64, sl.len());
                                let mut hex = String::new();
                                let mut printable = 0usize;
                                for &b in &sl[ctx_start..ctx_end] {
                                    if (0x20..0x7f).contains(&b) {
                                        hex.push(b as char);
                                        printable += 1;
                                    } else {
                                        hex.push('.');
                                    }
                                }
                                let binary_ctx = printable * 4 < ctx_end - ctx_start;
                                unsafe {
                                    if binary_ctx && BINARY_HITS[0] == 0 {
                                        BINARY_HITS[0] = abs;
                                        log_msg(&format!("[scan3] BINARY needle at {:#x} ctx='{}'", abs, hex));
                                    } else if binary_ctx && BINARY_HITS[1] == 0 && abs > BINARY_HITS[0] + 0x1000 {
                                        BINARY_HITS[1] = abs;
                                        log_msg(&format!("[scan3] BINARY needle2 at {:#x} ctx='{}'", abs, hex));
                                    } else {
                                        log_msg(&format!("[scan3] NEEDLE at {:#x} ctx='{}'", abs, hex));
                                    }
                                }
                            }
                            idx += 1;
                        }
                    }
                    // string-like runs
                    let mut run_start = 0usize;
                    let mut i = 0usize;
                    while i < chunk_len {
                        let b = sl[i];
                        if (0x20..0x7f).contains(&b) {
                            if i - run_start >= 96 {
                                run_start = i;
                            }
                        } else {
                            let run_len = i - run_start;
                            if (8..=64).contains(&run_len) && logged < 60000 && seen.len() < 800000 {
                                let raw = &sl[run_start..i];
                                let alnum = raw.iter().filter(|&&c| c.is_ascii_alphanumeric()).count();
                                if alnum * 10 >= run_len * 6 {
                                    let txt: String = raw.iter().map(|&c| c as char).collect();
                                    if seen.insert(txt.clone()) {
                                        logged += 1;
                                        log_msg(&format!(
                                            "[str] {:p} '{}'",
                                            (addr + off + run_start) as *const c_void, txt
                                        ));
                                    }
                                }
                            }
                            run_start = i + 1;
                        }
                        i += 1;
                    }
                }
                off += chunk_len;
            }
        }
        addr = next;
    }
    // Hunt the session password marker (the server-side password lives in
    // VM memory starting with this stable prefix).
    let marker = b"yDJYYNBTnpFTU";
    let mut marker_hit: Option<(usize, String)> = None;
    {
        let mut addr2: usize = 0x10000;
        let mut info2 = [0u8; 56];
        let deadline2 = std::time::Instant::now() + std::time::Duration::from_secs(20);
        while addr2 < 0x7FFE_FFFF_FFFF && std::time::Instant::now() < deadline2 && marker_hit.is_none() {
            if VirtualQuery(addr2 as *const c_void, info2.as_mut_ptr(), info2.len()) == 0 {
                break;
            }
            let rsize = usize::from_ne_bytes(info2[24..32].try_into().unwrap());
            if rsize == 0 {
                break;
            }
            let state = u32::from_ne_bytes(info2[32..36].try_into().unwrap());
            let protect = u32::from_ne_bytes(info2[36..40].try_into().unwrap());
            let mtype = u32::from_ne_bytes(info2[40..44].try_into().unwrap());
            let next2 = match addr2.checked_add(rsize) {
                Some(n) if n > addr2 => n,
                _ => break,
            };
            if state == 0x1000 && mtype == 0x20000 && matches!(protect & 0xFF, 0x04 | 0x40) {
                let mut off2 = 0usize;
                while off2 < rsize && std::time::Instant::now() < deadline2 && marker_hit.is_none() {
                    let chunk2 = core::cmp::min(0x400000usize, rsize - off2);
                    let mut buf2 = vec![0u8; chunk2];
                    let mut got2 = 0usize;
                    if ReadProcessMemory(
                        GetCurrentProcess(),
                        (addr2 + off2) as *const c_void,
                        buf2.as_mut_ptr() as *mut c_void,
                        chunk2,
                        &mut got2,
                    ) != 0
                        && got2 > 0
                    {
                        let sl2 = &buf2[..got2];
                        let mut i2 = 0usize;
                        while i2 + marker.len() <= sl2.len() {
                            if &sl2[i2..i2 + marker.len()] == marker {
                                let mut j2 = i2;
                                while j2 < sl2.len() && (0x20..0x7f).contains(&sl2[j2]) {
                                    j2 += 1;
                                }
                                let field: String = sl2[i2..j2].iter().map(|&c| c as char).collect();
                                if field.len() >= marker.len() {
                                    marker_hit = Some((addr2 + off2 + i2, field.clone()));
                                    log_msg(&format!(
                                        "[marker] session password at {:#x} len={} '{}'",
                                        addr2 + off2 + i2,
                                        field.len(),
                                        field
                                    ));
                                    let _ = std::fs::write(
                                        "C:\\Users\\semae\\Downloads\\dumped\\PASSWORD.txt",
                                        &field,
                                    );
                                }
                                break;
                            }
                            i2 += 1;
                        }
                    }
                    off2 += chunk2;
                }
            }
            addr2 = next2;
        }
    }
    if marker_hit.is_none() {
        log_msg("[marker] session password NOT found in private memory");
    }
    log_msg(&format!(
        "[scan3] done: {} unique strings, {} needle hits, elapsed={:?}",
        logged,
        needle_hits,
        start.elapsed()
    ));
    // Arm the watchpoints on the VM's own input-copy region: needle hits with
    // BINARY context (not our text log buffers) are the VM's copies.
    unsafe {
        if BINARY_HITS[0] != 0 || BINARY_HITS[1] != 0 {
            arm_dr_watchpoints_all_threads(BINARY_HITS[0], BINARY_HITS[1]);
            arm_dr_watchpoints(BINARY_HITS[0], BINARY_HITS[1]);
        }
    }
}

unsafe extern "system" fn hook_get_message_w(msg: *mut MSG, hwnd: *mut c_void, min: u32, max: u32) -> i32 {
    let r = match REAL_GET_MESSAGE_W {
        Some(f) => f(msg, hwnd, min, max),
        None => 0,
    };
    if r != 0 && !msg.is_null() {
        let m = (*msg).message;
        let wp = (*msg).wparam;
        match m {
            0x102 => {
                if (0x20..0x7f).contains(&(wp as u8)) {
                    note_typed_char(wp as u8);
                }
            }
            0x100 => {
                if wp == 0x0D {
                    log_msg("[msg] WM_KEYDOWN ENTER (GetMessageW)");
                    spawn_string_scan();
                }
            }
            0x00FF => log_msg(&format!("[msg] WM_INPUT (GetMessageW)")),
            _ => {}
        }
    }
    r
}

unsafe extern "system" fn hook_peek_message_w(msg: *mut MSG, hwnd: *mut c_void, min: u32, max: u32, remove: u32) -> i32 {
    let r = match REAL_PEEK_MESSAGE_W {
        Some(f) => f(msg, hwnd, min, max, remove),
        None => 0,
    };
    if r != 0 && !msg.is_null() {
        let m = (*msg).message;
        let wp = (*msg).wparam;
        match m {
            0x102 => {
                if (0x20..0x7f).contains(&(wp as u8)) {
                    note_typed_char(wp as u8);
                }
            }
            0x100 => {
                if wp == 0x0D {
                    log_msg("[msg] WM_KEYDOWN ENTER (GetMessageW)");
                    spawn_string_scan();
                }
            }
            0x00FF => log_msg(&format!("[msg] WM_INPUT (PeekMessageW)")),
            _ => {}
        }
    }
    r
}

// MessageBox hook: log text + caller return address (fail-path tracer)
type FnMessageBoxW = unsafe extern "system" fn(*mut c_void, *const u16, *const u16, u32) -> i32;
static mut REAL_MESSAGE_BOX_W: Option<FnMessageBoxW> = None;
type FnMessageBoxA = unsafe extern "system" fn(*mut c_void, *const u8, *const u8, u32) -> i32;
static mut REAL_MESSAGE_BOX_A: Option<FnMessageBoxA> = None;

fn wstr_to_string(p: *const u16) -> String {
    if p.is_null() {
        return String::new();
    }
    unsafe {
        let mut i = 0usize;
        let mut out = String::new();
        while i < 512 {
            let c = core::ptr::read(p.add(i));
            if c == 0 {
                break;
            }
            if c < 0x80 {
                out.push(c as u8 as char);
            } else {
                out.push('?');
            }
            i += 1;
        }
        out
    }
}

fn cstr_to_string(p: *const u8) -> String {
    if p.is_null() {
        return String::new();
    }
    unsafe {
        let mut i = 0usize;
        let mut out = String::new();
        while i < 512 {
            let c = core::ptr::read(p.add(i));
            if c == 0 {
                break;
            }
            if (0x20..0x7f).contains(&c) {
                out.push(c as char);
            } else {
                out.push('?');
            }
            i += 1;
        }
        out
    }
}

/// Find the caller's return address: scan the current stack upwards for the
/// first value that points into an executable image module.
unsafe fn find_caller_ret() -> usize {
    let rsp: usize;
    core::arch::asm!("mov {}, rsp", out(reg) rsp, options(nomem, nostack, pure));
    let mut info = [0u8; 56];
    for off in (0..0x300).step_by(8) {
        let v = core::ptr::read_unaligned((rsp + off) as *const usize);
        if v == 0 || v < 0x10000 {
            continue;
        }
        if VirtualQuery(v as *const c_void, info.as_mut_ptr(), info.len()) != 0 {
            let mtype = u32::from_ne_bytes(info[40..44].try_into().unwrap());
            if mtype == 0x1000000 {
                // MEM_IMAGE
                let base = usize::from_ne_bytes(info[8..16].try_into().unwrap());
                log_msg(&format!(
                    "[mb] caller: ret={:#x} module_base={:#x} rva={:#x} (rsp+{:#x})",
                    v,
                    base,
                    v.wrapping_sub(base),
                    off
                ));
                let start = (v as *const u8).wrapping_sub(32);
                let mut hex = String::new();
                for b in core::slice::from_raw_parts(start, 48) {
                    hex.push_str(&format!("{:02X} ", b));
                }
                log_msg(&format!("[mb] code@ret-32..+16: {}", hex));
                return v;
            }
        }
    }
    log_msg("[mb] caller: no image-mapped return address found on stack");
    0
}

unsafe fn log_ret_context(_ret: *const u8) {
    find_caller_ret();
}

unsafe extern "system" fn hook_message_box_w(hwnd: *mut c_void, text: *const u16, caption: *const u16, ty: u32) -> i32 {
    let _active = HookCallGuard::enter();
    let t = wstr_to_string(text);
    let c = wstr_to_string(caption);
    log_ret_address_then_log(&t, &c, ty);
    match REAL_MESSAGE_BOX_W {
        Some(f) => f(hwnd, text, caption, ty),
        None => 0,
    }
}

unsafe fn log_ret_address_then_log(text: &str, caption: &str, ty: u32) {
    log_msg(&format!("[mb] MessageBoxW text='{}' caption='{}' type={:#x}", text, caption, ty));
    find_caller_ret();
}

unsafe extern "system" fn hook_message_box_a(hwnd: *mut c_void, text: *const u8, caption: *const u8, ty: u32) -> i32 {
    let _active = HookCallGuard::enter();
    let t = cstr_to_string(text);
    let c = cstr_to_string(caption);
    log_msg(&format!("[mb] MessageBoxA text='{}' caption='{}' type={:#x}", t, c, ty));
    find_caller_ret();
    match REAL_MESSAGE_BOX_A {
        Some(f) => f(hwnd, text, caption, ty),
        None => 0,
    }
}


type FnGetClipboardData = unsafe extern "system" fn(u32) -> usize;
static mut REAL_GET_CLIPBOARD_DATA: Option<FnGetClipboardData> = None;

unsafe extern "system" fn hook_get_clipboard_data(fmt: u32) -> usize {
    let r = match REAL_GET_CLIPBOARD_DATA {
        Some(f) => f(fmt),
        None => 0,
    };
    if fmt == 13 && r != 0 {
        // CF_UNICODETEXT
        // dump the raw clipboard bytes and arm a watchpoint on the buffer so
        // we catch whoever reads/transforms it
        let mut rawhex = String::new();
        for i in 0..64usize {
            let b = core::ptr::read((r as *const u8).add(i));
            if (0x20..0x7f).contains(&b) {
                rawhex.push(b as char);
            } else {
                rawhex.push('.');
            }
        }
        log_msg(&format!("[clip] raw@{:#x} '{}'", r, rawhex));
        let mut t = String::new();
        let mut i = 0usize;
        let p = r as *const u16;
        while i < 256 {
            let c = core::ptr::read(p.add(i));
            if c == 0 {
                break;
            }
            if c < 0x80 {
                t.push(c as u8 as char);
            } else {
                t.push('?');
            }
            i += 1;
        }
        log_msg(&format!("[clip] pasted='{}'", t));
        // store into TYPED_CHARS so the Enter-needle scan uses it
        let bytes = t.as_bytes();
        core::ptr::write_bytes(TYPED_CHARS.as_mut_ptr(), 0, 64);
        let n = core::cmp::min(bytes.len(), 64);
        core::ptr::copy_nonoverlapping(bytes.as_ptr(), TYPED_CHARS.as_mut_ptr(), n);
        TYPED_LEN = n;
    }
    r
}


type FnGetThreadContext = unsafe extern "system" fn(*mut c_void, *mut u8) -> i32;
static mut REAL_GET_THREAD_CONTEXT: Option<FnGetThreadContext> = None;
static mut REAL_NT_GET_CONTEXT_THREAD: Option<FnGetThreadContext> = None;

unsafe fn zero_context_drs(ctx: *mut u8) {
    if ctx.is_null() {
        return;
    }
    let flags = core::ptr::read_unaligned(ctx.add(0x30) as *const u32);
    if flags & 0x0010_0010 != 0 {
        for off in [0x48usize, 0x50, 0x58, 0x60, 0x68, 0x70] {
            core::ptr::write_unaligned(ctx.add(off) as *mut u64, 0);
        }
    }
}

unsafe extern "system" fn hook_get_thread_context(h: *mut c_void, ctx: *mut u8) -> i32 {
    let _active = HookCallGuard::enter();
    let r = match REAL_GET_THREAD_CONTEXT {
        Some(f) => f(h, ctx),
        None => 0,
    };
    if r != 0 {
        zero_context_drs(ctx);
        log_verbose("[anti] GetThreadContext: debug registers zeroed");
    }
    r
}

unsafe extern "system" fn hook_nt_get_context_thread(h: *mut c_void, ctx: *mut u8) -> i32 {
    let _active = HookCallGuard::enter();
    let r = match REAL_NT_GET_CONTEXT_THREAD {
        Some(f) => f(h, ctx),
        None => 0,
    };
    if r != 0 {
        zero_context_drs(ctx);
        log_verbose("[anti] NtGetContextThread: debug registers zeroed");
    }
    r
}

static VM_POOL_DUMPED: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);

/// The crackme loads with ASLR disabled: its VM data pool sits at a fixed
/// range every run. The login search looks for a 64-byte text+zero field in
/// that pool, so dump every such field: the valid password is one of them.
unsafe fn dump_vm_pool_fields() {
    if VM_POOL_DUMPED.swap(true, std::sync::atomic::Ordering::SeqCst) {
        return;
    }
    let base: usize = 0x216ED370000;
    let end: usize = 0x216F4000000;
    let mut logged = 0usize;
    let mut off = 0usize;
    let total = end - base;
    while off < total && logged < 400 {
        let chunk = core::cmp::min(0x800000usize, total - off);
        let mut buf = vec![0u8; chunk];
        let mut got = 0usize;
        if ReadProcessMemory(
            GetCurrentProcess(),
            (base + off) as *const c_void,
            buf.as_mut_ptr() as *mut c_void,
            chunk,
            &mut got,
        ) == 0
            || got == 0
        {
            off += chunk;
            continue;
        }
        let sl = &buf[..got];
        let mut i = 0usize;
        let mut run_start = 0usize;
        while i < got && logged < 400 {
            let c = sl[i];
            if !(0x20..0x7f).contains(&c) {
                let run_len = i - run_start;
                if (6..=64).contains(&run_len) {
                    let zeros_needed = 64 - run_len;
                    let mut zeros = 0usize;
                    while zeros < zeros_needed && run_start + run_len + zeros < got && sl[run_start + run_len + zeros] == 0 {
                        zeros += 1;
                    }
                    if zeros >= zeros_needed {
                        let txt: String = sl[run_start..run_start + run_len].iter().map(|&b| b as char).collect();
                        let abs = base + off + run_start;
                        log_msg(&format!("[vmpool] {:#x} '{}'", abs, txt));
                        logged += 1;
                    }
                }
                run_start = i + 1;
            } else if i - run_start > 64 {
                run_start = i;
            }
            i += 1;
        }
        off += chunk;
    }
    log_msg(&format!("[vmpool] done: {} text+zero fields in VM pool", logged));
}

unsafe fn install_message_and_box_hooks() {
    let user32 = LoadLibraryA(b"user32.dll\0".as_ptr());
    if let Some(t) = hook_export_at(user32, b"MessageBoxW\0", hook_message_box_w as *const ()) {
        REAL_MESSAGE_BOX_W = Some(core::mem::transmute(t));
    }
    if let Some(t) = hook_export_at(user32, b"MessageBoxA\0", hook_message_box_a as *const ()) {
        REAL_MESSAGE_BOX_A = Some(core::mem::transmute(t));
    }
    let k32mod = GetModuleHandleA(b"kernel32.dll\0".as_ptr());
    if let Some(t) = hook_export_at(k32mod, b"GetThreadContext\0", hook_get_thread_context as *const ()) {
        REAL_GET_THREAD_CONTEXT = Some(core::mem::transmute(t));
        log_msg("[hook] GetThreadContext hooked");
    }
    let ntdll2 = GetModuleHandleA(b"ntdll.dll\0".as_ptr());
    if let Some(t) = hook_export_at(ntdll2, b"NtGetContextThread\0", hook_nt_get_context_thread as *const ()) {
        REAL_NT_GET_CONTEXT_THREAD = Some(core::mem::transmute(t));
        log_msg("[hook] NtGetContextThread hooked");
    }
    if let Some(t) = hook_export_at(user32, b"GetClipboardData\0", hook_get_clipboard_data as *const ()) {
        REAL_GET_CLIPBOARD_DATA = Some(core::mem::transmute(t));
        log_msg("[hook] GetClipboardData hooked");
    }
    if let Some(t) = hook_export_at(user32, b"GetMessageW\0", hook_get_message_w as *const ()) {
        REAL_GET_MESSAGE_W = Some(core::mem::transmute(t));
        log_msg("[hook] GetMessageW hooked");
    }
    if let Some(t) = hook_export_at(user32, b"PeekMessageW\0", hook_peek_message_w as *const ()) {
        REAL_PEEK_MESSAGE_W = Some(core::mem::transmute(t));
        log_msg("[hook] PeekMessageW hooked");
    }
    if let Some(t) = hook_export_at(user32, b"IsDialogMessageW\0", hook_is_dialog_message as *const ()) {
        REAL_IS_DIALOG_MESSAGE_W = Some(core::mem::transmute(t));
        log_msg("[hook] IsDialogMessageW hooked");
    }
    if let Some(t) = hook_export_at(user32, b"IsDialogMessageA\0", hook_is_dialog_message as *const ()) {
        REAL_IS_DIALOG_MESSAGE_A = Some(core::mem::transmute(t));
        log_msg("[hook] IsDialogMessageA hooked");
    }
    if let Some(t) = hook_export_at(user32, b"GetKeyState\0", hook_get_key_state as *const ()) {
        REAL_GET_KEY_STATE = Some(core::mem::transmute(t));
        log_msg("[hook] GetKeyState hooked");
    }
    if let Some(t) = hook_export_at(user32, b"GetAsyncKeyState\0", hook_get_async_key_state as *const ()) {
        REAL_GET_ASYNC_KEY_STATE = Some(core::mem::transmute(t));
        log_msg("[hook] GetAsyncKeyState hooked");
    }
    if let Some(t) = hook_export_at(user32, b"GetMessageA\0", hook_get_message_w as *const ()) {
        REAL_GET_MESSAGE_A = Some(core::mem::transmute(t));
        log_msg("[hook] GetMessageA hooked");
    }
    if let Some(t) = hook_export_at(user32, b"PeekMessageA\0", hook_peek_message_w as *const ()) {
        REAL_PEEK_MESSAGE_A = Some(core::mem::transmute(t));
        log_msg("[hook] PeekMessageA hooked");
    }
    log_msg("[hook] message/messagebox hooks installed");
}


// ============================================================================
// Network hooks (server-side login): log + fake the auth response
// ============================================================================

static mut NET_FAKE_READY: bool = false; // set once we've seen a real response

type FnSend = unsafe extern "system" fn(usize, *const u8, i32, i32) -> i32;
static mut REAL_SEND: Option<FnSend> = None;
type FnRecv = unsafe extern "system" fn(usize, *mut u8, i32, i32) -> i32;
static mut REAL_RECV: Option<FnRecv> = None;

#[repr(C)]
struct WsaBuf {
    len: u32,
    buf: *mut u8,
}
type FnWsaSend = unsafe extern "system" fn(usize, *mut WsaBuf, u32, *mut u32, u32, *mut c_void, *mut c_void) -> i32;
static mut REAL_WSA_SEND: Option<FnWsaSend> = None;
type FnWsaRecv = unsafe extern "system" fn(usize, *mut WsaBuf, u32, *mut u32, *mut u32, *mut c_void, *mut c_void) -> i32;
static mut REAL_WSA_RECV: Option<FnWsaRecv> = None;

type FnWinHttpSendRequest = unsafe extern "system" fn(usize, *const u16, u32, *const u8, u32, u32, usize) -> i32;
static mut REAL_WINHTTP_SEND_REQUEST: Option<FnWinHttpSendRequest> = None;
type FnWinHttpReadData = unsafe extern "system" fn(usize, *mut u8, u32, *mut u32) -> i32;
static mut REAL_WINHTTP_READ_DATA: Option<FnWinHttpReadData> = None;

type FnHttpSendRequestA = unsafe extern "system" fn(usize, *const u8, u32, *const u8, u32) -> i32;
static mut REAL_HTTP_SEND_REQUEST_A: Option<FnHttpSendRequestA> = None;
type FnHttpSendRequestW = unsafe extern "system" fn(usize, *const u16, u32, *const u8, u32) -> i32;
static mut REAL_HTTP_SEND_REQUEST_W: Option<FnHttpSendRequestW> = None;
type FnInternetReadFile = unsafe extern "system" fn(usize, *mut u8, u32, *mut u32) -> i32;
static mut REAL_INTERNET_READ_FILE: Option<FnInternetReadFile> = None;

unsafe extern "system" fn hook_send(sock: usize, buf: *const u8, len: i32, flags: i32) -> i32 {
    let _active = HookCallGuard::enter();
    if len > 0 && len <= 4096 {
        log_msg(&format!("[net] send len={} data='{}'", len, dump_buf(buf, len as usize)));
    }
    match REAL_SEND {
        Some(f) => f(sock, buf, len, flags),
        None => -1,
    }
}

unsafe extern "system" fn hook_recv(sock: usize, buf: *mut u8, len: i32, flags: i32) -> i32 {
    let _active = HookCallGuard::enter();
    let r = match REAL_RECV {
        Some(f) => f(sock, buf, len, flags),
        None => -1,
    };
    if r > 0 && (r as usize) <= 4096 {
        let data = dump_buf(buf, r as usize);
        log_msg(&format!("[net] recv len={} data='{}'", r, data));
    }
    r
}

unsafe extern "system" fn hook_wsa_send(sock: usize, bufs: *mut WsaBuf, count: u32, sent: *mut u32, flags: u32, ov: *mut c_void, cr: *mut c_void) -> i32 {
    let _active = HookCallGuard::enter();
    if !bufs.is_null() && count > 0 {
        let b = &*bufs;
        if b.len > 0 && b.len <= 4096 && !b.buf.is_null() {
            log_msg(&format!("[net] WSASend len={} data='{}'", b.len, dump_buf(b.buf, b.len as usize)));
        }
    }
    match REAL_WSA_SEND {
        Some(f) => f(sock, bufs, count, sent, flags, ov, cr),
        None => -1,
    }
}

unsafe extern "system" fn hook_wsa_recv(sock: usize, bufs: *mut WsaBuf, count: u32, recvd: *mut u32, flags: *mut u32, ov: *mut c_void, cr: *mut c_void) -> i32 {
    let _active = HookCallGuard::enter();
    let r = match REAL_WSA_RECV {
        Some(f) => f(sock, bufs, count, recvd, flags, ov, cr),
        None => -1,
    };
    if !bufs.is_null() && count > 0 {
        let b = &*bufs;
        let n = if !recvd.is_null() { core::ptr::read_unaligned(recvd) } else { 0 };
        if n > 0 && n <= 4096 && !b.buf.is_null() {
            log_msg(&format!("[net] WSARecv len={} data='{}'", n, dump_buf(b.buf, n as usize)));
        }
    }
    r
}

unsafe extern "system" fn hook_winhttp_send_request(h: usize, headers: *const u16, hlen: u32, optional: *const u8, olen: u32, total: u32, ctx: usize) -> i32 {
    let _active = HookCallGuard::enter();
    if !optional.is_null() && olen > 0 && olen <= 8192 {
        log_msg(&format!("[net] WinHttpSendRequest body len={} data='{}'", olen, dump_buf(optional, olen as usize)));
    }
    match REAL_WINHTTP_SEND_REQUEST {
        Some(f) => f(h, headers, hlen, optional, olen, total, ctx),
        None => 0,
    }
}

unsafe extern "system" fn hook_winhttp_read_data(h: usize, buf: *mut u8, to_read: u32, read: *mut u32) -> i32 {
    let _active = HookCallGuard::enter();
    let r = match REAL_WINHTTP_READ_DATA {
        Some(f) => f(h, buf, to_read, read),
        None => 0,
    };
    if r != 0 && !read.is_null() {
        let n = core::ptr::read_unaligned(read);
        if n > 0 && n <= 8192 && !buf.is_null() {
            let data = dump_buf(buf, n as usize);
            log_msg(&format!("[net] WinHttpReadData len={} data='{}'", n, data));
            NET_FAKE_READY = true;
        }
    }
    r
}

unsafe extern "system" fn hook_http_send_request_a(h: usize, headers: *const u8, hlen: u32, optional: *const u8, olen: u32) -> i32 {
    let _active = HookCallGuard::enter();
    if !optional.is_null() && olen > 0 && olen <= 8192 {
        log_msg(&format!("[net] HttpSendRequestA body len={} data='{}'", olen, dump_buf(optional, olen as usize)));
    }
    match REAL_HTTP_SEND_REQUEST_A {
        Some(f) => f(h, headers, hlen, optional, olen),
        None => 0,
    }
}

unsafe extern "system" fn hook_http_send_request_w(h: usize, headers: *const u16, hlen: u32, optional: *const u8, olen: u32) -> i32 {
    let _active = HookCallGuard::enter();
    if !optional.is_null() && olen > 0 && olen <= 8192 {
        log_msg(&format!("[net] HttpSendRequestW body len={} data='{}'", olen, dump_buf(optional, olen as usize)));
    }
    match REAL_HTTP_SEND_REQUEST_W {
        Some(f) => f(h, headers, hlen, optional, olen),
        None => 0,
    }
}

unsafe extern "system" fn hook_internet_read_file(h: usize, buf: *mut u8, to_read: u32, read: *mut u32) -> i32 {
    let _active = HookCallGuard::enter();
    let r = match REAL_INTERNET_READ_FILE {
        Some(f) => f(h, buf, to_read, read),
        None => 0,
    };
    if r != 0 && !read.is_null() {
        let n = core::ptr::read_unaligned(read);
        if n > 0 && n <= 8192 && !buf.is_null() {
            let data = dump_buf(buf, n as usize);
            log_msg(&format!("[net] InternetReadFile len={} data='{}'", n, data));
        }
    }
    r
}

unsafe fn install_network_hooks() {
    let ws2 = LoadLibraryA(b"ws2_32.dll\0".as_ptr());
    if !ws2.is_null() {
        if patch_entry_direct(ws2, b"send\0", hook_send as *const ()) {
            log_msg("[hook] ws2_32!send hooked");
        }
        if patch_entry_direct(ws2, b"recv\0", hook_recv as *const ()) {
            log_msg("[hook] ws2_32!recv hooked");
        }
        if patch_entry_direct(ws2, b"WSASend\0", hook_wsa_send as *const ()) {
            log_msg("[hook] ws2_32!WSASend hooked");
        }
        if patch_entry_direct(ws2, b"WSARecv\0", hook_wsa_recv as *const ()) {
            log_msg("[hook] ws2_32!WSARecv hooked");
        }
    }
    let whttp = LoadLibraryA(b"winhttp.dll\0".as_ptr());
    if !whttp.is_null() {
        if patch_entry_direct(whttp, b"WinHttpSendRequest\0", hook_winhttp_send_request as *const ()) {
            log_msg("[hook] winhttp!WinHttpSendRequest hooked");
        }
        if patch_entry_direct(whttp, b"WinHttpReadData\0", hook_winhttp_read_data as *const ()) {
            log_msg("[hook] winhttp!WinHttpReadData hooked");
        }
    }
    let winet = LoadLibraryA(b"wininet.dll\0".as_ptr());
    if !winet.is_null() {
        if patch_entry_direct(winet, b"HttpSendRequestA\0", hook_http_send_request_a as *const ()) {
            log_msg("[hook] wininet!HttpSendRequestA hooked");
        }
        if patch_entry_direct(winet, b"HttpSendRequestW\0", hook_http_send_request_w as *const ()) {
            log_msg("[hook] wininet!HttpSendRequestW hooked");
        }
        if patch_entry_direct(winet, b"InternetReadFile\0", hook_internet_read_file as *const ()) {
            log_msg("[hook] wininet!InternetReadFile hooked");
        }
    }
    log_msg("[hook] network hooks installed");
}

unsafe fn install_all() {
    log_msg("[hook] === IOMMU/DMA hook initialized ===");
    // VEH DISABLED (experiment): the crackme's obfuscator raises exceptions
    // with custom parameters as control flow and appears to scan/depend on
    // the VEH chain; our first-position handler correlates with the fatal
    // crash right after the DMA check.
    install_veh();
    init_real_registry_ptrs();
    let installed = hook_stub_syscall(
        b"ntdll.dll\0",
        b"NtQuerySystemInformation\0",
        hook_nqsi as *const (),
        &raw mut REAL_SYSCALL_NQSI,
    );
    if !installed {
        log_msg("[hook] Failed to install NtQuerySystemInformation IOMMU hook");
    }
    // Registry hooks: point REAL_* at trampolines. Calling the patched address
    // directly (advapi32 exports resolve to the same KernelBase address we
    // patch) re-entered the hook and crashed the process.
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegOpenKeyExW\0", hook_reg_open_key_ex_w as *const ()) {
        REAL_REG_OPEN_KEY_EX_W = Some(core::mem::transmute(tramp));
        log_verbose(&format!("[hook] RegOpenKeyExW hooked (trampoline @ {:p})", tramp));
    } else {
        log_msg("[hook] RegOpenKeyExW hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegOpenKeyExA\0", hook_reg_open_key_ex_a as *const ()) {
        REAL_REG_OPEN_KEY_EX_A = Some(core::mem::transmute(tramp));
    } else {
        log_msg("[hook] RegOpenKeyExA hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegQueryValueExW\0", hook_reg_query_value_ex_w as *const ()) {
        REAL_REG_QUERY_VALUE_EX_W = Some(core::mem::transmute(tramp));
    } else {
        log_msg("[hook] RegQueryValueExW hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegQueryValueExA\0", hook_reg_query_value_ex_a as *const ()) {
        REAL_REG_QUERY_VALUE_EX_A = Some(core::mem::transmute(tramp));
    } else {
        log_msg("[hook] RegQueryValueExA hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegCloseKey\0", hook_reg_close_key as *const ()) {
        REAL_REG_CLOSE_KEY = Some(core::mem::transmute(tramp));
    } else {
        log_msg("[hook] RegCloseKey hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegGetValueW\0", hook_reg_get_value_w as *const ()) {
        REAL_REG_GET_VALUE_W = Some(core::mem::transmute(tramp));
        log_msg("[hook] RegGetValueW hooked");
    } else {
        log_msg("[hook] RegGetValueW hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"advapi32.dll\0", b"RegGetValueA\0", hook_reg_get_value_a as *const ()) {
        REAL_REG_GET_VALUE_A = Some(core::mem::transmute(tramp));
        log_msg("[hook] RegGetValueA hooked");
    } else {
        log_msg("[hook] RegGetValueA hook skipped");
    }
    if let Some(tramp) = hook_export_jmp(b"ntdll.dll\0", b"NtQueryValueKey\0", hook_nt_query_value_key as *const ()) {
        REAL_NT_QUERY_VALUE_KEY = Some(core::mem::transmute(tramp));
        log_msg("[hook] NtQueryValueKey hooked");
    } else {
        log_msg("[hook] NtQueryValueKey hook skipped");
    }
    hook_anti_debug_all();
    install_compare_hooks();
    install_message_and_box_hooks();
    install_network_hooks();
}

#[no_mangle]
pub extern "system" fn DllMain(_h: *mut c_void, reason: u32, _r: *mut c_void) -> i32 {
    const DLL_PROCESS_ATTACH: u32 = 1;
    const DLL_PROCESS_DETACH: u32 = 0;
    if reason == DLL_PROCESS_ATTACH {
        unsafe {
            install_all();
        }
    } else if reason == DLL_PROCESS_DETACH {
        unsafe {
            // Hooks may still be active (restore was deferred to unload so the
            // crackme's follow-up kernel check was emulated too). Restore now,
            // while this DLL is still mapped, with all other threads
            // suspended so nobody executes a torn prologue.
            restore_all_hook_patches();
            // Let in-flight hook calls drain before the loader unmaps this
            // image (entries are already restored, so the count only falls).
            let mut spins = 2000;
            while ACTIVE_HOOK_CALLS.load(Ordering::Acquire) != 0 && spins > 0 {
                Sleep(1);
                spins -= 1;
            }
            // Remove the RWX trampoline pages: a memory scanner inside the
            // target would flag them long after the hooks are gone.
            free_all_trampolines();
            // The registered VEH handler lives inside this DLL's image; if it
            // is not removed, every later exception in the process dispatches
            // into unmapped memory -> 0xC0000005.
            if !VEH_HANDLE.is_null() {
                RemoveVectoredExceptionHandler(VEH_HANDLE);
                VEH_HANDLE = core::ptr::null_mut();
                log_msg("[hook] DLL detaching: patches restored, VEH removed");
            }
        }
    }
    1
}
