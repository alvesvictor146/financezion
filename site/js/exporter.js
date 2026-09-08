/**
 * EXCEL EXPORTER ENGINE — DASHBOARD FINANCEIRO VICTOR
 * Exporta uma planilha Excel (.xlsx) nos moldes exatos da planilha original
 * "Victor Orçamento Anual.xlsx" contendo todas as abas e os dados 100% atualizados.
 */

const ExcelExporter = {
  exportToExcel(appState) {
    if (typeof XLSX === 'undefined') {
      alert('Biblioteca SheetJS ainda não foi carregada. Tente novamente em alguns instantes.');
      return false;
    }

    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const wb = XLSX.utils.book_new();

    // 1. ABA: Orçamento 2026
    const wsOrcamento26 = this.buildOrcamento2026Sheet(appState, dataHoje);
    XLSX.utils.book_append_sheet(wb, wsOrcamento26, 'Orçamento 2026');

    // 2. ABA: CARTAO AGOSTO
    const wsCartaoAgosto = this.buildCartaoAgostoSheet(appState, dataHoje);
    XLSX.utils.book_append_sheet(wb, wsCartaoAgosto, 'CARTAO AGOSTO');

    // 3. ABA: Orçamento 2027
    const wsOrcamento27 = this.buildOrcamento2027Sheet(appState, dataHoje);
    XLSX.utils.book_append_sheet(wb, wsOrcamento27, 'Orçamento 2027');

    // 4. ABA: Orçamento 2024
    const wsOrcamento24 = this.buildOrcamento2024Sheet(appState);
    XLSX.utils.book_append_sheet(wb, wsOrcamento24, 'Orçamento 2024');

    // 5. ABA: COMPARATIVO ANUAL
    const wsComparativo = this.buildComparativoSheet(appState);
    XLSX.utils.book_append_sheet(wb, wsComparativo, 'COMPARATIVO ANUAL');

    // 6. ABA: Investimentos
    const wsInvest = this.buildInvestimentosSheet(appState);
    XLSX.utils.book_append_sheet(wb, wsInvest, 'Investimentos');

    // 7. ABA: Metas e Desejos
    const wsMetas = this.buildMetasSheet(appState);
    XLSX.utils.book_append_sheet(wb, wsMetas, 'Metas e Desejos');

    // 8. ABA: Lançamentos Gerais
    const wsLancamentos = this.buildLancamentosSheet(appState);
    XLSX.utils.book_append_sheet(wb, wsLancamentos, 'Lançamentos Gerais');

    // Gera o nome do arquivo com timestamp
    const nowIso = new Date().toISOString().slice(0, 10);
    const fileName = `Victor_Orcamento_Anual_Atualizado_${nowIso}.xlsx`;

    // Dispara o download nativo no navegador
    XLSX.writeFile(wb, fileName);
    return true;
  },

  // 1. Monta Orçamento 2026 nos moldes da planilha original
  buildOrcamento2026Sheet(appState, dataHoje) {
    const y26 = appState.years && appState.years[2026];
    const limits = (y26 && y26.limites_orcados) || [];
    const months = (y26 && y26.months) || [];

    const getMonthVal = (mName, field) => {
      const m = months.find(item => item.name.toLowerCase() === mName.toLowerCase());
      return m ? (Number(m[field]) || 0) : 0;
    };

    const getLimitVal = (catName, col) => {
      const lower = catName.toLowerCase();
      let found = limits.find(l => l.categoria.toLowerCase() === lower);
      if (!found) found = limits.find(l => l.categoria.toLowerCase().startsWith(lower));
      if (!found && lower.length > 5) found = limits.find(l => l.categoria.toLowerCase().includes(lower));
      if (found && found[col] !== undefined) return Number(found[col]) || 0;
      return 0;
    };

    const rows = [
      ['', '', '', '', '', '', '', '', ''],
      ['', `Atualizado em: ${dataHoje}`, '', '', '', '', '', '', ''],
      ['', 'Receitas', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro', ''],
      ['', 'Salário Líquido', 4228.25, 4232.30, 4232.30, 4232.30, 4232.30, 4232.30, ''],
      ['', 'Insalubridade', 785.67, 785.67, 785.67, 785.67, 785.67, 785.67, ''],
      ['', 'Ajuda Custo Alim (UFESP R$38,42)', 806.82, 883.66, 883.66, 883.66, 883.66, 883.66, ''],
      ['', 'Quinquênio', 537.26, 537.26, 537.26, 537.26, 537.26, 537.26, ''],
      ['', 'DEJEM / DELEGADA', 2495.68, 1536.80, 2400.00, 1535.00, 2100.00, 2100.00, ''],
      ['', 'Férias', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', '13º Salário', 0.00, 0.00, 0.00, 0.00, 0.00, 3943.80, ''],
      ['', 'Renda extra', 0.00, 1200.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Sobra Mensal', 1004.90, 3.05, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Contas Casal', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Outros', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Receita Total', getMonthVal('Julho', 'receita'), getMonthVal('Agosto', 'receita'), getMonthVal('Setembro', 'receita'), getMonthVal('Outubro', 'receita'), getMonthVal('Novembro', 'receita'), getMonthVal('Dezembro', 'receita'), ''],
      ['', 'ESSENCIAL', '', '', '', '', '', '', ''],
      ['', 'Contas Casal (lazer, depesas, compras, etc).', 618.00, getLimitVal('Contas Casal', 'agosto') || 768.49, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Alice (gastos extras)', 240.00, getLimitVal('Alice', 'agosto') || 36.39, 240.00, 240.00, 240.00, 240.00, ''],
      ['', 'Advogados (boleto/mensal)', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Ajuda casa (pix/mensal)', 0.00, 0.00, 250.00, 250.00, 250.00, 250.00, ''],
      ['', 'Alimentação trabalho (limite)', 269.83, getLimitVal('Alimentação trabalho', 'agosto') || 464.63, 220.00, 220.00, 220.00, 220.00, ''],
      ['', 'Combustível (limite)', 498.82, getLimitVal('Combustível', 'agosto') || 369.45, 650.00, 650.00, 650.00, 650.00, ''],
      ['', 'Débitos carro', 0.00, 0.00, 0.00, 0.00, 0.00, 167.74, ''],
      ['', 'Despesas casa', 26.85, getLimitVal('Despesas casa', 'agosto') || 17.90, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Estacionamento (limite)', 60.00, getLimitVal('Estacionamento', 'agosto') || 130.00, 90.00, 90.00, 90.00, 90.00, ''],
      ['', 'Farmácia', 72.67, getLimitVal('Farmácia', 'agosto') || 75.61, 50.00, 50.00, 50.00, 50.00, ''],
      ['', 'Manutenção carro', 754.03, getLimitVal('Manutenção carro', 'agosto') || 416.75, 283.68, 283.68, 238.13, 227.61, ''],
      ['', 'Mercado (limite)', 159.91, getLimitVal('Mercado', 'agosto') || 155.81, 200.00, 200.00, 200.00, 200.00, ''],
      ['', 'Pensão alimentícia (holerite)', 1308.22, getLimitVal('Pensão alimentícia', 'agosto') || 1339.84, 1271.83, 1271.83, 1271.83, 1271.83, ''],
      ['', 'Recarga celular (boleto/mensal)', 98.43, getLimitVal('Recarga celular', 'agosto') || 99.00, 99.00, 99.00, 99.00, 99.00, ''],
      ['', 'Saúde', 140.00, 0.00, 140.00, 0.00, 140.00, 0.00, ''],
      ['', 'Seguro de vida (holerite)', 82.15, getLimitVal('Seguro de vida', 'agosto') || 85.56, 82.15, 82.15, 82.15, 82.15, ''],
      ['', 'Uber / Transporte (limite)', 47.96, getLimitVal('Uber', 'agosto') || 86.66, 100.00, 100.00, 100.00, 100.00, ''],
      ['', 'Obra', 2840.90, getLimitVal('Obra', 'agosto') || 2131.77, 1143.77, 423.88, 117.64, 117.64, ''],
      ['', 'Outros', 356.98, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Essencial', getMonthVal('Julho', 'fixa'), getMonthVal('Agosto', 'fixa'), getMonthVal('Setembro', 'fixa'), getMonthVal('Outubro', 'fixa'), getMonthVal('Novembro', 'fixa'), getMonthVal('Dezembro', 'fixa'), ''],
      ['', 'Essencial/Receita', '76.8%', '67.3%', '54.5%', '49.7%', '43.9%', '30.2%', ''],
      ['', 'ESTILO DE VIDA', '', '', '', '', '', '', ''],
      ['', 'Academia (crédito/mensal)', 54.99, getLimitVal('Academia', 'agosto') || 54.99, 54.99, 54.99, 54.99, 54.99, ''],
      ['', 'Acessórios', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Artigos/Eletrônicos', 0.00, getLimitVal('Artigos/Eletrônicos', 'agosto') || 20.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Assinaturas/Anuidades (crédito/mensal)', 22.92, getLimitVal('Assinaturas', 'agosto') || 61.02, 37.23, 37.23, 22.40, 5.90, ''],
      ['', 'Eletrodomésticos/Móveis', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Estudos', 96.99, getLimitVal('Estudos', 'agosto') || 96.99, 96.99, 96.99, 96.99, 96.99, ''],
      ['', 'Lazer (limite)', 684.36, getLimitVal('Lazer', 'agosto') || 1008.59, 1000.00, 1000.00, 1000.00, 1500.00, ''],
      ['', 'Presentes', 61.98, getLimitVal('Presentes', 'agosto') || 104.68, 104.68, 104.68, 104.68, 0.00, ''],
      ['', 'Barbeiro', 76.90, getLimitVal('Barbeiro', 'agosto') || 87.90, 87.90, 87.90, 87.90, 87.90, ''],
      ['', 'Vestuário', 251.21, getLimitVal('Vestuário', 'agosto') || 142.95, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Viagens', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Outros', 31.43, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Estilo de vida', getMonthVal('Julho', 'variavel'), getMonthVal('Agosto', 'variavel'), getMonthVal('Setembro', 'variavel'), getMonthVal('Outubro', 'variavel'), getMonthVal('Novembro', 'variavel'), getMonthVal('Dezembro', 'variavel'), ''],
      ['', 'Est. de vida/Receita', '13.0%', '17.2%', '15.6%', '17.3%', '16.0%', '14.0%', ''],
      ['', 'INVESTIMENTOS', '', '', '', '', '', '', ''],
      ['', 'Reserva de emergência', 1000.00, 1200.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Pai Obra', 0.00, 0.00, 1000.00, 1000.00, 1000.00, 1000.00, ''],
      ['', 'Metas financeiras', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, ''],
      ['', 'Investimentos', getMonthVal('Julho', 'invest'), getMonthVal('Agosto', 'invest'), getMonthVal('Setembro', 'invest'), getMonthVal('Outubro', 'invest'), getMonthVal('Novembro', 'invest'), getMonthVal('Dezembro', 'invest'), ''],
      ['', 'Invest./Receita', '10.1%', '13.1%', '11.3%', '12.5%', '11.7%', '8.0%', ''],
      ['', 'SOBRA MENSAL', getMonthVal('Julho', 'sobra'), getMonthVal('Agosto', 'sobra'), getMonthVal('Setembro', 'sobra'), getMonthVal('Outubro', 'sobra'), getMonthVal('Novembro', 'sobra'), getMonthVal('Dezembro', 'sobra'), (getMonthVal('Agosto', 'sobra') + getMonthVal('Setembro', 'sobra') + getMonthVal('Outubro', 'sobra') + getMonthVal('Novembro', 'sobra') + getMonthVal('Dezembro', 'sobra'))]
    ];

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [
      { wch: 4 },
      { wch: 38 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 16 }
    ];
    return ws;
  },

  // 2. Monta CARTAO AGOSTO com os lançamentos atualizados
  buildCartaoAgostoSheet(appState, dataHoje) {
    const cartao = appState.cartaoAgosto || {};
    const compras = Array.isArray(cartao.compras) ? cartao.compras : [];

    const rows = [
      ['', '', '', '', '', '', '', ''],
      ['', 'Fatura Agosto- vencimento 10/08', '', '', '', '', '', `Atualizado em: ${dataHoje}`],
      ['', 'O que?', 'Eu pago', 'Valor parcela', 'Parcela Atual', 'Nº parcelas', 'Motivo', 'Cartão']
    ];

    let totalGeral = 0;
    compras.forEach(c => {
      const vPago = Number(c.euPago || c.valor) || 0;
      totalGeral += vPago;
      rows.push([
        '',
        c.oQue || c.categoria || 'Geral',
        vPago,
        Number(c.valorParcela || c.valor || vPago),
        c.parcelaAtual || '-',
        c.numParcelas || '-',
        c.motivo || c.estabelecimento || '-',
        c.cartao || 'C/C BB'
      ]);
    });

    rows.push(['', '', '', '', '', '', '', '']);
    rows.push(['', 'TOTAL DA FATURA', totalGeral, '', '', '', `${compras.length} lançamentos`, '']);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [
      { wch: 4 },
      { wch: 34 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 30 },
      { wch: 20 }
    ];
    return ws;
  },

  // 3. Monta Orçamento 2027
  buildOrcamento2027Sheet(appState, dataHoje) {
    const y27 = appState.years && appState.years[2027];
    const months = (y27 && y27.months) || [];

    const rows = [
      ['', '', '', '', '', '', '', ''],
      ['', `Atualizado em: ${dataHoje}`, 'Orçamento 2027', '', '', '', '', ''],
      ['', 'Mês', 'Receita Prevista', 'Custos Fixos', 'Despesas Variáveis', 'Investimentos', 'Sobra Mensal Prevista']
    ];

    months.forEach(m => {
      rows.push([
        '',
        m.name,
        Number(m.receita) || 0,
        Number(m.fixa) || 0,
        Number(m.variavel) || 0,
        Number(m.invest) || 0,
        Number(m.sobra) || 0
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 4 }, { wch: 18 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 16 }, { wch: 20 }];
    return ws;
  },

  // 4. Monta Orçamento 2024
  buildOrcamento2024Sheet(appState) {
    const y24 = appState.years && appState.years[2024];
    const months = (y24 && y24.months) || [];

    const rows = [
      ['', '', '', '', '', '', '', ''],
      ['', 'Orçamento Anual 2024 (Histórico Realizado)', '', '', '', '', '', ''],
      ['', 'Mês', 'Receita Realizada', 'Custos Fixos', 'Despesas Variáveis', 'Investimentos', 'Sobra Mensal']
    ];

    months.forEach(m => {
      rows.push([
        '',
        m.name,
        Number(m.receita) || 0,
        Number(m.fixa) || 0,
        Number(m.variavel) || 0,
        Number(m.invest) || 0,
        Number(m.sobra) || 0
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 4 }, { wch: 18 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 16 }, { wch: 20 }];
    return ws;
  },

  // 5. Monta COMPARATIVO ANUAL
  buildComparativoSheet(appState) {
    const compData = FinancialEngine.processYearComparison(appState);
    const rows = [
      ['', '', '', '', '', ''],
      ['', 'Comparativo Anual Consolidado', '', '', '', ''],
      ['', 'Exercício', 'Receitas Totais', 'Despesas Fixas', 'Despesas Variáveis', 'Investimentos', 'Sobra Líquida Acumulada']
    ];

    compData.forEach(c => {
      rows.push([
        '',
        c.ano,
        c.receitas,
        c.fixas,
        c.variaveis,
        c.investimentos,
        c.sobra
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 4 }, { wch: 14 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 16 }, { wch: 24 }];
    return ws;
  },

  // 6. Monta Investimentos
  buildInvestimentosSheet(appState) {
    const inv = appState.investimentos || {};
    const carteira = Array.isArray(inv.carteira) ? inv.carteira : [];

    const rows = [
      ['', '', '', '', ''],
      ['', 'Controle de Investimentos & Patrimônio', '', '', ''],
      ['', `Patrimônio Total: R$ ${(Number(inv.patrimonioTotal) || 0).toFixed(2)}`, `Aportes Mensais: R$ ${(Number(inv.aportesMensais) || 0).toFixed(2)}`, `Rentabilidade: ${inv.rentabilidadeAnual || 11.5}% a.a.`, ''],
      ['', 'Ativo / Título', 'Classe de Ativo', 'Valor Alocado (R$)', 'Participação (%)']
    ];

    carteira.forEach(item => {
      rows.push([
        '',
        item.ativo || '-',
        item.classe || '-',
        Number(item.valor) || 0,
        `${(Number(item.pct) || 0).toFixed(1)}%`
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 4 }, { wch: 28 }, { wch: 20 }, { wch: 20 }, { wch: 16 }];
    return ws;
  },

  // 7. Monta Metas e Desejos
  buildMetasSheet(appState) {
    const metas = Array.isArray(appState.metas) ? appState.metas : [];
    const rows = [
      ['', '', '', '', ''],
      ['', 'Metas e Desejos', '', '', ''],
      ['', 'Descrição da Meta', 'Categoria', 'Status', 'Prazo']
    ];

    metas.forEach(m => {
      rows.push([
        '',
        m.titulo || m.descricao || '-',
        m.categoria || 'Geral',
        m.concluido ? 'CONCLUÍDA' : 'PENDENTE',
        m.prazo || 'Curto Prazo'
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 4 }, { wch: 35 }, { wch: 20 }, { wch: 16 }, { wch: 20 }];
    return ws;
  },

  // 8. Monta Lançamentos Gerais
  buildLancamentosSheet(appState) {
    const transacoes = Array.isArray(appState.transacoes) ? appState.transacoes : [];
    const rows = [
      ['', 'Data', 'Descrição', 'Categoria', 'Tipo', 'Valor (R$)', 'Forma Pagamento / Cartão']
    ];

    transacoes.forEach(t => {
      rows.push([
        '',
        t.data || '',
        t.descricao || '',
        t.categoria || '',
        t.tipo || 'variavel',
        Number(t.valor) || 0,
        t.formaPagamento || 'PIX'
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 4 }, { wch: 14 }, { wch: 32 }, { wch: 24 }, { wch: 14 }, { wch: 14 }, { wch: 24 }];
    return ws;
  }
};
