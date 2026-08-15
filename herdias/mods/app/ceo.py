import re
import base64
from Crypto.Cipher import AES

# Bu dosyaya özel yeni Key ve IV değerleri
KEY = bytes([107,72,108,58,161,228,61,70,2,31,241,142,92,223,144,83,28,90,137,59,82,177,100,151,212,86,63,250,223,199,160,87])
IV = bytes([144,84,15,233,95,138,135,4,86,172,229,97,136,77,64,137])

# Yeni sıralama dizisi
SHARD_ORDER = ["startup_ms", "gpu_ok", "net_rtt", "disk_free", "mem_peak", "crash_rate", "session_id", "build_hash"]

def extract_shards_from_file(file_path: str) -> dict:
    """JS dosyası içinden METRIC_SHARDS değerlerini Otomatik Yakalar."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    shards = {}
    for name in SHARD_ORDER:
        # startup_ms: "..." veya "startup_ms": "..." kalıplarını yakalar
        pattern = rf'["\']?{name}["\']?\s*:\s*["\']([^"\'\n]+)["\']'
        match = re.search(pattern, content)
        if match:
            shards[name] = match.group(1)
        else:
            shards[name] = ""
    return shards

def assemble_metric_blob(shards: dict) -> str:
    """JS içerisindeki assembleMetricBlob mantığının birebir simülasyonu."""
    out = ""
    for i, name in enumerate(SHARD_ORDER):
        part = str(shards.get(name, ''))
        if i == len(SHARD_ORDER) - 1:
            tilde = part.rfind('~')
            if tilde > 0 and (len(part) - tilde) <= 14:
                part = part[:tilde]
        out += part
    return out

def decrypt_telemetry(js_file_path="main.js", output_path="unpacked_telemetry.js"):
    print(f"[1] '{js_file_path}' okunuyor...")
    
    try:
        # 1. Parçaları otomatik çıkar
        shards = extract_shards_from_file(js_file_path)
        found_keys = [k for k, v in shards.items() if v]
        print(f"[+] Bulunan Telemetri Parçaları ({len(found_keys)}/{len(SHARD_ORDER)}): {found_keys}")

        if not any(shards.values()):
            print("[-] Hata: Şifreli parçalar JS dosyası içinde bulunamadı!")
            return

        # 2. Blob birleştirme
        packed_base64 = assemble_metric_blob(shards)
        encrypted_bytes = base64.b64decode(packed_base64)

        # 3. AES-256-CTR Şifre Çözme
        print("[2] AES-256-CTR ile deşifre ediliyor...")
        cipher = AES.new(KEY, AES.MODE_CTR, initial_value=IV, nonce=b'')
        decrypted_bytes = cipher.decrypt(encrypted_bytes)
        
        decrypted_text = decrypted_bytes.decode('utf-8', errors='ignore')

        # 4. Çıktıyı Kaydet
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(decrypted_text)

        print(f"[+] BAŞARILI! Çözülen Gizli Kod Kaydedildi: {output_path}")

    except FileNotFoundError:
        print(f"[-] Hata: '{js_file_path}' bulunamadı. Lütfen dosyanın aynı dizinde olduğundan emin olun.")
    except Exception as e:
        print(f"[-] Hata oluştu: {e}")

if __name__ == "__main__":
    # Kodun bulunduğu JS dosyasının adını belirtin (Varsayılan: main.js)
    decrypt_telemetry("unpacked_payload.js", "unpacked_telemetry.js")