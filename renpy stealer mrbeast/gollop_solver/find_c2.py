"""
Find the C2 hostname by:
1. Searching for all obfuscated strings across codebase  
2. Looking at how URIs are constructed in PaneService.cs
3. Checking the handlerMap bytecode for embedded string data
4. Checking raw DLL for any potential hostname
"""

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
    import base64
    decoded = decode_solution(s)
    key_bytes = base64.b64decode(b64_key)
    result = bytearray(len(decoded))
    for i in range(len(decoded)):
        result[i] = decoded[i] ^ key_bytes[i % len(key_bytes)]
    return bytes(result).decode('utf-8')

base = r"C:\Users\semae\Downloads\SwiftUploads_—_Download_—_D4F1FE005B7C94_Archive_latest_4931"

# 1. Scan ALL .cs files for ALL obfuscated strings
print("=== Scanning all .cs files for ConfigSet.TestWindow calls ===")
cs_dir = os.path.join(base, "kornali_dll", "HidableArkite")
pattern = re.compile(r'ConfigSet\.TestWindow\("([^"]+)",\s*"([^"]+)"\)')
results = {}
for root, dirs, files in os.walk(cs_dir):
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
                    print(f"[{fn}] {result}")
                    if fn not in results:
                        results[fn] = []
                    results[fn].append(result)
                except:
                    pass

# 2. Now check the PaneService.cs for the rootUri etc. lambdas
print("\n=== Checking PaneService.cs around rootUri/nextUri/activeUri ===")
with open(os.path.join(cs_dir, "PaneService.cs"), 'r', encoding='utf-8', errors='replace') as f:
    pane_content = f.read()

# Extract lines around rootUri assignments
for keyword, label in [('rootUri', 'rootUri'), ('nextUri', 'nextUri'), ('activeUri', 'activeUri')]:
    lines = pane_content.split('\n')
    for i, line in enumerate(lines):
        if keyword in line:
            start = max(0, i-3)
            end = min(len(lines), i+5)
            print(f"\n--- {label} at L{i+1} ---")
            for j in range(start, end):
                print(f"  L{j+1}: {lines[j].strip()[:200]}")

# 3. Check PaneService.cs return sites 
print("\n\n=== PaneService.cs return sites for rootUri/nextUri/activeUri ===")
for keyword in ['return PaneService.<>c.rootUri', 'return PaneService.<>c.nextUri', 'return PaneService.<>c.activeUri']:
    lines = pane_content.split('\n')
    for i, line in enumerate(lines):
        if keyword in line:
            # Find the containing method
            # Look backwards for a method definition
            print(f"\n--- {keyword.strip()} at L{i+1} ---")
            for j in range(max(0, i-10), min(len(lines), i+3)):
                print(f"  L{j+1}: {lines[j].strip()[:200]}")
