const fs = require('fs');
const path = require('path');

const targetFile = 'crypted_stage1.js';
const outputFile = 'crypted_stage1_clean.js';

console.log('Reading file...');
const code = fs.readFileSync(targetFile, 'utf8');

// 1. Extract the prediction array
const arrayMatch = code.match(/function __p_7361442059\(\) \{\r?\n\s*return (\[[\s\S]*?\]);/);
if (!arrayMatch) {
    console.error('Could not find prediction array function!');
    process.exit(1);
}
const lookupArray = eval(arrayMatch[1]);
console.log(`Extracted lookup array with ${lookupArray.length} elements.`);

// 2. Extract all prediction functions
// Pattern: function __p_NAME(index_param) { return __p_2066170545[EXPRESSION]; }
const funcRegex = /function (__p_\d+_dLR_\d+__JS_PREDICT__)\(index_param\) \{\r?\n\s*return __p_2066170545\[([\s\S]*?)\];\r?\n\}/g;

const predictors = {};
let match;
while ((match = funcRegex.exec(code)) !== null) {
    const funcName = match[1];
    const expression = match[2];
    predictors[funcName] = expression;
}
console.log(`Found ${Object.keys(predictors).length} prediction functions.`);

// 3. Perform replacements
let cleanCode = code;

// Replace each prediction function call
Object.entries(predictors).forEach(([funcName, expression]) => {
    console.log(`Replacing calls to ${funcName}...`);
    // Find calls like funcName(123) or funcName(-123)
    const callRegex = new RegExp(`${funcName}\\((-?\\d+)\\)`, 'g');
    
    cleanCode = cleanCode.replace(callRegex, (fullMatch, indexParam) => {
        try {
            // Replace index_param in the expression with the actual value and evaluate the math
            const evalExpr = expression.replace(/index_param/g, `(${indexParam})`);
            const arrayIndex = eval(evalExpr);
            const value = lookupArray[arrayIndex];
            
            // Format the value for code injection
            if (typeof value === 'string') {
                return JSON.stringify(value);
            }
            if (value === undefined) {
                return 'undefined';
            }
            return String(value);
        } catch (e) {
            console.error(`Error resolving ${fullMatch}: ${e.message}`);
            return fullMatch;
        }
    });
});

console.log('Writing cleaned file...');
fs.writeFileSync(outputFile, cleanCode);
console.log(`Done! Cleaned file saved to ${outputFile}`);
