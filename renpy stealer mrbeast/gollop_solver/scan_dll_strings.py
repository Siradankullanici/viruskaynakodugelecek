import re

with open(r'C:\Users\semae\Downloads\SwiftUploads_—_Download_—_D4F1FE005B7C94_Archive_latest_4931\gollop_devest.dll', 'rb') as f:
    data = f.read()

# Find all printable strings of length >= 6
strings = re.findall(rb'[\x20-\x7e]{6,}', data)
print(f"Total printable strings (>=6 chars): {len(strings)}")

# Filter for potential hostnames, URLs, paths
for s in strings:
    try:
        text = s.decode('ascii')
        # Look for anything with dots (hostnames, domains, IPs)
        if '.' in text and not text.startswith('.') and not text.endswith('.'):
            if any(c.isalpha() for c in text):
                # Filter out clearly non-C2 strings
                if not text.startswith('System.') and not text.startswith('Switch.') \
                    and not text.startswith('Microsoft.') and not text.startswith('mscorlib') \
                    and text != '...' and '//' not in text:
                    print(f"  DOT: {text}")
        # Look for hex-like strings
        if re.match(rb'^[a-fA-F0-9]{16,}$', s):
            print(f"  HEX: {text}")
        # Look for anything with :// or http
        if b'://' in s or b'http' in s.lower():
            print(f"  URL: {text}")
    except:
        pass

# Search for IP address patterns
print("\n=== IP Address patterns ===")
ip_pattern = re.compile(rb'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b')
for m in ip_pattern.finditer(data):
    ip = m.group().decode()
    if not ip.startswith('4.0.'):  # Skip version strings
        print(f"  IP: {ip}")

# Search for domain patterns
print("\n=== Domain patterns ===")
domain_pattern = re.compile(rb'[a-zA-Z0-9][-a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}')
for m in domain_pattern.finditer(data):
    domain = m.group().decode()
    if '.' in domain and not any(domain.startswith(p) for p in ['System.', 'Microsoft.', 'Switch.', 'mscorlib', 'Presentation', 'System.', 'Windows.', 'System.']):
        print(f"  DOMAIN: {domain}")

# Search for obfuscated config strings in the DLL
print("\n=== Searching for encoded config strings ===")
# The strings look like "270;;?971770?414766;;3>?" - sequences of digits and ;<>?=
config_pattern = re.compile(rb'[0-9;<=>?]{20,}')
configs = config_pattern.findall(data)
for c in configs:
    text = c.decode('ascii')
    # Check if first 2 chars decode to a valid key
    if len(text) >= 4:
        print(f"  CONFIG: {text[:80]}")
