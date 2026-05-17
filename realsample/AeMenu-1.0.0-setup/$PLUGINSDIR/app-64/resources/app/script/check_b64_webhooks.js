const fs = require('fs');
const content = fs.readFileSync('youdid_resolved.js', 'utf8');

// 1. Look for Base64 patterns
const b64Regex = /[A-Za-z0-9+/]{40,}/g; // Likely length for a webhook piece
const matches = content.match(b64Regex);

console.log('--- BASE64 DECODED STRINGS ---');
if (matches) {
    matches.forEach(m => {
        try {
            const decoded = Buffer.from(m, 'base64').toString('utf8');
            if (decoded.includes('http') || decoded.includes('discord') || decoded.includes('webhook')) {
                console.log(`Found: ${decoded}`);
            }
        } catch(e) {}
    });
}

// 2. Look for long numeric strings (Webhook IDs)
const idRegex = /"(\d{17,20})"/g;
let m;
while ((m = idRegex.exec(content)) !== null) {
    console.log(`Potential Webhook ID: ${m[1]}`);
}

// 3. Look for Webhook Token patterns
const tokenRegex = /"([a-zA-Z0-9\-\_]{60,80})"/g;
while ((m = tokenRegex.exec(content)) !== null) {
    console.log(`Potential Webhook Token: ${m[1]}`);
}
