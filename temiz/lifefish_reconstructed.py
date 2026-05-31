"""
MODULE: main__
CONFIDENCE: 72% evidence-backed reconstruction
SOURCE: NBC/2 constants-only run (no native @OPS disassembly available)
VERSION: CPython 3.12 / Nuitka
TOOL: LifeFish Balık Botu v2.3.5 — Metin2 game bot / DLL injector launcher
UNCERTAIN SPANS: inject_dlls_internal body (subprocess arg order unverified),
                 WorkerThread.run body (no OPS), pointer_address offsets partial.

Evidence key:
  c[N]   = mod_consts[N] from @CONSTS table
  [UNCERTAIN] = no direct @OPS/@ASM evidence, inferred from context
"""

from __future__ import annotations

# ---------------------------------------------------------------------------
# Stdlib / third-party imports  (c[805] tuple evidence)
# ---------------------------------------------------------------------------
import os
import sys
import json
import shutil
import hashlib
import subprocess
import threading
import webbrowser
import ctypes
from pathlib import Path
from collections import deque
from datetime import datetime

import psutil
import pyautogui
import pymem
from pymem.ptypes import RemotePointer

import win32gui
import win32con
import win32api
import win32process

from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QFrame, QDialog,
    QVBoxLayout, QHBoxLayout, QFormLayout,
    QLabel, QLineEdit, QPushButton, QGroupBox, QCheckBox,
    QComboBox, QStackedWidget, QProgressBar, QMessageBox, QFileDialog,
)
from PyQt6.QtCore import (
    QThread, pyqtSignal, QMutex, QMutexLocker, QEventLoop, QTimer, Qt, QRectF, QPointF,
)
from PyQt6.QtGui import (
    QFont, QIcon, QAction, QPainter, QPen, QPixmap,
)

import qdarktheme

# lifekontest API  (c[816-822])
from lifekontest import api

# ---------------------------------------------------------------------------
# Module-level constants  (c[10,250-253,726-727])
# ---------------------------------------------------------------------------
SETTINGS_FILE = Path('C:\\LifeFish\\settings\\path.json')  # c[829]
BASE_WIDTH     = 800   # c[250]
BASE_HEIGHT    = 600   # c[252]
CH             = 1
SLOTS_PER_PAGE = 6     # c[726]
TOTAL_SLOTS    = 6     # c[726]

# C2 registration endpoint  (c[652])
REGISTER_URL = 'https://lifefishbot.net/register/'

# ---------------------------------------------------------------------------
# MD5 checksum helper  (c[0-6] evidence: hashlib, md5, argv, rb, update, read, hexdigest)
# ---------------------------------------------------------------------------

def _md5_file(file_path: str) -> str:
    """Return hex-digest of file.  c[0..6]"""
    md5_hash = hashlib.md5()
    with open(file_path, 'rb') as file:
        md5_hash.update(file.read())
    return md5_hash.hexdigest()


# ---------------------------------------------------------------------------
# Dark-titlebar helper  (c[23-31])
# ---------------------------------------------------------------------------

def set_dark_titlebar(window) -> None:
    """Windows 10/11'de başlık çubuğunu koyu yapar.  c[32]"""
    hwnd             = ctypes.c_int(window.winId())          # c[23-24]
    rendering_policy = ctypes.c_int(20)                      # c[29]
    value            = ctypes.c_int(1)
    ctypes.windll.dwmapi.DwmSetWindowAttribute(              # c[26-28]
        hwnd, rendering_policy,
        ctypes.byref(value), ctypes.sizeof(value),           # c[30-31]
    )


# ---------------------------------------------------------------------------
# Non-blocking Qt sleep  (c[126-131])
# ---------------------------------------------------------------------------

def qt_sleep(ms: int) -> None:
    """Non-blocking sleep using QEventLoop  c[131]"""
    loop  = QEventLoop()
    timer = QTimer()
    timer.singleShot(ms, loop.quit)
    loop.exec()


# ---------------------------------------------------------------------------
# Win32 force-foreground helper  (c[132-153])
# ---------------------------------------------------------------------------

def force_foreground(hwnd) -> None:
    """Bring *hwnd* to the foreground reliably.  c[132-153]"""
    if not win32gui.IsWindow(hwnd):                          # c[133]
        return
    win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)           # c[134,136]
    win32gui.SetWindowPos(                                   # c[137]
        hwnd, win32con.HWND_TOPMOST,                         # c[138]
        0, 0, 0, 0,
        win32con.SWP_NOMOVE | win32con.SWP_NOSIZE | win32con.SWP_SHOWWINDOW,
    )
    win32gui.SetWindowPos(
        hwnd, win32con.HWND_NOTOPMOST,                       # c[142]
        0, 0, 0, 0,
        win32con.SWP_NOMOVE | win32con.SWP_NOSIZE | win32con.SWP_SHOWWINDOW,
    )
    fg      = win32gui.GetForegroundWindow()                 # c[143]
    cur_tid = win32api.GetCurrentThreadId()                  # c[145]
    fg_tid, _ = win32process.GetWindowThreadProcessId(fg)    # c[147]
    tgt_tid, _ = win32process.GetWindowThreadProcessId(hwnd)
    try:
        win32api.AttachThreadInput(fg_tid, cur_tid, True)    # c[149,151]
        win32api.AttachThreadInput(cur_tid, tgt_tid, True)
        win32gui.BringWindowToTop(hwnd)
        win32gui.SetForegroundWindow(hwnd)
        win32gui.SetActiveWindow(hwnd)
        win32gui.SetFocus(hwnd)
    except Exception as __mro_e:                             # c[149]
        pass
    finally:
        try:
            win32api.AttachThreadInput(fg_tid, cur_tid, False)
            win32api.AttachThreadInput(cur_tid, tgt_tid, False)
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Game file proxy helper  (c[45-74])
# ---------------------------------------------------------------------------

def _setup_metin2_proxy(settings: dict) -> None:
    """
    Backup metin2client.exe and replace with symlink so
    the launcher can intercept. c[45-74]

    Locals: game_path, main_exe, backup_exe, numbered_exe  (c[1010])
    """
    game_path  = settings.get('game_path', None)             # c[34-35]
    if not game_path or not game_path.lower().endswith('metin2client.exe'):  # c[36-38]
        return

    main_exe   = Path(game_path).parent / 'metin2client.exe'          # c[45]
    backup_exe = Path(game_path).parent / 'metin2client_backup.exe'   # c[46]

    # Backup original if not already a link  (c[58-57])
    if not main_exe.is_symlink():
        shutil.copy2(str(main_exe), str(backup_exe))         # c[54-55]
        print(f'[*] {backup_exe} oluşturuldu.')              # c[56-57]

    # Remove old link / original and create symlink  (c[59-70])
    if main_exe.is_symlink():
        main_exe.unlink()

    num     = 0   # [UNCERTAIN] numbered_exe slot index
    cmd     = ['cmd', '/c', 'mklink',                        # c[64-66]
               str(main_exe),
               str(Path(game_path).parent / f'metin2client_{num}.exe')]
    subprocess.run(cmd, check=True)                          # c[63,67]
    print(f'[+] Proxy {main_exe} Hazır! Launcher\'dan OYNA\'ya basın.')  # c[68-69]

    qt_sleep(5000)                                           # c[71-72]
    print('[!] Oyun açıldı, dosyalar eski haline getiriliyor...')        # c[73]

    # Restore original  (c[59-60])
    if main_exe.is_symlink():
        main_exe.unlink()
    backup_exe.rename(main_exe)                              # c[60]
    print('[OK] İşlem tamam.')                               # c[74]


# ---------------------------------------------------------------------------
# Cache / Gameforge cleanup  (c[85-125])
# ---------------------------------------------------------------------------

