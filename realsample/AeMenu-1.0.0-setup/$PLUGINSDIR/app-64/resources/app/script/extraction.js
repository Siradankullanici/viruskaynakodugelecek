/**
 * Kullanım: node decrypt.js <dosya_yolu>
 * Dosyadan _dwo9fc4q, _0yqzwc5n, _ld9m906i değerlerini okur ve decrypt eder.
 */

const fs = require("fs");
const crypto = require("crypto");

const filePath = process.argv[2];
if (!filePath) {
  console.error("Kullanım: node decrypt.js <dosya_yolu>");
  process.exit(1);
}

const code = fs.readFileSync(filePath, "utf8");

// Değişkenleri regex ile çek
function extractVar(name) {
  // const _abc = "..." veya var _abc = "..."
  const regex = new RegExp(`(?:const|var|let)\\s+${name}\\s*=\\s*["'\`]([^"'\`]+)["'\`]`);
  const match = code.match(regex);
  if (!match) {
    console.error(`[!] ${name} bulunamadı`);
    return null;
  }
  return match[1];
}

const _dwo9fc4q = extractVar("_dwo9fc4q");
const _0yqzwc5n = extractVar("_0yqzwc5n");
const _ld9m906i = extractVar("_ld9m906i");

if (!_dwo9fc4q || !_0yqzwc5n || !_ld9m906i) {
  process.exit(1);
}

console.log("[+] Değişkenler bulundu");
console.log(`    _dwo9fc4q : ${_dwo9fc4q.substring(0, 40)}...`);
console.log(`    _0yqzwc5n : ${_0yqzwc5n.substring(0, 40)}...`);
console.log(`    _ld9m906i : ${_ld9m906i.substring(0, 40)}...`);

// Sabit değerler (attığın koddan)
const MK   = "GdY938VQlwE/JTjPFq0o9uU/WH3RfxsB";
const SALT = "GuY7Jbq+UFnreKzU4OxxZA==";
const IV   = "5QK2BQ/0WpLc/FItKE/6TQ==";

// Adım 1: XOR decode (üç parça birleştiriliyor)
const encryptedB64 = Buffer.from(_dwo9fc4q + _0yqzwc5n + _ld9m906i, "base64")
  .map(b => b ^ 88)
  .toString("utf8");

console.log("\n[+] XOR decode tamam");

// Adım 2: PBKDF2 ile anahtar türet
const key = crypto.pbkdf2Sync(
  MK,
  Buffer.from(SALT, "base64"),
  50000,
  32,
  "sha256"
);

console.log("[+] Anahtar türetildi");

// Adım 3: AES-256-CBC decrypt
try {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(IV, "base64")
  );
  let result = decipher.update(encryptedB64, "base64", "utf8");
  result += decipher.final("utf8");

  console.log("\n[+] Decrypt başarılı! Sonuç:\n");
  console.log("=".repeat(60));
  console.log(result);
  console.log("=".repeat(60));

  fs.writeFileSync("decrypted_output.js", result, "utf8");
  console.log("\n[+] decrypted_output.js dosyasına kaydedildi");
} catch (e) {
  console.error("[!] Decrypt hatası:", e.message);
}