import base64
import hashlib
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

# ConfigProvider.java içindeki sabitler
IV = bytes([74, 31, -77 & 0xFF, 124, -30 & 0xFF, 88, -87 & 0xFF, 13, -10 & 0xFF, 52, -57 & 0xFF, 107, 21, -114 & 0xFF, 66, -48 & 0xFF])

def derive_key() -> bytes:
    """ConfigProvider.deriveKey() metodunun birebir Python karşılığı."""
    buf = bytearray(24)
    l1 = 23769660738897431
    l2 = 28234781715493252
    
    for i in range(8):
        buf[i] = (l1 >> (56 - i * 8)) & 0xFF
        buf[8 + i] = (l2 >> (56 - i * 8)) & 0xFF
        
    buf[16] = 97   # 'a'
    buf[17] = 116  # 't'
    buf[18] = 105  # 'i'
    buf[19] = 111  # 'o'
    buf[20] = 110  # 'n'
    buf[21] = 33   # '!'
    buf[22] = (buf[0] ^ buf[10]) & 0xFF
    buf[23] = (buf[5] ^ buf[15]) & 0xFF
    
    # SHA-256 Digest
    return hashlib.sha256(buf).digest()

def aes_decrypt(encrypted_b64: str) -> str:
    """ConfigProvider.dec() metodunun birebir Python karşılığı."""
    aes_key = derive_key()
    encrypted_bytes = base64.b64decode(encrypted_b64)
    
    cipher = AES.new(aes_key, AES.MODE_CBC, IV)
    decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
    return decrypted_bytes.decode('utf-8')

def decrypt_p_bin(p_bin_path: str, raw_b64_key: str, output_exe_path: str):
    print("[1] AES anahtarı türetiliyor...")
    
    # 1. Base64 şifreli string'i AES/CBC ile çözerek gerçek Hex anahtarı elde et
    try:
        hex_key_str = aes_decrypt(raw_b64_key)
        print(f"[+] Şifresi Çözülen Gerçek Hex Anahtar: {hex_key_str}")
    except Exception as e:
        print(f"[-] AES Şifre Çözme Hatası: {e}")
        return

    # 2. Hex string'i byte dizisine dönüştür (TraceMod.a(String) metodunun yaptığı işlem)
    key_bytes = bytes.fromhex(hex_key_str)
    key_len = len(key_bytes)

    # 3. p.bin dosyasını oku
    with open(p_bin_path, "rb") as f:
        encrypted_p_bin = f.read()

    # 4. XOR şifre çözme işlemi
    print("[2] p.bin dosyasına XOR uygulanıyor...")
    decrypted_payload = bytearray(len(encrypted_p_bin))
    for i in range(len(encrypted_p_bin)):
        decrypted_payload[i] = encrypted_p_bin[i] ^ key_bytes[i % key_len]

    # 5. Dosya başlığını (Header) doğrulama
    if decrypted_payload[:2] == b'MZ':
        print("[+] BAŞARILI! Geçerli bir Windows PE Executable (.exe) elde edildi.")
    else:
        print("[!] UYARI: Çıktı 'MZ' başlığı ile başlamıyor, dosya hasarlı olabilir.")

    # 6. Dosyayı kaydet
    with open(output_exe_path, "wb") as f:
        f.write(decrypted_payload)
    print(f"[+] Temizlenmiş Zararlı Yazılım Kaydedildi: {output_exe_path}")

if __name__ == "__main__":
    # TraceMod.java içerisindeki şifreli anahtar dizgisi
    TARGET_B64_KEY = "dNJsFdRkm8nYmrC4y+PbAgChyVn/qBl5sDDJlaCYWv7hcy38exs8gVpT4QQ9wx24DQyW/UL2OK6UmPCHXjnRN5SLSLOwHX7psqIrbCc4F2Y="
    
    # p.bin ve bu python script'i aynı klasörde olmalıdır
    decrypt_p_bin("p.bin", TARGET_B64_KEY, "extracted_payload.exe")