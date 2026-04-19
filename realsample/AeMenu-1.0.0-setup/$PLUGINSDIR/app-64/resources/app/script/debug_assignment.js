const fs = require('fs');
const content = fs.readFileSync('crypted_stage1.js', 'utf8');

const marker = 'const _a36as6cf =';
const start = content.indexOf(marker);
if (start === -1) {
    console.log('Marker not found');
} else {
    // Find the end of the assignment (the line ends with a string conversion usually)
    // Actually, let's grab the next 5000 chars to be safe
    console.log('Assignment start:', start);
    // Find the next .toString(
    const toStringIdx = content.indexOf('.toString(', start);
    const endOfLine = content.indexOf(');', toStringIdx);
    console.log('Full Assignment Code:');
    console.log(content.substring(start, endOfLine + 2));
}