def _silme(user_name: str | None = None) -> None:
    """
    Kill gfService, flush all Gameforge / Metin2 caches.
    c[85-125]
    """
    taskkill_commands = ['taskkill /f /im gfService.exe']    # c[85]
    if user_name is None:
        try:
            user_name = os.getlogin()                        # c[87]
        except Exception:
            user_name = ''

    base = f'C:\\Users\\{user_name}'
    taskkill_commands += [
        f'RD /S /Q "{base}\\AppData\\Local\\Temp\\GameforgeClient"',      # c[89]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d_tmp"',            # c[90]
        f'del "{base}\\AppData\\Local\\Temp%"',                           # c[91]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\crashes"',     # c[92]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\usercache"',   # c[93]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\Cache"',  # c[94]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\blob_storage"',  # c[95]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\Code Cache"',    # c[96]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\GPUCache"',      # c[97]
        f'RD /S /Q "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\Local Storage"', # c[98]
        f'del "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\monitoring.db" /f /s /q',  # c[100]
        f'del "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\browser.log" /f /s /q',    # c[101]
        f'del {base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\crashes /f /s /q',          # c[103]
        f'del "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\UserPrefs.json" /f /s /q',  # c[104]
        f'del "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\Visited Links" /f /s /q',   # c[105]
        f'del "{base}\\AppData\\Local\\Gameforge4d\\GameforgeClient\\webcache\\Cookies-journal" /f /s /q', # c[106]
        'RD /S /Q "C:\\Windows\\Prefetch"',                  # c[107]
        'RD /S /Q "C:\\Windows\\Temp"',                      # c[108]
        f'RD /S /Q "{base}\\Desktop\\metin2 de\\metin2\\de-DE\\syserr"',  # c[109]
        f'RD /S /Q "{base}\\Desktop\\metin2 de\\metin2\\de-DE\\UserData"',# c[110]
        'RD /S /Q "C:\\ProgramData\\USOShared"',             # c[111]
        'RD /S /Q "C:\\ProgramData\\USOPrivate"',            # c[112]
        'RD /S /Q "C:\\ProgramData\\Gameforge4d"',           # c[113]
        'RD /S /Q "C:\\ProgramData\\USOShared\\Logs\\System"',  # c[114]
        f'RD /S /Q "C:\\ProgramData\\USOPrivate\\UpdateStore"RD /S /Q "{base}\\AppData\\Local\\Gameforge4d"',  # c[115-116]
        'RD /S /Q "C:\\Program Files (x86)\\metin2\\de-DE\\UserData"',    # c[117]
        'RD /S /Q "C:\\metin2\\de-DE\\UserData"',            # c[118]
        'RD /S /Q "C:\\Program Files (x86)\\metin2\\de-DE\\syserr"',      # c[119]
        'RD /S /Q "C:\\metin2\\de-DE\\syserr"',              # c[120]
        'RD /S /Q "C:\\metin2\\tr-TR\\syserr"',              # c[121]
        'RD /S /Q "C:\\ProgramData\\Microsoft\\Windows\\WER\\ReportArchive"',  # c[122]
    ]

    for command in taskkill_commands:
        try:
            subprocess.run(
                command,
                shell=True,
                stdout=subprocess.PIPE,                      # c[123]
                stderr=subprocess.PIPE,
            )
        except Exception:
            pass


# ---------------------------------------------------------------------------
# psutil: kill all gfclient processes  (c[75-82])
# ---------------------------------------------------------------------------

def _kill_gfclient() -> None:
    """Kill every gfclient* process via psutil.  c[75-82]"""
    for proc in psutil.process_iter(['name', 'info']):       # c[76-78]
        try:
            if proc.info['name'].startswith('gfclient'):     # c[79-80]
                proc.kill()                                  # c[81]
        except (psutil.NoSuchProcess, psutil.AccessDenied):  # c[82-83]
            pass


# ---------------------------------------------------------------------------
# ManualInjectDialog  (c[849-853, 163-225])
# ---------------------------------------------------------------------------

class ManualInjectDialog(QDialog):
    """Manual injection dialog  c[845]"""

    inject_requested = pyqtSignal(int, str)   # (pid, process_name)  c[228]

    def __init__(self, slot_number: int, parent=None) -> None:   # c[160-161]
        super().__init__(parent)
        self.slot_number = slot_number                       # c[161]
        self.countdown   = 3                                 # c[168]
        self.timer       = QTimer(self)                      # c[170]
        self.timer.timeout.connect(self.update_countdown)    # c[171-173]
        self.setup_ui()                                      # c[174]

    def setup_ui(self) -> None:                              # c[174]
        self.setWindowTitle('Manual Injection')              # c[162-163]
        self.setFixedSize(400, 240)                          # c[164-165]
        self.setModal(True)                                  # c[166-167]

        layout = QVBoxLayout()
        layout.setSpacing(20)                                # c[176-177]
        layout.setContentsMargins(30, 25, 30, 25)           # c[178-179]

        title = QLabel(f'🎮 Manual Injection - Slot {self.slot_number}')  # c[181]
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)    # c[182-185]
        font = QFont()
        font.setPointSize(14)                                # c[187-188]
        font.setBold(True)                                   # c[189]
        title.setFont(font)                                  # c[190]
        layout.addWidget(title)                              # c[191]

        instr = QLabel('Click OK, then click on the Metin2 game window')  # c[192]
        instr.setWordWrap(True)                              # c[193]
        layout.addWidget(instr)

        self.time_label = QLabel()                           # c[196]
        self.time_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        font2 = QFont()
        font2.setPointSize(36)                               # c[197]
        self.time_label.setFont(font2)
        layout.addWidget(self.time_label)

        self.progress = QProgressBar()                       # c[198-199]
        self.progress.setMaximum(3)                          # c[200-201]
        self.progress.setValue(3)                            # c[202]
        self.progress.setTextVisible(False)                  # c[203-204]
        self.progress.setFixedHeight(10)                     # c[205-206]
        layout.addWidget(self.progress)

        btn_row = QHBoxLayout()                              # c[207]
        self.ok_btn = QPushButton('✓ Start Countdown')       # c[208-210]
        self.ok_btn.setMinimumHeight(40)                     # c[211-212]
        self.ok_btn.clicked.connect(self.start_countdown)   # c[213-214]
        btn_row.addWidget(self.ok_btn)

        cancel_btn = QPushButton('✕ Cancel')                 # c[215]
        cancel_btn.clicked.connect(self.reject)              # c[216]
        btn_row.addWidget(cancel_btn)
        layout.addLayout(btn_row)                            # c[217]
        self.setLayout(layout)

    def start_countdown(self) -> None:                       # c[214]
        self.ok_btn.setEnabled(False)                        # c[218]
        self.timer.start(1000)                               # c[219-220]

    def update_countdown(self) -> None:                      # c[173]
        self.time_label.setText(str(self.countdown))         # c[221]
        self.progress.setValue(self.countdown)
        if self.countdown == 0:
            self.timer.stop()                                # c[222]
            self.ok_btn.setText('✓')                         # c[223]
            self.progress.setValue(100)                      # c[224]
            self.capture_active_window()                     # c[225]
        else:
            self.countdown -= 1

    def capture_active_window(self) -> None:                 # c[225]
        """Capture whichever window the user clicked on."""
        try:
            hwnd    = win32gui.GetForegroundWindow()
            title   = win32gui.GetWindowText(hwnd)
            _, pid  = win32process.GetWindowThreadProcessId(hwnd)
            process = None
            for proc in psutil.process_iter(['name', 'pid']):
                if proc.pid == pid:
                    process = proc.info['name']
                    break
            if process and 'metin2' in process.lower():      # c[227]
                QMessageBox.information(                     # c[230-231]
                    self,
                    '✅ Success',                            # c[232]
                    f'Successfully captured Metin2 process!\n\nProcess: {process}\nPID: {pid}',  # c[233-234]
                )
                self.inject_requested.emit(pid, process)     # c[228-229]
                self.accept()                                # c[235]
            else:
                QMessageBox.warning(                         # c[236]
                    self, '⚠️ Wrong Process',                # c[237]
                    f'Selected window is not Metin2!\n\nProcess: {process}',  # c[238]
                )
        except Exception as e:
            if hwnd:
                QMessageBox.warning(self, '⚠️ No Selection', 'No valid window was selected')  # c[239-240]
            else:
                QMessageBox.critical(self, '❌ Error', f'Error: {e}')  # c[241-243]


# ---------------------------------------------------------------------------
# WorkerThread  (c[858-874] qualname evidence)
# ---------------------------------------------------------------------------

