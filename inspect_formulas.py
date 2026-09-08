import openpyxl

wb_path = r"C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\planilha\Victor Orçamento Anual.xlsx"
wb = openpyxl.load_workbook(wb_path, data_only=False)

print("=== SHEETS IN WORKBOOK ===")
for name in wb.sheetnames:
    print(f"- {name}")

ws26 = wb['Orçamento 2026']
print("\n=== ORÇAMENTO 2026 (Rows 1 to 65) FORMULAS & RAW VALUES ===")
for r in range(1, 65):
    row_vals = []
    for c in range(1, 10):
        val = ws26.cell(r, c).value
        if val is not None:
            col_letter = openpyxl.utils.get_column_letter(c)
            row_vals.append(f"{col_letter}{r}: {val}")
    if row_vals:
        print(" | ".join(row_vals[:6]))

if 'CARTAO AGOSTO' in wb.sheetnames:
    ws_cartao = wb['CARTAO AGOSTO']
    print("\n=== CARTAO AGOSTO SAMPLES (Rows 1 to 20) ===")
    for r in range(1, 20):
        row_vals = []
        for c in range(1, 10):
            val = ws_cartao.cell(r, c).value
            if val is not None:
                col_letter = openpyxl.utils.get_column_letter(c)
                row_vals.append(f"{col_letter}{r}: {val}")
        if row_vals:
            print(" | ".join(row_vals[:6]))
