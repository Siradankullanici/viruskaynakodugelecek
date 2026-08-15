import re
import base64
from Crypto.Cipher import AES

# Koddaki sabit Key ve IV değerleri
KEY = bytes([34,3,181,78,67,131,112,98,23,166,22,2,162,249,21,51,153,87,117,18,41,57,114,117,102,140,182,166,172,55,36,19])
IV = bytes([125,47,135,28,104,56,80,89,124,230,182,252,40,184,83,230])
SLOT_ORDER = ["seat_a", "seat_b", "seat_c", "seat_d", "seat_e", "seat_f", "seat_g", "seat_h"]

def extract_slots_from_file(file_path: str) -> dict:
    """main.js içinden LICENSE_SLOTS objesini regex ile otomatik çıkarır."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    slots = {}
    for slot in SLOT_ORDER:
        # seat_a: "..." veya "seat_a": "..." kalıplarını yakalar
        pattern = rf'["\']?{slot}["\']?\s*:\s*["\']([^"\'\n]+)["\']'
        match = re.search(pattern, content)
        if match:
            slots[slot] = match.group(1)
        else:
            slots[slot] = ""
    return slots

def assemble_license_blob(slots: dict) -> str:
    """JS içerisindeki assembleLicenseBlob mantığını uygular."""
    out = ""
    for i, slot_id in enumerate(SLOT_ORDER):
        part = str(slots.get(slot_id, ''))
        if i == len(SLOT_ORDER) - 1:
            eq = part.rfind('=')
            if eq > 0 and (len(part) - eq) <= 14:
                part = part[:eq]
        out += part
    return out

def decrypt_main_js(main_js_path="main.js", output_path="unpacked_payload.js"):
    print(f"[1] '{main_js_path}' dosyası okunuyor...")
    
    try:
        # 1. SLOT verilerini otomatik oku
        slots = extract_slots_from_file(main_js_path)
        print(f"[+] Bulunan Koltuk Parçaları: {list(slots.keys())}")

        # 2. Base64 dizesini birleştir
        packed_base64 = assemble_license_blob(slots)
        if not packed_base64:
            print("[-] Hata: main.js içinde LICENSE_SLOTS parçaları bulunamadı!")
            return

        # 3. Base64'ten byte'a çevir
        encrypted_bytes = base64.b64decode(packed_base64)

        # 4. AES-256-CTR ile deşifre et
        print("[2] AES-256-CTR ile şifre çözülüyor...")
        cipher = AES.new(KEY, AES.MODE_CTR, initial_value=IV, nonce=b'')
        decrypted_bytes = cipher.decrypt(encrypted_bytes)
        
        decrypted_text = decrypted_bytes.decode('utf-8', errors='ignore')

        # 5. Sonucu dosyaya kaydet
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(decrypted_text)

        print(f"[+] BAŞARILI! Çözülmüş kod kaydedildi: {output_path}")

    except FileNotFoundError:
        print(f"[-] Hata: '{main_js_path}' dosyası bulunamadı. Lütfen dosyanın aynı klasörde olduğundan emin olun.")
    except Exception as e:
        print(f"[-] Bir hata oluştu: {e}")

if __name__ == "__main__":
    # main.js dosyası ile aynı klasörde çalıştırın
    decrypt_main_js("main.js", "unpacked_payload.js")