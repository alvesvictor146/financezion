---
name: financial-calculations
description: Regras matemáticas, equações financeiras e modelo de dados do dashboard financeiro.
---

# 🧮 Skill: financial-calculations

Esta skill documenta todas as fórmulas matemáticas utilizadas na planilha `Victor Orçamento Anual.xlsx` e sua transposição para o motor JavaScript do site.

## 📐 Fórmulas e Regras de Negócio

### 1. Receitas Mensais
```javascript
function calcularReceitaTotal(receitas) {
  return receitas.reduce((total, item) => total + (Number(item.valor) || 0), 0);
}
```

### 2. Despesas Fixas (Custos Estruturais / Moradia / Contas)
```javascript
function calcularDespesasFixas(despesas) {
  return despesas
    .filter(d => d.tipo === 'fixa')
    .reduce((total, d) => total + (Number(d.valor) || 0), 0);
}

function calcularProporcaoFixa(totalFixas, totalReceitas) {
  if (!totalReceitas) return 0;
  return (totalFixas / totalReceitas) * 100; // Equivalente à C36 = C35/C15
}
```

### 3. Despesas Variáveis & Estilo de Vida
```javascript
function calcularDespesasVariaveis(despesas) {
  return despesas
    .filter(d => d.tipo === 'variavel')
    .reduce((total, d) => total + (Number(d.valor) || 0), 0);
}

function calcularProporcaoVariavel(totalVariaveis, totalReceitas) {
  if (!totalReceitas) return 0;
  return (totalVariaveis / totalReceitas) * 100; // Equivalente à C51 = C50/C15
}
```

### 4. Aportes & Investimentos
```javascript
function calcularInvestimentos(aportes) {
  return aportes.reduce((total, a) => total + (Number(a.valor) || 0), 0);
}

function calcularProporcaoInvestida(totalInvestimentos, totalReceitas) {
  if (!totalReceitas) return 0;
  return (totalInvestimentos / totalReceitas) * 100; // Equivalente à C58 = C57/C15
}
```

### 5. Saldo Líquido / Sobra Mensal
```javascript
function calcularSobraMensal(receitas, fixas, variaveis, investimentos) {
  return receitas - fixas - variaveis - investimentos; // Equivalente à C59 = C15-C36-C51-C57
}
```

### 6. Metas & Desejos (Contadores e Percentual)
```javascript
function calcularProgressoMetas(itens) {
  const total = itens.length;
  const concluidos = itens.filter(i => i.concluido === true).length;
  const pendentes = total - concluidos;
  const percentual = total > 0 ? (concluidos / total) * 100 : 0;
  return { total, concluidos, pendentes, percentual };
}
```
