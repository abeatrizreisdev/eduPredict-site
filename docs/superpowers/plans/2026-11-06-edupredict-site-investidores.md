# Site de apresentação do EduPredict IA (investidores) — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para executar este plano tarefa por tarefa. Os passos usam sintaxe de checkbox (`- [ ]`) para acompanhamento.

**Goal:** Um site de página única que apresenta a ideação do EduPredict IA a investidores: problema, solução, modelo de negócio, impacto, tecnologia, estágio e contato, com contato para conversa.

**Architecture:** Site estático (HTML, CSS e JS sem framework e sem etapa de build), com uma página `index.html` organizada em seções âncora. Os estilos ficam em `assets/css/site.css`, o JS mínimo em `assets/js/site.js`, e a marca e as fontes ficam em `assets/`. Publicável em qualquer hospedagem estática (GitHub Pages, Vercel, Netlify).

**Tech Stack:** HTML5, CSS3 (variáveis e grid), JavaScript vanilla, Sora (OFL, self-hosted), Node.js 20+ só para os testes estáticos.

**Spec:** Pitch em PDF `EduPredict-IA-pitch.pdf` (10 slides) e o infográfico do CSBC 2026. As seções do site seguem esses dois materiais.

## Global Constraints

- Paleta: Azul-marinho `#13315C` (principal), Coral `#FF5A36` (acento), Coral texto `#D9411E` (textos pequenos sobre fundo claro), Cinza apoio `#52606D`, Azul claro `#C9D6EA`, Grafite `#1A1A1A`, Branco `#FFFFFF`.
- Fonte: Sora nos pesos 400, 600 e 800, servida de `assets/fonts/` (nunca de CDN).
- Idioma do conteúdo: português do Brasil. Atributo `lang="pt-BR"` no `<html>`.
- Slogan oficial: "A rede de apoio do estudante".
- Nenhum número de resultado medido pode aparecer como fato. Os valores do painel são ilustrativos e devem estar rotulados como tal.
- Dados que ainda não existem (tamanho de mercado, valor de rodada, metas financeiras) ficam como marcadores visíveis `[a preencher]`, nunca como valores inventados.
- Contatos reais só com aprovação explícita do time. O site usa os dados do infográfico até que o time confirme.
- Acessibilidade: contraste mínimo 4,5:1 para texto normal; todas as imagens com `alt`; navegação funcional só com teclado.
- Sem rastreadores, sem cookies e sem scripts de terceiros.

## Review Focus

1. Tela estreita (celular, 360 px): a navegação deve virar menu recolhível e nenhum conteúdo pode sair da tela na horizontal.
2. JavaScript desligado: o conteúdo principal precisa continuar legível, só o menu recolhível deixa de funcionar.
3. Link de e-mail e de LinkedIn com caracteres especiais ou com o endereço vazio: o site não pode quebrar nem mostrar `undefined`.
4. Marcadores `[a preencher]`: nenhum pode chegar à versão publicada sem ser revisado; o teste de publicação falha se encontrar um.
5. Usuário com movimento reduzido (`prefers-reduced-motion`): animações de entrada devem ser desligadas.

## Estrutura de arquivos

- Create: `index.html` — todas as seções da página.
- Create: `assets/css/site.css` — tokens de cor, tipografia, layout e responsividade.
- Create: `assets/js/site.js` — menu recolhível e animação de entrada opcional.
- Create: `assets/data/conteudo.json` — textos e listas usados pelo HTML, para revisão do time sem mexer em markup.
- Create: `scripts/verificar-site.mjs` — checagens estáticas (seções, marcadores, contraste, links).
- Create: `package.json` — script `test` que roda o verificador.
- Existing (já criado): `assets/img/logo.svg`, `assets/img/logo-neg.svg`, `assets/img/favicon.svg`, `assets/fonts/Sora-*.ttf`.

## Tarefas

### Tarefa 1: Estrutura base e tokens de design

**Files:**
- Create: `index.html`, `assets/css/site.css`, `package.json`