class WorkerThread(QThread):
    """Worker thread with QTimer-based delays  c[855]"""

    # Signals  (c[294, 279, 260, 262, 438])
    status_update   = pyqtSignal(str, str)     # (message, colour)
    progress_update = pyqtSignal(int)
    error_occurred  = pyqtSignal(str)
    operation_complete = pyqtSignal(bool, int) # (success, pid)   c[263]

    def __init__(
        self,
        operation_type: str,                   # c[244]
        slot_num:       int,                   # c[245]
        params:         dict,                  # c[246]
        parent=None,
    ) -> None:
        super().__init__(parent)
        self.operation_type = operation_type
        self.slot_num       = slot_num
        self.params         = params
        self.running        = True             # c[247]
        self.pid            = 0               # c[248]
        self.state          = None            # c[249]
        self.mutex          = QMutex()        # c[255-256]

    # ------------------------------------------------------------------
    def run(self) -> None:                    # c[859]
        """[UNCERTAIN: no @OPS block]  Dispatch on operation_type."""
        try:
            if self.operation_type == 'start_game':      # c[257]
                self.start_game_process()                # c[258]
            elif self.operation_type == 'inject_dll':    # c[259]
                self.inject_dll()
        except Exception as e:
            self.error_occurred.emit(f'❌ {e}')          # c[260-261]

    def stop(self) -> None:                   # c[860]
        with QMutexLocker(self.mutex):
            self.running = False

    def is_running_check(self) -> bool:       # c[861]
        with QMutexLocker(self.mutex):
            return self.running

    def resource_path(self, relative: str) -> str:  # c[862]
        """PyInstaller _MEIPASS / dev path resolver."""
        base = getattr(sys, '_MEIPASS', Path(__file__).parent)
        return str(Path(base) / relative)

    def wait_ms(self, ms: int) -> None:       # c[863]
        """Non-blocking wait using QEventLoop  c[267]"""
        qt_sleep(ms)

    # ------------------------------------------------------------------
    # Automation helpers

    def serversec(self, server_name: str) -> None:   # c[865]
        """[UNCERTAIN body] Select server by name (find its order in serverlist.txt)  c[438]"""
        pass  # UNCERTAIN: no @OPS

    def chsec(self, channel_num: int) -> None:       # c[867]
        """[UNCERTAIN body] Select channel  c[438]"""
        pass  # UNCERTAIN: no @OPS

    # ------------------------------------------------------------------
    # start_game_process  (c[868], c[299-420] evidence)

    def start_game_process(self) -> None:
        """
        Complete game start with zero-blocking delays  c[421]
        Local vars (c[1059]):
          settings_file, data, mail, password, game_id, server, channel,
          server_name, channel_num, base_path, candidates, max_wait,
          gf_hwnd, app_window, hwnd, google_img, attempt, google_btn,
          nostale_img, nostale_check, oyna_images, play_clicked, oyna_img,
          oyna_btn, tamam_images, tamam_found, tamam_img, tamam_btn,
          pid, char_img, char_btn, PM, player_name
        """
        # Read slot configuration from userdata/  (c[282-292])
        settings_file = Path('userdata') / f'{self.slot_num}.txt'
        if not settings_file.exists():
            self.status_update.emit('⚠️ Configure slot first', 'color: #FFB74D;')  # c[286]
            self.operation_complete.emit(False, 0)
            return

        data = settings_file.read_text().strip().split(None)  # c[287-290]
        if not data or not data[0].isdigit():                  # c[293]
            self.status_update.emit('⚠️ Invalid configuration', 'color: #EF5350;')  # c[292]
            self.operation_complete.emit(False, 0)
            return

        mail, password = data[0], data[1] if len(data) > 1 else ''
        game_id        = data[2] if len(data) > 2 else None
        server         = data[3] if len(data) > 3 else None
        channel        = data[4] if len(data) > 4 else None

        # 1. Clean cache  (c[295-297])
        self.status_update.emit('🧹 Cleaning cache...', 'color: #64B5F6;')
        self.progress_update.emit(5)
        _silme()
        self.wait_ms(2000)

        # 2. Start Gameforge client  (c[299-304])
        self.status_update.emit('🚀 Starting client...', 'color: #64B5F6;')
        candidates = list(Path('C:\\Program Files (x86)\\GameforgeClient').glob('gfclient*.exe'))  # c[300-301]
        if not candidates:
            self.status_update.emit('❌ GF Client not found', 'color: #EF5350;')  # c[304]
            self.operation_complete.emit(False, 0)
            return
        os.startfile(str(candidates[0]))                      # c[302]
        self.wait_ms(2000)                                    # c[303]

        # 3. Wait for Gameforge window  (c[305-323])
        self.status_update.emit('⏳ Waiting for window...', 'color: #64B5F6;')  # c[305]
        max_wait = 60                                         # c[309]
        gf_hwnd  = None
        for attempt in range(max_wait):                       # c[308-310]
            if not self.is_running_check():
                return
            app_window = pyautogui.getWindowsWithTitle('Gameforge Client')  # c[313-314]
            if app_window:
                pyautogui.moveTo(-3, 0)                       # c[315-316]
                gf_hwnd = app_window[0]._hWnd                 # c[317]
                force_foreground(gf_hwnd)                     # c[319]
                break
            self.wait_ms(500)                                 # c[323]
        else:
            self.status_update.emit('❌ Window timeout', 'color: #EF5350;')   # c[324]
            self.operation_complete.emit(False, 0)
            return

        # 4. Find login (google.png image search)  (c[325-343])
        self.status_update.emit('🔍 Looking for login...', 'color: #64B5F6;')  # c[325]
        self.progress_update.emit(25)
        google_img = self.resource_path('images/google.png')  # c[327-328]
        google_btn = None
        for attempt in range(20):                             # c[330-332]
            google_btn = pyautogui.locateCenterOnScreen(google_img, confidence=0.8)  # c[333,335]
            if google_btn:
                break
            self.wait_ms(1000)
        if not google_btn:
            self.status_update.emit('❌ Login screen not found', 'color: #EF5350;')  # c[344]
            self.operation_complete.emit(False, 0)
            return

        # 5. Enter email  (c[336-342])
        self.status_update.emit('✍️ Entering email...', 'color: #64B5F6;')   # c[336]
        self.progress_update.emit(30)
        pyautogui.click(477, 403, clicks=1, interval=0.5)    # c[342]
        pyautogui.write(mail, interval=0.07)                  # c[339,341]
        self.wait_ms(100)

        # 6. Enter password  (c[345-347])
        self.status_update.emit('🔐 Entering password...', 'color: #64B5F6;')  # c[345]
        pyautogui.click(483, 504, clicks=1, interval=0.5)    # c[346]
        pyautogui.write(password, interval=0.07)
        pyautogui.press('enter')                             # c[347: i 4 → Enter key]
        self.wait_ms(3000)                                   # c[348]

        # 7. Wait for game list / find Metin2 (nostale.png)  (c[349-357])
        self.status_update.emit('⏳ Loading games...', 'color: #64B5F6;')   # c[349]
        self.progress_update.emit(50)
        nostale_img = self.resource_path('images/nostale.png')  # c[351]
        nostale_check = None
        for attempt in range(5):                              # c[353]
            nostale_check = pyautogui.locateCenterOnScreen(nostale_img, confidence=0.8)
            if nostale_check:
                break
            self.wait_ms(1000)
        if not nostale_check:
            self.status_update.emit('❌ Game list timeout', 'color: #EF5350;')  # c[354]
            self.operation_complete.emit(False, 0)
            return

        # 8. Select Metin2  (c[355-357])
        self.status_update.emit('🎮 Selecting Metin2...', 'color: #64B5F6;')  # c[355]
        self.progress_update.emit(55)
        pyautogui.click(320, 194, clicks=1, interval=0.5)    # c[357]

        # 9. Account selection  (c[358-360])
        self.status_update.emit('👤 Account selection...', 'color: #64B5F6;')  # c[358]
        self.progress_update.emit(60)
        pyautogui.click(874, 252, clicks=1, interval=0.5)    # c[360]

        # 10. Enter game ID  (c[361-368])
        self.status_update.emit('🆔 Entering ID...', 'color: #64B5F6;')     # c[361]
        self.progress_update.emit(65)
        if game_id:
            pyautogui.click(526, 348, clicks=1, interval=0.5)  # c[363]
            pyautogui.write(str(game_id), interval=0.07)
        pyautogui.click(922, 62, clicks=1, interval=0.5)    # c[368]

        # 11. Find and click play button  (c[369-381])
        self.status_update.emit('▶️ Starting game...', 'color: #64B5F6;')   # c[369]
        self.progress_update.emit(70)
        oyna_images = [
            self.resource_path('images/oyna1.png'),          # c[372]
            self.resource_path('images/oyna2.png'),          # c[373]
            self.resource_path('images/oyna3.png'),          # c[374]
            self.resource_path('images/oyna4.png'),          # c[375]
            self.resource_path('images/oyna5.png'),          # c[376]
        ]
        play_clicked = False
        for oyna_img in oyna_images:
            oyna_btn = pyautogui.locateCenterOnScreen(oyna_img, confidence=0.85)  # c[377]
            if oyna_btn:
                pyautogui.click(oyna_btn.x, oyna_btn.y, clicks=1, interval=0.3)  # c[378]
                pyautogui.click(button='left', clicks=1, interval=0.05)           # c[379]
                self.wait_ms(200)
                play_clicked = True
                break
        if not play_clicked:
            self.status_update.emit('❌ Play button not found', 'color: #EF5350;')  # c[381]
            self.operation_complete.emit(False, 0)
            return

        # 12. Server selection via tamam images  (c[383-396])
        self.status_update.emit('🌐 Server selection...', 'color: #64B5F6;')  # c[383]
        self.progress_update.emit(75)
        tamam_images = [
            self.resource_path('images/Trok.png'),           # c[385]
            self.resource_path('images/tamam1.png'),         # c[386]
        ]
        tamam_found = False
        for tamam_img in tamam_images:
            tamam_btn = pyautogui.locateCenterOnScreen(tamam_img, confidence=0.7)  # c[388]
            if tamam_btn:
                tamam_found = True
                break
        self.progress_update.emit(85)

        # Inject DLLs and select server/channel
        self.inject_dlls_internal()                          # c[390]
        if server:
            self.serversec(server)                           # c[391-392]
        if channel:
            self.chsec(channel)                              # c[393-394]
        if not tamam_found:
            self.status_update.emit('❌ Server selection timeout', 'color: #EF5350;')  # c[396]
            self.operation_complete.emit(False, 0)
            return

        # 13. Character screen  (c[397-404])
        self.status_update.emit('🧙 Character screen...', 'color: #64B5F6;')  # c[397]
        self.progress_update.emit(90)
        char_img = self.resource_path('images/karakteratma.png')  # c[399]
        char_btn = None
        for attempt in range(30):                            # c[401-403]
            char_btn = pyautogui.locateCenterOnScreen(char_img, confidence=0.8)
            if char_btn:
                pyautogui.click(char_btn)
                break
            self.wait_ms(1000)

        # 14. Verify via pymem pointer  (c[405-415])
        self.status_update.emit('✅ Verifying...', 'color: #64B5F6;')        # c[405]
        self.progress_update.emit(95)
        pid = 0
        try:
            PM = pymem.Pymem()                               # c[407-408]
            PM.open_process_from_id(self.pid)                # c[409]
            base = PM.base_address                           # c[412]
            rp   = RemotePointer(                            # c[814-815]
                PM.process_handle,
                base + 47962276,                             # c[413]
                12,                                          # c[414]
            )
            player_name = PM.read_string(rp.value)          # c[410]
            pid = self.pid
            self.status_update.emit(f'✅ Success! ({player_name})', 'color: #81C784;')  # c[415]
        except Exception:
            pass

        self.wait_ms(7000)                                   # c[418]
        self.status_update.emit('✅ Game started!', 'color: #81C784;')        # c[419]
        self.operation_complete.emit(True, pid)

    # ------------------------------------------------------------------
    # inject_dlls_internal  (c[869])
    # Local vars (c[1006]):
    #   self, pid, auto_start_check, file, injector, username,
    #   settings_file, data, slot_index, crypto_dll, command,
    #   is_beta, granny_dll, dynamic_dll_folder
    # Local vars alt (c[1008]):
    #   + tkintertest, dynamic_dll
    # ------------------------------------------------------------------

    def inject_dlls_internal(
        self,
        pid:              int  | None = None,
        auto_start_check: bool        = False,   # c[422]
        slot_index:       int         = 0,
        is_beta:          bool        = False,
        dynamic_dll_folder: str | None = None,
    ) -> None:
        """
        Inject DLLs into the target process.
        Called after Gameforge automation completes.

        Injection sequence (c[438]):
          1. Crypto DLL  : libcrypto-1_1-x64.dll
          2. Granny DLL  : granny27.dll
          3. Main hack   : Tcl64t.dll   (kernel64.dll fallback)
          dynamic_dll    : folder-based DLL if dynamic_dll_folder set
        Injector binary  : Config\\Images\\tkintertest1.exe   (c[428])
        """
        # Resolve PID
        if pid is None:
            pid = self.pid
        if pid == 0:
            try:
                pid = int(Path('userdata/pid.txt').read_text().strip())  # c[438: 'userdata/pid.txt']
            except Exception:
                pass
        if not pid:
            self.status_update.emit('❌ No PID', 'color: #EF5350;')      # c[438]
            return
        print(f'DEBUG: Kullanılacak PID → {pid}')                        # c[438]

        # Resolve injector path  (c[428-431])
        file = Path(self.resource_path('Config\\Images\\tkintertest1.exe'))  # c[428]
        print(f'DEBUG: Injector yolu: {file}')                           # c[429]
        if not file.exists():
            self.status_update.emit('HATA: tkintertest1.exe bulunamadı!', 'color: #EF5350;')  # c[430]
            self.status_update.emit('Injector dosyası yok', 'color: #EF5350;')               # c[431]
            return
        injector = str(file)

        # Read username from licence.txt  (c[433-435])
        try:
            username = Path('licence.txt').read_text().strip()           # c[433]
            print(f'DEBUG: Kullanıcı adı: {username}')                   # c[434]
        except Exception as e:
            username = 'default'                                         # c[432]
            print(f'licence.txt okunamadı → default kullanılıyor ({e})')  # c[435]

        # [UNCERTAIN slot/manuelsayi read]  c[438: 'UYARI: slot/manuelsayi okunamadı → 0 kabul edildi']
        try:
            slot_index = int(Path(f'userdata/{self.slot_num}.txt').read_text().split()[-1])
        except Exception:
            print('UYARI: slot/manuelsayi okunamadı → 0 kabul edildi')  # c[438]
            slot_index = 0

        # Windows Security Health log path  (c[438: 'PROGRAMDATA', 'Windows Secur', 'lth', 'Logs', 'shs.txt'])
        programdata   = os.environ.get('PROGRAMDATA', 'C:\\ProgramData')
        shs_log       = Path(programdata) / 'Microsoft' / 'Windows Security Health' / 'Logs' / 'shs.txt'
        # [UNCERTAIN: Search usage in shs.txt not fully evidenced]

        # --- Step 1: Crypto DLL  (c[438: 'libcrypto-1_1-x64.dll', 'İŞLEM: Crypto DLL enjeksiyonu →'])
        crypto_dll = Path(programdata) / 'libcrypto-1_1-x64.dll'        # c[438]
        if crypto_dll.exists():
            print(f'İŞLEM: Crypto DLL enjeksiyonu → {crypto_dll}')       # c[438]
            command = f'"{injector}" "{crypto_dll}" "{pid}"'             # c[438: '" "', '" ']
            try:
                subprocess.run(command, shell=True, check=None,
                               capture_output=True)                      # c[438: {shell:True, check:None}]
            except subprocess.CalledProcessError as e:                   # c[438: 'CalledProcessError']
                print(f'Crypto DLL enjeksiyon HATASI: {e}')              # c[438]
        else:
            print('UYARI: libcrypto-1_1-x64.dll bulunamadı → atlanıyor')  # c[438]

        # --- Step 2: Granny DLL  (c[438: 'granny27.dll', 'İŞLEM: Granny27 DLL enjeksiyonu →'])
        granny_dll = Path(programdata) / 'granny27.dll'                  # c[438]
        print(f'İŞLEM: Granny27 DLL enjeksiyonu → {granny_dll}')         # c[438]
        command = f'"{injector}" "{granny_dll}" "{pid}"'
        try:
            subprocess.run(command, shell=True, check=None,
                           capture_output=True, timeout=150)             # c[438: timeout:(150,)]
        except Exception as e:
            print(f'Granny27 enjeksiyon hatası: {e}')                    # c[438]

        # --- Step 3: Main hack DLL  (c[438: 'Tcl64t.dll', 'kernel64.dll'])
        main_dll_candidates = [
            Path(programdata) / 'Tcl64t.dll',                           # c[438]
            Path(programdata) / 'kernel64.dll',                         # c[438]
        ]
        main_dll_found = False
        for main_dll in main_dll_candidates:
            if main_dll.exists():
                print(f'İŞLEM: Ana hack DLL enjeksiyonu → {main_dll}')   # c[438]
                command = f'"{injector}" "{main_dll}" "{pid}"'
                try:
                    subprocess.run(command, shell=True, check=None,
                                   capture_output=True, timeout=150)
                except Exception as e:
                    print(f'Ana DLL enjeksiyon hatası: {e}')             # c[438]
                main_dll_found = True
                break
        if not main_dll_found:
            print(f'CRITICAL: Ana DLL bulunamadı → {main_dll_candidates}')  # c[438]

        # --- Step 4: Dynamic DLL (optional folder)  (c[1007: dynamic_dll])
        if dynamic_dll_folder:
            dynamic_dll = None   # [UNCERTAIN: glob pattern not evidenced]
            # UNCERTAIN: dynamic_dll resolution from folder

        # Run finalfunction (lifefish.exe)  (c[873, 438])
        self.finalfunction()

        print('BAŞARI: Enjeksiyon adımları tamamlandı.')                  # c[438]
        self.status_update.emit('✅ Enjeksiyon tamamlandı', 'color: #81C784;')  # c[438]

    # ------------------------------------------------------------------
    # inject_dll  (c[874])
    # Local vars (c[997]):  self, checknew, target_exe, dll_name4, tkintertest
    # ------------------------------------------------------------------

    def inject_dll(self) -> None:
        """
        Single-shot DLL injection entry point.
        Called from WorkerThread.run when operation_type == 'inject_dll'.
        Thin wrapper that resolves checknew/target_exe then delegates.
        Local vars: checknew, target_exe, dll_name4, tkintertest  (c[997])
        """
        try:
            checknew   = self.params.get('checknew', None)     # c[997]
            target_exe = self.params.get('target_exe', None)   # c[997]
            dll_name4  = self.params.get('dll_name4', None)    # c[997]
            tkintertest = Path(self.resource_path(
                'Config\\Images\\tkintertest1.exe'))            # c[428] shared with inject_dlls_internal
            # [UNCERTAIN: exact invocation order for single-shot path]
            self.inject_dlls_internal(pid=self.pid)
        except Exception as e:
            print(f'GENEL HATA (inject_dll): {e.__class__.__name__}: {e}')  # c[438]
            self.error_occurred.emit(f'Hata: {e}')                         # c[438]

    # ------------------------------------------------------------------
    # finalfunction  (c[873])
    # ------------------------------------------------------------------

    def finalfunction(self) -> None:
        """
        Launch lifefish.exe after injection.  c[438]
        Local vars: c[438: 'lifefish.exe', ('lifefish.exe',)]
        """
        try:
            subprocess.Popen(['lifefish.exe'])               # c[438]
            print('--- [BAŞARI] lifefish.exe başlatıldı. ---')   # c[438]
        except FileNotFoundError:
            print('--- [HATA] lifefish.exe dosyası bulunamadı! ---')  # c[438]
        except Exception as e:
            print(f'--- [KRİTİK HATA] finalfunction içinde hata: {e} ---')  # c[438]

    # ------------------------------------------------------------------
    # pointer_address  (c[872])
    # Local vars (c[1035]): self, pm, base, offsets, rp, offset
    # ------------------------------------------------------------------

    def pointer_address(self, pm: pymem.Pymem, base: int, offsets: list[int]) -> int:
        """Read pointer chain.  c[438: 'Read pointer']"""
        rp = RemotePointer(pm.process_handle, base, len(offsets))  # c[814-815]
        for offset in offsets:
            rp = RemotePointer(pm.process_handle, rp.value + offset, len(offsets))
        return rp.value                                      # c[438]

    # ------------------------------------------------------------------
    # select_server  (c[870])
    # ------------------------------------------------------------------

    def select_server(self, server_name: str) -> None:
        """Select server by name (find its order in serverlist.txt)  c[438]"""
        try:
            servers_text = Path('userdata/serverlist.txt').read_text()   # c[438]
            servers      = servers_text.splitlines()                     # c[438: 'servers']
            server_vnum  = None
            for idx, name in enumerate(servers, 1):
                if name.strip() == server_name:
                    server_vnum = idx
                    break
            if server_vnum is not None:
                self.serversec(server_name)
        except Exception:
            pass

    def select_channel(self, channel_num: int) -> None:     # c[871]
        """Select channel  c[438]"""
        self.chsec(channel_num)


