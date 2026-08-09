import marshal
import importlib.util
import time

# 1. marshal dosyasını oku
with open("payload8.marshal", "rb") as f:
    co = marshal.load(f)

# 2. .pyc olarak yaz
with open("payload9.pyc", "wb") as f:
    f.write(importlib.util.MAGIC_NUMBER)   # doğru magic
    f.write(b"\x00\x00\x00\x00")           # flags
    f.write(int(time.time()).to_bytes(4, "little"))  # timestamp
    f.write(b"\x00\x00\x00\x00")           # size
    marshal.dump(co, f)

print("[+] payload9.pyc yazıldı")