**Interfaces:**
- Consumes: nada.
- Produces: variáveis CSS `--azul`, `--coral`, `--coral-texto`, `--cinza`, `--azul-claro`, `--grafite`, `--branco` em `:root`; classes `.container` (largura máxima 1120 px) e `.secao` (padding vertical 96 px no desktop, 64 px no celular).

- [ ] **Passo 1: Escrever o teste que falha** — em `scripts/verificar-site.mjs`, checar que `index.html` tem `lang="pt-BR"`, que `site.css` define as sete variáveis de cor acima com os valores exatos da seção Global Constraints, e que `@font-face` aponta para `assets/fonts/Sora-400.ttf`, `Sora-600.ttf` e `Sora-800.ttf`.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "variável --azul não encontrada".
- [ ] **Passo 3: Implementar** — criar `index.html` com `<head>` completo (charset, viewport, título "EduPredict IA — Apresentação para investidores", meta description, favicon `assets/img/favicon.svg`) e `site.css` com as variáveis e `@font-face`.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS para as checagens da tarefa 1.
- [ ] **Passo 5: Commit** — `git add index.html assets/css/site.css package.json scripts/verificar-site.mjs && git commit -m "feat: estrutura base e tokens de design"`

### Tarefa 2: Cabeçalho com navegação e menu recolhível

**Files:**
- Modify: `index.html`, `assets/css/site.css`
- Create: `assets/js/site.js`

**Interfaces:**
- Consumes: variáveis e `.container` da tarefa 1.
- Produces: `<header class="cabecalho">` com `<nav>` cujos links apontam para `#problema`, `#solucao`, `#negocio`, `#impacto`, `#tecnologia`, `#estagio`, `#contato`; botão `.menu-toggle` com `aria-expanded` e `aria-controls="menu-principal"`.

- [ ] **Passo 1: Escrever o teste que falha** — checar que todos os sete `href="#..."` existem como `id` no HTML, e que o botão `.menu-toggle` tem `aria-controls` apontando para um `id` existente.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "âncora #problema sem destino".
- [ ] **Passo 3: Implementar** — cabeçalho fixo com logo `assets/img/logo.svg` (altura 40 px) e a navegação. Em `site.js`, o botão alterna `aria-expanded` e a classe `aberto` no menu, e fecha o menu ao clicar em um link. Sem JS, a navegação aparece em linha.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: cabecalho com navegacao e menu recolhivel"`

### Tarefa 3: Seção Problema e Solução

**Files:**
- Modify: `index.html`, `assets/css/site.css`
- Create: `assets/data/conteudo.json`

**Interfaces:**
- Consumes: `.secao`, `.container` da tarefa 1.
- Produces: `<section id="problema">` com quatro cartões (Perda de estudantes, Custos mais altos, Indicadores prejudicados, Menor impacto social) e `<section id="solucao">` com o fluxo em quatro etapas (Fontes → IA e dados → Ação → Resultado). Os textos vêm de `conteudo.json` nas chaves `problema.cartoes` e `solucao.etapas`.

- [ ] **Passo 1: Escrever o teste que falha** — checar que `#problema` contém exatamente 4 `.cartao` e `#solucao` contém exatamente 4 `.etapa`, e que cada texto do HTML bate com `conteudo.json`.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "esperado 4 cartões em #problema, encontrado 0".
- [ ] **Passo 3: Implementar** — seções com título, subtítulo e cartões no grid de 4 colunas (2 colunas no tablet, 1 no celular). O fluxo de solução usa setas entre as etapas e vira coluna vertical no celular.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: secoes problema e solucao"`

### Tarefa 4: Hero com proposta de valor e CTA

**Files:**
- Modify: `index.html`, `assets/css/site.css`

**Interfaces:**
- Consumes: `.container`, `.secao`, logo da tarefa 2.
- Produces: `<section class="hero">` com título "Plataforma inteligente para permanência e êxito estudantil", subtítulo "Educação profissional e tecnológica, com dados, IA e ação preventiva.", e dois botões: `#contato` (primário, coral) e `#problema` (secundário). Fundo azul-marinho com texto branco.

