const crypto = require('crypto');
const fs = require('fs');

const TARGET_FILE = 'crypted_stage1.js';

try {
    const content = fs.readFileSync(TARGET_FILE, 'utf8');
    const extractVar = (name) => {
        const regex = new RegExp(`const ${name}\\s*=\\s*["'](.*?)["']`, 's');
        const match = content.match(regex);
        return match ? match[1] : null;
    };

    const _yskipy2f = extractVar('_yskipy2f');
    const _01cdm2rq = extractVar('_01cdm2rq');
    const _6l82izqy = extractVar('_6l82izqy');

    const fullBase64 = _yskipy2f + _01cdm2rq + _6l82izqy;
    const buf = Buffer.from(fullBase64, 'base64');

    const password = 'I+0VSBF4/gbs96wJCsDehSIRcTldLB+W';
    const salt = Buffer.from('8qu7BEdICLXtxePz/auyig==', 'base64');
    const iv = Buffer.from('S6mpdvVC4PP9TtuNgaS+sg==', 'base64');
    const key = crypto.pbkdf2Sync(password, salt, 50000, 32, 'sha256');

    for (let x = 0; x < 256; x++) {
        const xored = buf.map(b => b ^ x).toString('utf8');
        // Only try if it looks somewhat like base64
        if (!/^[A-Za-z0-9+/=\s\n\r]+$/.test(xored.substring(0, 100))) continue;

        try {
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(xored, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            
            console.log(`[!] SUCCESS! XOR Key: ${x}`);
            fs.writeFileSync('stage2.js', decrypted, 'utf8');
            console.log('[+] stage2.js created.');
            process.exit(0);
        } catch (e) {
            // console.log(`Key ${x} failed: ${e.message}`);
        }
    }
    console.log('[-] No key worked.');

} catch (err) {
    console.error('[-] Error:', err.message);
}
