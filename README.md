# 💰 Dashboard Financeiro & Orçamento Pessoal

Sistema web moderno e executivo para controle de orçamento pessoal, projeção anual, acompanhamento de limites e faturas de cartões de crédito.

Originalmente projetado a partir da planilha **Victor Orçamento Anual.xlsx**, o sistema automatiza todos os cálculos matemáticos, sincroniza dados em nuvem via **Google Firebase** e permite exportação fiel em **Excel (.xlsx)**.

---

## 🚀 Funcionalidades Principais

- **Autenticação Segura com Google**: Login integrado via Firebase Authentication com isolamento estrito de dados por usuário no Firestore.
- **Sincronização Nuvem + Offline**: Salva instantaneamente no cache local (`LocalStorage`) e sincroniza com o banco de dados `Cloud Firestore` na nuvem.
- **Controle dos 4 Cartões de Crédito**:
  - 🟡 Banco do Brasil (C/C BB)
  - 🟠 Itaú Uniclass (C/C Itaú)
  - 💜 Nubank Roxinho (C/C Nubank)
  - 🛍️ Empório Alex (C/C Empório Alex)
- **Vínculo Dinâmico ("O que?") com o Orçamento Anual**:
  - Cada lançamento categorizado no cartão atualiza automaticamente o valor da categoria no mês vigente (Agosto), ajusta o teto de gastos e recalcula a Sobra Mensal.
  - Projeta parcelas futuras (ex: 1/3) nos meses subsequentes (Setembro a Dezembro).
- **Projeção e Médias dos Meses Futuros**:
  - Médias mensais de receitas, despesas fixas/essenciais, despesas de estilo de vida e sobras esperadas.
  - Soma acumulada das sobras futuras (fórmula da célula `I59: =SUM(D59:H59)`).
- **Gráfico e Indicadores de Tetos/Limites**:
  - Alertas visuais em tempo real para categorias monitoradas: Alimentação, Combustível, Lazer, Mercado, Estacionamento, Uber, Obra e Manutenção do Carro.
- **Exportação Fiel em Excel (.xlsx)**:
  - Gera em 1 clique um arquivo `.xlsx` completo idêntico aos moldes da planilha original (abas *Orçamento 2026*, *CARTAO AGOSTO*, *Orçamento 2027*, *Orçamento 2024*, *COMPARATIVO ANUAL*, *Investimentos*, *Metas e Desejos* e *Lançamentos Gerais*).
- **Interface Dark Glassmorphism**:
  - Design premium, responsivo para celular (com menu Drawer lateral), gráficos dinâmicos com Chart.js e micro-animações.

---

## 📂 Estrutura do Repositório

```text
├── site/                     # Código da Aplicação Web (Frontend)
│   ├── index.html            # Dashboard e painel principal
│   ├── login.html            # Tela de login Google OAuth
│   ├── .htaccess             # Regras Apache (HTTPS forçado, Gzip, Cache, CSP)
│   ├── css/
│   │   └── style.css         # Estilização completa Dark Glassmorphism
│   └── js/
│       ├── app.js            # Controlador da aplicação e interface
│       ├── calculations.js   # Motor de cálculos e fórmulas financeiras
│       ├── charts.js         # Gráficos Chart.js interativos
│       ├── exporter.js       # Gerador de planilha Excel (.xlsx) nos moldes originais
│       ├── firebase-config.js# Conexão Firebase Auth e Firestore
│       ├── storage.js        # Motor de persistência local e dados base
│       └── xlsx.full.min.js  # Biblioteca SheetJS embutida offline
├── planilha/                 # Planilha base original (backup)
├── firestore.rules           # Regras de segurança de banco de dados
├── firebase.json             # Configuração de projeto Firebase
├── start_test_server.py      # Servidor de testes local em Python
├── create_zip.py             # Script utilitário para gerar pacote de deploy
└── README.md                 # Documentação do projeto
```

---

## 💻 Como Rodar Localmente

1. Certifique-se de ter o **Python 3.x** instalado.
2. Na raiz do projeto, execute o script do servidor local:
   ```bash
   python start_test_server.py
   ```
3. O servidor abrirá automaticamente o navegador na porta disponível (ex: `http://localhost:5500/login.html`).

---

## 🌐 Publicação na HostGator (cPanel)

O projeto é 100% estático (HTML, CSS e JavaScript puro), compatível com qualquer hospedagem cPanel/Apache:

1. Compacte todo o conteúdo da pasta `site/` em um arquivo `.zip` (ou use `python create_zip.py`).
2. Acesse o **cPanel** da HostGator e abra o **Gerenciador de Arquivos**.
3. Navegue até o diretório raiz do seu domínio (geralmente `public_html/`).
4. Envie o arquivo `.zip` e clique em **Extrair**.
5. Acesse seu domínio com certificado SSL ativado (ex: `https://zionsites.online`).

---

## 🔒 Segurança e Regras Firestore

As regras no Firebase Firestore garantem isolamento multiusuário estrito:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

Desenvolvido com foco em precisão financeira, usabilidade e alto padrão visual.