- [ ] **Passo 1: Escrever o teste que falha** — checar que `.hero h1` contém o título exato, que existem dois `.hero a.botao` com os `href` indicados, e que o contraste entre `#FFFFFF` e `#13315C` passa do mínimo de 4,5:1 (calcular pela fórmula WCAG no próprio script).
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "hero sem h1".
- [ ] **Passo 3: Implementar** — hero em altura mínima de 90vh no desktop, com a logo negativa `assets/img/logo-neg.svg` no topo. Botão primário em `--coral` com texto `--grafite` (contraste verificado no passo 1 ou ajustar para `--coral-texto` com texto branco, se o teste apontar contraste insuficiente).
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: hero com proposta de valor e CTA"`

### Tarefa 5: Modelo de negócio, impacto e mercado (marcadores)

**Files:**
- Modify: `index.html`, `assets/css/site.css`, `assets/data/conteudo.json`

**Interfaces:**
- Consumes: `.cartao` da tarefa 3.
- Produces: `<section id="negocio">` com quatro cartões (Clientes, Canais, Receitas, Custos) e `<section id="impacto">` com cinco cartões (Social, Educacional, Tecnológico, Econômico, Institucional) mais um sexto para Escalabilidade. A seção `#negocio` tem um bloco `.marcador` com o texto "Tamanho de mercado: [a preencher]".

- [ ] **Passo 1: Escrever o teste que falha** — checar que `#negocio` tem 4 `.cartao`, `#impacto` tem 6 `.cartao`, e que existe pelo menos um `.marcador` com o texto `[a preencher]`.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "esperado 4 cartões em #negocio, encontrado 0".
- [ ] **Passo 3: Implementar** — cartões no grid. `.marcador` com fundo amarelo claro e borda tracejada, para ficar visível na revisão.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: modelo de negocio, impacto e marcadores de mercado"`

### Tarefa 6: Painel ilustrativo e tecnologia

**Files:**
- Modify: `index.html`, `assets/css/site.css`, `assets/data/conteudo.json`

**Interfaces:**
- Consumes: `.secao`, `.container`.
- Produces: `<section id="tecnologia">` com a lista de tecnologias (Python, Pandas, Scikit-learn, PostgreSQL, Power BI, FastAPI, React, Docker, AWS, Moodle) como `<ul class="tags">`; e um bloco `.painel-exemplo` dentro de `#solucao` com os quatro indicadores 25, 68, 142 e 12, cada um com o rótulo "(exemplo ilustrativo)".

- [ ] **Passo 1: Escrever o teste que falha** — checar que `#tecnologia .tags li` tem 10 itens, e que `.painel-exemplo` contém a palavra "ilustrativo" e os quatro valores.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "painel-exemplo ausente".
- [ ] **Passo 3: Implementar** — indicadores em cartões com borda superior colorida (vermelho-coral para alto, amarelo para médio, verde para baixo, azul-marinho para ações). Os valores aparecem com o aviso "exemplo ilustrativo" logo abaixo do bloco.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: painel ilustrativo e secao de tecnologia"`

### Tarefa 7: Estágio do projeto (TRL) e próximos passos

**Files:**
- Modify: `index.html`, `assets/css/site.css`, `assets/data/conteudo.json`

**Interfaces:**
- Consumes: `.secao`.
- Produces: `<section id="estagio">` com a linha de TRL 1 a 9 (cada etapa é um `<li class="trl">` com `data-trl="1"` até `"9"`, e a etapa atual marcada com `aria-current="step"` na TRL 1–2) e um bloco "Próximos passos" com a lista `[a validar com o time]` como primeiro item.

