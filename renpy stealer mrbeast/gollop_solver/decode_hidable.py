"""
Decode obfuscated strings from HidableArkite malware.

SolutionEventArgs.TestWindow(A_0):
- First 2 chars = rotation key (base-16 digits, ';'=11, '<'=12, '='=13, '>'=14, '?'=15)
- Remaining chars = pairs of base-16 digits encoding bytes
- Decoding: byte = ((pair_val + (i ^ num2)) & 0xFF), then ROR by ((key>>4)&7), then XOR with (key + i)

ConfigSet.TestWindow(A_0, A_1):
- Applies XOR with Base64-decoded key to the output of TestWindow
"""
import base64
import re
import os

CHAR_MAP = {}
for i in range(10):
    CHAR_MAP[chr(ord('0') + i)] = i
CHAR_MAP[':'] = 10
CHAR_MAP[';'] = 11
CHAR_MAP['<'] = 12
CHAR_MAP['='] = 13
CHAR_MAP['>'] = 14
CHAR_MAP['?'] = 15

def char_to_val(c):
    if c in CHAR_MAP:
        return CHAR_MAP[c]
    raise ValueError(f"Unknown char: {c} ({ord(c)})")

def ror(val, bits, n=8):
    return ((val >> bits) | (val << (n - bits))) & ((1 << n) - 1)

def decode_solution(s):
    if len(s) < 2:
        return b''
    key = (char_to_val(s[0]) << 4) | char_to_val(s[1])
    num2 = (len(s) - 2) // 2
    result = bytearray(num2)
    for i in range(num2):
        pair_val = (char_to_val(s[2 + i * 2]) << 4) | char_to_val(s[2 + i * 2 + 1])
        v = (pair_val + (i ^ num2)) & 0xFF
        shift = (key >> 4) & 7
        v = ror(v, shift)
        v = (v ^ (key + i)) & 0xFF
        result[i] = v
    return bytes(result)

def decode_config(s, b64_key):
    decoded = decode_solution(s)
    key_bytes = base64.b64decode(b64_key)
    result = bytearray(len(decoded))
    for i in range(len(decoded)):
        result[i] = decoded[i] ^ key_bytes[i % len(key_bytes)]
    return bytes(result).decode('utf-8')

def decode_config_raw(s, b64_key):
    decoded = decode_solution(s)
    key_bytes = base64.b64decode(b64_key)
    result = bytearray(len(decoded))
    for i in range(len(decoded)):
        result[i] = decoded[i] ^ key_bytes[i % len(key_bytes)]
    return bytes(result)

# Test with known values
test_cases = [
    ("270;;?971770?414766;;3>?", "+j9nuYbcNuI=", "XefTrpSlNbj"),
    ("27;7=9;233>4??8<0366<35;:086;1221754177=8?0:=437>4", "++B10k5FqPDbagax", "/token/VioloneNonuple.js"),
    ("27?=298;085>9563<<:2>1;;>4;64834=01>7=<?:8=649270<2=444<?=7960<48986><8429:190<<", "C7dKYgqNTUU=", "%LOCALAPPDATA%/Microsoft/Windows/Caches"),
]

for enc, key, expected in test_cases:
    result = decode_config(enc, key)
    status = "PASS" if result == expected else f"FAIL (expected {expected})"
    print(f"[{status}] {result}")

# Now scan ALL .cs files for ConfigSet.TestWindow calls
print("\n=== Scanning all .cs files for obfuscated strings ===")
base_dir = r"C:\Users\semae\Downloads\SwiftUploads_—_Download_—_D4F1FE005B7C94_Archive_latest_4931\kornali_dll\HidableArkite"

pattern = re.compile(r'ConfigSet\.TestWindow\("([^"]+)",\s*"([^"]+)"\)')

for root, dirs, files in os.walk(base_dir):
    for fn in files:
        if fn.endswith('.cs'):
            fp = os.path.join(root, fn)
            with open(fp, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            for m in pattern.finditer(content):
                enc = m.group(1)
                key = m.group(2)
                try:
                    result = decode_config(enc, key)
                except:
                    result = f"<ERROR: {enc} key={key}>"
                print(f"[{fn}] {result}")
