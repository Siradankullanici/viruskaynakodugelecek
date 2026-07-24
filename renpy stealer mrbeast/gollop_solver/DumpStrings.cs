using dnlib.DotNet;

string dllPath = args.Length > 0 ? args[0] : @"C:\Users\semae\AppData\Local\Temp\opencode\gollop_devest.dll";

var mod = ModuleDefMD.Load(dllPath);

Console.WriteLine($"=== Scanning {mod.Assembly.Name} ===");

var allStrings = new List<(string type, string field, int offset, byte key, string text)>();

foreach (TypeDef type in mod.GetTypes())
{
    foreach (FieldDef field in type.Fields)
    {
        if (field.InitialValue == null || field.InitialValue.Length < 16) continue;
        var data = field.InitialValue;

        // Try instruction format: [opcode] [key] [3pad] [4???] [4len LE] [XOR data]
        for (int idx = 0; idx < data.Length - 14; idx++)
        {
            byte opcode = data[idx];
            if (opcode < 1 || opcode > 15) continue;
            byte key = data[idx + 1];
            int len = BitConverter.ToInt32(data, idx + 9);
            if (len <= 2 || len > 1024 || (len & 1) != 0) continue;
            if (idx + 13 + len > data.Length) continue;

            string decoded = DecodeXorUtf16(data, idx + 13, len, key);
            if (IsValidString(decoded, 3))
            {
                allStrings.Add((type.FullName, field.Name, idx, key, decoded));
            }
        }
    }
}

// Print all unique strings, grouped by type
var grouped = allStrings.GroupBy(s => s.text).Select(g => g.First()).ToList();
foreach (var s in grouped.OrderBy(x => x.type).ThenBy(x => x.offset))
{
    Console.WriteLine($"[{s.type}] {s.text}");
}

Console.WriteLine($"\n=== Total: {grouped.Count} unique strings ===");

// Filter for C2-relevant content
Console.WriteLine("\n=== C2 / Security Relevant ===");
var interesting = allStrings.Select(s => s.text).Distinct()
    .Where(t => 
        t.Contains("http") || t.Contains("://") || t.Contains(".js") ||
        t.Contains("token") || t.Contains("0x") ||
        t.Contains("api") || t.Contains("binance") || t.Contains("bsc") ||
        t.Contains("wallet") || t.Contains("contract") ||
        t.Contains("ethereum") || t.Contains("address") ||
        t.Contains("User-Agent") || t.Contains("Authorization") ||
        t.Contains("Bearer") || t.Contains("password") ||
        t.Contains("secret") || t.Contains("key") ||
        t.Contains("AppData") || t.Contains("LocalAppData") ||
        t.Contains("Caches") || t.Contains("persistence") ||
        t.Contains("startup") || t.Contains("cache") ||
        t.Contains("https") || t.Contains("http") ||
        t.Contains("X-Timestamp") || t.Contains("X-Nonce") ||
        t.Contains("X-Signature") ||
        t.Contains("data") || t.Contains("lzma") ||
        t.Contains("base64") || t.Contains("Content-Length") ||
        t.Contains("Accept") || t.Contains("Encoding") ||
        t.Contains("Global") || t.Contains("Mozilla") ||
        t.Contains("Firefox") || t.Contains("Chrome") ||
        t.Contains("Safari") || t.Contains("Edg") ||
        t.Contains("Dullard") || t.Contains("Skipple") ||
        t.Contains("Isospin") || t.Contains("PrinterArkite") ||
        t.Contains("KillingHakam") || t.Contains("peSnapshot") ||
        t.Contains("ROLL_FORWARD") || t.Contains("WilStaging") ||
        t.Contains("SM0") || t.Contains("Snapshots") ||
        t.Contains("X-") || t.Contains("Location") ||
        t.Contains("text/html") || t.Contains("gzip") ||
        t.Contains("no-store") || t.Contains("max-age") ||
        t.Length >= 60)
    .OrderBy(t => t);

foreach (var t in interesting)
{
    Console.WriteLine($"  {t}");
}

static string DecodeXorUtf16(byte[] data, int offset, int len, byte key)
{
    char[] chars = new char[len / 2];
    for (int i = 0; i < chars.Length; i++)
    {
        byte lo = (byte)(data[offset + i * 2] ^ key);
        byte hi = (byte)(data[offset + i * 2 + 1] ^ key);
        chars[i] = (char)(lo | (hi << 8));
    }
    int nullIdx = Array.IndexOf(chars, '\0');
    return nullIdx >= 0 ? new string(chars, 0, nullIdx) : new string(chars);
}

static bool IsValidString(string s, int minLen)
{
    if (s.Length < minLen) return false;
    int printable = 0;
    foreach (char c in s)
    {
        if (c >= 32 && c < 127 || c == '\n' || c == '\r' || c == '\t') printable++;
    }
    if (s.Length <= 6) return printable >= s.Length / 2;
    return printable >= s.Length * 0.6;
}