# ---------------------------------------------------------------------------
# WindowHider  (c[951-953])
# ---------------------------------------------------------------------------

class WindowHider:
    """Hide / show all Metin2 windows.  c[782-783]"""

    def __init__(self) -> None:
        self.hidden_hwnds: list[int] = []                   # c[805: 'hidden_hwnds']

    def hide_metin2(self) -> None:                          # c[952]
        """Enumerate windows and hide all METIN2 ones.  c[805]"""
        def enum_handler(hwnd, _):                          # c[805: 'enum_handler']
            title = win32gui.GetWindowText(hwnd)
            if 'METIN2' in title.upper():                   # c[805]
                win32gui.ShowWindow(hwnd, win32con.SW_HIDE) # c[805: 'SW_HIDE']
                self.hidden_hwnds.append(hwnd)
        win32gui.EnumWindows(enum_handler, None)             # c[805: 'EnumWindows']

    def show_metin2(self) -> None:                          # c[953]
        """Restore all previously hidden Metin2 windows.  c[805: 'SW_SHOW']"""
        dead: list[int] = []                                # c[805: 'dead']
        for hwnd in self.hidden_hwnds:
            if win32gui.IsWindow(hwnd):
                win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
            else:
                dead.append(hwnd)
        for hwnd in dead:
            self.hidden_hwnds.remove(hwnd)


