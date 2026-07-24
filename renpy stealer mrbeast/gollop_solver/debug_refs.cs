using dnlib.DotNet;
using dnlib.DotNet.Emit;

string dllPath = Directory.GetFiles(@"C:\Users\semae\Downloads", "gollop_devest.dll", SearchOption.AllDirectories).FirstOrDefault() ?? "";
var mod = ModuleDefMD.Load(dllPath);

// List ALL fields with InitialValue (hasfieldrva) and their sizes
Console.WriteLine("=== All hasfieldrva fields ===");
foreach (var type in mod.GetTypes()) {
    foreach (var field in type.Fields) {
        if (field.InitialValue != null && field.InitialValue.Length >= 16) {
            Console.WriteLine($"{type.FullName}.{field.Name}: {field.InitialValue.Length} bytes");
        }
    }
}

// Also try to find ANY instruction that accesses any hasfieldrva field
Console.WriteLine("\n=== Instructions accessing hasfieldrva fields ===");
var fieldNames = new HashSet<string>();
foreach (var type in mod.GetTypes())
    foreach (var f in type.Fields)
        if (f.InitialValue != null && f.InitialValue.Length >= 16)
            fieldNames.Add(f.Name);

foreach (var type in mod.GetTypes()) {
    foreach (var method in type.Methods) {
        if (!method.HasBody || !method.Body.HasInstructions) continue;
        foreach (var instr in method.Body.Instructions) {
            if (instr.Operand is IField fd && fieldNames.Contains(fd.Name)) {
                Console.WriteLine($"{type.FullName}.{method.Name}: {instr.OpCode} {fd.Name}");
            }
        }
    }
}

Console.WriteLine("\nDone.");
