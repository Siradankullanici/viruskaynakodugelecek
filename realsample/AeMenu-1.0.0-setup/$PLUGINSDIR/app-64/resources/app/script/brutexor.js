const fs = require("fs");
const TARGET_FILE = 'crypted_stage1.js';

try {
    const content = fs.readFileSync(TARGET_FILE, 'utf8');
    const extractVar = (name) => {
        const regex = new RegExp(`const ${name}\\s*=\\s*["'](.*?)["']`, 's');
        const match = content.match(regex);
        return match ? match[1] : null;
    };

    const vars = ['_yskipy2f', '_01cdm2rq', '_6l82izqy'];
    const fullB64 = vars.map(extractVar).join('');
    const buf = Buffer.from(fullB64, 'base64');
    
    console.log(`Buffer size: ${buf.length}`);
    
    for (let x = 0; x < 256; x++) {
        // Try XOR key x
        const head = buf.slice(0, 100).map(b => b ^ x);
        const s = head.toString('utf8');
        // If it starts looking like base64 or meaningful text
        if (/^[A-Za-z0-9+/=]{10,}/.test(s)) {
             console.log(`Key ${x}: ${s.substring(0, 50)}...`);
        }
    }
} catch (e) {
    console.error(e);
}
