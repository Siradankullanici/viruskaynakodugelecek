const fs = require('fs');
const vm = require('vm');
const Module = require('module');

let dumpCount = 0;

// Helper to write the intercepted payload to disk
function saveDump(type, content) {
    if (typeof content !== 'string' || content.length < 50) return;
    
    const filename = `dumped_payload_${type}_${dumpCount++}.js`;
    fs.writeFileSync(filename, content);
    console.log(`[+] Successfully intercepted and dumped payload to: ${filename} (Size: ${content.length} bytes)`);
}

// 1. Hook the global eval() function
const originalEval = global.eval;
global.eval = function(code) {
    saveDump('eval', code);
    return originalEval.apply(this, arguments);
};

// 2. Hook the Function constructor
// Many obfuscators retrieve the constructor dynamically via []["sort"]["constructor"]
const OriginalFunction = global.Function;
const ProxyFunction = new Proxy(OriginalFunction, {
    construct(target, args) {
        if (args.length > 0) saveDump('Function', args[args.length - 1]);
        return new target(...args);
    },
    apply(target, thisArg, args) {
        if (args.length > 0) saveDump('Function', args[args.length - 1]);
        return target.apply(thisArg, args);
    }
});

global.Function = ProxyFunction;

// Override the constructor property on Function's prototype to catch dynamic retrieval
Object.defineProperty(OriginalFunction.prototype, 'constructor', {
    get: () => ProxyFunction,
    configurable: true
});

// 3. Hook the Node.js VM execution (frequently used by advanced Node packers)
const originalRunInThisContext = vm.runInThisContext;
vm.runInThisContext = function(code, options) {
    saveDump('vm', code);
    return originalRunInThisContext.apply(this, arguments);
};

// 4. Hook the Node.js Module compiler (used internally by require)
const originalCompile = Module.prototype._compile;
Module.prototype._compile = function(content, filename) {
    // Prevent dumping the dumper itself or the initial packed file
    if (!filename.includes('dumper.js') && !filename.includes('cozme.js')) {
        saveDump('module_compile', content);
    }
    return originalCompile.apply(this, arguments);
};

// 5. Bypass Anti-Tampering (Anti-Debugging) Checks
// Obfuscators will often call .toString() on 'eval' or 'Function' to see if they were modified.
// This feeds them fake "native code" strings so they don't crash.
const originalToString = Function.prototype.toString;
Function.prototype.toString = function() {
    if (this === global.eval) return "function eval() { [native code] }";
    if (this === ProxyFunction) return "function Function() { [native code] }";
    return originalToString.call(this);
};

console.log('[*] Hooks initialized. Running target script...');

try {
    // Trigger the packed script
    require('./cozme.js');
} catch (err) {
    // It's normal for dumped scripts to throw ReferenceErrors if they expect a browser environment (like 'window')
    console.error('[-] Target script terminated with message:', err.message);
}

console.log('[*] Dumping complete.');
