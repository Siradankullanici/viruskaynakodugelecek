import base64, binascii

blobs = {
    'AssemblyInfo': ('FQAkODg8P3ZjYz4lIyo+LT8tNGIvKig=', 0x4C),
    'AssistantSerializer': ('FAD+4uLm5ay5uf3z8Pf/5fXzuPXw8g==', 0x96),
    'Component': ('FQBrd3dzcDksLGVvZmZ0YmhqZC1vbG8=', 0x03),
    'EditorService': ('GACxra2pquP29r+2ury4v7WsuKug96qxtqk=', 0xD9),
    'FileEditor': ('FQAaBgYCAUhdXRwdExATAQYXEFweHR4=', 0x72),
    'FileSerializer': ('FQC3q6uvrOXw8KiqrLywtLCst/G8ubs=', 0xDF),
    'IconScope': ('FgAgPDw4O3JnZz89Oy06Oic7JyNmKy4s', 0x48),
    'MemoryTable': ('GQDl+fn9/reiov34/vrs5OPp7Pnk4qP+5eL9', 0x8D),
    'MethodResolver': ('FQC/o6OnpO34+KG+uLu0orC7ovm0sbM=', 0xD7),
    'NetworkProvider': ('FQDq9vby8bitrfH29+7o7eXj8qzh5OY=', 0x82),
    'TemplateStack': ('FwBxbW1paiM2NmppeGp2dm9wem03anF2aQ==', 0x19),
    'TextFileEventArgs': ('GACfg4OHhM3Y2JGSlpGSg5iVmJaFjtmbmJs=', 0xF7),
    'TextFileScope': ('FAA6JiYiIWh9fSIgJzwzID05fD49Pg==', 0x52),
    'XmlFileLoader': ('FQDy7u7q6aC1teD76O3z//nz7LT5/P4=', 0x9A),
}

print("=== Decoded strings ===")
for name, (blob, key) in sorted(blobs.items()):
    if len(blob) % 4 == 2:
        blob += '=='
    elif len(blob) % 4 == 3:
        blob += '='
    raw = base64.b64decode(blob)
    hdr = int.from_bytes(raw[:2], 'little')
    payload = raw[2:]
    dec = bytes(b ^ key for b in payload)
    s = dec.decode('ascii')
    print(f'{name}: {s}')

# Also decode StoreContext differently
print('\n=== StoreContext (trying all XOR keys) ===')
blob = 'FQC/o6OnpO34+KLBtb2zr7m0tqH5v7i7'
raw = base64.b64decode(blob)
hdr = int.from_bytes(raw[:2], 'little')
payload = raw[2:]
print(f'Header: {hdr}, Payload: {len(payload)} bytes')
for key in range(256):
    dec = bytes(b ^ key for b in payload)
    try:
        s = dec.decode('ascii')
        if all(32 <= ord(c) < 127 for c in s) and any(c.isalpha() for c in s):
            print(f'  XOR 0x{key:02X}: {s}')
    except:
        pass
