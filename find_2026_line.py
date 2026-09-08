with open(r'C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\site\js\storage.js', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if '"2026":' in line:
        print(f"Line {idx+1}: {line.strip()}")
        for sub_i in range(idx, min(idx + 120, len(lines))):
            print(f"{sub_i+1}: {lines[sub_i].rstrip()}")
        break
