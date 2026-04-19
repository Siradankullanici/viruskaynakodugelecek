/*
 * Stage 2 Perfect Extraction Tool
 * Run: node perfect_extractor.js
 */
const fs = require('fs');
const path = require('path');

const target = 'crypted_stage1.js';
console.log(`[+] Reading ${target}...`);

try {
    const src = fs.readFileSync(target, 'utf8');

    // We hijack the entry point where Stage 2 is executed.
    // At line 1173: const _xuvpz7rb = new Function(..., _6wf88dhd);
    // At line 1174: _xuvpz7rb(require, ...);
    // By replacing the execution call with a print statement, we get the PERFECT payload.

    const hijackMarker = '_xuvpz7rb(require';
    const printCode = `console.log(_6wf88dhd); process.exit(0); // `;

    if (src.indexOf(hijackMarker) === -1) {
        throw new Error("Could not find the execution entry point in the script.");
    }

    console.log(`[+] Patching execution flow...`);
    const patched = src.replace(hijackMarker, printCode + hijackMarker);

    const outputPath = 'crypted_stage1_patched.js';
    fs.writeFileSync(outputPath, patched);

    console.log(`\n[!] DONE: Running the patched script will now output the FULL Stage 2 source.`);
    console.log(`[!] RUN THIS COMMAND NOW:`);
    console.log(`    node ${outputPath} > stage2.js`);
    console.log(`\n[+] Your deobfuscated payload will be in: stage2.js`);

} catch (err) {
    console.error(`[-] FAILURE: ${err.message}`);
}
