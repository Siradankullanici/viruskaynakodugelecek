const fs = require('fs');
const crypto = require('crypto');

const targetFile = 'crypted_stage1.js';

console.log('Reading crypted_stage1.js...');
const code = fs.readFileSync(targetFile, 'utf8');

function extractVar(varName) {
    console.log(`Extracting ${varName}...`);
    // Match varname = "value" or varname = 'value'
    const regex = new RegExp(`${varName}\\s*=\\s*["']([^"']+)["']`);
    const match = code.match(regex);
    if (!match) {
        console.error(`Could not find ${varName}`);
        return null;
    }
    return match[1];
}

// 1. Extract payload parts
const yskipy2f = extractVar('_yskipy2f');
const _01cdm2rq = extractVar('_01cdm2rq');
const _6l82izqy = extractVar('_6l82izqy');

if (!yskipy2f || !_01cdm2rq || !_6l82izqy) {
    console.error('Failed to extract payload components.');
    process.exit(1);
}

// 2. Extract AES parameters from the payload array assignment
// Pattern: __p_5085254448_dispatcher_0_payload = [_a36as6cf, "SALT", "PASS", "IV"];
const dispatcherRegex = /__p_5085254448_dispatcher_0_payload\s*=\s*\[_a36as6cf,\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]/;
const dispatcherMatch = code.match(dispatcherRegex);

if (!dispatcherMatch) {
    console.error('Failed to extract dispatcher parameters.');
    process.exit(1);
}

const saltB64 = dispatcherMatch[1];
const passB64 = dispatcherMatch[2];
const ivB64 = dispatcherMatch[3];

console.log('Extracted Parameters:');
console.log(' - Salt (B64):', saltB64);
console.log(' - Pass (B64):', passB64);
console.log(' - IV (B64):', ivB64);

// 3. Reconstruct _a36as6cf (XOR stage)
console.log('Reconstructing base buffer and applying XOR...');
const baseBuffer = Buffer.from(yskipy2f + _01cdm2rq + _6l82izqy, 'base64');
const xorBuffer = Buffer.alloc(baseBuffer.length);
for (let i = 0; i < baseBuffer.length; i++) {
    xorBuffer[i] = baseBuffer[i] ^ 45;
}

// 4. AES Decryption
console.log('Performing AES-256-CBC Decryption...');
try {
    const salt = Buffer.from(saltB64, 'base64');
    const password = Buffer.from(passB64, 'base64');
    const iv = Buffer.from(ivB64, 'base64');

    // Deriving Key using PBKDF2 (Common pattern in this obfuscator)
    const key = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = Buffer.concat([decipher.update(xorBuffer), decipher.final()]);

    fs.writeFileSync('stage2.js', decrypted);
    console.log('Success! stage2.js has been extracted.');
} catch (e) {
    console.error('Decryption failed:', e.message);
    
    // Fallback: Some versions use the literals directly or different PBKDF2
    console.log('Trying alternative decryption (Literal key/iv)...');
    try {
        const key = Buffer.from(passB64, 'base64');
        const iv = Buffer.from(ivB64, 'base64');
        // If password is 32 bytes and iv is 16 bytes, it might be direct
        if (key.length === 32 && iv.length === 16) {
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = Buffer.concat([decipher.update(xorBuffer), decipher.final()]);
            fs.writeFileSync('stage2.js', decrypted);
            console.log('Success with literal key/iv! stage2.js extracted.');
        } else {
             console.error('Literals are wrong size.');
        }
    } catch (e2) {
        console.error('Alternative decryption failed:', e2.message);
    }
}
