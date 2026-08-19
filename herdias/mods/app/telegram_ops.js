'use strict';

// Zentra stealer C2 bot - chat_id discovery + message spammer
// Usage:
//   node telegram_ops.js find      -> queries getUpdates, prints all chat_ids
//   node telegram_ops.js spam <chat_id> [count] [delay_ms] -> floods sendMessage

const https = require('https');

const TOKEN = '1539478659:bRh8jXOPhoEjsWfWgRtidhgRmO3MCtuw9Qi';

function api(method, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.telegram.org',
      path: '/bot' + TOKEN + '/' + method,
      method: data ? 'POST' : 'GET',
      headers: data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {},
    }, (res) => {
      let raw = '';
      res.on('data', (c) => raw += c);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error(raw.slice(0, 300))); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function findChats() {
  const r = await api('getUpdates', { timeout: 10 });
  if (!r.ok) { console.error('getUpdates failed:', JSON.stringify(r)); return; }
  const seen = new Map();
  for (const u of r.result || []) {
    const msg = u.message || u.channel_post || u.callback_query?.message || {};
    const chat = msg.chat;
    if (!chat) continue;
    const key = chat.id;
    if (!seen.has(key)) {
      seen.set(key, {
        id: chat.id,
        type: chat.type,
        title: chat.title || ((msg.from && (msg.from.username || msg.from.first_name)) || ''),
      });
    }
  }
  console.log('chat_ids found:');
  for (const [id, info] of seen) console.log(JSON.stringify(info));
  if (seen.size === 0) console.log('(none) - the bot may need a message first, or the token is revoked.');
}

async function spam(chatId, count, delay) {
  const n = parseInt(count, 10) || 50;
  const d = parseInt(delay, 10) || 400;
  const text = 'spam ' + Date.now();
  let ok = 0, fail = 0;
  for (let i = 0; i < n; i++) {
    try {
      const r = await api('sendMessage', { chat_id: chatId, text: text + ' #' + i });
      if (r.ok) ok++; else { fail++; console.log('msg', i, JSON.stringify(r).slice(0, 200)); }
    } catch (e) { fail++; console.log('msg', i, 'ERR', e.message); }
    await sleep(d);
  }
  console.log('done. ok=' + ok + ' fail=' + fail);
}

(async () => {
  const cmd = process.argv[2];
  if (cmd === 'find') await findChats();
  else if (cmd === 'spam') await spam(process.argv[3], process.argv[4], process.argv[5]);
  else {
    console.log('usage:');
    console.log('  node telegram_ops.js find');
    console.log('  node telegram_ops.js spam <chat_id> [count] [delay_ms]');
  }
})().catch(e => { console.error(e); process.exit(1); });