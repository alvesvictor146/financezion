---
name: hostgator-deploy
description: Procedimento passo a passo para publicação e manutenção do dashboard financeiro na hospedagem HostGator (cPanel / Apache / FTP / SSL).
---

# 🌐 Skill: hostgator-deploy

Guia operacional para realizar o deploy do Dashboard Financeiro no ambiente de hospedagem **HostGator**.

## 📋 Arquitetura de Publicação

O site foi desenvolvido como uma Single-Page Application (SPA) ultra-leve com HTML5, CSS3 moderno, JavaScript ES6 puro e persistência local, além de exportação/importação de dados.
Isso garante **0 dependência de Node.js no servidor**, máxima velocidade de carregamento (menos de 1 segundo), baixo consumo de CPU no plano de hospedagem e 100% de compatibilidade com qualquer plano HostGator (P, M, Turbo, Plus ou Revenda).

---

## 🚀 Método 1: Deploy pelo Gerenciador de Arquivos do cPanel (Mais Rápido)

1. Acesse o **cPanel da HostGator**:
   - `https://seudominio.com.br:2083` ou pelo Painel do Cliente HostGator.
2. Na seção **Arquivos**, clique em **Gerenciador de Arquivos**.
3. Escolha o diretório destino:
   - **Domínio principal**: navegue até `public_html/`
   - **Subdomínio** (ex: `financeiro.seudominio.com.br`): navegue até a pasta criada para o subdomínio (ex: `public_html/financeiro/`).
4. Compacte a pasta `site/` do projeto em um arquivo `.zip`.
5. No cPanel, clique no botão **Carregar (Upload)** e envie o arquivo `.zip`.
6. Selecione o `.zip` no cPanel e clique em **Extrair (Extract)**.
7. Garanta que o arquivo `index.html` esteja diretamente na raiz da pasta escolhida (e não dentro de uma subpasta `site/`).
8. Verifique se o arquivo `.htaccess` foi carregado (no cPanel, clique em *Configurações* no canto superior direito e marque *Mostrar arquivos ocultos (dotfiles)*).

---

## 🛰️ Método 2: Deploy via FTP (FileZilla)

1. No cPanel, crie ou use sua conta FTP:
   - **Host / Servidor**: `ftp.seudominio.com.br` (ou o IP do servidor fornecido no e-mail de boas-vindas da HostGator)
   - **Usuário**: seu usuário cPanel ou conta FTP criada
   - **Senha**: senha do FTP
   - **Porta**: `21`
2. No FileZilla:
   - Conecte ao servidor.
   - No painel da esquerda (local), vá até `C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\site\`
   - No painel da direita (remoto), abra `public_html/` (ou a pasta do subdomínio).
   - Arraste todos os arquivos e pastas (`index.html`, `css/`, `js/`, `.htaccess`).

---

## 🔒 Ativação de SSL Grátis (HTTPS)

1. No cPanel, procure por **SSL/TLS Status** ou **Let's Encrypt SSL**.
2. Localize seu domínio ou subdomínio.
3. Clique em **Run AutoSSL** (Executar AutoSSL).
4. Em instantes o certificado será emitido e renovado automaticamente pela HostGator.

---

## ⚙️ Arquivo `.htaccess` Otimizado para HostGator

O arquivo `.htaccess` incluso no diretório `site/` já contém:
- Redirecionamento obrigatório para `https://`
- Compressão gzip / deflate para carregamento instantâneo
- Cache de arquivos estáticos (CSS, JS, imagens)
- Bloqueio de listagem de diretórios (`Options -Indexes`)
