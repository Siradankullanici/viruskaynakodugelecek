'use strict';
const fs = require('fs');
const zlib = require('zlib');
const { parentPort, workerData } = require('worker_threads');

try {
    const { addonPath, targetPath, encOffset, keyOffset, keyLen } = workerData;
    const stat = fs.statSync(addonPath);
    const encLen = stat.size - encOffset;
    if (encLen <= 0) throw new Error('invalid addon size');

    const keyBuf = Buffer.alloc(keyLen);
    const encBuf = Buffer.alloc(encLen);
    const fd = fs.openSync(addonPath, 'r');
    try {
        fs.readSync(fd, keyBuf, 0, keyLen, keyOffset);
        fs.readSync(fd, encBuf, 0, encLen, encOffset);
    } finally {
        fs.closeSync(fd);
    }

    for (let i = 0; i < encLen; i++) {
        encBuf[i] ^= keyBuf[i % keyLen];
    }

    const pe = zlib.gunzipSync(encBuf);
    fs.writeFileSync(targetPath, pe);
    parentPort.postMessage({ ok: true, size: pe.length });
} catch (err) {
    parentPort.postMessage({ error: err.message || 'decode failed' });
}
