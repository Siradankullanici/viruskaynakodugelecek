import base64

blobs = {
    'AssemblyInfo': 'FQAkODg8P3ZjYz4lIyo+LT8tNGIvKig=',
    'AssistantSerializer': 'FAD+4uLm5ay5uf3z8Pf/5fXzuPXw8g==',
    'Component': 'FQBrd3dzcDksLGVvZmZ0YmhqZC1vbG8=',
    'EditorService': 'GACxra2pquP29r+2ury4v7WsuKug96qxtqk=',
    'FileEditor': 'FQAaBgYCAUhdXRwdExATAQYXEFweHR4=',
    'FileSerializer': 'FQC3q6uvrOXw8KiqrLywtLCst/G8ubs=',
    'IconScope': 'FgAgPDw4O3JnZz89Oy06Oic7JyNmKy4s',
    'MemoryTable': 'GQDl+fn9/reiov34/vrs5OPp7Pnk4qP+5eL9',
    'MethodResolver': 'FQC/o6OnpO34+KG+uLu0orC7ovm0sbM=',
    'NetworkProvider': 'FQDq9vby8bitrfH29+7o7eXj8qzh5OY=',
    'StoreContext': 'FQC/o6OnpO34+KLBtb2zr7m0tqH5v7i7',
    'TemplateStack': 'FwBxbW1paiM2NmppeGp2dm9wem03anF2aQ==',
    'TextFileEventArgs': 'GACfg4OHhM3Y2JGSlpGSg5iVmJaFjtmbmJs=',
    'TextFileScope': 'FAA6JiYiIWh9fSIgJzwzID05fD49Pg==',
    'XmlFileLoader': 'FQDy7u7q6aC1teD76O3z//nz7LT5/P4=',
    'OptionsConverter': 'CgB+cG1xbHs3enZ0EAB6fXc3c2p9fHVwb2s3dxtEgBrfH5wam1rYDd3aXRzajd2a34IAGlgaXA3dmt+EgBubm43enV2bH1/dXhrfDd6dnQTAHhzeGE3fnZ2fnV8eGlwajd6dnQJAGx3aXJ+N3p2dBkAa3huN35wbXFse2xqfGt6dndtfHdtN3p2dBUAa3xpdjd0eG98dzd4aXh6cXw3dmt+FgBqbXZreH58N352dn51fHhpcGo3enZ0',
}

urls = []

for name, blob in blobs.items():
    try:
        # Try padding for OptionsConverter
        if len(blob) % 4 == 2:
            blob += '=='
        elif len(blob) % 4 == 3:
            blob += '='
        raw = base64.b64decode(blob)
    except Exception as e:
        print(f"[{name}] base64 error: {e}")
        continue

    hdr = int.from_bytes(raw[:2], 'little')
    payload = raw[2:]
    
    # Try all single-byte XOR keys
    for key in range(256):
        dec = bytes(b ^ key for b in payload)
        try:
            s = dec.decode('ascii')
            if all(32 <= ord(c) < 127 for c in s):
                if 'https://' in s or 'http://' in s:
                    urls.append((name, key, hdr, s))
                    print(f"[{name}] hdr={hdr} XOR 0x{key:02X}: {s}")
        except:
            pass

print(f"\n=== All decoded URLs ({len(urls)}) ===")
for name, key, hdr, url in sorted(urls, key=lambda x: x[3]):
    print(f"  {url}")
