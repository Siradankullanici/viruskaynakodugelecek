#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os
import sys
from collections import deque

# ---------- 1. EKSİK İTHALATLARI EKLE ----------
def add_missing_imports(code):
    if 'import time' not in code:
        code = 'import time\n' + code
    if 'import json' not in code and 'json.loads' in code:
        code = code.replace('import requests', 'import requests\nimport json')
    # GPUtil zaten import edilmiş ama hata alınıyorsa try-except ile sar
    return code

# ---------- 2. YİNELEYEN FONKSİYON TANIMLARINI KALDIR ----------
def remove_duplicate_function_defs(code):
    # Üst seviyedeki boş fonksiyonları kaldır (içeride tekrar tanımlanacaklar)
    # collect_system_info, collect_discord_tokens, collect_wallets_apps, collect_browser_data, collect_roblox_cookies
    lines = code.split('\n')
    new_lines = []
    skip_until_indent_zero = False
    current_indent = 0
    for line in lines:
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        # Eğer üst seviyede (indent 0) ve bu fonksiyonlardan biri tanımlanıyorsa, atla
        if indent == 0 and stripped.startswith('def collect_') and stripped.endswith(':'):
            # Bu fonksiyonun içindeki her şeyi atla (indent > 0 olana kadar)
            skip_until_indent_zero = True
            continue
        if skip_until_indent_zero:
            if indent == 0:
                skip_until_indent_zero = False
                # Bu satırı da işle (fonksiyon tanımı değilse)
            else:
                continue
        if not skip_until_indent_zero:
            new_lines.append(line)
    return '\n'.join(new_lines)

# ---------- 3. TANIMSIZ DEĞİŞKENLERİ DÜZELT ----------
def fix_undefined_variables(code):
    # wallet_app_paths -> wallet_wasabi_list (collect_wallets_apps içinde)
    code = code.replace('wallet_app_paths', 'wallet_wasabi_list')
    # browser_paths ve extension_mapping collect_browser_data içinde tanımlanmamış.
    # Onları collect_browser_data içinde tanımlayalım.
    # Bunu yapmak için collect_browser_data içine bu değişkenlerin tanımını ekleyelim.
    # Basitçe, 'def collect_browser_data' bloğunun başına ekleyelim.
    # Ama regex ile yapmak zor, elle düzeltme önerelim veya yaklaşık bir ekleme yapalım.
    # Ben, collect_browser_data içinde tanımlı olan listeyi bulup, onu browser_paths ve extension_mapping olarak kullanacağım.
    # Aslında bu değişkenler orada tanımlanmamış, ama orada bir liste döndürülüyor. O listeyi browser_paths olarak alalım.
    # Kodda şöyle bir satır var: return [('Google Chrome', ...), ...] -> bu browser_paths olmalı.
    # Bunu yakalayıp, o listenin üzerine browser_paths değişkeni atayalım.
    # Ayrıca extension_mapping için, orada bir 'Metamask' listesi var, onu extension_mapping olarak kullanalım.
    # Kodda: "- Username    :  = [('Metamask', ...)]" var. Bunu extension_mapping = ... yapalım.
    # Regex ile yakala.
    
    # 1. browser_paths tanımını ekle: collect_browser_data içinde, return listesini browser_paths değişkenine ata.
    # 2. extension_mapping tanımını ekle: Metamask listesini extension_mapping değişkenine ata.
    
    # Zor olduğu için, bu kısmı elle yapmak daha iyi. Ama otomatik için şöyle yapalım:
    # browser_paths değişkenini, collect_browser_data'nın sonundaki return listesinden al.
    # Ama orada return ifadesi var. O return ifadesini, önce browser_paths = ... yap, sonra return.
    # Bunu regex ile yapabiliriz.
    
    # Önce collect_browser_data fonksiyonunu bul.
    # Basit yaklaşım: "def collect_browser_data" satırından sonra gelen ve "return [" ile başlayan satırı bul, onu "browser_paths = [" yap.
    # Ve "extension_mapping" için, "- Username" satırını bul.
    
    # Uygulama:
    lines = code.split('\n')
    new_lines = []
    in_collect_browser = False
    collect_browser_indent = 0
    in_extension_list = False
    for i, line in enumerate(lines):
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        if 'def collect_browser_data' in line and line.endswith(':'):
            in_collect_browser = True
            collect_browser_indent = indent + 4  # standart 4 boşluk
            new_lines.append(line)
            # hemen sonra browser_paths tanımını ekle? Hayır, listenin kendisini değiştireceğiz.
            continue
        if in_collect_browser and stripped.startswith('return [(') and indent == collect_browser_indent:
            # bu satırı browser_paths = ... yap
            new_lines.append(' ' * collect_browser_indent + 'browser_paths = ' + stripped[7:])  # return [ -> [
            continue
        if in_collect_browser and stripped.startswith('- Username    :  = [('):
            # extension_mapping tanımı
            new_lines.append(' ' * collect_browser_indent + 'extension_mapping = ' + stripped.split('= ')[1])
            in_extension_list = True
            continue
        if in_collect_browser and in_extension_list and stripped == ')':
            # listenin sonu, kapat
            new_lines.append(line)
            in_extension_list = False
            continue
        # Eğer 'return (extensions_count, ...' satırı varsa, onu olduğu gibi bırak
        if in_collect_browser and stripped.startswith('return (extensions_count'):
            new_lines.append(line)
            in_collect_browser = False
            continue
        new_lines.append(line)
    
    code = '\n'.join(new_lines)
    
    # Ayrıca run_stealer_main() çağrısını kaldır (tanımsız)
    code = code.replace('run_stealer_main()', '')
    return code

