/* 
 * Stage 2 Perfect Extractor
 * Instructions: Save as extract_perfect.js and run with 'node extract_perfect.js'
 */
const fs = require('fs');
const crypto = require('crypto');

const SOURCE_FILE = 'crypted_stage1.js';
console.log(`[+] Loading ${SOURCE_FILE}...`);
const src = fs.readFileSync(SOURCE_FILE, 'utf8');

// 1. Extract the Global String Table and Predict Function
console.log(`[+] Extracting deobfuscation tables...`);
const arrayMatch = src.match(/function __p_7361442059\(\) \{[\s\S]*?return (\[[\s\S]*?\]);/);
const globalArray = eval(arrayMatch[1]);
const __p_2066170545 = globalArray;

function __p_1901050902_dLR_0__JS_PREDICT__(index_param) {
    return __p_2066170545[index_param > 192 ? index_param - 48 : index_param - -99];
}

// 2. Extract the massive ciphertext chunks
function getConst(name) {
    const match = src.match(new RegExp(`const ${name} = "([^"]+)"`));
    return match ? match[1] : '';
}
const chunks = getConst('_yskipy2f') + getConst('_01cdm2rq') + getConst('_6l82izqy');

// 3. Extract and Replay the Mapping Function
// We extract the code block between .map(function (b) { and the corresponding }).toString(
console.log(`[+] Reconstructing Byte Mapper...`);
const mapStartIdx = src.indexOf('.map(function (b) {') + 5; // Start at function(b)
let depth = 1;
let mapEndIdx = -1;
for (let i = mapStartIdx + 17; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') depth--;
    if (depth === 0) {
        mapEndIdx = i + 1;
        break;
    }
}
const mapperCode = src.substring(mapStartIdx, mapEndIdx);
const mapperFunc = new Function('b', '__p_1901050902_dLR_0__JS_PREDICT__', '__p_2066170545', `return (${mapperCode})(b)`);

// 4. Execute Layer 1 (Base64 + Mapper)
console.log(`[+] Processing Layer 1 (this may take a few seconds)...`);
const initialBuffer = Buffer.from(chunks, 'base64');
const layer1Result = initialBuffer.map(b => mapperFunc(b, __p_1901050902_dLR_0__JS_PREDICT__, __p_2066170545));
const internalBase64 = layer1Result.toString('utf8');

// 5. Final Stage 2 AES Decryption
console.log(`[+] Executing Final Decryption...`);
const masterKey = "I+0VSBF4/gbs96wJCsDehSIRcTldLB+W";
const salt = Buffer.from("8qu7BEdICLXtxePz/auyig==", 'base64');
const iv = Buffer.from("S6mpdvVC4PP9TtuNgaS+sg==", 'base64');

const key = crypto.pbkdf2Sync(masterKey, salt, 50000, 32, "sha256");
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

try {
    let stage2 = decipher.update(internalBase64, 'base64', 'utf8');
    stage2 += decipher.final('utf8');

    fs.writeFileSync('stage2_fully_perfect.js', stage2);
    console.log(`[!] SUCCESS: Stage 2 extracted to stage2_fully_perfect.js`);
    console.log(`[!] Size: ${stage2.length} bytes`);
} catch (e) {
    console.error(`[-] Error during final decryption: ${e.message}`);
}
