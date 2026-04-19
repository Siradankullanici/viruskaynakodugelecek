const fs = require('fs');

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
// We look for the function definition and then the index access inside
const predictors = {};
const funcPattern = /function\s+(__p_\w+__JS_PREDICT__)\s*\(index_param\)\s*\{/g;
let match;
while ((match = funcPattern.exec(code)) !== null) {
    const funcName = match[1];
    const startIndex = match.index;
    
    // Look for the return statement within the next 300 chars
    const bodySearch = code.slice(startIndex, startIndex + 500);
    const returnMatch = bodySearch.match(/return\s+__p_2066170545\s*\[([\s\S]*?)\]\s*;?\s*\}/);
    
    if (returnMatch) {
        let expression = returnMatch[1].trim();
        // Remove brandishing newlines or extra spaces that eval might dislike if malformed
        expression = expression.replace(/\s+/g, ' ');
        predictors[funcName] = expression;
    }
}

console.log(`Found ${Object.keys(predictors).length} prediction functions.`);

// 3. Perform replacements
let cleanCode = code;

// For efficiency and to avoid partial replacements, we'll replace the most specific (longest) names first
const sortedFuncNames = Object.keys(predictors).sort((a, b) => b.length - a.length);

sortedFuncNames.forEach(funcName => {
    const expression = predictors[funcName];
    // console.log(`Replacing calls to ${funcName}...`);
    
    const callRegex = new RegExp(`${funcName}\\((-?\\d+)\\)`, 'g');
    
    cleanCode = cleanCode.replace(callRegex, (fullMatch, indexParam) => {
        try {
            const evalExpr = expression.replace(/index_param/g, `(${indexParam})`);
            const arrayIndex = eval(evalExpr);
            const value = lookupArray[arrayIndex];
            
            if (typeof value === 'string') {
                return JSON.stringify(value);
            }
            if (value === undefined) {
                return 'undefined';
            }
            return String(value);
        } catch (e) {
            // Log once per function if error happens
            if (!predictors[funcName].errored) {
                console.error(`Error resolving ${funcName}(${indexParam}): ${e.message} | Expr: ${expression}`);
                predictors[funcName].errored = true;
            }
            return fullMatch;
        }
    });
});

console.log('Writing cleaned file...');
fs.writeFileSync(outputFile, cleanCode);
const stats = fs.statSync(outputFile);
console.log(`Done! Cleaned file saved to ${outputFile} (${stats.size} bytes)`);
