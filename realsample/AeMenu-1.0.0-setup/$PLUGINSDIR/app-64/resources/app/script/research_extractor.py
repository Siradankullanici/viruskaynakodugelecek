import re
import json

file_path = r'c:\Users\semae\OneDrive\Belgeler\GitHub\viruskaynakodugelecek\realsample\AeMenu-1.0.0-setup\$PLUGINSDIR\app-64\resources\app\script\crypted_stage1.js'

print(f"Opening {file_path}...")

with open(file_path, 'r', encoding='utf-8') as f:
    # Read the file. It's 5.9MB, so it fits in memory but lines might be huge.
    content = f.read()

# 1. Extract the main array
# Find the __p_7361442059 function or the array literal inside it
array_match = re.search(r'function __p_7361442059\(\) \{\s+return (\[.*?\]);\s+\}', content, re.DOTALL)
if array_match:
    array_json = array_match.group(1)
    # The array contains 'undefined' and 'true'/'false' literals which aren't valid JSON.
    # We'll evaluate it safely or fix it.
    array_json = array_json.replace('undefined', 'null') # Temporary
    # Actually, a better way is to just grab it and use a JS-like parser or simple regex.
    # Let's just use it as a list in Python.
else:
    print("Could not find main array.")
    exit(1)

# 2. Find all PREDICT functions
# function __p_1901050902_dLR_0__JS_PREDICT__(index_param) { return ...; }
predict_funcs = re.findall(r'function (__p_\w+__JS_PREDICT__)\(index_param\) \{(.*?)\}', content, re.DOTALL)

print(f"Found {len(predict_funcs)} prediction functions.")

# Prepare a results dictionary for the plan
research_results = {
    "array_found": True,
    "num_predict_funcs": len(predict_funcs),
    "predict_funcs": []
}

for name, body in predict_funcs:
    research_results["predict_funcs"].append({"name": name, "body": body.strip()})

with open('research_results.json', 'w') as f:
    json.dump(research_results, f, indent=2)

print("Research results saved to research_results.json")
