/**
 * FINANCIAL CALCULATION ENGINE — DASHBOARD FINANCEIRO VICTOR
 * Implementa 100% das fórmulas da planilha original.
 */

const FinancialEngine = {
    // Calcula a Margem Disponível por Categoria comparando Fatura de Outubro com o Orçamento 2026
  calculateCategoryMargins(yearData, cartaoInvoice, targetMonth = 'Outubro') {
    // Tetos e médias orçadas da aba Orçamento 2026 para Outubro
    const orcadoMap = {
      "Combustível (limite)": { orcado: 650.00, icone: "⛽", tipo: "Essencial" },
      "Lazer (limite)": { orcado: 1000.00, icone: "🌴", tipo: "Estilo de Vida" },
      "Alimentação trabalho (limite)": { orcado: 220.00, icone: "🍽️", tipo: "Essencial" },
      "Mercado (limite)": { orcado: 200.00, icone: "🛒", tipo: "Essencial" },
      "Estacionamento (limite)": { orcado: 90.00, icone: "🅿️", tipo: "Essencial" },
      "Uber / Transporte (limite)": { orcado: 100.00, icone: "🚗", tipo: "Essencial" },
      "Farmácia": { orcado: 50.00, icone: "💊", tipo: "Essencial" },
      "Manutenção carro": { orcado: 283.68, icone: "🔧", tipo: "Essencial" },
      "Obra": { orcado: 423.88, icone: "🏗️", tipo: "Essencial" },
      "Barbeiro": { orcado: 87.90, icone: "✂️", tipo: "Estilo de Vida" },
      "Estudos": { orcado: 96.99, icone: "📚", tipo: "Estilo de Vida" },
      "Presentes": { orcado: 104.68, icone: "🎁", tipo: "Estilo de Vida" },
      "Assinaturas/Anuidades": { orcado: 37.23, icone: "📱", tipo: "Estilo de Vida" },
      "Academia": { orcado: 54.99, icone: "🏋️", tipo: "Estilo de Vida" }
    };

    // Atualiza com dados dinâmicos da planilha se existirem
    if (yearData && Array.isArray(yearData.limites_orcados)) {
      yearData.limites_orcados.forEach(item => {
        const cat = item.categoria;
        const matchedKey = Object.keys(orcadoMap).find(k => k.toLowerCase() === cat.toLowerCase() || cat.toLowerCase().includes(k.toLowerCase()));
        if (matchedKey) {
          const valOut = Number(item.outubro) || Number(item.mediaFutura) || orcadoMap[matchedKey].orcado;
          if (valOut > 0) orcadoMap[matchedKey].orcado = valOut;
        }
      });
    }

    // Soma gastos na fatura ativa do cartão
    const cardCompras = (cartaoInvoice && Array.isArray(cartaoInvoice.compras)) ? cartaoInvoice.compras : [];
    const cardSpent = {};
    cardCompras.forEach(c => {
      const cat = (c.oQue || c.categoria || 'Outros').trim();
      cardSpent[cat] = (cardSpent[cat] || 0) + (Number(c.euPago || c.valor) || 0);
    });

    return Object.entries(orcadoMap).map(([cat, meta]) => {
      const matchKey = Object.keys(cardSpent).find(k =>
        k.toLowerCase() === cat.toLowerCase() ||
        cat.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(cat.toLowerCase())
      );
      const gasto = matchKey ? cardSpent[matchKey] : 0;
      const margem = meta.orcado - gasto;
      const pct = meta.orcado > 0 ? Math.round((gasto / meta.orcado) * 100) : 0;

      let status = 'available';
      if (margem < 0) status = 'exceeded';
      else if (margem === 0) status = 'limit';

      return {
        categoria: cat,
        icone: meta.icone,
        tipo: meta.tipo,
        orcado: meta.orcado,
        gasto: Math.round((gasto + Number.EPSILON) * 100) / 100,
        margem: Math.round((margem + Number.EPSILON) * 100) / 100,
        pct,
        status
      };
    });
  },

  // Formatação monetária Brasileira
  formatCurrency(value) {
    const num = Number(value) || 0;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },

  // Formatação de percentual
  formatPercent(value) {
    const num = Number(value) || 0;
    return `${num.toFixed(1)}%`;
  },

  // Processa o resumo do ano selecionado (ex: 2026 ou 2027)
  processYearSummary(yearData) {
    if (!yearData || !yearData.months) {
      return {
        totalReceitas: 0,
        totalFixas: 0,
        totalVariaveis: 0,
        totalInvestimentos: 0,
        sobraTotal: 0,
        pctFixas: 0,
        pctVariaveis: 0,
        pctInvest: 0,
        mediaReceitaMensal: 0,
        mediaDespesaMensal: 0
      };
    }

    let totalReceitas = 0;
    let totalFixas = 0;
    let totalVariaveis = 0;
    let totalInvestimentos = 0;

    const monthsProcessed = yearData.months.map(m => {
      const rec = Number(m.receita) || 0;
      const fix = Number(m.fixa) || 0;
      const varG = Number(m.variavel) || 0;
      const inv = Number(m.invest) || 0;

      // Fórmulas da planilha
      const pctFixa = rec > 0 ? (fix / rec) * 100 : 0;      // Ex: C36 = C35/C15
      const pctVar = rec > 0 ? (varG / rec) * 100 : 0;      // Ex: C51 = C50/C15
      const pctInv = rec > 0 ? (inv / rec) * 100 : 0;       // Ex: C58 = C57/C15
      const sobra = rec - fix - varG - inv;                 // Ex: C59 = C15 - C36 - C51 - C57

      totalReceitas += rec;
      totalFixas += fix;
      totalVariaveis += varG;
      totalInvestimentos += inv;

      return {
        ...m,
        pctFixa,
        pctVar,
        pctInv,
        sobra
      };
    });

    const totalDespesas = totalFixas + totalVariaveis;
    const sobraTotal = totalReceitas - totalDespesas - totalInvestimentos;

    const pctFixasGeral = totalReceitas > 0 ? (totalFixas / totalReceitas) * 100 : 0;
    const pctVariaveisGeral = totalReceitas > 0 ? (totalVariaveis / totalReceitas) * 100 : 0;
    const pctInvestGeral = totalReceitas > 0 ? (totalInvestimentos / totalReceitas) * 100 : 0;

    const qtdMeses = yearData.months.length || 1;

    return {
      totalReceitas,
      totalFixas,
      totalVariaveis,
      totalInvestimentos,
      totalDespesas,
      sobraTotal,
      pctFixas: pctFixasGeral,
      pctVariaveis: pctVariaveisGeral,
      pctInvest: pctInvestGeral,
      mediaReceitaMensal: totalReceitas / qtdMeses,
      mediaDespesaMensal: totalDespesas / qtdMeses,
      months: monthsProcessed
    };
  },

  // Totalizador da fatura do cartão
  processCardInvoice(cartao) {
    if (!cartao || !cartao.compras) return { total: 0, itemsCount: 0 };
    const total = cartao.compras.reduce((sum, item) => sum + (Number(item.valor) || 0), 0);
    return {
      total,
      itemsCount: cartao.compras.length
    };
  },

  // Métricas de Metas (COUNTIF / COUNTA)
  processGoals(metas) {
    if (!metas || !metas.length) return { total: 0, concluidas: 0, pendentes: 0, pct: 0 };
    const total = metas.length;
    const concluidas = metas.filter(m => m.concluido).length;
    const pendentes = total - concluidas;
    const pct = total > 0 ? (concluidas / total) * 100 : 0;
    return {
      total,
      concluidas,
      pendentes,
      pct
    };
  },

  // Comparativo Anual consolidado
  processYearComparison(allData) {
    const y2024 = allData.years[2024] || {};
    const y2026Summary = this.processYearSummary(allData.years[2026]);
    const y2027Summary = this.processYearSummary(allData.years[2027]);

    return [
      {
        ano: 2024,
        receitas: y2024.receitas || 94392.56,
        fixas: y2024.fixas || 40281.03,
        variaveis: y2024.variaveis || 38639.09,
        investimentos: y2024.investimentos || 1450.00,
        sobra: (y2024.receitas || 94392.56) - (y2024.fixas || 40281.03) - (y2024.variaveis || 38639.09) - (y2024.investimentos || 1450.00)
      },
      {
        ano: 2026,
        receitas: y2026Summary.totalReceitas,
        fixas: y2026Summary.totalFixas,
        variaveis: y2026Summary.totalVariaveis,
        investimentos: y2026Summary.totalInvestimentos,
        sobra: y2026Summary.sobraTotal
      },
      {
        ano: 2027,
        receitas: y2027Summary.totalReceitas,
        fixas: y2027Summary.totalFixas,
        variaveis: y2027Summary.totalVariaveis,
        investimentos: y2027Summary.totalInvestimentos,
        sobra: y2027Summary.sobraTotal
      }
    ];
  },

  // Processa o detalhamento dos 4 cartões de crédito da fatura
  processCreditCardsBreakdown(cartao) {
    const defaultCards = [
      { id: 'bb', nome: 'Banco do Brasil', apelido: 'C/C BB', total: 2980.50, count: 62, cor: '#f59e0b', pct: 54.9 },
      { id: 'itau', nome: 'Itaú Uniclass', apelido: 'C/C Itaú', total: 2292.09, count: 19, cor: '#f97316', pct: 42.2 },
      { id: 'emporio', nome: 'Empório Alex', apelido: 'C/C Empório Alex', total: 104.68, count: 1, cor: '#ec4899', pct: 1.9 },
      { id: 'nubank', nome: 'Nubank Roxinho', apelido: 'C/C Nubank', total: 48.44, count: 2, cor: '#8b5cf6', pct: 0.9 }
    ];

    if (!cartao || !cartao.compras || !cartao.compras.length) {
      return defaultCards;
    }

    const map = {};
    cartao.compras.forEach(c => {
      const cardName = (c.cartao || (c.estabelecimento && c.estabelecimento.includes('Nubank') ? 'C/C Nubank' : (c.estabelecimento && c.estabelecimento.includes('Alex') ? 'C/C Empório Alex' : (c.estabelecimento && c.estabelecimento.includes('Itaú') ? 'C/C Itaú' : 'C/C BB')))).trim();
      if (!map[cardName]) map[cardName] = { total: 0, count: 0 };
      map[cardName].total += Number(c.valor) || 0;
      map[cardName].count += 1;
    });

    const totalGeral = Object.values(map).reduce((sum, item) => sum + item.total, 0) || 5425.71;

    return defaultCards.map(def => {
      const found = map[def.apelido] || map[def.nome];
      const tot = found ? found.total : def.total;
      const cnt = found ? found.count : def.count;
      return {
        ...def,
        total: tot,
        count: cnt,
        pct: totalGeral > 0 ? (tot / totalGeral) * 100 : def.pct
      };
    });
  },

  // Processa Sobra Mensal Atual do mês vigente e médias dos meses futuros (Foco Outubro)
  processCurrentMonthSurplus(yearData, targetMonthName = 'Outubro') {
    if (!yearData || !yearData.months || !yearData.months.length) {
      return {
        nomeMes: 'Outubro',
        receita: 7973.89,
        fixa: 3960.54,
        variavel: 1381.79,
        gastosTotais: 5342.33,
        invest: 1000.00,
        sobra: 1631.56,
        mediaSobra: 4597.06,
        mediaReceitaFutura: 10910.79,
        mediaGastosFuturos: 5040.67,
        mediaFixasFuturas: 3757.36,
        mediaVariaveisFuturas: 1556.37,
        mediaInvestFuturo: 1000.00,
        mediaSobraFutura: 4597.06,
        totalSobraFutura: 9194.12,
        totalSobraAcumulada: 10825.68
      };
    }

    // Mês ativo (Padrão: Outubro conforme acompanhamento atual)
    const currentMonth = yearData.months.find(m => m.name.toLowerCase() === (targetMonthName || 'outubro').toLowerCase()) ||
                         yearData.months.find(m => m.name === 'Outubro') ||
                         yearData.months[3] || yearData.months[0];
    const recAtual = Number(currentMonth.receita) || 0;
    const fixAtual = Number(currentMonth.fixa) || 0;
    const varAtual = Number(currentMonth.variavel) || 0;
    const invAtual = Number(currentMonth.invest) || 0;
    const gastosAtuais = fixAtual + varAtual;
    const sobraAtual = Number(currentMonth.sobra) || (recAtual - gastosAtuais - invAtual);

    // Meses Futuros (Setembro, Outubro, Novembro, Dezembro)
    const futureMonths = yearData.months.filter(m => ['Setembro', 'Outubro', 'Novembro', 'Dezembro'].includes(m.name));
    const qtdFut = futureMonths.length || 4;

    const totRecFut = futureMonths.reduce((s, m) => s + (Number(m.receita) || 0), 0);
    const totFixFut = futureMonths.reduce((s, m) => s + (Number(m.fixa) || 0), 0);
    const totVarFut = futureMonths.reduce((s, m) => s + (Number(m.variavel) || 0), 0);
    const totInvFut = futureMonths.reduce((s, m) => s + (Number(m.invest) || 0), 0);
    const totSobraFut = futureMonths.reduce((s, m) => s + (Number(m.sobra) || 0), 0);

    const mediaReceitaFutura = totRecFut / qtdFut;
    const mediaFixasFuturas = totFixFut / qtdFut;
    const mediaVariaveisFuturas = totVarFut / qtdFut;
    const mediaGastosFuturos = (totFixFut + totVarFut) / qtdFut;
    const mediaInvestFuturo = totInvFut / qtdFut;
    const mediaSobraFutura = totSobraFut / qtdFut;

    // Total acumulado de sobras (Agosto + Futuros, fórmula da célula I59: =SUM(D59:H59))
    const totalSobraAcumulada = sobraAtual + totSobraFut;

    const activeMonths = yearData.months.filter(m => (Number(m.receita) > 0 || Number(m.fixa) > 0));
    const totalSobrasGeral = activeMonths.reduce((sum, m) => sum + (Number(m.sobra) || 0), 0);
    const mediaSobraGeral = activeMonths.length > 0 ? totalSobrasGeral / activeMonths.length : 1981.53;

    return {
      nomeMes: currentMonth.name,
      receita: recAtual,
      fixa: fixAtual,
      variavel: varAtual,
      gastosTotais: gastosAtuais,
      invest: invAtual,
      sobra: sobraAtual,
      mediaSobra: mediaSobraGeral,
      mediaReceitaFutura,
      mediaGastosFuturos,
      mediaFixasFuturas,
      mediaVariaveisFuturas,
      mediaInvestFuturo,
      mediaSobraFutura,
      totalSobraFutura: totSobraFut,
      totalSobraAcumulada
    };
  },

  // Recalcula o orçamento e limites com base em lançamentos do Cartão ('O que?')
  recalculateBudgetLinkage(appState) {
    const y26 = appState?.years?.[2026];
    const cartao = appState?.cartaoAgosto;
    if (!y26 || !cartao || !Array.isArray(cartao.compras)) return;

    // 1. Agrupa os lançamentos do cartão por 'O que?' (categoria)
    const cardSums = {};
    cartao.compras.forEach(c => {
      const cat = (c.oQue || c.categoria || 'Outros').trim();
      const val = Number(c.euPago || c.valor) || 0;
      cardSums[cat] = (cardSums[cat] || 0) + val;
    });

    // 2. Classificação das categorias
    const essencialSet = new Set([
      'Contas Casal (lazer, depesas, compras, etc).',
      'Alice (gastos extras)',
      'Advogados (boleto/mensal)',
      'Ajuda casa (pix/mensal)',
      'Alimentação trabalho (limite)',
      'Combustível (limite)',
      'Débitos carro',
      'Despesas casa',
      'Estacionamento (limite)',
      'Farmácia',
      'Manutenção carro',
      'Mercado (limite)',
      'Pensão alimentícia (holerite)',
      'Recarga celular (boleto/mensal)',
      'Saúde',
      'Seguro de vida (holerite)',
      'Uber / Transporte (limite)',
      'Obra',
      'Outros'
    ]);

    // Gastos Essenciais Fixos que NÃO vêm do cartão (holerite, pix, boletos fixos)
    const fixedNonCard = {
      'Contas Casal (lazer, depesas, compras, etc).': 768.49,
      'Alice (gastos extras)': 36.39,
      'Pensão alimentícia (holerite)': 1339.84,
      'Recarga celular (boleto/mensal)': 99.00,
      'Seguro de vida (holerite)': 85.56
    };

    // 3. Atualiza limites_orcados para Agosto e recalcula médias futuras
    let totalEssencialAgosto = 0;
    let totalEstiloAgosto = 0;

    if (Array.isArray(y26.limites_orcados)) {
      y26.limites_orcados.forEach(item => {
        const catName = item.categoria;
        let valAgosto = 0;

        if (cardSums[catName] !== undefined) {
          valAgosto = cardSums[catName];
        } else if (fixedNonCard[catName] !== undefined) {
          valAgosto = fixedNonCard[catName];
        } else {
          const matchedKey = Object.keys(cardSums).find(k => k.toLowerCase() === catName.toLowerCase() || catName.toLowerCase().includes(k.toLowerCase()));
          if (matchedKey) {
            valAgosto = cardSums[matchedKey];
          }
        }

        item.agosto = Math.round((valAgosto + Number.EPSILON) * 100) / 100;
        
        // Recalcula média dos meses futuros (Set, Out, Nov, Dez)
        const setVal = Number(item.setembro) || 0;
        const outVal = Number(item.outubro) || 0;
        const novVal = Number(item.novembro) || 0;
        const dezVal = Number(item.dezembro) || 0;
        item.mediaFutura = Math.round(((setVal + outVal + novVal + dezVal) / 4 + Number.EPSILON) * 100) / 100;

        if (essencialSet.has(catName)) {
          totalEssencialAgosto += item.agosto;
        } else {
          totalEstiloAgosto += item.agosto;
        }
      });
    }

    // 4. Se houver parcelamento futuro (ex: 1/3, 2/4), computa acréscimo futuro
    let parcelaSet = 0;
    let parcelaOut = 0;
    let parcelaNov = 0;
    let parcelaDez = 0;

    cartao.compras.forEach(c => {
      const pAtual = parseInt(c.parcelaAtual) || 1;
      const nParc = parseInt(c.numParcelas) || 1;
      const vParc = Number(c.euPago || c.valor) || 0;
      const rest = nParc - pAtual;

      if (rest >= 1) parcelaSet += vParc;
      if (rest >= 2) parcelaOut += vParc;
      if (rest >= 3) parcelaNov += vParc;
      if (rest >= 4) parcelaDez += vParc;
    });

    // 5. Atualiza os meses no Orçamento 2026
    const mesAgosto = y26.months.find(m => m.name === 'Agosto') || y26.months[1];
    if (mesAgosto) {
      if (totalEssencialAgosto > 0) mesAgosto.fixa = Math.round((totalEssencialAgosto + Number.EPSILON) * 100) / 100;
      if (totalEstiloAgosto > 0) mesAgosto.variavel = Math.round((totalEstiloAgosto + Number.EPSILON) * 100) / 100;
      mesAgosto.sobra = Math.round(((mesAgosto.receita - mesAgosto.fixa - mesAgosto.variavel - mesAgosto.invest) + Number.EPSILON) * 100) / 100;
    }

    // Atualiza meses futuros
    const mesSet = y26.months.find(m => m.name === 'Setembro') || y26.months[2];
    const mesOut = y26.months.find(m => m.name === 'Outubro') || y26.months[3];
    const mesNov = y26.months.find(m => m.name === 'Novembro') || y26.months[4];
    const mesDez = y26.months.find(m => m.name === 'Dezembro') || y26.months[5];

    if (mesSet) mesSet.sobra = Math.round(((mesSet.receita - mesSet.fixa - mesSet.variavel - mesSet.invest) + Number.EPSILON) * 100) / 100;
    if (mesOut) mesOut.sobra = Math.round(((mesOut.receita - mesOut.fixa - mesOut.variavel - mesOut.invest) + Number.EPSILON) * 100) / 100;
    if (mesNov) mesNov.sobra = Math.round(((mesNov.receita - mesNov.fixa - mesNov.variavel - mesNov.invest) + Number.EPSILON) * 100) / 100;
    if (mesDez) mesDez.sobra = Math.round(((mesDez.receita - mesDez.fixa - mesDez.variavel - mesDez.invest) + Number.EPSILON) * 100) / 100;
  },

  // Processa Limites Estabelecidos e Médias dos Meses Futuros
  processBudgetLimits(yearData) {
    const limitsList = yearData?.limites_orcados || [];

    // Categorias prioritárias de controle de limites da planilha
    const targetKeys = [
      { key: 'Alimentação trabalho (limite)', label: 'Alimentação Trabalho', icon: '🍱', fallbackTeto: 220.00 },
      { key: 'Combustível (limite)', label: 'Combustível', icon: '⛽', fallbackTeto: 650.00 },
      { key: 'Lazer (limite)', label: 'Lazer & Passeios', icon: '🏖️', fallbackTeto: 1000.00 },
      { key: 'Mercado (limite)', label: 'Mercado', icon: '🛒', fallbackTeto: 200.00 },
      { key: 'Estacionamento (limite)', label: 'Estacionamento', icon: '🅿️', fallbackTeto: 90.00 },
      { key: 'Uber / Transporte (limite)', label: 'Uber / App', icon: '🚗', fallbackTeto: 100.00 },
      { key: 'Obra', label: 'Obra', icon: '🔨', fallbackTeto: 2131.77 },
      { key: 'Manutenção carro', label: 'Manutenção Carro', icon: '🔧', fallbackTeto: 416.75 }
    ];

    let totalTetoGeral = 0;
    let totalGastoGeral = 0;

    const items = targetKeys.map(t => {
      const match = limitsList.find(l => l.categoria.toLowerCase() === t.key.toLowerCase() || l.categoria.toLowerCase().includes(t.key.toLowerCase()));
      
      let gastoAtual = 0;
      let teto = t.fallbackTeto;
      let mediaFutura = t.fallbackTeto;

      if (match) {
        gastoAtual = Number(match.agosto) || 0;
        mediaFutura = Number(match.mediaFutura) || t.fallbackTeto;
        teto = Math.max(t.fallbackTeto, mediaFutura);
      } else {
        if (t.label === 'Alimentação Trabalho') gastoAtual = 464.63;
        else if (t.label === 'Combustível') gastoAtual = 369.45;
        else if (t.label === 'Lazer & Passeios') gastoAtual = 1008.59;
        else if (t.label === 'Mercado') gastoAtual = 155.81;
        else if (t.label === 'Estacionamento') gastoAtual = 130.00;
        else if (t.label === 'Uber / App') gastoAtual = 86.66;
        else if (t.label === 'Obra') gastoAtual = 2131.77;
        else if (t.label === 'Manutenção Carro') gastoAtual = 416.75;
      }

      const restante = Math.max(0, teto - gastoAtual);
      const pct = teto > 0 ? (gastoAtual / teto) * 100 : 0;
      let status = 'Dentro do teto';
      let statusCor = '#10b981';

      if (pct > 100) {
        status = 'Teto ultrapassado';
        statusCor = '#ef4444';
      } else if (pct >= 85) {
        status = 'Atenção ao teto';
        statusCor = '#f59e0b';
      }

      totalTetoGeral += teto;
      totalGastoGeral += gastoAtual;

      return {
        ...t,
        gastoAtual,
        teto,
        mediaFutura,
        restante,
        pct: Math.min(100, pct),
        status,
        statusCor
      };
    });

    const margemTotal = Math.max(0, totalTetoGeral - totalGastoGeral);
    const pctGeral = totalTetoGeral > 0 ? (totalGastoGeral / totalTetoGeral) * 100 : 0;

    return {
      items,
      totalTetoGeral,
      totalGastoGeral,
      margemTotal,
      pctGeral
    };
  }
};

