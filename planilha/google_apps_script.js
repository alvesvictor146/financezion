/**
 * GOOGLE APPS SCRIPT - INTEGRACAO COM PLANILHA GOOGLE SHEETS
 * Projeto: FinanceZion (Victor Financas)
 *
 * COMO INSTALAR:
 * 1. Abra sua Planilha no Google Sheets (drive.google.com).
 * 2. No menu superior, clique em: Extensoes > Apps Script.
 * 3. Apague qualquer codigo existente e cole este script completo.
 * 4. Clique em Salvar (icone de disquete).
 * 5. Clique em Implantar (botao azul no topo direito) > Nova implantacao.
 * 6. Em Selecione o tipo, clique na engrenagem e escolha App da Web (Web App).
 * 7. Configure:
 *    - Descricao: FinanceZion Sync API
 *    - Executar como: Eu (seu e-mail Google)
 *    - Quem tem acesso: Qualquer pessoa (Anyone) -> essencial para permitir envio pelo dashboard web.
 * 8. Clique em Implantar e copie a URL gerada (termina com /exec).
 * 9. Cole essa URL no seu Painel Financeiro (Aba Configuracoes > Planilha Google).
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var params = {};

    if (e && e.postData && e.postData.contents) {
      try {
        params = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        params = e.parameter || {};
      }
    } else if (e && e.parameter) {
      params = e.parameter;
    }

    var action = params.action || 'ping';

    if (action === 'ping') {
      return createJsonResponse({
        status: 'success',
        message: 'Conexao com a Planilha Google estabelecida com sucesso!',
        sheetName: ss.getName(),
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'addTransaction') {
      var sheetName = params.sheet || 'Lançamentos App';
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow(['Data', 'Descricao', 'Categoria', 'Tipo', 'Valor (R$)', 'Forma Pagamento', 'Origem', 'Registrado em']);
        sheet.getRange('A1:G1').setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
      }
      sheet.appendRow([
        params.data || Utilities.formatDate(new Date(), 'GMT-3', 'yyyy-MM-dd'),
        params.descricao || 'Sem descricao',
        params.categoria || 'Geral',
        params.tipo || 'despesa',
        Number(params.valor) || 0,
        params.formaPagamento || 'PIX',
        params.origem || 'app',
        new Date()
      ]);
      return createJsonResponse({
        status: 'success',
        message: 'Lancamento registrado na planilha com sucesso!',
        row: sheet.getLastRow()
      });
    }

    if (action === 'addCardPurchase') {
      var cardSheetName = params.sheet || 'CARTAO OUTUBRO';
      var cardSheet = ss.getSheetByName(cardSheetName);
      if (!cardSheet) {
        cardSheet = ss.insertSheet(cardSheetName);
        cardSheet.appendRow(['O que?', 'Motivo', 'Banco / Cartao', 'Parcela', 'Valor Total', 'Valor Pago', 'Registrado em']);
        cardSheet.getRange('A1:G1').setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
      }
      var parcStr = (params.parcelaAtual || '1') + '/' + (params.numParcelas || '1');
      cardSheet.appendRow([
        params.oQue || params.categoria || 'Outros',
        params.motivo || '',
        params.cartao || 'C/C BB',
        parcStr,
        Number(params.valor) || 0,
        Number(params.euPago || params.valor) || 0,
        new Date()
      ]);
      return createJsonResponse({
        status: 'success',
        message: 'Lancamento de cartao registrado na planilha!',
        row: cardSheet.getLastRow()
      });
    }

    if (action === 'batchSync') {
      var txList = params.transacoes || [];
      var cardList = params.comprasCartao || [];
      if (txList.length > 0) {
        var txSheet = ss.getSheetByName('Lançamentos App') || ss.insertSheet('Lançamentos App');
        if (txSheet.getLastRow() === 0) {
          txSheet.appendRow(['Data', 'Descricao', 'Categoria', 'Tipo', 'Forma de Pagamento', 'Valor (R$)', 'ID']);
          txSheet.getRange('A1:G1').setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
        }
        txList.forEach(function(t) {
          txSheet.appendRow([
            t.data || '',
            t.descricao || '',
            t.categoria || '',
            t.tipo || '',
            t.formaPagamento || '',
            Number(t.valor) || 0,
            t.id || ''
          ]);
        });
      }
      if (cardList.length > 0) {
        var cSheet = ss.getSheetByName('CARTAO OUTUBRO') || ss.insertSheet('CARTAO OUTUBRO');
        if (cSheet.getLastRow() === 0) {
          cSheet.appendRow(['O que?', 'Motivo', 'Banco / Cartao', 'Parcela', 'Valor Total', 'Valor Pago', 'ID']);
          cSheet.getRange('A1:G1').setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
        }
        cardList.forEach(function(c) {
          var parc = (c.parcelaAtual || '1') + '/' + (c.numParcelas || '1');
          cSheet.appendRow([
            c.oQue || c.categoria || '',
            c.motivo || '',
            c.cartao || '',
            parc,
            Number(c.valor) || 0,
            Number(c.euPago || c.valor) || 0,
            c.id || ''
          ]);
        });
      }
      return createJsonResponse({
        status: 'success',
        message: 'Sincronizacao em lote concluida com sucesso!',
        totalTransacoes: txList.length,
        totalCartao: cardList.length
      });
    }

    return createJsonResponse({ status: 'error', message: 'Acao nao reconhecida: ' + action });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}