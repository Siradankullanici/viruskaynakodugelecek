import base64, binascii

blob = 'CgB+cG1xbHs3enZ0EAB6fXc3c2p9fHVwb2s3dxtEgBrfH5wam1rYDd3aXRzajd2a34IAGlgaXA3dmt+EgBubm43enV2bH1/dXhrfDd6dnQTAHhzeGE3fnZ2fnV8eGlwajd6dnQJAGx3aXJ+N3p2dBkAa3huN35wbXFse2xqfGt6dndtfHdtN3p2dBUAa3xpdjd0eG98dzd4aXh6cXw3dmt+FgBqbXZreH58N352dn51fHhpcGo3enZ0'
raw = binascii.a2b_base64(blob + '=')
print(f'Total: {len(raw)} bytes')

# Skip 2-byte header, treat rest as flat data
data = raw[2:]
print(f'Payload: {len(data)} bytes')

# Scan for any position+XOR key that produces 'https://'
print('\n=== Scanning for "https://" in sliding window ===')
for pos in range(len(data) - 8):
    for key in range(256):
        match = True
        target = b'https://'
        for j in range(8):
            if pos + j >= len(data) or (data[pos + j] ^ key) != target[j]:
                match = False
                break
        if match:
            # Found! Decode from this position onwards
            dec = bytes(b ^ key for b in data[pos:pos+60])
            s = dec.decode('ascii', errors='replace')
            print(f'  pos={pos} XOR 0x{key:02X}: {s}')

print('\n=== Scanning for "http" in sliding window ===')
for pos in range(len(data) - 4):
    for key in range(256):
        match = True
        target = b'http'
        for j in range(4):
            if pos + j >= len(data) or (data[pos + j] ^ key) != target[j]:
                match = False
                break
        if match:
            dec = bytes(b ^ key for b in data[pos:pos+50])
            s = dec.decode('ascii', errors='replace')
            if all(32 <= ord(c) < 127 for c in s):
                print(f'  pos={pos} XOR 0x{key:02X}: {s}')
