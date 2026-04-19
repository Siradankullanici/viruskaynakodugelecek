import argparse
import base64
from pathlib import Path

from cryptography.hazmat.primitives import hashes, padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

PASSWORD = b"I+0VSBF4/gbs96wJCsDehSIRcTldLB+W"
SALT_B64 = "8qu7BEdICLXtxePz/auyig=="
IV_B64 = "S6mpdvVC4PP9TtuNgaS+sg=="
XOR_VAL = 88
ITERATIONS = 50000

def derive_key(password: bytes, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=ITERATIONS,
    )
    return kdf.derive(password)

def load_encoded_payload(path: str) -> bytes:
    raw = Path(path).read_text(encoding="utf-8").strip()
    decoded = base64.b64decode(raw, validate=True)
    return bytes(b ^ XOR_VAL for b in decoded)

def decrypt_aes_cbc(ciphertext: bytes, key: bytes, iv: bytes) -> bytes:
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    dec = cipher.decryptor()
    padded = dec.update(ciphertext) + dec.finalize()

    try:
        unpadder = padding.PKCS7(128).unpadder()
        return unpadder.update(padded) + unpadder.finalize()
    except Exception:
        return padded

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_file", help="Base64 payload dosyasi")
    ap.add_argument("-o", "--out", help="Cikti dosyasi")
    args = ap.parse_args()

    salt = base64.b64decode(SALT_B64)
    iv = base64.b64decode(IV_B64)
    key = derive_key(PASSWORD, salt)

    ciphertext = load_encoded_payload(args.input_file)
    plaintext = decrypt_aes_cbc(ciphertext, key, iv)

    if args.out:
        Path(args.out).write_bytes(plaintext)
        print(f"[+] Yazildi: {args.out}")
    else:
        try:
            print(plaintext.decode("utf-8"))
        except UnicodeDecodeError:
            print(plaintext.decode("utf-8", errors="replace"))

if __name__ == "__main__":
    main()