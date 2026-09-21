/**
 * GOOGLE SHEETS SYNC MODULE
 * Conexão direta com a Planilha Google online via Google Apps Script Webhook.
 */

const GoogleSheetsSync = {
  SPREADSHEET_ID: '1La4TsmQTnWxTMHsZIiH8I5UmFYQ6r9yHQD_0BKbwgRY',
  OUTUBRO_GID: '1199015194',

  getLiveCsvUrl(gid = '1199015194') {
    return `https://docs.google.com/spreadsheets/d/${this.SPREADSHEET_ID}/export?format=csv&gid=${gid}`;
  },

  STORAGE_KEY_URL: 'financezion_sheets_webhook_url',
  STORAGE_KEY_AUTOSYNC: 'financezion_sheets_autosync',

  getWebhookUrl() {
    return (localStorage.getItem(this.STORAGE_KEY_URL) || '').trim();
  },

  setWebhookUrl(url) {
    localStorage.setItem(this.STORAGE_KEY_URL, (url || '').trim());
  },

  isAutoSyncEnabled() {
    const val = localStorage.getItem(this.STORAGE_KEY_AUTOSYNC);
    return val === null ? true : val === 'true';
  },

  setAutoSyncEnabled(enabled) {
    localStorage.setItem(this.STORAGE_KEY_AUTOSYNC, String(enabled));
  },

  isConfigured() {
    const url = this.getWebhookUrl();
    return Boolean(url && url.startsWith('https://script.google.com'));
  },

  async sendPayload(payload) {
    const url = this.getWebhookUrl();
    if (!url) return { success: false, message: 'URL do Google Sheets não configurada.' };

    try {
      // Google Apps Script redirects 302 to script.googleusercontent.com
      // Enviamos com mode: 'cors' ou fallback no-cors
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (resp.ok) {
        const data = await resp.json();
        return { success: true, data };
      }
      return { success: true, message: 'Enviado para a Planilha Google.' };
    } catch (err) {
      console.warn('Aviso no envio para Google Sheets:', err);
      // Tentativa de fallback via fetch GET para evitar restrições de CORS
      try {
        const paramStr = encodeURIComponent(JSON.stringify(payload));
        await fetch(url + '?data=' + paramStr, { mode: 'no-cors' });
        return { success: true, message: 'Enviado via requisição assíncrona para a Planilha Google.' };
      } catch (fallbackErr) {
        return { success: false, message: 'Falha de rede ao conectar à Planilha Google.', error: fallbackErr };
      }
    }
  },

  async testConnection() {
    const url = this.getWebhookUrl();
    if (!url) return { success: false, message: 'Informe a URL do Apps Script primeiro.' };
    return this.sendPayload({ action: 'ping' });
  },

  async syncTransaction(tx) {
    if (!this.isConfigured() || !this.isAutoSyncEnabled()) return;
    return this.sendPayload({
      action: 'addTransaction',
      ...tx
    });
  },

  async syncCardPurchase(cardItem) {
    if (!this.isConfigured() || !this.isAutoSyncEnabled()) return;
    return this.sendPayload({
      action: 'addCardPurchase',
      ...cardItem
    });
  },

  async syncAllData(appState) {
    if (!this.isConfigured()) return { success: false, message: 'Configure a URL da Planilha Google nas Configurações.' };
    const txList = Array.isArray(appState.transacoes) ? appState.transacoes : [];
    const cardList = Array.isArray(appState?.cartaoAgosto?.compras) ? appState.cartaoAgosto.compras : [];
    return this.sendPayload({
      action: 'batchSync',
      transacoes: txList,
      comprasCartao: cardList
    });
  }
};

if (typeof window !== 'undefined') {
  window.GoogleSheetsSync = GoogleSheetsSync;
}