- [ ] **Passo 1: Escrever o teste que falha** — checar que existem 9 `.trl` com `data-trl` de 1 a 9, que o item com `aria-current` tem `data-trl` 1 ou 2, e que o bloco "Próximos passos" existe.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "esperado 9 etapas TRL, encontrado 0".
- [ ] **Passo 3: Implementar** — faixa horizontal com as nove etapas; no celular vira lista vertical. As etapas 1 a 4 ficam em azul-marinho, a etapa 9 em coral, e as demais em azul-claro.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: estagio do projeto em TRL"`

### Tarefa 8: Equipe e contato

**Files:**
- Modify: `index.html`, `assets/css/site.css`, `assets/data/conteudo.json`

**Interfaces:**
- Consumes: `.cartao`, `.botao` da tarefa 4.
- Produces: `<section id="equipe">` com três cartões (Tarsio Ribeiro Cavalcante, Ana Beatriz Reis Alves, Lhuanny de Santana Lima), cada um com nome e um link de LinkedIn quando houver; `<footer id="contato">` com botão "Falar com a equipe" apontando para o LinkedIn de Tarsio, um marcador "E-mail de contato: [a preencher]", logo negativa e o rodapé "EduPredict IA · 2026". Não citar instituição de origem em nenhum lugar do site.

- [ ] **Passo 1: Escrever o teste que falha** — checar que `#equipe` tem 3 `.cartao`, que o texto da página não contém "baiano" (sem diferenciar maiúsculas), e que nenhum link ou texto contém `undefined`, `null` ou `NaN`.
- [ ] **Passo 2: Rodar e ver falhar** — `npm test`. Esperado: FAIL com "esperado 5 cartões em #equipe, encontrado 0".
- [ ] **Passo 3: Implementar** — cartões de equipe em grid; links de LinkedIn com `rel="noopener"` e `target="_blank"`. O rodapé tem o botão "Falar com a equipe" apontando para o LinkedIn de Tarsio.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS.
- [ ] **Passo 5: Commit** — `git commit -am "feat: equipe e contato"`

### Tarefa 9: Responsividade, movimento reduzido e revisão final

**Files:**
- Modify: `assets/css/site.css`, `assets/js/site.js`
- Modify: `scripts/verificar-site.mjs`

**Interfaces:**
- Consumes: todas as seções das tarefas 2 a 8.
- Produces: `@media (max-width: 720px)` para celular e `@media (prefers-reduced-motion: reduce)` que desliga as animações de entrada; verificador com a checagem de marcadores `[a preencher]` ativa somente quando a variável de ambiente `PUBLICAR=1` estiver definida.

- [ ] **Passo 1: Escrever o teste que falha** — checar que `site.css` contém `@media (max-width: 720px)` e `@media (prefers-reduced-motion: reduce)`, e que com `PUBLICAR=1` o verificador falha ao encontrar `[a preencher]`.
- [ ] **Passo 2: Rodar e ver falhar** — `PUBLICAR=1 npm test`. Esperado: FAIL com "marcador [a preencher] encontrado em #negocio".
- [ ] **Passo 3: Implementar** — regras de responsividade para 360 px, 720 px e 1120 px; animação de entrada com `IntersectionObserver` apenas quando o usuário não pediu movimento reduzido.
- [ ] **Passo 4: Rodar e ver passar** — `npm test`. Esperado: PASS (sem `PUBLICAR`). Revisão manual: abrir `index.html` em 360, 768 e 1280 px, e com JS desligado.
- [ ] **Passo 5: Commit** — `git commit -am "feat: responsividade e movimento reduzido"`

## Entrega

Ao final, rodar `npm test` e `PUBLICAR=1 npm test`. A segunda deve falhar enquanto houver marcadores `[a preencher]`; esse é o bloqueio esperado até o time preencher os dados de mercado e aprovar os contatos.

---

**Execution handoff:** o plano está salvo em `docs/superpowers/plans/2026-11-06-edupredict-site-investidores.md`. Para executar, escolha entre subagent-driven (uma tarefa por vez com revisão independente, mais cuidadoso) ou inline (mais rápido, sem revisão independente até o fim). Para 9 tarefas com dependências em sequência, recomendo subagent-driven.
