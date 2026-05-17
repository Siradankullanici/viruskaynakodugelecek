const fs = require('fs');
const content = fs.readFileSync('youdid_resolved.js', 'utf8');

// Looking for reconstructed URLs
// Matches "piece1" + "piece2" + ...
function findConstructedURLs(text) {
    const regex = /"[^"]+"\s*\+\s*"[^"]+"/g;
    let match;
    const results = [];
    while ((match = regex.exec(text)) !== null) {
        // Try to expand the chain
        let full = match[0];
        let lastIdx = match.index + match[0].length;
        while (text.substring(lastIdx).trim().startsWith('+')) {
            const nextPartMatch = text.substring(lastIdx).match(/^\s*\+\s*("[^"]+"|[^+\s;]+)/);
            if (!nextPartMatch) break;
            full += nextPartMatch[0];
            lastIdx += nextPartMatch[0].length;
        }
        results.push(full);
    }
    return results;
}

const chains = findConstructedURLs(content);
console.log('--- CONSTRUCTED STRINGS ---');
chains.forEach(chain => {
    try {
        const evaled = eval(chain);
        if (evaled.includes('http') || evaled.includes('discord') || evaled.includes('webhook')) {
            console.log(evaled);
        }
    } catch(e) {}
});

console.log('\n--- LITERAL WEBHOOKS ---');
const literals = content.match(/https?:\/\/[a-z0-9\.\/]+webhooks\/[0-9]+\/[a-zA-Z0-9\-\_]+/g);
if (literals) literals.forEach(l => console.log(l));

console.log('\n--- SEARCHING FOR WEBHOOK VARIABLES ---');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('webhook') && line.includes('http')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
});
