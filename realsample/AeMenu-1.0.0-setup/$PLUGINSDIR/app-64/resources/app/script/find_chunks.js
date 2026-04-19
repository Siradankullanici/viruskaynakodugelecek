const fs = require('fs');
const content = fs.readFileSync('crypted_stage1.js', 'utf8');

// Find all const _xxxxxxx = "......" where string is long
const regex = /const (_[0-9a-z]{7}) = "([^"]{1000,})"/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log(`${match[1]}: ${match[2].length} chars`);
}

// Find line 590 specifically
const lines = content.split('\n');
console.log('Line 590 full:', lines[589].substring(0, 500));
