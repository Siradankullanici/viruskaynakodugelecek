import struct
import zstandard as zstd

# Key from Xeno.dll.c sub_1800027A0 (lines 50989-50992)
q1 = 0xCABF61ED4550FD3E
q2 = 0x966607D092A1EF57
q3 = 0x3649BD1221F7C5FD
q4 = 0xBBF52AA919B33F7A
key = struct.pack('<QQQQ', q1, q2, q3, q4)
print('[*] XOR Key (32 bytes):', key.hex())

# Read encrypted file
with open('ep.zst.enc.txt', 'rb') as f:
    data = f.read()
print('[*] Encrypted size:', len(data), 'bytes')

# XOR decrypt (repeating key, as in sub_18018C140)
decrypted = bytes(data[i] ^ key[i % len(key)] for i in range(len(data)))
print('[*] Decrypted (zstd) first 8 bytes:', decrypted[:8].hex())

# Verify zstd magic
val = struct.unpack_from('<I', decrypted[:4])[0]
if val != 0xFD2FB528:
    print('[-] zstd magic mismatch: 0x{:08X}'.format(val))
    exit(1)
print('[+] zstd magic OK (0xFD2FB528)')

# Decompress
try:
    dctx = zstd.ZstdDecompressor()
    payload = dctx.decompress(decrypted, max_output_size=100 * 1024 * 1024)
    print('[+] Decompressed size:', len(payload), 'bytes')

    # Write output
    with open('ep.zst.dec', 'wb') as f:
        f.write(payload)
    print('[+] Written to ep.zst.dec')

    # Print first 512 bytes as text (if printable)
    preview = payload[:512]
    try:
        text = preview.decode('utf-8', errors='replace')
        print('\n--- Preview (first 512 bytes) ---')
        print(text)
    except Exception as e:
        print('[*] Binary content, first 64 bytes hex:', preview[:64].hex())

except Exception as e:
    print('[-] Decompression failed:', e)
    print('[*] Raw decrypted hex (first 32):', decrypted[:32].hex())
