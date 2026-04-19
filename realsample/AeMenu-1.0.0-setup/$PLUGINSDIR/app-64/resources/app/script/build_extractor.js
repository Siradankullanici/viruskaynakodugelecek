const fs = require('fs');
const path = require('path');

const TARGET_FILE = 'crypted_stage1.js';
const OUTPUT_FILE = 'extractor.js';

try {
    const lines = fs.readFileSync(TARGET_FILE, 'utf8').split('\n');
    
    // Line 1170 is where _a36as6cf assignment ends (including .toString("utf8"))
    // Line 1171 is where the payload array is initialized
    const importantPart = lines.slice(0, 1171).join('\n');
    
    const extractorCode = `
${importantPart}

// Final output for the user
console.log(_a36as6cf);
`;

    fs.writeFileSync(OUTPUT_FILE, extractorCode, 'utf8');
    console.log(`[+] Created ${OUTPUT_FILE}.`);
    console.log(`[!] Instructions: Run 'node ${OUTPUT_FILE} > payload.b64' in your sandbox.`);

} catch (err) {
    console.error('[-] Error building extractor:', err.message);
}