# ---------------------------------------------------------------------------
# SlotWidget  (c[876-893])
# ---------------------------------------------------------------------------

class SlotWidget(QFrame):
    """Slot widget with configuration validation and queue handling  c[875]"""

    add_to_queue = pyqtSignal(object)   # c[778]

    def __init__(self, slot_number: int, parent=None) -> None:
        super().__init__(parent)
        self.slot_number      = slot_number         # c[161,438]
        self.is_running       = False               # c[438]
        self.is_queued        = False               # c[438]
        self.is_configured    = False               # c[438]
        self.process_id       = 0                   # c[438]
        self.process_id_continue = 0               # c[438]
        self.worker: WorkerThread | None = None     # c[438]
        self.settings_dialog  = None               # c[438]
        self.slotnew_available = False             # c[438]
        self.auto_start_enabled = False            # c[438]
        self.setup_ui()                            # c[877]

    def setup_ui(self) -> None:                    # c[877]
        self.setMaximumHeight(80)                  # c[438]
        self.setFrameStyle(QFrame.Shape.StyledPanel)  # c[438]
        layout = QHBoxLayout()
        layout.setContentsMargins(10, 8, 10, 8)    # c[438]
        layout.setSpacing(6)                       # c[438]

        self.label = QLabel(f'Slot {self.slot_number}')  # c[438]
        self.label.setMinimumWidth(8)              # c[438]
        layout.addWidget(self.label)

        self.play_btn = QPushButton('▶')           # c[438]
        self.play_btn.setFixedSize(36, 32)         # c[438]
        self.play_btn.clicked.connect(self.on_play_clicked)  # c[438]
        layout.addWidget(self.play_btn)

        self.settings_btn = QPushButton('⚙')      # c[438]
        self.settings_btn.setFixedSize(32, 32)    # c[438]
        self.settings_btn.setToolTip('Configure slot')      # c[438]
        self.settings_btn.clicked.connect(self.open_settings)  # c[438]
        layout.addWidget(self.settings_btn)

        self.status_label = QLabel('Not configured')         # c[438]
        self.status_label.setStyleSheet('color: #9E9E9E;')  # c[438]
        layout.addStretch()                        # c[438]

        self.progress_bar = QProgressBar()         # c[438]
        self.progress_bar.hide()
        layout.addWidget(self.progress_bar)

        self.setLayout(layout)

    def check_configuration(self) -> bool:         # c[878]
        """Check if slot has valid email and password  c[441]"""
        cfg = Path('userdata') / f'{self.slot_number}.txt'  # c[282-284]
        if not cfg.exists():
            return False
        parts = cfg.read_text().strip().split(None)          # c[287-289]
        if not parts or len(parts) < 2:
            return False
        email, password = parts[0], parts[1]
        is_valid  = bool(email and password)
        missing   = []
        if not email:    missing.append('email')
        if not password: missing.append('password')
        self.is_configured = is_valid
        return is_valid

    def _update_ui_state(self) -> None:            # c[879]
        """Update UI based on current state  c[444]"""
        if self.is_running:
            self.play_btn.setStyleSheet(
                '\n            QPushButton {\n                background-color: #F44336;\n'
                '                color: white;\n                border: none;\n'
                '                border-radius: 4px;\n                font-size: 14px;\n'
                '                font-weight: bold;\n            }\n'
                '            QPushButton:hover {\n                background-color: #EF5350;\n'
                '            }\n        ')         # c[438: F44336 = stop red]
            self.play_btn.show()
            self.stop_slot
        elif self.is_queued:
            self.status_label.setText('In Queue...')          # c[451]
            self.status_label.setStyleSheet('color: #FFB74D;')  # c[452]
        else:
            if self.is_configured:
                self.status_label.setText('Ready')            # c[442]
                self.status_label.setStyleSheet('color: #81C784;')  # c[443]
            else:
                self.status_label.setText('Not configured')
            if self.manual_check and self.manual_check.isChecked():  # c[449-450]
                self.show_manual_dialog()                    # c[459]

    def on_play_clicked(self) -> None:             # c[881]
        if self.is_running:
            self.stop_slot()
            return
        if not self.check_configuration():
            self.status_label.setText('⚠️ Configure slot first')  # c[286]
            return
        if self.manual_check and self.manual_check.isChecked():    # c[449-450]
            self.show_manual_dialog()
        else:
            self._start_worker(manual=False, newversion=False,
                               auto_start=self.auto_start_enabled)

    def _start_worker(self, manual: bool, newversion: bool, auto_start: bool) -> None:
        self.status_label.setText('Starting...')              # c[457]
        self.status_label.setStyleSheet('color: #64B5F6;')   # c[458]
        self.worker = WorkerThread(
            operation_type='start_game',
            slot_num=self.slot_number,
            params={
                'manual':     manual,
                'newversion': newversion,
                'auto_start': auto_start,
            },
        )
        self.worker.status_update.connect(self.update_status)    # c[462]
        self.worker.handle_error.connect(self.handle_error)      # c[463]  [UNCERTAIN signal name]
        self.worker.operation_complete.connect(self.operation_finished)  # c[464]
        self.worker.progress_update.connect(self.update_progress)  # c[465]
        self.worker.start()
        self.is_running = True
        self._update_ui_state()

    def set_queued(self) -> None:                  # c[882]
        """Set slot as queued  c[453]"""
        self.is_queued = True
        self._update_ui_state()

    def clear_queued(self) -> None:                # c[883]
        """Clear queued state  c[454]"""
        self.is_queued = False
        self._update_ui_state()

    def show_manual_dialog(self) -> None:          # c[885]
        dlg = ManualInjectDialog(self.slot_number, self)
        dlg.inject_requested.connect(self.manual_inject)   # c[467]
        dlg.exec()

    def manual_inject(self, pid: int, process_name: str) -> None:  # c[886]
        self.process_id = pid
        self.worker = WorkerThread(
            operation_type='inject_dll',
            slot_num=self.slot_number,
            params={'pid': pid, 'target_exe': process_name},
        )
        self.worker.operation_complete.connect(self.manual_injection_finished)  # c[473]
        self.worker.start()

    def manual_injection_finished(self, success: bool, pid: int) -> None:  # c[887]
        if success:
            self.update_status('Active (Manual)', 'color: #81C784;')        # c[474]
        else:
            self.update_status('Failed', 'color: #EF5350;')                 # c[475]

    def stop_slot(self) -> None:                   # c[888]
        self.status_label.setText('Stopping...')              # c[476]
        if self.worker and self.worker.isRunning():            # c[477]
            self.worker.stop()
            self.worker.wait()                                 # c[478]
            self.worker.terminate()                            # c[479]
        self.is_running = False
        self._update_ui_state()

    def update_label_with_pid(self, pid: int) -> None:  # c[889]
        self.label.setText(f'Slot {self.slot_number} [{pid}]')  # c[480]

    def update_status(self, message: str, style: str = '') -> None:  # c[890]
        self.status_label.setText(message)
        if style:
            self.status_label.setStyleSheet(style)

    def handle_error(self, error: str) -> None:    # c[891]
        self.update_status(f'❌ {error}', 'color: #EF5350;')

    def operation_finished(self, success: bool, pid: int) -> None:  # c[892]
        self.is_running = False
        if success:
            self.process_id = pid
            self.update_label_with_pid(pid)
            self.update_status('Active', 'color: #81C784;')   # c[482]
        else:
            self.update_status('Failed', 'color: #EF5350;')
        self._update_ui_state()

    def open_settings(self) -> None:               # c[893]
        dlg = SlotSettingsDialog(self.slot_number, self)
        dlg.destroyed.connect(lambda: self.check_configuration())  # c[486-488]
        dlg.setWindowTitle(f'{self.slot_number} Settings')         # c[489]
        dlg.setFixedSize(400, 420)                                  # c[490]
        dlg.setWindowFlags(
            Qt.WindowType.Window | Qt.WindowType.WindowCloseButtonHint)  # c[492-494]
        dlg.load_settings()                                         # c[495]
        dlg.validate_fields()                                       # c[496]
        dlg.show()


