/**
 * VOICE INPUT MODULE (Lançamento por Voz)
 * Captura comandos de voz via Web Speech API (pt-BR), interpreta valores,
 * categorias e formas de pagamento com NLP e registra transações com Origem: 'voz'.
 */

const VoiceInputModule = (function() {
  let recognition = null;
  let isListening = false;
  let finalTranscript = '';
  let audioCtx = null;

  // Sons de feedback com Web Audio API nativa
  function playBeep(freq = 880, type = 'sine', duration = 0.15) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignora erro de áudio se bloqueado pelo navegador
    }
  }

  function playSuccessChime() {
    playBeep(659.25, 'sine', 0.1);
    setTimeout(() => playBeep(880, 'sine', 0.18), 90);
  }

  // Dicionários para interpretação semântica em Português
  const PAYMENT_METHODS = [
    { match: ['itaú', 'itau', 'uniclass'], value: 'C/C Itaú' },
    { match: ['nubank', 'roxinho', 'nu '], value: 'C/C Nubank' },
    { match: ['alex', 'empório alex', 'emporio alex'], value: 'C/C Empório Alex' },
    { match: ['pix', 'débito', 'debito', 'transferência', 'ted'], value: 'PIX' },
    { match: ['dinheiro', 'espécie', 'cedula', 'papel'], value: 'Dinheiro' },
    { match: ['boleto', 'conta'], value: 'Boleto' },
    { match: ['bb', 'banco do brasil', 'ourocard'], value: 'C/C BB' }
  ];

  const CATEGORY_RULES = [
    {
      cat: 'Alimentação trabalho (limite)',
      tipo: 'fixa',
      keywords: ['café', 'cafe', 'cafézinho', 'cafezinho', 'lanche trabalho', 'almoço trabalho', 'almoco trabalho']
    },
    {
      cat: 'Alimentação',
      tipo: 'variavel',
      keywords: ['almoço', 'almoco', 'jantar', 'restaurante', 'ifood', 'lanche', 'padaria', 'pão', 'burger', 'hambúrguer', 'pizza', 'comida', 'açaí', 'acai', 'mercado', 'supermercado', 'açougue', 'feira', 'hortifruti']
    },
    {
      cat: 'Transporte',
      tipo: 'variavel',
      keywords: ['gasolina', 'combustível', 'combustivel', 'etanol', 'uber', '99', 'posto', 'estacionamento', 'pedágio', 'pedagio', 'oficina', 'mecânico', 'pneu']
    },
    {
      cat: 'Saúde',
      tipo: 'variavel',
      keywords: ['farmácia', 'farmacia', 'remédio', 'remedio', 'remédios', 'drogaria', 'médico', 'medico', 'dentista', 'consulta', 'exame', 'hospital']
    },
    {
      cat: 'Lazer',
      tipo: 'variavel',
      keywords: ['cinema', 'filme', 'show', 'passeio', 'praia', 'bar', 'churrasco', 'cerveja', 'festa', 'balada', 'viagem', 'hotel', 'clube']
    },
    {
      cat: 'Moradia',
      tipo: 'fixa',
      keywords: ['aluguel', 'condomínio', 'condominio', 'iptu', 'gás', 'gas']
    },
    {
      cat: 'Contas',
      tipo: 'fixa',
      keywords: ['luz', 'energia', 'enel', 'água', 'agua', 'sabesp', 'internet', 'wifi', 'telefone', 'celular', 'claro', 'vivo', 'tim']
    },
    {
      cat: 'Salário',
      tipo: 'receita',
      keywords: ['salário', 'salario', 'pagamento', 'adiantamento', 'holerite', 'proventos', 'remuneração', 'renda extra', 'venda', 'recebimento']
    },
    {
      cat: 'Investimentos',
      tipo: 'invest',
      keywords: ['investimento', 'aporte', 'ações', 'cdb', 'tesouro', 'fundo', 'poupança', 'cripto', 'reserva']
    }
  ];

  // Extrai valor numérico de expressões faladas em português
  function extractValue(text) {
    const t = text.toLowerCase();

    // Caso 1: "17 e 83" ou "17 reais e 83 centavos"
    const matchE = t.match(/(\d+)\s*(?:reais|real)?\s*e\s*(\d{1,2})\b/);
    if (matchE) {
      let cents = matchE[2];
      if (cents.length === 1) cents += '0';
      return parseFloat(`${matchE[1]}.${cents}`);
    }

    // Caso 2: "35,50" ou "35.50"
    const matchDec = t.match(/(?:r\$\s*)?(\d+[.,]\d{1,2})/);
    if (matchDec) {
      return parseFloat(matchDec[1].replace(',', '.'));
    }

    // Caso 3: número inteiro: "50 reais", "100 conto", "r$ 25"
    const matchInt = t.match(/(?:r\$\s*)?(\d+)\s*(?:reais|real|conto)?/);
    if (matchInt) {
      return parseFloat(matchInt[1]);
    }

    // Palavras numéricas comuns por extenso
    const wordNumbers = {
      'um': 1, 'dois': 2, 'três': 3, 'tres': 3, 'quatro': 4, 'cinco': 5,
      'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9, 'dez': 10,
      'quinze': 15, 'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50,
      'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100,
      'duzentos': 200, 'trezentos': 300, 'quinhentos': 500, 'mil': 1000
    };
    for (const [w, val] of Object.entries(wordNumbers)) {
      const regex = new RegExp(`\\b${w}\\b`, 'i');
      if (regex.test(t)) {
        return val;
      }
    }

    return null;
  }

  // Extrai forma de pagamento
  function extractPaymentMethod(text) {
    const t = text.toLowerCase();
    for (const item of PAYMENT_METHODS) {
      if (item.match.some(m => t.includes(m))) {
        return item.value;
      }
    }
    return 'C/C BB';
  }

  // Extrai categoria e tipo
  function extractCategoryAndType(text) {
    const t = text.toLowerCase();
    for (const rule of CATEGORY_RULES) {
      if (rule.keywords.some(k => t.includes(k))) {
        return { cat: rule.cat, tipo: rule.tipo };
      }
    }
    return { cat: 'Outros', tipo: 'variavel' };
  }

  // Limpa o texto da fala para gerar uma descrição elegante
  function cleanDescription(rawText, category) {
    let t = rawText;
    t = t.replace(/(?:no|com|pelo|na|em|via)?\s*(?:cartão|cartao|crédito|credito|débito|debito)?\s*(?:banco do brasil|bb|itaú|itau|uniclass|nubank|roxinho|empório alex|emporio alex|alex|pix|dinheiro|boleto)/gi, '');
    t = t.replace(/r\$\s*\d+(?:[.,]\d+)?/gi, '');
    t = t.replace(/\b\d+\s*(?:reais|real)?\s*e\s*\d{1,2}\b/gi, '');
    t = t.replace(/\b\d+[.,]\d+\b/gi, '');
    t = t.replace(/\b\d+\s*(?:reais|real|conto)?\b/gi, '');
    t = t.replace(/^\s*(?:gastei|comprei|paguei|coloquei|foi|lançar|lancar|lançamento|lancamento|adicionar|anota|anotar|registra|registrar)\s+(?:com|de|em|um|uma|o|a)?\s*/gi, '');
    t = t.replace(/\b(?:reais|real|conto|centavos)\b/gi, '');
    t = t.replace(/\s+/g, ' ').trim();

    if (!t || t.length < 2) {
      t = category;
    }
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  // Interpretação completa da sentença
  function parseSentence(text) {
    const valor = extractValue(text) || 0;
    const formaPagamento = extractPaymentMethod(text);
    const { cat, tipo } = extractCategoryAndType(text);
    const descricao = cleanDescription(text, cat);

    return {
      valor,
      formaPagamento,
      categoria: cat,
      tipo,
      descricao,
      origem: 'voz',
      textoOriginal: text
    };
  }

  // Inicializa o Reconhecimento de Fala
  function setupSpeechRecognition() {
    const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechAPI) {
      console.warn('SpeechRecognition não suportado neste navegador.');
      return false;
    }

    recognition = new SpeechAPI();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
      isListening = true;
      playBeep(880, 'sine', 0.12);
      updateModalListeningState(true);
    };

    recognition.onresult = function(event) {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript = event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const currentText = finalTranscript || interim;
      const transcriptEl = document.getElementById('voiceLiveTranscript');
      if (transcriptEl) {
        transcriptEl.textContent = currentText || 'Ouvindo...';
      }

      if (currentText && currentText.trim().length > 2) {
        const parsed = parseSentence(currentText);
        updatePreviewFields(parsed);
      }
    };

    recognition.onerror = function(event) {
      console.warn('Erro de reconhecimento de fala:', event.error);
      isListening = false;
      updateModalListeningState(false);
      const statusEl = document.getElementById('voiceStatusText');
      if (statusEl) {
        if (event.error === 'not-allowed') {
          statusEl.textContent = '❌ Permissão de microfone negada. Permita o acesso ao microfone no navegador.';
        } else if (event.error === 'no-speech') {
          statusEl.textContent = '⚠️ Nenhuma voz detectada. Toque no microfone e tente novamente.';
        } else {
          statusEl.textContent = '⚠️ Erro ao capturar áudio: ' + event.error;
        }
      }
    };

    recognition.onend = function() {
      isListening = false;
      updateModalListeningState(false);

      if (finalTranscript && finalTranscript.trim()) {
        playSuccessChime();
        const parsed = parseSentence(finalTranscript);
        updatePreviewFields(parsed);
        const statusEl = document.getElementById('voiceStatusText');
        if (statusEl) {
          statusEl.innerHTML = '<span style="color: #10b981; font-weight: 600;">✅ Fala reconhecida com sucesso!</span>';
        }
      }
    };

    return true;
  }

  // UI: Atualiza campos do preview
  function updatePreviewFields(parsed) {
    const previewBox = document.getElementById('voiceParsedPreview');
    if (previewBox) previewBox.style.display = 'block';

    const descInput = document.getElementById('voiceDesc');
    const valInput = document.getElementById('voiceVal');
    const catSelect = document.getElementById('voiceCategory');
    const paymentSelect = document.getElementById('voicePaymentMethod');
    const typeSelect = document.getElementById('voiceType');

    if (descInput) descInput.value = parsed.descricao || '';
    if (valInput && parsed.valor > 0) valInput.value = parsed.valor.toFixed(2);
    if (catSelect && parsed.categoria) catSelect.value = parsed.categoria;
    if (paymentSelect && parsed.formaPagamento) paymentSelect.value = parsed.formaPagamento;
    if (typeSelect && parsed.tipo) typeSelect.value = parsed.tipo;
  }

  // UI: Alterna estado visual de escuta
  function updateModalListeningState(listening) {
    const micBtn = document.getElementById('btnVoiceMicBig');
    const waveEl = document.getElementById('voiceWaveBars');
    const statusEl = document.getElementById('voiceStatusText');

    if (micBtn) {
      if (listening) {
        micBtn.classList.add('recording');
      } else {
        micBtn.classList.remove('recording');
      }
    }
    if (waveEl) {
      waveEl.style.display = listening ? 'flex' : 'none';
    }
    if (statusEl && listening) {
      statusEl.textContent = '🔴 Ouvindo... Fale sua despesa agora';
    }
  }

  // Abre Modal de Voz
  function openModal() {
    const modal = document.getElementById('voiceModal');
    if (!modal) return;

    modal.classList.add('show');
    finalTranscript = '';

    const transcriptEl = document.getElementById('voiceLiveTranscript');
    if (transcriptEl) transcriptEl.textContent = 'Toque no microfone e fale seu gasto...';

    const statusEl = document.getElementById('voiceStatusText');
    if (statusEl) statusEl.textContent = 'Aguardando comando de voz...';

    startListening();
  }

  // Fecha Modal de Voz
  function closeModal() {
    stopListening();
    const modal = document.getElementById('voiceModal');
    if (modal) modal.classList.remove('show');
  }

  // Inicia captura de voz
  function startListening() {
    if (isListening) return;

    finalTranscript = '';
    const transcriptEl = document.getElementById('voiceLiveTranscript');
    if (transcriptEl) transcriptEl.textContent = 'Ouvindo... Fale agora';

    if (!recognition) {
      const supported = setupSpeechRecognition();
      if (!supported) {
        alert('Seu navegador não possui suporte nativo à SpeechRecognition da Web Speech API. Use Google Chrome, Edge ou Safari.');
        return;
      }
    }

    try {
      recognition.start();
    } catch (e) {
      console.warn('Erro ao chamar recognition.start():', e);
    }
  }

  // Para captura de voz
  function stopListening() {
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch (e) {}
    }
    isListening = false;
    updateModalListeningState(false);
  }

  // Salva o lançamento interpretado por voz
  function saveVoiceEntry() {
    const desc = (document.getElementById('voiceDesc')?.value || '').trim();
    const val = parseFloat(document.getElementById('voiceVal')?.value);
    const cat = document.getElementById('voiceCategory')?.value || 'Outros';
    const type = document.getElementById('voiceType')?.value || 'variavel';
    const paymentMethod = document.getElementById('voicePaymentMethod')?.value || 'C/C BB';
    const date = new Date().toISOString().slice(0, 10);

    if (!desc || isNaN(val) || val <= 0) {
      if (typeof showToast === 'function') {
        showToast('Por favor, informe uma descrição e um valor válido.', true);
      } else {
        alert('Por favor, informe uma descrição e um valor válido.');
      }
      return;
    }

    const appState = window.appState || (typeof StorageEngine !== 'undefined' ? StorageEngine.load() : null);
    if (!appState) {
      alert('Erro: Estado do aplicativo não carregado.');
      return;
    }

    const newTx = {
      id: 'tx-' + Date.now(),
      data: date,
      descricao: desc,
      categoria: cat,
      valor: val,
      tipo: type,
      formaPagamento: paymentMethod,
      origem: 'voz' // Identificador explícito de voz
    };

    if (!Array.isArray(appState.transacoes)) {
      appState.transacoes = [];
    }
    appState.transacoes.unshift(newTx);

    // Se for cartao de credito, lanca na fatura de Outubro e atualiza os cards do dashboard
    let cardPurchase = null;
    const isCreditCard = ['C/C BB', 'C/C Itaú', 'C/C Nubank', 'C/C Empório Alex'].some(c => 
      paymentMethod.toLowerCase().includes(c.toLowerCase().replace('c/c ', ''))
    );

    if (isCreditCard) {
      if (typeof StorageEngine !== 'undefined' && typeof StorageEngine.addCardPurchase === 'function') {
        cardPurchase = StorageEngine.addCardPurchase(appState, {
          categoria: cat,
          euPago: val,
          valor: val,
          descricao: desc,
          formaPagamento: paymentMethod,
          origem: 'voz'
        });
      }
    } else {
      // Para debitos, pix e outras despesas, impacta despesas variaveis ou fixas de Outubro
      const yr = appState.selectedYear || 2026;
      const currentYearData = appState.years ? appState.years[yr] : null;
      if (currentYearData && Array.isArray(currentYearData.months)) {
        const targetMonth = currentYearData.months.find(m => (m.name || '').toLowerCase() === 'outubro');
        if (targetMonth) {
          if (type === 'receita') targetMonth.receita = Math.round(((targetMonth.receita || 0) + val + Number.EPSILON) * 100) / 100;
          else if (type === 'fixa') targetMonth.fixa = Math.round(((targetMonth.fixa || 0) + val + Number.EPSILON) * 100) / 100;
          else if (type === 'invest') targetMonth.invest = Math.round(((targetMonth.invest || 0) + val + Number.EPSILON) * 100) / 100;
          else targetMonth.variavel = Math.round(((targetMonth.variavel || 0) + val + Number.EPSILON) * 100) / 100;

          const rec = targetMonth.receita || 0;
          targetMonth.sobra = Math.round((rec - (targetMonth.fixa || 0) - (targetMonth.variavel || 0) - (targetMonth.invest || 0) + Number.EPSILON) * 100) / 100;
        }
      }
    }

    StorageEngine.save(appState);

    // Sincroniza em tempo real com Planilha Google
    if (typeof GoogleSheetsSync !== 'undefined' && GoogleSheetsSync.isConfigured()) {
      GoogleSheetsSync.syncTransaction(newTx);
    }

    closeModal();

    if (typeof renderAll === 'function') {
      renderAll();
    }

    if (typeof showToast === 'function') {
      if (typeof GoogleSheetsSync !== 'undefined' && GoogleSheetsSync.isConfigured()) {
        GoogleSheetsSync.syncTransaction(newTx);
        if (cardPurchase) GoogleSheetsSync.syncCardPurchase(cardPurchase);
        showToast(`🎙️ Lançamento de voz salvo e enviado à Planilha: ${desc} (R$ ${val.toFixed(2)}) em ${paymentMethod}!`);
      } else {
        showToast(`🎙️ Lançamento salvo no painel e somado à fatura: ${desc} (R$ ${val.toFixed(2)})! Para sincronizar online, configure a Planilha Google nas Configurações.`);
      }
    }
  }

  // Preenche formulário padrão e navega
  function sendToStandardForm() {
    const desc = document.getElementById('voiceDesc')?.value || '';
    const val = document.getElementById('voiceVal')?.value || '';
    const cat = document.getElementById('voiceCategory')?.value || '';
    const payment = document.getElementById('voicePaymentMethod')?.value || '';
    const type = document.getElementById('voiceType')?.value || '';

    closeModal();

    const tabLink = document.querySelector('[data-tab=novo-lancamento]');
    if (tabLink) tabLink.click();

    setTimeout(() => {
      const entryDesc = document.getElementById('entryDesc');
      const entryVal = document.getElementById('entryValue');
      const entryCat = document.getElementById('entryCategory');
      const entryPayment = document.getElementById('entryPaymentMethod');
      const entryType = document.getElementById('entryType');

      if (entryDesc && desc) entryDesc.value = desc;
      if (entryVal && val) entryVal.value = val;
      if (entryCat && cat) entryCat.value = cat;
      if (entryPayment && payment) entryPayment.value = payment;
      if (entryType && type) entryType.value = type;

      if (typeof showToast === 'function') {
        showToast('Campos preenchidos por voz! Revise e clique em Salvar.', false);
      }
    }, 150);
  }

  function init() {
    setupSpeechRecognition();

    const btnHeader = document.getElementById('btnVoiceRecordHeader');
    if (btnHeader) btnHeader.addEventListener('click', openModal);

    const btnFab = document.getElementById('btnVoiceFab');
    if (btnFab) btnFab.addEventListener('click', openModal);

    const btnFormTrigger = document.getElementById('btnVoiceFormTrigger');
    if (btnFormTrigger) btnFormTrigger.addEventListener('click', openModal);

    const btnClose = document.getElementById('voiceModalClose');
    if (btnClose) btnClose.addEventListener('click', closeModal);

    const btnMicBig = document.getElementById('btnVoiceMicBig');
    if (btnMicBig) {
      btnMicBig.addEventListener('click', () => {
        if (isListening) stopListening();
        else startListening();
      });
    }

    const btnRetry = document.getElementById('btnVoiceRetry');
    if (btnRetry) btnRetry.addEventListener('click', startListening);

    const btnConfirm = document.getElementById('btnVoiceConfirmSave');
    if (btnConfirm) btnConfirm.addEventListener('click', saveVoiceEntry);

    const btnSendForm = document.getElementById('btnVoiceSendToForm');
    if (btnSendForm) btnSendForm.addEventListener('click', sendToStandardForm);

    const modal = document.getElementById('voiceModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  return {
    init,
    openModal,
    closeModal,
    startListening,
    stopListening,
    parseSentence,
    saveVoiceEntry
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  VoiceInputModule.init();
});

if (typeof window !== 'undefined') {
  window.VoiceInputModule = VoiceInputModule;
}
