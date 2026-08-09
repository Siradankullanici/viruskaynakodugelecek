#!/usr/bin/env python3
import re
import base64
import sys
from pathlib import Path

# Anahtar: A(b'KkxRF1lMOHU=') -> '__main__' eşleşmesinden
KEY = bytes([0x75, 0x13, 0x3c, 0x76, 0x30, 0x22, 0x67, 0x2a])

def decrypt(encrypted: bytes) -> str:
    data = base64.b64decode(encrypted)
    plain = bytes([data[i] ^ KEY[i % len(KEY)] for i in range(len(data))])
    # Çözülen veriyi string'e çevir, hatalı baytları yok sayma (ama gerçek utf-8 olmalı)
    return plain.decode('utf-8', errors='replace')

def parse_byte_literal(s: str) -> bytes:
    # s örn: b'...' veya b"..."
    return eval(s)

def replace_a_calls(content: str) -> str:
    var_map = {}

    # 1. Tüm değişken atamalarını tara (VAR = b'...')
    assign_pattern = re.compile(r'^([A-Za-z_]\w*)\s*=\s*(b"[^"]*"|b\'[^\']*\')', re.MULTILINE)
    for match in assign_pattern.finditer(content):
        var_name = match.group(1)
        byte_literal = match.group(2)
        try:
            raw = parse_byte_literal(byte_literal)
            plain = decrypt(raw)
            var_map[var_name] = plain
        except Exception:
            pass

    # 2. A(...) çağrılarını çöz
    def replacer(match):
        inside = match.group(1).strip()
        if inside.startswith("b'") or inside.startswith('b"'):
            try:
                raw = parse_byte_literal(inside)
                plain = decrypt(raw)
                # repr() string'i güvenli bir literal olarak döndürür (tırnaklar dahil)
                return repr(plain)
            except Exception:
                return match.group(0)
        elif inside in var_map:
            # Değişkenden al, güvenli literal yap
            return repr(var_map[inside])
        else:
            return match.group(0)

    pattern = re.compile(r'A\(([^)]*)\)')
    new_content = re.sub(pattern, replacer, content)

    # 3. Byte string atamalarını da güvenli string atamalarına çevir
    def assign_replacer(match):
        var_name = match.group(1)
        byte_literal = match.group(2)
        try:
            raw = parse_byte_literal(byte_literal)
            plain = decrypt(raw)
            # repr ile kaçışlı string literal oluştur
            return f"{var_name} = {repr(plain)}"
        except Exception:
            return match.group(0)

    new_content = re.sub(assign_pattern, assign_replacer, new_content)
    return new_content

def main():
    if len(sys.argv) != 3:
        print("Kullanım: python deobfuscate_fixed.py <girdi_dosyası> <çıktı_dosyası>")
        sys.exit(1)

    input_file = Path(sys.argv[1])
    output_file = Path(sys.argv[2])

    if not input_file.exists():
        print(f"Hata: {input_file} bulunamadı.")
        sys.exit(1)

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = replace_a_calls(content)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Çözülmüş ve kaçışlanmış dosya yazıldı: {output_file}")

if __name__ == '__main__':
    main()