# ---------------------------------------------------------------------------
# SlotSettingsDialog  (c[895-902])
# ---------------------------------------------------------------------------

class SlotSettingsDialog(QDialog):
    """Settings dialog with validation  c[894]"""

    def __init__(self, slot_number: int, parent=None) -> None:
        super().__init__(parent)
        self.slot_number = slot_number
        self.setup_ui()

    def setup_ui(self) -> None:                    # c[896]
        layout = QVBoxLayout()
        layout.setContentsMargins(20, None, None, None)

        account_group = QGroupBox('Account')       # c[503-504]
        account_layout = QFormLayout()
        account_layout.setContentsMargins(18, 16, 18, 16)

        self.mail_input = QLineEdit()              # c[508]
        self.mail_input.setPlaceholderText('your.email@example.com')  # c[510]
        self.mail_input.textChanged.connect(self.validate_fields)  # c[511]
        account_layout.addRow('Email *', self.mail_input)   # c[505]

        self.pass_input = QLineEdit()              # c[513]
        self.pass_input.setEchoMode(QLineEdit.EchoMode.Password)  # c[514-516]
        self.pass_input.setPlaceholderText('Enter password')      # c[517]
        account_layout.addRow('Password *', self.pass_input)

        self.id_input = QLineEdit()                # c[519]
        self.id_input.setPlaceholderText('Character name')  # c[520]
        account_layout.addRow('Game ID (optional)', self.id_input)  # c[518]
        account_group.setLayout(account_layout)
        layout.addWidget(account_group)

        server_group = QGroupBox('Server')         # c[522]
        server_layout = QFormLayout()

        region_col = QComboBox()                   # c[524-525]
        region_col.addItems(['TR', 'DE', 'RO'])    # c[527-529]
        region_col.currentIndexChanged.connect(self.update_server_combo)  # c[546]
        server_layout.addRow('Region', region_col)

        self.server_combo = QComboBox()            # c[530]
        server_layout.addRow('Server', self.server_combo)

        self.ch_combo = QComboBox()                # c[532]
        for ch in range(1, 8):                     # c[534-536]
            self.ch_combo.addItem(f'CH {ch}')
        server_layout.addRow('Channel', self.ch_combo)
        server_group.setLayout(server_layout)
        layout.addWidget(server_group)

        self.hint_label = QLabel()                 # c[540]
        self.hint_label.setStyleSheet('color: #EF5350; font-size: 11px;')  # c[541]
        layout.addWidget(self.hint_label)

        btn_row = QHBoxLayout()
        self.save_btn = QPushButton('Save')        # c[542-543]
        self.save_btn.clicked.connect(self.save_settings)  # c[545]
        btn_row.addWidget(self.save_btn)
        cancel_btn = QPushButton('Cancel')         # c[547]
        cancel_btn.clicked.connect(self.close)
        btn_row.addWidget(cancel_btn)
        layout.addLayout(btn_row)
        self.setLayout(layout)

    def validate_fields(self) -> bool:             # c[897]
        """Check if required fields are filled  c[556]"""
        is_valid = True
        missing  = []
        email    = self.mail_input.text()          # c[552]
        password = self.pass_input.text()          # c[553]
        if not email:    missing.append('email')
        if not password: missing.append('password')
        if missing:
            self.hint_label.setText(f'Required: {", ".join(missing)}')  # c[554-555]
            is_valid = False
        else:
            self.hint_label.setText('')
        self.save_btn.setEnabled(is_valid)
        return is_valid

    def load_server_list(self, path: str = 'serverlist.txt') -> list:   # c[899]
        """c[558]: read settings/serverlist path"""
        try:
            return Path(f'settings/{path}').read_text().splitlines()    # c[559]
        except Exception:
            return []

    def update_server_combo(self) -> None:         # c[900]
        self.server_combo.clear()
        servers = self.load_server_list()
        if servers:
            for name in servers:
                self.server_combo.addItem(name)
        else:
            self.server_combo.addItem('Server bulunamadı')  # c[563]

    def load_settings(self) -> None:               # c[901]
        cfg = Path('userdata') / f'{self.slot_number}.txt'  # [UNCERTAIN format]
        if not cfg.exists():
            return
        try:
            parts = cfg.read_text().strip().split(None)
            if len(parts) >= 1: self.mail_input.setText(parts[0])
            if len(parts) >= 2: self.pass_input.setText(parts[1])
            if len(parts) >= 3: self.id_input.setText(parts[2])
        except Exception:
            pass

    def save_settings(self) -> None:               # c[902]
        if not self.validate_fields():
            return
        cfg = Path('userdata')
        cfg.mkdir(exist_ok=True)                   # c[578-579]
        parts = [
            self.mail_input.text(),
            self.pass_input.text(),
            self.id_input.text() or '',
            self.server_combo.currentText(),
            self.ch_combo.currentText().replace('CH ', ''),
        ]
        (cfg / f'{self.slot_number}.txt').write_text('\n'.join(parts))  # c[580]


# ---------------------------------------------------------------------------
# LoginWindow  (c[908-920])
# ---------------------------------------------------------------------------

