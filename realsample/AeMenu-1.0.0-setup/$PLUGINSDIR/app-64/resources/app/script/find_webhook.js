const fs = require('fs');
const content = fs.readFileSync('youdid.js', 'utf8');

const startMarker = 'function __p_5220026962() {';
const start = content.indexOf(startMarker);
const returnMarker = 'return [';
const bodyStart = content.indexOf(returnMarker, start) + returnMarker.length - 1;
let depth = 0;
let bodyEnd = -1;

for (let i = bodyStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0) {
        bodyEnd = i + 1;
        break;
    }
}

const arr = eval(content.substring(bodyStart, bodyEnd));
arr.forEach((s, idx) => {
    if (typeof s === 'string' && (s.includes('discord') || s.includes('http') || s.includes('webhook'))) {
        console.log(`Index ${idx}: ${s}`);
    }
});
