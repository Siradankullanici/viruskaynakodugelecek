const crypto = require('crypto');
const fs = require('fs');

const INPUT_FILE = 'payload.b64';
const OUTPUT_FILE = 'stage2.js';

try {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`[-] Hata: ${INPUT_FILE} bulunamadı. Önce extractor.js çalıştırmalısınız.`);
        process.exit(1);
    }

    const encryptedB64 = fs.readFileSync(INPUT_FILE, 'utf8').trim();

    // Şifreleme Parametreleri (crypted_stage1.js dispatcher logic'den alınmıştır)
    const password = 'I+0VSBF4/gbs96wJCsDehSIRcTldLB+W';
    const salt = Buffer.from('8qu7BEdICLXtxePz/auyig==', 'base64');
    const iv = Buffer.from('S6mpdvVC4PP9TtuNgaS+sg==', 'base64');

    console.log('[+] Key türetiliyor (50,000 iterations)...');
    const key = crypto.pbkdf2Sync(password, salt, 50000, 32, 'sha256');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    console.log('[+] Decrypt işlemi başlatılıyor...');
    let decrypted = decipher.update(encryptedB64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    fs.writeFileSync(OUTPUT_FILE, decrypted, 'utf8');
    console.log(`[+] Başarılı: ${OUTPUT_FILE} oluşturuldu.`);

} catch (err) {
    console.error('[-] Decrypt hatası:', err.message);
}