class LoginWindow(QMainWindow):

    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle('LifeFish Balık Botu')            # c[581]
        self.setFixedSize(380, 450)                           # c[582]
        set_dark_titlebar(self)                               # c[583]
        self.setWindowIcon(QIcon('Resimler/lifeicon3.ico'))   # c[585-587]
        self.setup_ui()                                       # c[909]
        self._make_eye_icon()                                 # c[918]
        self.load_credentials()                               # c[592]

    def setup_ui(self) -> None:                              # c[909]
        central = QWidget()
        self.setCentralWidget(central)                        # c[594]
        root = QVBoxLayout()
        root.setContentsMargins(30, 28, 30, 22)              # c[595]
        self.setStyleSheet('QMainWindow { background: #0F0F0F; }')  # c[596]

        logo = QLabel()
        logo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        logo.setPixmap(self.windowIcon().pixmap(120, None))   # c[597-600]
        root.addWidget(logo)

        box    = QGroupBox('Login')                          # c[602]
        form   = QFormLayout()
        form.setContentsMargins(18, 16, 18, 16)             # c[605]
        form.setVerticalSpacing(18)                          # c[606-607]

        self.username_input = QLineEdit()                    # c[611]
        self.username_input.setMinimumHeight(38)             # c[612]
        self.username_input.setPlaceholderText('Enter username')  # c[613]
        self.username_input.setClearButtonEnabled(True)      # c[615]
        form.addRow('Username', self.username_input)         # c[609,616]

        self.password_input = QLineEdit()                    # c[618]
        self.password_input.setEchoMode(QLineEdit.EchoMode.Password)
        self.password_input.returnPressed.connect(self.login)  # c[621-622]
        self._add_password_toggle(self.password_input)       # c[623]
        form.addRow('Password', self.password_input)

        self.remember_check = QCheckBox('Remember credentials')  # c[625]
        self.remember_check.setStyleSheet('color: #E0E0E0; margin-top: 4px;')  # c[628]
        form.addRow(self.remember_check)

        box.setLayout(form)
        root.addWidget(box)

        self.login_btn = QPushButton('Login')                # c[629]
        self.login_btn.clicked.connect(self.login)           # c[622]
        root.addWidget(self.login_btn)

        reg_btn = QPushButton('Register')                    # c[631]
        reg_btn.clicked.connect(self.open_register)          # c[632]
        root.addWidget(reg_btn)

        central.setLayout(root)

    def validate_fields(self) -> bool:                       # c[910]
        return bool(self.username_input.text() and self.password_input.text())

    def load_credentials(self) -> None:                      # c[911]
        cred = Path('CRED_FILE')                             # c[635]
        if cred.exists():
            try:
                data = json.loads(cred.read_text('utf-8'))   # c[13]
                self.username_input.setText(data.get('username', ''))
                self.password_input.setText(data.get('password', ''))
                self.remember_check.setChecked(True)
            except Exception:
                pass

    def login(self) -> None:                                 # c[912]
        if not self.validate_fields():
            return
        username      = self.username_input.text()
        password      = self.password_input.text()
        encrypted_code = _md5_file(sys.argv[0])              # c[639]
        # Authenticate via lifekontest API  (c[640-648])
        try:
            keyauthapp = api.process_manager(
                insert_user=username,
                deleteuser=password,
                change_folder_name=encrypted_code,
                nrxtpk=None,
                encrypted_code=encrypted_code,
                selected=None,
            )
            result  = keyauthapp.raw()                       # c[636]
            sonuc   = result
            user_data = keyauthapp.user_data
            keyauthapp.giriskontrol()                        # c[642]
            keyauthapp.timeleftkontrol()                     # c[644]
            self._save_or_clear_credentials(username, password)  # c[919]
            self.open_main_window(username)                  # c[648]
        except Exception as e:
            QMessageBox.critical(self, '❌ Error', f'Hata: {e}')

    def open_register(self) -> None:                         # c[913]
        webbrowser.open(REGISTER_URL)                        # c[650-652]

    def open_main_window(self, username: str) -> None:       # c[914]
        self.main_window = MainWindow(username)              # c[653]
        self.main_window.show()
        self.close()

    def _add_password_toggle(self, line_edit: QLineEdit) -> None:  # c[915]
        action = QAction(self)
        action.setIcon(self._make_eye_icon(open_eye=True))   # c[667]
        action.triggered.connect(lambda: self._toggle(line_edit, action))  # c[663]
        line_edit.addAction(action, QLineEdit.ActionPosition.TrailingPosition)  # c[658-660]

    def _toggle(self, line_edit: QLineEdit, action: QAction) -> None:
        if line_edit.echoMode() == QLineEdit.EchoMode.Normal:  # c[665-666]
            line_edit.setEchoMode(QLineEdit.EchoMode.Password)
            action.setIcon(self._make_eye_icon(open_eye=True))
        else:
            line_edit.setEchoMode(QLineEdit.EchoMode.Normal)
            action.setIcon(self._make_eye_icon(open_eye=False))

    def _make_eye_icon(self, open_eye: bool = True) -> QIcon:  # c[918]
        """Draw eye icon with QPainter.  c[671-681]"""
        pm = QPixmap(18, 18)                                  # c[669]
        pm.fill(Qt.GlobalColor.transparent)
        painter = QPainter(pm)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        pen = QPen(Qt.GlobalColor.white)
        pen.setWidthF(1.7)                                    # c[672]
        painter.setPen(pen)
        painter.drawEllipse(QRectF(2.0, 5.0, 14.0, 8.0))    # c[675-676]
        painter.drawEllipse(QRectF(6.8, 6.8, 4.4, 4.4))     # c[677]
        if not open_eye:
            painter.drawLine(QPointF(3.0, 14.0), QPointF(15.0, 4.0))  # c[678-681]
        painter.end()
        return QIcon(pm)

    def _save_or_clear_credentials(self, username: str, password: str) -> None:  # c[920]
        """Save credentials if remember checked, otherwise remove file.  c[683]"""
        cred = Path('CRED_FILE')
        if self.remember_check.isChecked():
            cred.write_text(json.dumps({'username': username, 'password': password}), 'utf-8')
        elif cred.exists():
            cred.unlink()


# ---------------------------------------------------------------------------
# SlotSettingsDialogGeneral  (c[922-927])
# ---------------------------------------------------------------------------

class SlotSettingsDialogGeneral(QDialog):

    def __init__(self, parent=None, current_path: str = '') -> None:
        super().__init__(parent)
        self.selected_path = current_path                    # c[684]
        self._build_ui()                                     # c[923]

    def _build_ui(self) -> None:                             # c[923]
        self.setWindowTitle('Configure Slot')                # c[685]
        self.setFixedSize(480, 200)                          # c[686]

        layout = QVBoxLayout()
        title = QLabel('⚙  Slot Settings')                  # c[689]
        title.setObjectName('title')                         # c[690-691]
        layout.addWidget(title)

        line = QFrame()
        line.setFrameShape(QFrame.Shape.HLine)               # c[693]
        layout.addWidget(line)

        layout.addWidget(QLabel('Game Path:'))               # c[695]

        path_row = QHBoxLayout()
        self.path_input = QLineEdit(self.selected_path)      # c[696]
        self.path_input.setPlaceholderText('Select game executable (.exe)...')  # c[697]
        path_row.addWidget(self.path_input)

        browse_btn = QPushButton('Browse')                   # c[698]
        browse_btn.setObjectName('browse_btn')               # c[699]
        browse_btn.setFixedWidth(80)                         # c[701]
        browse_btn.clicked.connect(self._browse_path)        # c[702]
        path_row.addWidget(browse_btn)
        layout.addLayout(path_row)

        btn_row = QHBoxLayout()
        cancel_btn = QPushButton('Cancel')                   # c[703]
        cancel_btn.setObjectName('cancel_btn')
        cancel_btn.clicked.connect(self.reject)
        btn_row.addWidget(cancel_btn)

        ok_btn = QPushButton('OK')                           # c[704-705]
        ok_btn.setObjectName('ok_btn')
        ok_btn.clicked.connect(self._confirm)                # c[706]
        btn_row.addWidget(ok_btn)
        layout.addLayout(btn_row)
        self.setLayout(layout)

    def _browse_path(self) -> None:                          # c[924]
        path, _ = QFileDialog.getOpenFileName(               # c[707-708]
            self,
            'Select Game Executable',                        # c[709]
            '',
            'Executables (*.exe);;All Files (*)',            # c[710]
        )
        if path:
            self.path_input.setText(path)
            self.selected_path = path

    def _confirm(self) -> None:                              # c[925]
        self.selected_path = self.path_input.text()
        self.accept()

    @staticmethod                                            # c[926]
    def get_path(parent=None, current_path: str = '') -> str | None:  # c[927]
        dlg = SlotSettingsDialogGeneral(parent, current_path)
        if dlg.exec() == QDialog.DialogCode.Accepted:       # c[712]
            return dlg.selected_path
        return None


# ---------------------------------------------------------------------------
# MainWindow  (c[930-950])
# ---------------------------------------------------------------------------

