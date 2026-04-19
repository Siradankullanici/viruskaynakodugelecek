const fs = require('fs');
const content = fs.readFileSync('crypted_stage1.js', 'utf8');

const startStr = 'function __p_7361442059() {';
const start = content.indexOf(startStr);
const returnMarker = 'return [';
const bodyStart = content.indexOf(returnMarker, start) + returnMarker.length - 1; // Start of [
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

const arrayBody = content.substring(bodyStart, bodyEnd);
const arr = eval(arrayBody);

console.log('Index 148:', arr[148]);
console.log('Index 11:', arr[11]);
