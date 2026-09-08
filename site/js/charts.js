/**
 * CHARTS ENGINE — DASHBOARD FINANCEIRO VICTOR
 * Renderiza gráficos modernos e interativos com Chart.js.
 */

const ChartsEngine = {
  cashFlowChart: null,
  distributionChart: null,
  annualComparisonChart: null,

  // Renderiza ou atualiza o gráfico de fluxo de caixa mensal
  renderCashFlowChart(canvasId, monthsData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.cashFlowChart) {
      this.cashFlowChart.destroy();
    }

    const labels = monthsData.map(m => m.name.substring(0, 3));
    const receitas = monthsData.map(m => m.receita);
    const fixas = monthsData.map(m => m.fixa);
    const variaveis = monthsData.map(m => m.variavel);
    const investimentos = monthsData.map(m => m.invest);

    this.cashFlowChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Receitas',
            data: receitas,
            backgroundColor: '#10b981',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Despesas Fixas',
            data: fixas,
            backgroundColor: '#ef4444',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Despesas Variáveis',
            data: variaveis,
            backgroundColor: '#f59e0b',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Investimentos',
            data: investimentos,
            backgroundColor: '#3b82f6',
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 600 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 18
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#fff',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) {
                  label += Number(context.parsed.y).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { weight: 600 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#64748b',
              callback: function(value) {
                return 'R$ ' + (value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value);
              }
            }
          }
        }
      }
    });
  },

  // Renderiza gráfico de rosca com distribuição percentual
  renderDistributionChart(canvasId, summary) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.distributionChart) {
      this.distributionChart.destroy();
    }

    const sobraVal = summary.sobraTotal > 0 ? summary.sobraTotal : 0;

    this.distributionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Despesas Fixas', 'Despesas Variáveis', 'Investimentos', 'Sobra Líquida'],
        datasets: [{
          data: [summary.totalFixas, summary.totalVariaveis, summary.totalInvestimentos, sobraVal],
          backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: 600 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 14
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#fff',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context) {
                const val = Number(context.parsed) || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                return `${context.label}: ${val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  },

  // Renderiza o gráfico do comparativo anual (2024, 2026, 2027)
  renderAnnualComparisonChart(canvasId, comparisonData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.annualComparisonChart) {
      this.annualComparisonChart.destroy();
    }

    const labels = comparisonData.map(c => `Ano ${c.ano}`);
    const receitas = comparisonData.map(c => c.receitas);
    const fixas = comparisonData.map(c => c.fixas);
    const variaveis = comparisonData.map(c => c.variaveis);
    const invest = comparisonData.map(c => c.investimentos);

    this.annualComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: 'Receitas Totais', data: receitas, backgroundColor: '#10b981', borderRadius: 8 },
          { label: 'Custos Fixos', data: fixas, backgroundColor: '#ef4444', borderRadius: 8 },
          { label: 'Despesas Variáveis', data: variaveis, backgroundColor: '#f59e0b', borderRadius: 8 },
          { label: 'Investimentos', data: invest, backgroundColor: '#3b82f6', borderRadius: 8 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#94a3b8', usePointStyle: true, padding: 16 }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: R$ ${Number(ctx.parsed.y).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: 600 } } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } }
        }
      }
    });
  },

  limitsComparisonChart: null,

  // Renderiza o gráfico de acompanhamento de limites e tetos orçados
  renderLimitsComparisonChart(canvasId, limitsData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !limitsData || !limitsData.items) return;

    if (this.limitsComparisonChart) {
      this.limitsComparisonChart.destroy();
    }

    const labels = limitsData.items.map(i => i.label);
    const tetos = limitsData.items.map(i => i.teto);
    const gastos = limitsData.items.map(i => i.gastoAtual);

    this.limitsComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Limite Estabelecido (Teto)',
            data: tetos,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            borderWidth: 1,
            borderRadius: 6,
            barPercentage: 0.7,
            categoryPercentage: 0.8
          },
          {
            label: 'Gasto Realizado / Atual',
            data: gastos,
            backgroundColor: limitsData.items.map(i => i.pct > 100 ? '#ef4444' : (i.pct > 85 ? '#f59e0b' : '#10b981')),
            borderRadius: 6,
            barPercentage: 0.7,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: 600 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                const val = Number(context.parsed.y) || 0;
                return `${context.dataset.label}: R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
              },
              afterBody: function(contexts) {
                const idx = contexts[0].dataIndex;
                const item = limitsData.items[idx];
                if (item) {
                  return [`Margem Restante: R$ ${item.restante.toFixed(2)} (${(100 - item.pct).toFixed(0)}% livre)`];
                }
                return [];
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { size: 11, weight: 600 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#64748b',
              callback: (v) => `R$ ${v}`
            }
          }
        }
      }
    });
  }
};

