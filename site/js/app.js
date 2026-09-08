/**
 * APPLICATION CONTROLLER — DASHBOARD FINANCEIRO VICTOR
 * Controla navegação entre abas, autenticação Firebase, sincronização em nuvem,
 * filtros, confirmação de exclusões e renderização geral.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Carrega estado inicial local e sincroniza cálculos
  let appState = StorageEngine.load();
  if (typeof FinancialEngine !== 'undefined' && typeof FinancialEngine.recalculateBudgetLinkage === 'function') {
    FinancialEngine.recalculateBudgetLinkage(appState);
  }

  // Elementos globais
  const yearSelect = document.getElementById('yearSelect');
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const appSidebar = document.getElementById('appSidebar');
  const btnHamburger = document.getElementById('btnHamburger');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  // Elementos de Autenticação e Perfil
  const userProfileChip = document.getElementById('userProfileChip');
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  const syncDot = document.getElementById('syncDot');
  const syncText = document.getElementById('syncText');
  const btnLogout = document.getElementById('btnLogout');

  // Elementos de Filtro de Transações
  const txSearch = document.getElementById('transactionSearch');
  const txFilterCat = document.getElementById('transactionFilterCategory');
  const txFilterType = document.getElementById('transactionFilterType');
  const btnExportCSV = document.getElementById('btnExportCSV');

  // Elementos de Confirmação Modal
  const confirmModal = document.getElementById('confirmModal');
  const confirmModalTitle = document.getElementById('confirmModalTitle');
  const confirmModalMsg = document.getElementById('confirmModalMsg');
  const confirmModalCancel = document.getElementById('confirmModalCancel');
  const confirmModalOk = document.getElementById('confirmModalOk');
  let pendingConfirmAction = null;

  // XSS Protection Helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Sincronização e Status Cloud
  StorageEngine.onSyncStatus((status, message) => {
    if (!syncDot || !syncText) return;
    syncDot.className = 'sync-dot ' + status;
    syncText.textContent = message || (status === 'synced' ? 'Salvo na Nuvem' : 'Sincronizando...');
  });

  // Integração com Firebase Authentication
  if (typeof AuthService !== 'undefined') {
    AuthService.onAuthStateChanged(async (user) => {
      if (user) {
        if (userProfileChip) userProfileChip.style.display = 'flex';
        if (userName) userName.textContent = user.displayName || user.email.split('@')[0];
        if (userAvatar) {
          if (user.photoURL) {
            userAvatar.innerHTML = `<img src="${user.photoURL}" alt="${escapeHtml(user.displayName || 'Usuário')}">`;
          } else {
            userAvatar.textContent = (user.displayName || user.email || 'U')[0].toUpperCase();
          }
        }

        // Sincroniza dados com o Firestore do usuário logado
        appState = await StorageEngine.syncWithCloud(user.uid);
        if (typeof FinancialEngine !== 'undefined' && typeof FinancialEngine.recalculateBudgetLinkage === 'function') {
          FinancialEngine.recalculateBudgetLinkage(appState);
        }
        populateCategoryFilter();
        renderAll();
        showToast(`Bem-vindo, ${user.displayName || 'Victor'}!`);
      } else {
        // Se estiver num ambiente web real (não file:// local offline) e sem login, redireciona para login
        if (window.location.protocol !== 'file:' && !window.location.href.includes('login.html')) {
          window.location.href = 'login.html';
        }
      }
    });

    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        showConfirmModal('Encerrar Sessão', 'Deseja realmente sair da sua conta?', () => {
          AuthService.logout();
        });
      });
    }
  }

  // Controle Mobile Drawer (Hamburger)
  if (btnHamburger && appSidebar && sidebarOverlay) {
    btnHamburger.addEventListener('click', () => {
      appSidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', () => {
      appSidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Inicialização de Ano
  if (yearSelect) {
    yearSelect.value = appState.selectedYear || 2026;
    yearSelect.addEventListener('change', (e) => {
      appState.selectedYear = Number(e.target.value);
      StorageEngine.save(appState);
      renderAll();
      showToast(`Exibindo dados do ano ${appState.selectedYear}`);
    });
  }

  // Navegação por Abas
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      
      navItems.forEach(n => n.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      item.classList.add('active');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Fecha drawer no mobile se aberto
      if (appSidebar && sidebarOverlay) {
        appSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
      }

      // Re-renderizar gráficos ao alternar para evitar distorção de resize
      if (targetTab === 'dashboard') {
        renderDashboard();
      } else if (targetTab === 'comparativo') {
        renderComparativo();
      }
    });
  });

  // Modal de Confirmação
  function showConfirmModal(title, msg, onConfirm) {
    if (!confirmModal) {
      if (confirm(msg)) onConfirm();
      return;
    }
    confirmModalTitle.textContent = title;
    confirmModalMsg.textContent = msg;
    pendingConfirmAction = onConfirm;
    confirmModal.classList.add('show');
  }

  if (confirmModalCancel) {
    confirmModalCancel.addEventListener('click', () => {
      confirmModal.classList.remove('show');
      pendingConfirmAction = null;
    });
  }

  if (confirmModalOk) {
    confirmModalOk.addEventListener('click', () => {
      if (typeof pendingConfirmAction === 'function') {
        pendingConfirmAction();
      }
      confirmModal.classList.remove('show');
      pendingConfirmAction = null;
    });
  }

  // Fechar modal com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmModal && confirmModal.classList.contains('show')) {
      confirmModal.classList.remove('show');
      pendingConfirmAction = null;
    }
  });

  // Renderiza todo o aplicativo
  function renderAll() {
    renderDashboard();
    renderTransactionsTable();
    renderCardTab();
    renderInvestmentsTab();
    renderGoalsTab();
    renderComparativo();
  }

  // 1. DASHBOARD
  function renderDashboard() {
    const yearData = appState.years[appState.selectedYear];
    if (!yearData) return;
    const summary = FinancialEngine.processYearSummary(yearData);

    // 1.1 CARDS DOS 4 CARTÕES DE CRÉDITO (Fatura do Mês Atual)
    const cardsBreakdown = FinancialEngine.processCreditCardsBreakdown(appState.cartaoAgosto);
    const bbCard = cardsBreakdown.find(c => c.id === 'bb');
    const itauCard = cardsBreakdown.find(c => c.id === 'itau');
    const alexCard = cardsBreakdown.find(c => c.id === 'emporio');
    const nubankCard = cardsBreakdown.find(c => c.id === 'nubank');

    if (bbCard) {
      const elVal = document.getElementById('card-bb-val');
      const elCnt = document.getElementById('card-bb-count');
      const elPct = document.getElementById('card-bb-pct');
      if (elVal) elVal.textContent = FinancialEngine.formatCurrency(bbCard.total);
      if (elCnt) elCnt.textContent = `${bbCard.count} compras`;
      if (elPct) elPct.textContent = `${bbCard.pct.toFixed(1)}% do total`;
    }

    if (itauCard) {
      const elVal = document.getElementById('card-itau-val');
      const elCnt = document.getElementById('card-itau-count');
      const elPct = document.getElementById('card-itau-pct');
      if (elVal) elVal.textContent = FinancialEngine.formatCurrency(itauCard.total);
      if (elCnt) elCnt.textContent = `${itauCard.count} compras`;
      if (elPct) elPct.textContent = `${itauCard.pct.toFixed(1)}% do total`;
    }

    if (alexCard) {
      const elVal = document.getElementById('card-emporio-val');
      const elCnt = document.getElementById('card-emporio-count');
      const elPct = document.getElementById('card-emporio-pct');
      if (elVal) elVal.textContent = FinancialEngine.formatCurrency(alexCard.total);
      if (elCnt) elCnt.textContent = `${alexCard.count} compra`;
      if (elPct) elPct.textContent = `${alexCard.pct.toFixed(1)}% do total`;
    }

    if (nubankCard) {
      const elVal = document.getElementById('card-nubank-val');
      const elCnt = document.getElementById('card-nubank-count');
      const elPct = document.getElementById('card-nubank-pct');
      if (elVal) elVal.textContent = FinancialEngine.formatCurrency(nubankCard.total);
      if (elCnt) elCnt.textContent = `${nubankCard.count} compras`;
      if (elPct) elPct.textContent = `${nubankCard.pct.toFixed(1)}% do total`;
    }

    // 1.2 SOBRA MENSAL ATUAL & BREAKDOWN DO MÊS
    const monthSurplus = FinancialEngine.processCurrentMonthSurplus(yearData);
    const elCurSurplus = document.getElementById('currentMonthlySurplus');
    const elAvgSurplus = document.getElementById('avgMonthlySurplus');
    const elLblMonth = document.getElementById('lblCurrentMonth');
    const elMRec = document.getElementById('mRecVal');
    const elMFix = document.getElementById('mFixVal');
    const elMVar = document.getElementById('mVarVal');
    const elMInv = document.getElementById('mInvVal');

    if (elCurSurplus) elCurSurplus.textContent = FinancialEngine.formatCurrency(monthSurplus.sobra);
    if (elAvgSurplus) elAvgSurplus.textContent = `${FinancialEngine.formatCurrency(monthSurplus.mediaSobra)} / mês`;
    if (elLblMonth) elLblMonth.textContent = `Mês Vigente (${monthSurplus.nomeMes})`;
    if (elMRec) elMRec.textContent = FinancialEngine.formatCurrency(monthSurplus.receita);
    if (elMFix) elMFix.textContent = FinancialEngine.formatCurrency(monthSurplus.fixa);
    if (elMVar) elMVar.textContent = FinancialEngine.formatCurrency(monthSurplus.variavel);
    if (elMInv) elMInv.textContent = FinancialEngine.formatCurrency(monthSurplus.invest);

    // Projeções e Médias dos Meses Futuros
    const elFutInc = document.getElementById('futAvgIncome');
    const elFutExp = document.getElementById('futAvgExpenses');
    const elFutSur = document.getElementById('futAvgSurplus');
    const elFutTot = document.getElementById('futTotalSurplus');

    if (elFutInc) elFutInc.textContent = FinancialEngine.formatCurrency(monthSurplus.mediaReceitaFutura);
    if (elFutExp) elFutExp.textContent = FinancialEngine.formatCurrency(monthSurplus.mediaGastosFuturos);
    if (elFutSur) elFutSur.textContent = FinancialEngine.formatCurrency(monthSurplus.mediaSobraFutura);
    if (elFutTot) elFutTot.textContent = FinancialEngine.formatCurrency(monthSurplus.totalSobraAcumulada);

    // 1.3 GRÁFICO E INDICADORES DE LIMITES ORÇADOS (ORÇAMENTO ANUAL)
    const limitsInfo = FinancialEngine.processBudgetLimits(yearData);
    ChartsEngine.renderLimitsComparisonChart('limitsComparisonChart', limitsInfo);

    const elLimitBadge = document.getElementById('limitStatusBadge');
    if (elLimitBadge) {
      if (limitsInfo.pctGeral > 100) {
        elLimitBadge.className = 'badge-status-limit exceeded';
        elLimitBadge.textContent = `⚠️ Teto Excedido (${limitsInfo.pctGeral.toFixed(0)}% usado)`;
      } else if (limitsInfo.pctGeral >= 85) {
        elLimitBadge.className = 'badge-status-limit warning';
        elLimitBadge.textContent = `⚠️ Atenção ao Teto (${limitsInfo.pctGeral.toFixed(0)}% usado)`;
      } else {
        elLimitBadge.className = 'badge-status-limit';
        elLimitBadge.textContent = `🛡️ Dentro do Teto (${limitsInfo.pctGeral.toFixed(0)}% usado)`;
      }
    }

    const pillsContainer = document.getElementById('limitsPillsRow');
    if (pillsContainer && limitsInfo.items) {
      pillsContainer.innerHTML = limitsInfo.items.map(item => `
        <div class="limit-pill-item">
          <div class="limit-pill-header">
            <span>${item.icon} ${escapeHtml(item.label)}</span>
            <span style="color: ${item.statusCor}">${item.pct.toFixed(0)}%</span>
          </div>
          <div class="limit-pill-bar">
            <div class="limit-pill-fill" style="width: ${item.pct}%; background: ${item.statusCor};"></div>
          </div>
          <div class="limit-pill-footer">
            <span style="color: #cbd5e1">${FinancialEngine.formatCurrency(item.gastoAtual)}</span>
            <span style="color: var(--text-muted)">Teto ${FinancialEngine.formatCurrency(item.teto)}</span>
          </div>
        </div>
      `).join('');
    }

    // 1.4 KPIS GERAIS ACUMULADOS DO ANO
    const kpiReceita = document.getElementById('kpi-receita');
    const kpiFixa = document.getElementById('kpi-fixa');
    const kpiVariavel = document.getElementById('kpi-variavel');
    const kpiInvest = document.getElementById('kpi-invest');
    const kpiSobra = document.getElementById('kpi-sobra');

    if (kpiReceita) kpiReceita.textContent = FinancialEngine.formatCurrency(summary.totalReceitas);
    if (kpiFixa) kpiFixa.textContent = FinancialEngine.formatCurrency(summary.totalFixas);
    if (kpiVariavel) kpiVariavel.textContent = FinancialEngine.formatCurrency(summary.totalVariaveis);
    if (kpiInvest) kpiInvest.textContent = FinancialEngine.formatCurrency(summary.totalInvestimentos);
    if (kpiSobra) kpiSobra.textContent = FinancialEngine.formatCurrency(summary.sobraTotal);

    // Badges de percentual
    const badgeFixa = document.getElementById('badge-fixa');
    const badgeVariavel = document.getElementById('badge-variavel');
    const badgeInvest = document.getElementById('badge-invest');

    if (badgeFixa) badgeFixa.textContent = FinancialEngine.formatPercent(summary.pctFixas);
    if (badgeVariavel) badgeVariavel.textContent = FinancialEngine.formatPercent(summary.pctVariaveis);
    if (badgeInvest) badgeInvest.textContent = FinancialEngine.formatPercent(summary.pctInvest);

    // Gráficos de Fluxo de Caixa e Distribuição
    if (summary.months && summary.months.length) {
      ChartsEngine.renderCashFlowChart('cashFlowChart', summary.months);
      ChartsEngine.renderDistributionChart('distributionChart', summary);
    }

    // Tabela Mensal detalhada
    renderMonthlyBudgetTable(summary.months);
  }

  function renderMonthlyBudgetTable(months) {
    const tbody = document.getElementById('monthlyBudgetTbody');
    if (!tbody || !months) return;

    tbody.innerHTML = months.map(m => {
      return `
        <tr>
          <td><strong>${escapeHtml(m.name)}</strong></td>
          <td style="color: var(--color-income); font-weight: 600;">${FinancialEngine.formatCurrency(m.receita)}</td>
          <td style="color: var(--color-fixed);">${FinancialEngine.formatCurrency(m.fixa)} <small style="color: var(--text-muted)">(${m.pctFixa.toFixed(1)}%)</small></td>
          <td style="color: var(--color-variable);">${FinancialEngine.formatCurrency(m.variavel)} <small style="color: var(--text-muted)">(${m.pctVar.toFixed(1)}%)</small></td>
          <td style="color: var(--color-invest);">${FinancialEngine.formatCurrency(m.invest)} <small style="color: var(--text-muted)">(${m.pctInv.toFixed(1)}%)</small></td>
          <td style="font-weight: 700; color: ${m.sobra >= 0 ? '#10b981' : '#ef4444'}">${FinancialEngine.formatCurrency(m.sobra)}</td>
        </tr>
      `;
    }).join('');
  }

  // 2. TRANSAÇÕES & FORMULÁRIO RÁPIDO
  const formEntry = document.getElementById('formNewEntry');
  if (formEntry) {
    formEntry.addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = document.getElementById('entryDesc').value.trim();
      const val = parseFloat(document.getElementById('entryValue').value);
      const cat = document.getElementById('entryCategory').value;
      const type = document.getElementById('entryType').value;
      const paymentMethod = document.getElementById('entryPaymentMethod') ? document.getElementById('entryPaymentMethod').value : 'PIX';
      const date = document.getElementById('entryDate').value || new Date().toISOString().slice(0, 10);

      if (!desc || isNaN(val) || val <= 0) {
        showToast('Por favor, preencha a descrição e um valor válido.', true);
        return;
      }

      const newTx = {
        id: 'tx-' + Date.now(),
        data: date,
        descricao: desc,
        categoria: cat,
        valor: val,
        tipo: type,
        formaPagamento: paymentMethod
      };

      if (!Array.isArray(appState.transacoes)) {
        appState.transacoes = [];
      }
      appState.transacoes.unshift(newTx);

      // Se foi pago com um dos 4 cartões de crédito, vincula diretamente à fatura do cartão
      if (['C/C BB', 'C/C Itaú', 'C/C Nubank', 'C/C Empório Alex'].includes(paymentMethod)) {
        if (!appState.cartaoAgosto) appState.cartaoAgosto = { compras: [], total: 0 };
        if (!Array.isArray(appState.cartaoAgosto.compras)) appState.cartaoAgosto.compras = [];

        appState.cartaoAgosto.compras.unshift({
          id: 'c-' + Date.now(),
          linha: appState.cartaoAgosto.compras.length + 4,
          oQue: cat,
          euPago: val,
          valor: val,
          parcelaAtual: '1',
          numParcelas: '1',
          motivo: desc,
          cartao: paymentMethod
        });
        appState.cartaoAgosto.total = appState.cartaoAgosto.compras.reduce((sum, i) => sum + (Number(i.euPago || i.valor) || 0), 0);

        // Recalcula limites e médias do orçamento vinculado
        if (typeof FinancialEngine !== 'undefined' && typeof FinancialEngine.recalculateBudgetLinkage === 'function') {
          FinancialEngine.recalculateBudgetLinkage(appState);
        }
      }

      // Impacta o mês correspondente no orçamento anual ativo
      const monthIdx = new Date(date).getMonth();
      const currentYearData = appState.years[appState.selectedYear];
      if (currentYearData && currentYearData.months && currentYearData.months[monthIdx]) {
        if (type === 'receita') currentYearData.months[monthIdx].receita += val;
        else if (type === 'fixa') currentYearData.months[monthIdx].fixa += val;
        else if (type === 'variavel') currentYearData.months[monthIdx].variavel += val;
        else if (type === 'invest') currentYearData.months[monthIdx].invest += val;
      }

      StorageEngine.save(appState);
      populateCategoryFilter();
      renderAll();
      formEntry.reset();
      showToast(`Lançamento adicionado e vinculado a ${paymentMethod}!`);
    });
  }

  // Popular seletor de categorias dinamicamente
  function populateCategoryFilter() {
    if (!txFilterCat) return;
    const categories = new Set();
    if (Array.isArray(appState.transacoes)) {
      appState.transacoes.forEach(t => { if (t.categoria) categories.add(t.categoria); });
    }
    const currentVal = txFilterCat.value;
    txFilterCat.innerHTML = '<option value="">Todas as Categorias</option>' +
      Array.from(categories).sort().map(c => `<option value="${escapeHtml(c)}" ${c === currentVal ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('');
  }

  // Filtros de busca em tempo real
  if (txSearch) txSearch.addEventListener('input', renderTransactionsTable);
  if (txFilterCat) txFilterCat.addEventListener('change', renderTransactionsTable);
  if (txFilterType) txFilterType.addEventListener('change', renderTransactionsTable);

  if (btnExportCSV) {
    btnExportCSV.addEventListener('click', () => {
      StorageEngine.exportCSV();
      showToast('Exportação CSV gerada com sucesso!');
    });
  }

  function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTbody');
    if (!tbody) return;

    let list = Array.isArray(appState.transacoes) ? [...appState.transacoes] : [];

    // Aplicar filtros
    const query = txSearch ? txSearch.value.trim().toLowerCase() : '';
    const catFilter = txFilterCat ? txFilterCat.value : '';
    const typeFilter = txFilterType ? txFilterType.value : '';

    if (query) {
      list = list.filter(t => (t.descricao || '').toLowerCase().includes(query) || (t.categoria || '').toLowerCase().includes(query));
    }
    if (catFilter) {
      list = list.filter(t => t.categoria === catFilter);
    }
    if (typeFilter) {
      list = list.filter(t => t.tipo === typeFilter);
    }

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">Nenhum lançamento encontrado para os filtros selecionados.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(tx => {
      let tagClass = 'tag-variable';
      let tagLabel = 'Variável';
      if (tx.tipo === 'receita') { tagClass = 'tag-income'; tagLabel = 'Receita'; }
      else if (tx.tipo === 'fixa') { tagClass = 'tag-fixed'; tagLabel = 'Fixa'; }
      else if (tx.tipo === 'invest') { tagClass = 'tag-invest'; tagLabel = 'Investimento'; }

      return `
        <tr>
          <td>${escapeHtml(tx.data)}</td>
          <td><strong>${escapeHtml(tx.descricao)}</strong></td>
          <td><span class="tag ${tagClass}">${tagLabel}</span></td>
          <td>${escapeHtml(tx.categoria)}</td>
          <td style="font-weight: 700; color: ${tx.tipo === 'receita' ? '#10b981' : '#f8fafc'}">${FinancialEngine.formatCurrency(tx.valor)}</td>
          <td style="text-align: right;">
            <button class="action-btn delete" data-id="${escapeHtml(tx.id)}" title="Excluir Lançamento">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Adicionar eventos de exclusão protegidos por modal
    tbody.querySelectorAll('.action-btn.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const txId = e.currentTarget.getAttribute('data-id');
        const targetTx = appState.transacoes.find(t => t.id === txId);
        if (!targetTx) return;

        showConfirmModal('Excluir Lançamento', `Deseja realmente excluir "${targetTx.descricao}" (${FinancialEngine.formatCurrency(targetTx.valor)})?`, () => {
          appState.transacoes = appState.transacoes.filter(t => t.id !== txId);
          StorageEngine.save(appState);
          populateCategoryFilter();
          renderTransactionsTable();
          showToast('Lançamento removido.');
        });
      });
    });
  }

  // 3. CARTÃO DE CRÉDITO (Aba CARTAO AGOSTO com vínculo 'O que?' com Orçamento Anual)
  const filterCardByBank = document.getElementById('filterCardByBank');
  if (filterCardByBank) {
    filterCardByBank.addEventListener('change', renderCardTab);
  }

  function renderCardTab() {
    const cartao = appState.cartaoAgosto || {};
    const cardTotalEl = document.getElementById('cardInvoiceTotal');
    const cardItemsCountEl = document.getElementById('cardInvoiceCount');
    const tbody = document.getElementById('cardPurchasesTbody');

    let compras = Array.isArray(cartao.compras) ? [...cartao.compras] : [];

    // Filtro por Banco / Cartão
    const selectedBank = filterCardByBank ? filterCardByBank.value : '';
    if (selectedBank) {
      compras = compras.filter(c => c.cartao === selectedBank);
    }

    const cardInfo = FinancialEngine.processCardInvoice({ compras });
    if (cardTotalEl) cardTotalEl.textContent = FinancialEngine.formatCurrency(cardInfo.total);
    if (cardItemsCountEl) cardItemsCountEl.textContent = `${compras.length} lançamentos (${selectedBank || 'Total'})`;

    if (!tbody) return;

    if (!compras.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">Nenhum lançamento encontrado para este cartão.</td></tr>`;
      return;
    }

    tbody.innerHTML = compras.map(c => {
      let bankBadgeClass = 'bb';
      if (c.cartao && c.cartao.includes('Itaú')) bankBadgeClass = 'itau';
      else if (c.cartao && c.cartao.includes('Nubank')) bankBadgeClass = 'nubank';
      else if (c.cartao && c.cartao.includes('Alex')) bankBadgeClass = 'emporio';

      const parcText = (c.parcelaAtual && c.parcelaAtual !== '-') ? `${c.parcelaAtual}/${c.numParcelas || c.parcelaAtual}` : (c.parcela || '-');

      return `
        <tr>
          <td><span class="tag tag-variable" style="font-weight: 600;">${escapeHtml(c.oQue || c.categoria || 'Geral')}</span></td>
          <td style="font-weight: 800; color: #f59e0b; font-size: 14px;">${FinancialEngine.formatCurrency(c.euPago || c.valor)}</td>
          <td style="color: var(--text-secondary);">${escapeHtml(parcText)}</td>
          <td><strong>${escapeHtml(c.motivo || c.estabelecimento || '-')}</strong></td>
          <td><span class="card-badge ${bankBadgeClass}" style="font-size: 11px;">${escapeHtml(c.cartao || 'C/C BB')}</span></td>
          <td style="text-align: right;">
            <button class="action-btn delete card-delete-btn" data-id="${escapeHtml(c.id)}" title="Excluir Lançamento">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Eventos de exclusão no cartão
    tbody.querySelectorAll('.card-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cId = e.currentTarget.getAttribute('data-id');
        const targetC = cartao.compras.find(item => item.id === cId);
        if (!targetC) return;

        showConfirmModal('Excluir Lançamento do Cartão', `Deseja remover "${targetC.motivo || targetC.oQue}" no valor de ${FinancialEngine.formatCurrency(targetC.euPago || targetC.valor)}?`, () => {
          cartao.compras = cartao.compras.filter(item => item.id !== cId);
          cartao.total = cartao.compras.reduce((sum, item) => sum + (Number(item.euPago || item.valor) || 0), 0);
          
          // Recalcula dinamicamente categorias, limites e médias futuras vinculadas a 'O que?'
          if (typeof FinancialEngine !== 'undefined' && typeof FinancialEngine.recalculateBudgetLinkage === 'function') {
            FinancialEngine.recalculateBudgetLinkage(appState);
          }

          StorageEngine.save(appState);
          renderCardTab();
          renderDashboard();
          showToast('Lançamento removido e orçamento recalculado.');
        });
      });
    });
  }

  const formCard = document.getElementById('formNewCardPurchase');
  if (formCard) {
    formCard.addEventListener('submit', (e) => {
      e.preventDefault();
      const oQue = document.getElementById('cardOQue').value;
      const motivo = document.getElementById('cardMotivo').value.trim();
      const valor = parseFloat(document.getElementById('cardValor').value);
      const cartao = document.getElementById('cardBanco').value;
      const parcAtual = document.getElementById('cardParcAtual').value.trim() || '1';
      const numParc = document.getElementById('cardNumParc').value.trim() || '1';

      if (!motivo || isNaN(valor) || valor <= 0) {
        showToast('Preencha a descrição/motivo e um valor válido.', true);
        return;
      }

      if (!appState.cartaoAgosto) appState.cartaoAgosto = { compras: [], total: 0 };
      if (!Array.isArray(appState.cartaoAgosto.compras)) appState.cartaoAgosto.compras = [];

      const newCardItem = {
        id: 'c-' + Date.now(),
        linha: appState.cartaoAgosto.compras.length + 4,
        oQue: oQue,
        euPago: valor,
        valor: valor,
        parcelaAtual: parcAtual,
        numParcelas: numParc,
        motivo: motivo,
        cartao: cartao
      };

      appState.cartaoAgosto.compras.unshift(newCardItem);
      appState.cartaoAgosto.total = appState.cartaoAgosto.compras.reduce((sum, i) => sum + (Number(i.euPago || i.valor) || 0), 0);

      // VÍNCULO DIRETO COM O ORÇAMENTO ANUAL:
      // Recalcula dinamicamente limites, categorias e médias futuras vinculadas a 'O que?'
      if (typeof FinancialEngine !== 'undefined' && typeof FinancialEngine.recalculateBudgetLinkage === 'function') {
        FinancialEngine.recalculateBudgetLinkage(appState);
      }

      StorageEngine.save(appState);
      renderCardTab();
      renderDashboard();
      formCard.reset();
      showToast(`Lançamento adicionado ao ${cartao} e vinculado a "${oQue}"!`);
    });
  }

  function roundValue(v) {
    return Math.round((v + Number.EPSILON) * 100) / 100;
  }


  // 4. INVESTIMENTOS
  function renderInvestmentsTab() {
    const invData = appState.investimentos || {};
    const totalPatrimonioEl = document.getElementById('investPatrimonio');
    const aportesMensaisEl = document.getElementById('investAportes');
    const rentabilidadeEl = document.getElementById('investRentabilidade');
    const tbody = document.getElementById('investmentsTbody');

    if (totalPatrimonioEl) totalPatrimonioEl.textContent = FinancialEngine.formatCurrency(invData.patrimonioTotal);
    if (aportesMensaisEl) aportesMensaisEl.textContent = FinancialEngine.formatCurrency(invData.aportesMensais);
    if (rentabilidadeEl) rentabilidadeEl.textContent = `${invData.rentabilidadeAnual}% a.a.`;

    if (tbody && invData.carteira) {
      tbody.innerHTML = invData.carteira.map(item => `
        <tr>
          <td><strong>${escapeHtml(item.ativo)}</strong></td>
          <td><span class="tag tag-invest">${escapeHtml(item.tipo)}</span></td>
          <td style="font-weight: 700; color: #3b82f6;">${FinancialEngine.formatCurrency(item.valor)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="progress-bar" style="width: 100px; margin: 0;">
                <div class="progress-fill" style="width: ${item.pct}%;"></div>
              </div>
              <small>${item.pct}%</small>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  // 5. METAS E DESEJOS
  function renderGoalsTab() {
    const metas = appState.metas || [];
    const stats = FinancialEngine.processGoals(metas);

    const goalsSummaryEl = document.getElementById('goalsSummary');
    const goalsProgressBar = document.getElementById('goalsProgressBar');
    const goalsContainer = document.getElementById('goalsListContainer');

    if (goalsSummaryEl) {
      goalsSummaryEl.textContent = `${stats.concluidas} de ${stats.total} metas alcançadas (${stats.pct.toFixed(0)}%)`;
    }

    if (goalsProgressBar) {
      goalsProgressBar.style.width = `${stats.pct}%`;
    }

    if (goalsContainer) {
      goalsContainer.innerHTML = metas.map(m => `
        <div class="goal-item ${m.concluido ? 'goal-completed' : ''}">
          <div class="goal-left">
            <input type="checkbox" class="goal-checkbox" data-id="${escapeHtml(m.id)}" ${m.concluido ? 'checked' : ''}>
            <div>
              <div class="goal-title">${escapeHtml(m.descricao)}</div>
              <small style="color: var(--text-muted);">${escapeHtml(m.categoria)}</small>
            </div>
          </div>
          <span class="tag ${m.concluido ? 'tag-income' : 'tag-variable'}">
            ${m.concluido ? '✓ Concluído' : 'Pendente'}
          </span>
        </div>
      `).join('');

      // Eventos de toggle dos checkboxes de metas
      goalsContainer.querySelectorAll('.goal-checkbox').forEach(chk => {
        chk.addEventListener('change', (e) => {
          const metaId = e.target.getAttribute('data-id');
          const targetMeta = appState.metas.find(m => m.id === metaId);
          if (targetMeta) {
            targetMeta.concluido = e.target.checked;
            StorageEngine.save(appState);
            renderGoalsTab();
            showToast(targetMeta.concluido ? 'Meta concluída! Parabéns!' : 'Meta reaberta.');
          }
        });
      });
    }
  }

  const formMeta = document.getElementById('formNewGoal');
  if (formMeta) {
    formMeta.addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = document.getElementById('goalDesc').value.trim();
      const cat = document.getElementById('goalCategory').value;
      if (!desc) return;

      if (!Array.isArray(appState.metas)) appState.metas = [];

      appState.metas.push({
        id: 'm-' + Date.now(),
        descricao: desc,
        categoria: cat,
        concluido: false
      });

      StorageEngine.save(appState);
      renderGoalsTab();
      formMeta.reset();
      showToast('Nova meta adicionada!');
    });
  }

  // 6. COMPARATIVO ANUAL
  function renderComparativo() {
    const comparisonData = FinancialEngine.processYearComparison(appState);
    const tbody = document.getElementById('comparisonTbody');

    if (tbody) {
      tbody.innerHTML = comparisonData.map(c => `
        <tr>
          <td><strong style="font-size: 15px;">Ano ${c.ano}</strong></td>
          <td style="color: var(--color-income); font-weight: 700;">${FinancialEngine.formatCurrency(c.receitas)}</td>
          <td style="color: var(--color-fixed);">${FinancialEngine.formatCurrency(c.fixas)}</td>
          <td style="color: var(--color-variable);">${FinancialEngine.formatCurrency(c.variaveis)}</td>
          <td style="color: var(--color-invest);">${FinancialEngine.formatCurrency(c.investimentos)}</td>
          <td style="font-weight: 800; color: ${c.sobra >= 0 ? '#10b981' : '#ef4444'}">${FinancialEngine.formatCurrency(c.sobra)}</td>
        </tr>
      `).join('');
    }

    ChartsEngine.renderAnnualComparisonChart('annualComparisonChart', comparisonData);
  }

  // 7. EXPORTAÇÃO EXCEL (.XLSX) & BACKUP
  const handleExcelExport = () => {
    if (typeof ExcelExporter !== 'undefined') {
      const ok = ExcelExporter.exportToExcel(appState);
      if (ok) {
        showToast('Planilha Excel (.xlsx) gerada e baixada com sucesso!');
      }
    } else {
      showToast('Módulo de exportação não disponível.', true);
    }
  };

  const btnExportExcelTop = document.getElementById('btnExportExcelTop');
  const btnExportExcelTable = document.getElementById('btnExportExcelTable');
  const btnExportExcelConfig = document.getElementById('btnExportExcelConfig');

  if (btnExportExcelTop) btnExportExcelTop.addEventListener('click', handleExcelExport);
  if (btnExportExcelTable) btnExportExcelTable.addEventListener('click', handleExcelExport);
  if (btnExportExcelConfig) btnExportExcelConfig.addEventListener('click', handleExcelExport);

  const btnExport = document.getElementById('btnExportBackup');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      StorageEngine.exportJSON();
      showToast('Backup JSON baixado com sucesso!');
    });
  }

  const fileInputImport = document.getElementById('fileInputImport');
  if (fileInputImport) {
    fileInputImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const ok = StorageEngine.importJSON(event.target.result);
        if (ok) {
          appState = StorageEngine.load();
          populateCategoryFilter();
          renderAll();
          showToast('Dados importados com sucesso!');
        } else {
          showToast('Erro ao importar arquivo JSON.', true);
        }
      };
      reader.readAsText(file);
    });
  }

  const btnResetData = document.getElementById('btnResetData');
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      showConfirmModal('Restaurar Planilha', 'Tem certeza de que deseja restaurar os dados originais da planilha? Todas as alterações manuais serão reiniciadas.', () => {
        appState = StorageEngine.resetDefaults();
        populateCategoryFilter();
        renderAll();
        showToast('Dados restaurados para o padrão original da planilha!');
      });
    });
  }

  // Toast Helper
  function showToast(msg, isError = false) {
    const toast = document.getElementById('appToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.backgroundColor = isError ? '#ef4444' : '#10b981';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Render inicial completo
  populateCategoryFilter();
  renderAll();
});
