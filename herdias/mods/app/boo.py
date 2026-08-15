import re
import base64
from Crypto.Cipher import AES

# Yeni Key ve IV değerleri
KEY = bytes([69,18,161,201,67,6,33,92,111,162,54,32,78,180,30,245,86,28,171,200,175,75,118,250,49,73,92,240,246,150,120,215])
IV = bytes([205,193,245,36,222,223,52,27,1,1,154,6,123,221,52,17])

# Yeni Credential anahtar sırası
CREDENTIAL_ORDER = [
    'ORACLE_API_KEY',
    'CDN_ACCESS_TOKEN',
    'LICENSE_SECRET',
    'TELEMETRY_HMAC',
    'SESSION_SEED',
    'GRAPH_CLIENT_SECRET',
    'STORE_CHECKOUT_KEY',
    'UPDATE_CHANNEL_TOKEN',
]

def extract_config_from_file(file_path: str) -> dict:
    """JS dosyası içinden API_CONFIG / Credential değerlerini regex ile otomatik yakalar."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    cfg = {}
    for name in CREDENTIAL_ORDER:
        # "ORACLE_API_KEY": "..." veya 'ORACLE_API_KEY': "..." kalıplarını yakalar
        pattern = rf'["\']?{re.escape(name)}["\']?\s*:\s*["\']([^"\'\n]+)["\']'
        match = re.search(pattern, content)
        if match:
            cfg[name] = match.group(1)
        else:
            cfg[name] = ""
    return cfg

def assemble_credential_blob(cfg: dict) -> str:
    """assembleCredentialBlob metodunun birebir simülasyonu."""
    out = ""
    for name in CREDENTIAL_ORDER:
        part = str(cfg.get(name, ''))
        dot = part.rfind('.')
        if name == 'UPDATE_CHANNEL_TOKEN' and dot > 0 and (len(part) - dot) <= 16:
            part = part[:dot]
        out += part
    return out

def decrypt_credentials_module(js_file_path="main.js", output_path="unpacked_credentials.js"):
    print(f"[1] '{js_file_path}' okunuyor...")
    
    try:
        cfg = extract_config_from_file(js_file_path)
        found_keys = [k for k, v in cfg.items() if v]
        print(f"[+] Bulunan Credential Parçaları ({len(found_keys)}/{len(CREDENTIAL_ORDER)}): {found_keys}")

        if not any(cfg.values()):
            print("[-] Hata: API_CONFIG / Credential verileri JS dosyası içinde bulunamadı!")
            return

        packed_base64 = assemble_credential_blob(cfg)
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
    decrypt_credentials_module("unpacked_update.js", "unpacked_credentials.js")