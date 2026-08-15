const fs = require('fs');
const vm = require('vm');

// 1. Orijinal dosyayı oku
let code = fs.readFileSync('unpacked_kco.js', 'utf8');

// 2. Kodun kendini çalıştırma/eval noktalarını yakalamak için hook atıyoruz
let decryptedResult = "";

const sandbox = {
    console: console,
    // Kod eval() veya Function() ile kendini çalıştırıyorsa yakala
    eval: function(decryptedCode) {
        decryptedResult = decryptedCode;
        console.log("=== KOD EVAL NOKTASINDA YAKALANDI ===");
    },
    Function: function(...args) {
        const body = args[args.length - 1];
        decryptedResult = body;
        return function() {};
    },
    window: {},
    global: {}
};

// Global nesneleri sandbox'a bağla
sandbox.window = sandbox;
sandbox.global = sandbox;

try {
    // Kodu izole ortamda çalıştır
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);

    if (decryptedResult) {
        console.log(decryptedResult);
        fs.writeFileSync('final_decoded.js', decryptedResult, 'utf8');
        console.log("\nSon aşama çözüldü ve 'final_decoded.js' dosyasına yazıldı!");
    } else {
        console.log("Kod eval() çağırmadı. Dosya içinde eval/Function geçen yeri arayabilirsiniz.");
    }
} catch (err) {
    console.log("Çalıştırma sırasında yakalanan veri / hata:", err.message);
}