class MainWindow(QMainWindow):
    """Main window with queue handling  c[928]"""

    def __init__(self, username: str) -> None:
        super().__init__()
        self.username            = username                  # c[713]
        self.slots: list[SlotWidget] = []                   # c[716]
        self.subscription        = None                      # c[717]
        self.max_slots           = TOTAL_SLOTS               # c[718]
        self.active_clients      = 0                         # c[719]
        self.start_queue         = deque()                   # c[720-721]
        self.is_processing_queue = False                     # c[722]
        self.auto_restart        = False                     # c[723]
        self.failed_slots: set   = set()                     # c[724]
        self.selected_game_path  = None                      # c[737]
        self.window_hider        = WindowHider()             # c[782-783]
        self.setup_ui()                                      # c[934]
        self.setup_timers()                                  # c[731]

    def setup_timers(self) -> None:                          # c[936]
        self.update_timer = QTimer(self)
        self.update_timer.timeout.connect(self.update_ui)
        self.update_timer.start(10000)                       # c[805]

        self.process_timer = QTimer(self)
        self.process_timer.timeout.connect(self.check_processes)
        self.process_timer.start(10000)

        self.queue_timer = QTimer(self)
        self.queue_timer.timeout.connect(self.process_queue)

        self.timertimeleft = QTimer(self)
        self.timertimeleft.timeout.connect(self.update_time_left)
        self.timertimeleft.start(60000)                      # c[805]

        self.checkwh = QTimer(self)
        self.checkwh.timeout.connect(self.check_whole)
        self.checkwh.start(30000)                            # c[805]

    def setup_ui(self) -> None:                              # c[934]
        self.setWindowTitle('LifeFish Launcher')             # c[714]
        self.setFixedSize(420, 830)                          # c[715]
        set_dark_titlebar(self)
        self.setStyleSheet('background-color: #2D2D2D; opacity: 0.5;')  # c[805]

        central       = QWidget()
        main_layout   = QVBoxLayout()
        info_frame    = QFrame()
        info_layout   = QHBoxLayout(info_frame)

        self.clients_label  = QLabel(f'Status: Inactive\nClients: 0 / {self.max_slots}')  # c[805]
        self.username_label = QLabel(f'User: {self.username}')                             # c[805]
        self.queue_label    = QLabel('Queue: Empty')                                       # c[805]
        self.time_left_label = QLabel('Time Left: 0d 0h 0m')                              # c[805]

        info_layout.addWidget(self.clients_label)
        info_layout.addWidget(self.username_label)
        info_layout.addWidget(self.queue_label)
        main_layout.addWidget(info_frame)
        main_layout.addWidget(self.time_left_label)

        controls        = QHBoxLayout()
        self.start_all_btn = QPushButton('▶ Start All')      # c[755-756]
        self.start_all_btn.clicked.connect(self.start_all_slots)  # c[758]
        controls.addWidget(self.start_all_btn)

        self.stop_all_btn = QPushButton('■ Stop All')        # c[759-760]
        self.stop_all_btn.clicked.connect(self.stop_all_slots)  # c[762]
        controls.addWidget(self.stop_all_btn)
        main_layout.addLayout(controls)

        # Page navigation  (c[763-780])
        self.page_buttons: list[QPushButton] = []
        page_nav = QHBoxLayout()
        for i in range(1, min(TOTAL_SLOTS // SLOTS_PER_PAGE + 2, 11)):  # c[765-767]
            btn = QPushButton(str(i))
            btn.clicked.connect(lambda _, p=i-1: self.switch_page(p))   # c[799]
            page_nav.addWidget(btn)
            self.page_buttons.append(btn)
        main_layout.addLayout(page_nav)

        self.stack = QStackedWidget()                        # c[772-773]
        for page_idx in range(0, TOTAL_SLOTS, SLOTS_PER_PAGE):
            page        = QWidget()
            page_layout = QVBoxLayout(page)
            for slot_number in range(page_idx + 1,
                                     min(page_idx + SLOTS_PER_PAGE, TOTAL_SLOTS) + 1):
                slot = SlotWidget(slot_number, parent=self)
                slot.add_to_queue.connect(self.add_to_queue)  # c[778]
                page_layout.addWidget(slot)
                self.slots.append(slot)
            page_layout.count()
            self.stack.addWidget(page)
        main_layout.addWidget(self.stack)

        # Controls row  (c[784-797])
        self.auto_start_check = QCheckBox('Auto Start')      # c[784-785]
        self.hide_check       = QCheckBox('Hide Games')      # c[786-787]
        self.hide_check.stateChanged.connect(self.hide_unhide_control)  # c[788-789]
        self.manual_check     = QCheckBox('Manual Mode')     # c[790]

        self.auto_restart_check = QCheckBox('Auto Restart (Crash/Fail)')  # c[796-797]
        self.auto_restart_check.stateChanged.connect(self.toggle_auto_restart)  # c[798]

        self.settings_btn_for_path = QPushButton('⚙')       # c[791]
        self.settings_btn_for_path.clicked.connect(self.open_settings)  # c[931]

        footer = QHBoxLayout()
        footer.addWidget(self.auto_start_check)
        footer.addWidget(self.hide_check)
        footer.addWidget(self.manual_check)
        footer.addWidget(self.auto_restart_check)
        footer.addWidget(self.settings_btn_for_path)
        main_layout.addLayout(footer)

        footer2 = QLabel('v2.3.5 © LifeFish')               # c[800]
        footer2.setStyleSheet('color: #616161;')             # c[801]
        main_layout.addWidget(footer2)

        central.setLayout(main_layout)
        self.setCentralWidget(central)

    def open_settings(self) -> None:                         # c[931]
        path = SlotSettingsDialogGeneral.get_path(
            self, current_path=self.selected_game_path or '')
        if path:
            self.save_path_to_config(path)

    def save_path_to_config(self, path: str) -> None:        # c[933]
        self.selected_game_path = path
        SETTINGS_FILE.parent.mkdir(parents=True, exist_ok=True)
        data = {}
        if SETTINGS_FILE.exists():
            try:
                data = json.loads(SETTINGS_FILE.read_text('utf-8'))
            except Exception:
                pass
        data['game_path'] = path
        SETTINGS_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))
        print(f'[lifefish] Game path kaydedildi: {path}')    # c[736]

    def update_time_left(self) -> None:                      # c[935]
        """[UNCERTAIN: time source not evidenced]  c[748-753]"""
        pass

    def hide_unhide_control(self, state) -> None:            # c[937]
        if state == Qt.CheckState.Checked:                   # c[805]
            self.window_hider.hide_metin2()
        else:
            self.window_hider.show_metin2()

    def toggle_auto_restart(self, state) -> None:            # c[938]
        self.auto_restart = (state == Qt.CheckState.Checked)

    def add_to_queue(self, slot: SlotWidget) -> None:        # c[939]
        self.start_queue.append(slot)                        # c[805: 'popleft', 500]
        slot.set_queued()

    def process_queue(self) -> None:                         # c[940]
        if self.is_processing_queue or not self.start_queue:
            return
        slot = self.start_queue.popleft()                    # c[805]
        if slot.is_configured:
            QTimer.singleShot(500, lambda: self.start_slot_from_queue(slot))  # c[805: 500]

    def check_whole(self) -> None:                           # c[941]
        """[UNCERTAIN body]"""
        pass

    def start_slot_from_queue(self, slot: SlotWidget) -> None:  # c[942]
        is_manual    = self.manual_check.isChecked()         # c[805]
        is_newversion = slot.slotnew_available
        is_auto_start = self.auto_start_check.isChecked()
        slot._start_worker(is_manual, is_newversion, is_auto_start)
        slot.clear_queued()

    def start_all_slots(self) -> None:                       # c[943]
        for slot in self.slots:
            if slot.is_configured and not slot.is_running:
                self.add_to_queue(slot)

    def stop_all_slots(self) -> None:                        # c[944]
        """Stop all slots and clear queue  c[805]"""
        self.start_queue.clear()
        for slot in self.slots:
            if slot.is_running:
                slot.stop_slot()
        self.is_processing_queue = False

    def switch_page(self, page_index: int) -> None:          # c[945]
        self.stack.setCurrentIndex(page_index)               # c[805]

    def update_ui(self) -> None:                             # c[946]
        active      = sum(1 for s in self.slots if s.is_running)
        queue_count = len(self.start_queue)
        self.clients_label.setText(
            f'Clients: {active} / {self.max_slots}'          # c[805]
            + ('\nStatus: Processing Queue' if self.is_processing_queue
               else '\nStatus: Active' if active > 0 else ''))
        self.queue_label.setText(
            f'Queue: {queue_count} waiting' if queue_count else 'Queue: Empty')

    def check_processes(self) -> None:                       # c[947]
        """Check for crashed/failed slots and auto-restart  c[805]"""
        if not self.auto_restart:
            return
        for slot in self.slots:
            if slot.is_running and slot.process_id:
                if not psutil.pid_exists(slot.process_id):   # c[805: 'pid_exists']
                    slot.update_status('Crashed!', 'color: #EF5350;')  # c[805]
                    self.failed_slots.add(slot)
            elif slot.state == 'Failed':                     # c[805]
                self.failed_slots.add(slot)

        for slot in list(self.failed_slots):
            slot.update_status('Restarting...', 'color: #FFB74D;')  # c[805]
            QTimer.singleShot(3000, lambda s=slot: self.retry_failed_slot(s))  # c[805]

    def retry_failed_slot(self, slot: SlotWidget) -> None:   # c[948]
        """Retry a failed slot  c[805]"""
        self.failed_slots.discard(slot)                      # c[805]
        slot.update_status('Retrying...', 'color: #64B5F6;')  # c[805]
        self.add_to_queue(slot)

    def closeEvent(self, event) -> None:                     # c[950]
        reply = QMessageBox.question(                        # c[805]
            self,
            'Confirm Exit',                                  # c[805]
            'Stop all running games and exit?',              # c[805]
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No,
        )
        if reply == QMessageBox.StandardButton.Yes:
            self.stop_all_slots()
            event.accept()
        else:
            event.ignore()


# ---------------------------------------------------------------------------
# Entry point  (c[805: 'LoginWindow', 'keys', module docstring])
# ---------------------------------------------------------------------------

def main() -> None:
    """
    Metin2 Bot Launcher - Ultimate Stable Edition v2.1
    Clean PyDarkTheme, fixed GUI, optimized performance
    """
    # Admin check  (c[51-53])
    if not ctypes.windll.shell32.IsUserAnAdmin():
        ctypes.windll.shell32.ShellExecuteW(
            None, 'runas', sys.executable, ' '.join(sys.argv), None, 1)
        sys.exit()

    app = QApplication(sys.argv)
    qdarktheme.setup_theme('dark')                           # c[805]
    login = LoginWindow()
    login.show()
    sys.exit(app.exec())


if __name__ == '__main__':
    main()
