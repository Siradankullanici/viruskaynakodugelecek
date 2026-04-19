const crypto = require('crypto');
const fs = require('fs');

const TARGET_FILE = 'crypted_stage1.js';

try {
    // 1. Dosyayı oku
    if (!fs.existsSync(TARGET_FILE)) {
        console.error(`[-] Hata: ${TARGET_FILE} bulunamadı.`);
        process.exit(1);
    }
    const content = fs.readFileSync(TARGET_FILE, 'utf8');

    // 2. Regex ile değişkenleri ayıkla
    const extractVar = (name) => {
        const regex = new RegExp(`const ${name}\\s*=\\s*["'](.*?)["']`, 's');
        const match = content.match(regex);
        return match ? match[1] : null;
    };

    const _yskipy2f = extractVar('_yskipy2f');
    const _01cdm2rq = extractVar('_01cdm2rq');
    const _6l82izqy = extractVar('_6l82izqy');

    if (!_yskipy2f || !_01cdm2rq || !_6l82izqy) {
        throw new Error("Değişkenler dosya içinde bulunamadı. Regex eşleşmedi.");
    }

    console.log('[+] Değişkenler dosyadan başarıyla okundu.');

    // 3. Parçaları birleştir, XOR (45) işlemini uygula ve UTF8 string'e çevir
    const fullBase64 = _yskipy2f + _01cdm2rq + _6l82izqy;
    const xoredBuffer = Buffer.from(fullBase64, 'base64').map(b => b ^ 45);
    const encryptedB64 = xoredBuffer.toString('utf8');

    console.log('[+] XOR decode ve string dönüşümü tamam.');

    // 4. Şifreleme Parametreleri
    const password = 'I+0VSBF4/gbs96wJCsDehSIRcTldLB+W';
    const salt = Buffer.from('8qu7BEdICLXtxePz/auyig==', 'base64');
    const iv = Buffer.from('S6mpdvVC4PP9TtuNgaS+sg==', 'base64');

    // 5. Key Türetme ve Decryption
    const key = crypto.pbkdf2Sync(password, salt, 50000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let result = decipher.update(encryptedB64, 'base64', 'utf8');
    result += decipher.final('utf8');

    // 6. Sonucu kaydet
    fs.writeFileSync('stage2.js', result, 'utf8');
    console.log('[+] İşlem tamam: stage2.js oluşturuldu.');

} catch (err) {
    console.error('[-] Bir hata oluştu:', err.message);
}