const fs = require('fs');
const content = fs.readFileSync('youdid.js', 'utf8');

// 1. Extract the String Array
const startMarker = 'function __p_5220026962() {';
const start = content.indexOf(startMarker);
const returnMarker = 'return [';
const bodyStart = content.indexOf(returnMarker, start) + returnMarker.length - 1;
let depth = 0;
let bodyEnd = -1;
for (let i = bodyStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0) { bodyEnd = i + 1; break; }
}
const globalArray = eval(content.substring(bodyStart, bodyEnd));

// 2. Predictor logic
function resolve(p) {
    p = parseInt(p);
    let idx = (p < 96) ? (p + 14) : (p < 2432) ? (p - 97) : (p + 94);
    return globalArray[idx];
}

// 3. Resolve all PREDICT calls
const resolved = content.replace(/__p_7651367862_dLR_0__JS_PREDICT__\((\-?\d+)\)/g, (match, p) => {
    const val = resolve(p);
    return JSON.stringify(val);
});

fs.writeFileSync('youdid_resolved.js', resolved);

// 4. Search for common webhook patterns
const lines = resolved.split('\n');
lines.forEach((line, i) => {
    if (line.includes('discord.com/api/webhooks')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
    if (line.includes('https://') && line.includes('discord')) {
         console.log(`Line ${i+1} (Discord Link): ${line.trim()}`);
    }
});

// Also look for concatenated URLs
const allText = resolved.replace(/\s+/g, '');
const urlMatch = allText.match(/https?:\/\/[a-z0-9\/\.\-\_]+\/webhooks\/[0-9]+\/[a-z0-9A-Z\-\_]+/);
if (urlMatch) {
    console.log('Found full webhook:', urlMatch[0]);
}
