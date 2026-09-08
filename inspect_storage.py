import re, json
with open(r'C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\site\js\storage.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Extract DEFAULT_FINANCIAL_DATA
m = re.search(r'const DEFAULT_FINANCIAL_DATA = ({.*?});\s*class StorageEngine', text, re.DOTALL)
if m:
    data = json.loads(m.group(1))
    print("Keys in 2026:", data['years']['2026'].keys())
    print("\nLimites Orçados in 2026:")
    for item in data['years']['2026'].get('limites_orcados', []):
        print(item)
    print("\nTotal cartao items:", len(data.get('cartaoAgosto', {}).get('compras', [])))
    print("Sample cartao item:", data.get('cartaoAgosto', {}).get('compras', [])[0])
