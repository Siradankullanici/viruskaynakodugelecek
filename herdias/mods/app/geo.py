import re
import base64
from Crypto.Cipher import AES

# Koddaki yeni Key ve IV değerleri
KEY = bytes([114,162,232,43,45,202,231,38,119,135,113,13,96,210,135,160,81,81,19,250,65,135,6,215,44,175,215,204,90,152,208,167])
IV = bytes([135,40,175,148,91,4,87,156,210,177,72,9,56,211,104,33])

# Dil paketi sıralaması
PACK_ORDER = ["en-US", "de-DE", "fr-FR", "es-ES", "pt-BR", "ja-JP", "ko-KR", "tr-TR"]

def extract_locale_packs_from_file(file_path: str) -> dict:
    """JS dosyası içinden LOCALE_PACKS değerlerini regex ile otomatik yakalar."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    packs = {}
    for name in PACK_ORDER:
        # "en-US": "..." veya 'en-US': "..." kalıplarını yakalar
        pattern = rf'["\']?{re.escape(name)}["\']?\s*:\s*["\']([^"\'\n]+)["\']'
        match = re.search(pattern, content)
        if match:
            packs[name] = match.group(1)
        else:
            packs[name] = ""
    return packs

def assemble_locale_blob(packs: dict) -> str:
    """assembleLocaleBlob metodunun birebir simülasyonu."""
    out = ""
    for i, name in enumerate(PACK_ORDER):
        part = str(packs.get(name, ''))
        if i == len(PACK_ORDER) - 1:
            hash_idx = part.rfind('#')
            if hash_idx > 0 and (len(part) - hash_idx) <= 12:
                part = part[:hash_idx]
        out += part
    return out

def decrypt_update_module(js_file_path="main.js", output_path="unpacked_update.js"):
    print(f"[1] '{js_file_path}' okunuyor...")
    
    try:
        packs = extract_locale_packs_from_file(js_file_path)
        found_keys = [k for k, v in packs.items() if v]
        print(f"[+] Bulunan Dil Parçaları ({len(found_keys)}/{len(PACK_ORDER)}): {found_keys}")

        if not any(packs.values()):
            print("[-] Hata: LOCALE_PACKS verileri JS dosyası içinde bulunamadı!")
            return

        packed_base64 = assemble_locale_blob(packs)
        encrypted_bytes = base64.b64decode(packed_base64)

        print("[2] AES-256-CTR ile deşifre ediliyor...")
        cipher = AES.new(KEY, AES.MODE_CTR, initial_value=IV, nonce=b'')
        decrypted_bytes = cipher.decrypt(encrypted_bytes)
        
        decrypted_text = decrypted_bytes.decode('utf-8', errors='ignore')

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(decrypted_text)

        print(f"[+] BAŞARILI! Çözülen Kod Kaydedildi: {output_path}")

    except FileNotFoundError:
        print(f"[-] Hata: '{js_file_path}' bulunamadı. Lütfen dosyanın aynı dizinde olduğundan emin olun.")
    except Exception as e:
        print(f"[-] Hata oluştu: {e}")

if __name__ == "__main__":
    # Analiz edilecek dosya adı (Varsayılan: main.js)
    decrypt_update_module("unpacked_telemetry.js", "unpacked_update.js")