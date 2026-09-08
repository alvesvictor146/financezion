import openpyxl

wb = openpyxl.load_workbook(r"C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\planilha\Victor Orçamento Anual.xlsx", data_only=False)
ws = wb['Orçamento 2026']

print("MAX COL:", ws.max_column, "MAX ROW:", ws.max_row)
headers = [f"Col {openpyxl.utils.get_column_letter(c)} ({c}): {ws.cell(3, c).value}" for c in range(1, ws.max_column + 1)]
print("HEADERS ROW 3:", headers)

print("\nCHECKING ANY COLUMNS BEYOND H (Row 3, 15, 36, 51, 59):")
for r in [3, 15, 21, 22, 36, 45, 51, 57, 59]:
    row_str = [f"{openpyxl.utils.get_column_letter(c)}{r}: {ws.cell(r, c).value}" for c in range(1, ws.max_column + 1) if ws.cell(r, c).value is not None]
    print(" | ".join(row_str))
