const XLSX = require('./site/js/xlsx.full.min.js');
const fs = require('fs');

global.XLSX = XLSX;

const vm = require('vm');
const ctx = {
  console: console,
  XLSX: XLSX,
  localStorage: { getItem: () => null, setItem: () => {} },
  window: {},
  document: { createElement: () => ({ setAttribute: () => {}, click: () => {}, remove: () => {} }) }
};
vm.createContext(ctx);

// Load storage mock data
const storageCode = fs.readFileSync('./site/js/storage.js', 'utf-8') + '\nStorageEngine;';
const StorageEngine = vm.runInContext(storageCode, ctx);
const appState = StorageEngine.load();

// Load calculations
const calcCode = fs.readFileSync('./site/js/calculations.js', 'utf-8') + '\nFinancialEngine;';
const FinancialEngine = vm.runInContext(calcCode, ctx);
ctx.FinancialEngine = FinancialEngine;

// Load exporter
const expCode = fs.readFileSync('./site/js/exporter.js', 'utf-8') + '\nExcelExporter;';
const ExcelExporter = vm.runInContext(expCode, ctx);

const wb = XLSX.utils.book_new();
const dataHoje = '04/09/2026';
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildOrcamento2026Sheet(appState, dataHoje), 'Orçamento 2026');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildCartaoAgostoSheet(appState, dataHoje), 'CARTAO AGOSTO');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildOrcamento2027Sheet(appState, dataHoje), 'Orçamento 2027');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildOrcamento2024Sheet(appState), 'Orçamento 2024');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildComparativoSheet(appState), 'COMPARATIVO ANUAL');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildInvestimentosSheet(appState), 'Investimentos');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildMetasSheet(appState), 'Metas e Desejos');
XLSX.utils.book_append_sheet(wb, ExcelExporter.buildLancamentosSheet(appState), 'Lançamentos Gerais');

const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
fs.writeFileSync('./Victor_Orcamento_Anual_Atualizado_Teste.xlsx', buf);
console.log('✅ Exportação completa gerada com sucesso! Tamanho:', fs.statSync('./Victor_Orcamento_Anual_Atualizado_Teste.xlsx').size, 'bytes');
console.log('Abas criadas:', wb.SheetNames);