# ---------- 4. GİRİNTİ DÜZELTME (Blok Tabanlı) ----------
def fix_indentation(code):
    lines = code.split('\n')
    new_lines = []
    stack = deque()  # (type, indent, block_start_line)
    current_indent = 0
    prev_line_indent = 0
    prev_line_stripped = ""
    
    # Geçici olarak tüm satırları temizle (sağdaki boşluklar)
    lines = [line.rstrip() for line in lines]
    
    for i, line in enumerate(lines):
        if not line.strip():
            new_lines.append(line)
            continue
        
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        
        # Eğer satır 'except', 'else', 'elif', 'finally' ile başlıyorsa, bir önceki blok seviyesine çek
        if stripped.startswith(('except ', 'except:', 'else:', 'elif ', 'finally:')):
            # Bir üstteki try/if/for bloğunun indentini bul
            target_indent = 0
            for t in reversed(stack):
                if t[0] in ('try', 'if', 'for', 'while', 'with'):
                    target_indent = t[1]
                    break
            # Eğer stack boşsa 0
            new_line = ' ' * target_indent + stripped
            new_lines.append(new_line)
            # Bu satır blok başlangıcı olabilir (else:)
            if stripped.endswith(':'):
                stack.append(('else', target_indent + 4, i))
            continue
        
        # Eğer satır 'return', 'pass', 'break', 'continue' ile başlıyorsa, mevcut blok seviyesinde kalmalı
        if stripped.startswith(('return ', 'return', 'pass', 'break', 'continue')):
            # Eğer indent, bir önceki satırdan fazlaysa, düzelt
            if len(stack) > 0 and indent > stack[-1][1]:
                # Bir önceki blok seviyesine çek
                target_indent = stack[-1][1] if stack else 0
                new_line = ' ' * target_indent + stripped
                new_lines.append(new_line)
                continue
            else:
                new_lines.append(line)
                continue
        
        # Eğer satır ':' ile bitiyorsa ve blok başlangıcıysa (if, for, while, def, class, try, with)
        if stripped.endswith(':') and not stripped.startswith(('except ', 'except:', 'else:', 'elif ', 'finally:')):
            # Mevcut indent'i koru, stack'e ekle
            stack.append((stripped.split()[0], indent + 4, i))
            new_lines.append(line)
            continue
        
        # Normal satır
        # Eğer indent çok fazla ise, stack'teki son seviyeye çek
        if len(stack) > 0 and indent > stack[-1][1]:
            # Fazla girinti varsa düzelt
            target_indent = stack[-1][1]
            new_line = ' ' * target_indent + stripped
            new_lines.append(new_line)
        else:
            new_lines.append(line)
    
    return '\n'.join(new_lines)

# ---------- 5. ÖZEL SYNTAX HATALARINI DÜZELT ----------
def fix_syntax_errors(code):
    # f-string içinde dictionary erişimi: {api_data['avatar']} -> {api_data.get('avatar')}
    code = re.sub(r"\{api_data\['avatar'\]\}", "{api_data.get('avatar', '')}", code)
    # çift tırnak içinde tek tırnak vs.
    code = re.sub(r"replace\(' ', '_'\)", 'replace(" ", "_")', code)
    # Eksik ':' olan if/else (ör: 'if not os.path.exists(generic_path):' zaten var)
    # Bazı if'lerde : yok, ama onları düzeltmek zor. Birkaç yaygın olanı düzelt.
    # 'if process_obj.name().lower() == process_name.lower():' zaten var.
    # Hatalı 'except Exception:' altındaki bloklar.
    return code

# ---------- 6. ANA DÖNÜŞÜM ----------
def full_deobfuscate_v2(input_file, output_file):
    if not os.path.exists(input_file):
        print(f"Hata: {input_file} bulunamadı.")
        return

    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
        code = f.read()

    print("[1/6] Eksik ithalatlar ekleniyor...")
    code = add_missing_imports(code)

    print("[2/6] Yinelenen fonksiyon tanımları kaldırılıyor...")
    code = remove_duplicate_function_defs(code)

    print("[3/6] Tanımsız değişkenler düzeltiliyor...")
    code = fix_undefined_variables(code)

    print("[4/6] Özel sözdizimi hataları düzeltiliyor...")
    code = fix_syntax_errors(code)

    print("[5/6] Girintiler yeniden düzenleniyor (blok tabanlı)...")
    code = fix_indentation(code)

    print("[6/6] Son rötuşlar yapılıyor...")
    # Ana akışı main() içine al (isteğe bağlı)
    # Basitçe en sona if __name__ == '__main__': ekleyelim ama önce mevcut akışı koruyalım.
    # Bu çok karışık, şimdilik atlıyorum.

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(code)

    print(f"\n✅ İkinci deobfuscation tamamlandı! Çıktı: {output_file}")
    print("⚠️ UYARI: Kod hala zararlıdır. Çalıştırmayın! Ayrıca bazı girinti hataları kalabilir.")
    print("   Özellikle collect_browser_data ve collect_discord_tokens içindeki bloklar elle kontrol edilmeli.")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.replace('.py', '_fixed.py')
    else:
        input_file = 'malware_deobfuscated_final.py'
        output_file = 'malware_fixed.py'
    full_deobfuscate_v2(input_file, output_file)