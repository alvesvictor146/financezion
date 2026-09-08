---
name: analyze-spreadsheet
description: Protocolo de análise técnica, auditoria de fórmulas e extração de dados da planilha financeira Victor Orçamento Anual.
---

# 📖 Skill: analyze-spreadsheet

Esta skill capacita qualquer agente a auditar, re-analisar e mapear alterações na planilha financeira `Victor Orçamento Anual.xlsx`.

## 📌 Pré-requisitos
- Python 3.8+
- Pacote `openpyxl` (`pip install openpyxl`)

## 🛠️ Procedimento Operacional

### 1. Auditoria de Células e Fórmulas
Para re-analisar a planilha após atualizações manuais no arquivo Excel:
```bash
python "C:\Users\user0636\.gemini\antigravity-ide\brain\631d65bd-583d-4022-8c84-3401fba6649a\scratch\analyze_spreadsheet.py"
```

### 2. Mapeamento de Abas Críticas
- **Orçamento 2026 / 2027**:
  - `C4:C14` -> Receitas líquidas e brutas do mês.
  - `C15` -> Fórmula `=SUM(C4:C14)`.
  - `C17:C34` / `C35` -> Custos de sobrevivência / Fixos. `C36 = C35/C15` (% fixo).
  - `C38:C49` / `C50` -> Despesas variáveis & Cartão. `C51 = C50/C15` (% variável).
  - `C54:C56` / `C57` -> Investimentos & Poupança. `C58 = C57/C15` (% investido).
  - `C59` -> Sobra líquida `=SUM(C15 - C36 - C51 - C57)`.
- **CARTAO AGOSTO**:
  - `C4:C87` e `D4:D87` -> Totalizador `=SUM(C4:C87)`.
- **Investimentos**:
  - Colunas de patrimônio investido, valor atual e saldo líquido.
- **Metas e Desejos**:
  - `Q5:Q70`, `J5:J50`, `K5:K50`, `R5:R70` com fórmulas `=COUNTIF(..., "TRUE")` e `=COUNTA(...) - Concluídos`.

### 3. Validação de Discrepâncias
Sempre compare o `data_schema.json` gerado com os valores apresentados no dashboard web.
