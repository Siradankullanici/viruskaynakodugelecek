const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const targetFile = path.join(__dirname, 'crypted_stage1.js');
console.log('Opening:', targetFile);

const content = fs.readFileSync(targetFile, 'utf8');

// Extraction logic for ciphertext chunks
// We know they are at lines 587, 588, 589
const lines = content.split('\n');

function extractString(line) {
    const match = line.match(/"([^"]+)"/);
    return match ? match[1] : '';
}

const yskipy2f = extractString(lines[586]); // Line 587
const cdm2rq = extractString(lines[587]);   // Line 588
const l82izqy = extractString(lines[588]); // Line 589

if (!yskipy2f || !cdm2rq || !l82izqy) {
    console.error('Failed to extract ciphertext chunks. Check line numbers.');
    process.exit(1);
}

const assembledCiphertext = yskipy2f + cdm2rq + l82izqy;
const initialBuffer = Buffer.from(assembledCiphertext, 'base64');

console.log('Applying XOR transformation...');
const transformedBuffer = initialBuffer.map(b => b ^ 45);
const a36as6cf = transformedBuffer.toString('utf8');

// Decryption Parameters (Extracted from line 1171)
const masterKey = "I+0VSBF4/gbs96wJCsDehSIRcTldLB+W";
const salt = "8qu7BEdICLXtxePz/auyig==";
const ivBase64 = "S6mpdvVC4PP9TtuNgaS+sg==";

console.log('Deriving key...');
const key = crypto.pbkdf2Sync(masterKey, Buffer.from(salt, 'base64'), 50000, 32, 'sha256');

console.log('Decrypting...');
const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivBase64, 'base64'));

// The dispatcher uses _dc.update(_xz1sqohb, 'base64', 'utf8')
let decrypted = decipher.update(a36as6cf, 'base64', 'utf8');
decrypted += decipher.final('utf8');

const outputFile = path.join(__dirname, 'stage2_decrypted.js');
fs.writeFileSync(outputFile, decrypted);

console.log('Success! Stage 2 saved to:', outputFile);
console.log('Decrypted size:', decrypted.length);
