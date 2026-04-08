const crypto = require('crypto');

const dataHex = "820168fa320612aa3b31b7bebb38af7512279f289a70f91e1cc797b2aa3ec3d647724ade81d02ae823fdd16b01b730d30a32677f00d0db999e17274f2cf30192c9b49ff7e410fb33f11b25fe1537c2abf857374a775b22de96d9035e3a65167df04277a0247401c2a388a57830ad18d34ed3c4f871caeb34dd487fbb48314f5b8215d555540eccf6a406c88ed1a5cb4224b94c4efc";
const keyHex = "9b66512a8b33f32ec7ba1531a6338e2af2d6c7ff7e1f1c819ed9353ba371164c";

const decrypt = (hexData, hexKey) => {
    const data = Buffer.from(hexData, 'hex');
    const key = Buffer.from(hexKey, 'hex');

    // Bazı varyantlarda IV 12 byte yerine 16 byte olabilir veya 
    // Tag verinin başında/sonunda olabilir.
    // Standart deneme:
    const iv = data.slice(0, 12);
    const tag = data.slice(12, 28); // Tag bazen IV'den hemen sonra gelir
    const encrypted = data.slice(28);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted, 'binary', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

try {
    console.log("Çözülen Webhook:", decrypt(dataHex, keyHex));
} catch (e) {
    console.log("Hata: Veri yapısı veya anahtar uyumsuz.", e.message);
}
