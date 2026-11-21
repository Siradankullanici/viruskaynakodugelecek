import json
import urllib.request
import urllib.error

# Hedef Webhook URL'si
# WEBHOOK_URL = "https://ptb.discord.com/api/webhooks/1566784978459562008/Ob_p2ylMPLt3c-uoF2ZPI-c9xphSSQ8jOpFGZe8cwTjVBKmHlIAxIFa9xgvECHmIqhB8"

WEBHOOK_URL = "https://ptb.discord.com/api/webhooks/1569780307647926352/60eOa5FUgVSz5Fr5XVyu0snXaJUfsCbnl6MY7q4R2YDxtiq6ztZeIIwfWtGnfRM0ll0e"

def get_webhook_info(url: str):
    """Webhook'un aktif olup olmadığını ve kanal bilgilerini kontrol eder."""
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "SecurityAuditor/1.0"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"[+] Webhook Aktif:")
            print(f"    İsim     : {data.get('name')}")
            print(f"    Kanal ID : {data.get('channel_id')}")
            print(f"    Sunucu ID: {data.get('guild_id')}")
            return data
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print("[-] Webhook zaten silinmiş veya geçersiz (404 Not Found).")
        else:
            print(f"[-] Hata oluştu: {e.code} - {e.reason}")
        return None


def send_message(url: str, message: str, username: str = "Takedown Notice"):
    """Webhook'a mesaj gönderir."""
    payload = json.dumps({
        "content": message,
        "username": username
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "User-Agent": "SecurityAuditor/1.0"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status in (200, 204):
                print(f"[+] Mesaj başarıyla iletildi (Status: {resp.status}).")
    except urllib.error.HTTPError as e:
        print(f"[-] Mesaj gönderilemedi: {e.code} - {e.reason}")
    except Exception as e:
        print(f"[-] Beklenmeyen hata: {e}")


def delete_webhook(url: str):
    """
    Webhook'u kalıcı olarak siler (Discord sunucusundan kaldırır).
    Token URL içerisinde yer aldığından ek bir Discord yetkisi gerekmez.
    """
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "SecurityAuditor/1.0"},
        method="DELETE"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status == 204:
                print("[+] BAŞARILI: Webhook kalıcı olarak silindi (204 No Content).")
                print("    Artık bu adrese veri gönderilemez veya veri alınamaz.")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print("[-] Webhook zaten silinmiş veya bulunamadı (404 Not Found).")
        else:
            print(f"[-] Webhook silinemedi: {e.code} - {e.reason}")
    except Exception as e:
        print(f"[-] Beklenmeyen hata: {e}")


if __name__ == "__main__":
    print("--- 1. Webhook Durumu Kontrol Ediliyor ---")
    info = get_webhook_info(WEBHOOK_URL)

    if info:
        while True:
            print("\n--- 2. Bilgilendirme / Uyarı Mesajı Gönderiliyor ---")
            send_message(
                WEBHOOK_URL,
                "no virus hydra_dragon_antivirus spam babapro edition",
                username="Malware Remediation Bot"
            )

        print("\n--- 3. Webhook Kalıcı Olarak Siliniyor ---")
        # delete_webhook(WEBHOOK_URL)

        print("\n--- 4. Silinme Teyidi Yapılıyor ---")
        #get_webhook_info(WEBHOOK_URL)