# Nail Designer 7D — Design System

Guia de referência para construir novas páginas mantendo a mesma identidade visual.
Todos os padrões abaixo já estão implementados em `styles.css` e podem ser reutilizados.

---

## 1. Brand & Tokens

### Cores (CSS variables em `:root`)

```css
--c-bg:          #efe5d5;  /* bege claro principal */
--c-bg-warm:     #e7d8c1;  /* bege quente (cards/sessões secundárias) */
--c-bg-soft:     #f6ecdb;  /* cream suave (alterna seções) */

--c-text:        #2b2114;  /* texto principal */
--c-text-soft:   #4a3a25;  /* texto secundário */
--c-text-muted:  #6a5740;  /* texto auxiliar/labels */

--c-accent:      #b8763a;  /* âmbar/laranja escuro — accent principal */
--c-accent-soft: #d39a5f;  /* âmbar claro — gradients/decoração */

--c-cta:         #2f3b22;  /* verde escuro — botões primários */
--c-cta-hover:   #3d4d2c;
--c-cta-text:    #f6ecdb;

--c-marquee:     #cdb18a;  /* faixa bege quente do marquee X */
--c-white:       #ffffff;
--c-line:        rgba(43, 33, 20, .15);
```

**Cores escuras para seções dark (não estão como vars):**
- `#1a140c` (background escuro principal)
- `#241b12` / `#2a2118` (escuro sutil)
- `#faf6ee` / `#f4e4c1` / `#e6ce94` (cream/champagne em backgrounds escuros)

### Tipografia

```css
--ff-serif: "Montserrat", system-ui, sans-serif;  /* mesma fonte */
--ff-sans:  "Montserrat", system-ui, sans-serif;
```

**Convenção visual:**
- Display/headlines → `font-weight: 500` + `font-style: italic` no `<em>` interno
- Body → `font-weight: 400/500`, line-height generoso (1.5–1.75)
- Eyebrow/labels → `font-size: 10–11px`, `letter-spacing: .22–.26em`, `text-transform: uppercase`, `font-weight: 700`

**Carrega só 6 variantes** (otimização perf):
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
```

### Spacing & Layout

```css
--container:  1240px;
--radius-pill: 999px;
--radius-lg:  18px;
```

**Container helpers:**
```css
.container          { width: min(100% - 40px, var(--container)); margin: 0 auto; }
.container--narrow  { width: min(100% - 40px, 880px); }
```

**Padding padrão de seção:**
```css
padding: clamp(60px, 9vw, 110px) 0;
```

### Sombras

```css
--shadow-cta:    0 14px 30px -12px rgba(47, 59, 34, .55);
--shadow-expert: 0 30px 60px -24px rgba(43, 33, 20, .45);
```

**Glass card shadow (padrão Apple-style):**
```css
box-shadow:
  0 1px 0 rgba(255, 255, 255, 1) inset,
  0 40px 90px -32px rgba(0, 0, 0, .55);
```

---

## 2. Componentes Reutilizáveis

### Botão Primário (verde escuro)

```html
<a href="#oferta" class="btn btn--primary">
  <span>Texto do botão</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</a>
```

Classes existentes: `.btn`, `.btn--primary`, `.btn--block` (full-width).

### Eyebrow (label pequeno antes do título)

```html
<p class="eyebrow">Texto pequeno</p>
```

**Eyebrow com traços laterais** (padrão dos blocos refatorados):
```html
<p class="eyebrow custom__eyebrow">
  <span class="custom__eyebrow-line" aria-hidden="true"></span>
  Texto
  <span class="custom__eyebrow-line" aria-hidden="true"></span>
</p>
```

```css
.custom__eyebrow { display: inline-flex; align-items: center; gap: 14px; color: var(--c-accent); }
.custom__eyebrow-line {
  display: inline-block; width: 36px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--c-accent));
}
.custom__eyebrow-line:last-child {
  background: linear-gradient(90deg, var(--c-accent), transparent);
}
```

### Section Title (com gradient italic em)

```html
<h2 class="section-title">
  Texto normal <em>destaque italic</em>
</h2>
```

Versão moderna com gradient no em:
```css
.title em {
  font-style: italic;
  background: linear-gradient(165deg, #d39a5f, #b8763a 50%, #8b6f47);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
```

### Card padrão (branco com hover accent)

```html
<li class="custom__card">
  <span class="custom__num">01</span>
  <h3 class="custom__title">Título</h3>
  <p class="custom__desc">Descrição</p>
</li>
```

Estilo base reutilizado nos blocos VSL cards, Problema cards, Realidade cards:
```css
.custom__card {
  background: #ffffff;
  border: 1px solid rgba(184, 118, 58, .18);
  border-radius: 16px;
  padding: 22px 20px;
  box-shadow: 0 14px 32px -22px rgba(92, 74, 48, .35);
  transition: transform .4s ease, background-color .4s ease, border-color .4s ease;
}
.custom__card:hover {
  transform: translateY(-4px);
  background: var(--c-accent);
  border-color: transparent;
  color: #fff;
}
```

### Glass Card (Apple-style)

```css
.glass-card {
  background: rgba(255, 255, 255, .55);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, .9);
  border-radius: 22px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, .9) inset,
    0 40px 80px -36px rgba(92, 74, 48, .35);
}
```

### Badge / Tag pílula

```html
<span class="tag">
  <span class="tag-dot" aria-hidden="true"></span>
  Texto da tag
</span>
```

```css
.tag {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(184, 118, 58, .12);
  border: 1px solid rgba(184, 118, 58, .35);
  font-size: 10.5px; font-weight: 700;
  letter-spacing: .26em; text-transform: uppercase;
  color: var(--c-accent);
}
.tag-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--c-accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .4; }
}
```

---

## 3. Sistema de Animação `data-fly`

Sistema universal de scroll-reveal. Elementos com `data-fly` começam invisíveis e entram conforme o scroll. Voltam ao estado inicial se o usuário rolar pra trás.

### Uso

```html
<div data-fly="up">Vem de baixo</div>
<div data-fly="left">Vem da esquerda</div>
<div data-fly="right">Vem da direita</div>
<div data-fly="scale">Cresce do .92</div>
<div data-fly="zoom">Encolhe do 1.06</div>

<!-- Com stagger (cascata): parent define stagger, filhos data-fly automaticamente ganham --i -->
<ul data-stagger>
  <li data-fly="up">Item 1 (delay 0ms)</li>
  <li data-fly="up">Item 2 (delay 90ms)</li>
  <li data-fly="up">Item 3 (delay 180ms)</li>
</ul>
```

### CSS já implementado

```css
[data-fly] {
  opacity: 0;
  transition:
    opacity .85s cubic-bezier(.22, .68, .25, 1),
    transform .95s cubic-bezier(.22, .68, .25, 1);
  transition-delay: calc(var(--i, 0) * 90ms);
}
[data-fly="left"]   { transform: translate3d(-60px, 0, 0); }
[data-fly="right"]  { transform: translate3d( 60px, 0, 0); }
[data-fly="up"]     { transform: translate3d(0,  45px, 0); }
[data-fly="down"]   { transform: translate3d(0, -45px, 0); }
[data-fly="scale"]  { transform: scale(.92); }
[data-fly="zoom"]   { transform: scale(1.06); }
[data-fly].is-in    { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
```

JS já cuida do IntersectionObserver — `[data-fly]` é detectado automaticamente.

### Padrão por tipo de bloco

| Tipo | Estratégia |
|---|---|
| Section heading | `data-fly="up"` |
| Grid 2 colunas | esquerda `data-fly="left"`, direita `data-fly="right"` |
| Grid de cards | alternar `left/right` ou todos `up` com stagger |
| Quote/destaque | `data-fly="scale"` |
| CTA/card central | `data-fly="scale"` |
| Lista vertical | todos `left` com stagger |

---

## 4. Padrões de Reveal Especiais

### Reveal scroll-driven com texto grande (typewriter)

Pra contar uma narrativa onde cada frase aparece linha a linha conforme rola. Usado no fechamento do bloco Benefícios.

```html
<div class="reveal-line" data-reveal>
  <p>Imagine conseguir suas primeiras <em>aplicações</em>…</p>
</div>
<div class="reveal-line reveal-line--final" data-reveal>
  <p class="reveal-typed">
    <span class="word" style="--i:0">Palavra1</span>
    <span class="word" style="--i:1">Palavra2</span>
    <span class="reveal-typed__caret" aria-hidden="true"></span>
  </p>
</div>
```

Classes: `.reveal-line` (linha individual), `.reveal-line--final` (typewriter word-by-word + caret piscando). JS detecta `[data-reveal]` automaticamente.

### Hero photo com fade-out na base (mask)

Foto que dissolve no fundo (efeito orgânico, sem corte duro):

```css
.foto {
  -webkit-mask-image: linear-gradient(180deg, #000 72%, transparent 100%);
          mask-image: linear-gradient(180deg, #000 72%, transparent 100%);
  pointer-events: none; /* IMPORTANTE: evita bloquear taps de botões abaixo */
}
```

---

## 5. Padrão de Background Atmosférico

Toda seção light usa essa composição de gradients + orbs decorativos pra dar profundidade:

```css
.section {
  position: relative;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(244, 228, 193, .35), transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(184, 118, 58, .12), transparent 55%),
    linear-gradient(180deg, #fdfaf3 0%, #f6ecdb 100%);
  overflow: hidden;
  isolation: isolate;
}

/* Orbs adicionais (opcional, pra blocos premium) */
.section__atmos {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
}
.section__orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: .55;
}
.section__orb--a {
  top: 8%; left: -8%;
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(230, 206, 148, .8), transparent 70%);
}
```

Conteúdo da seção: `position: relative; z-index: 1;` pra ficar acima dos orbs.

---

## 6. Carrossel Infinito (ponta a ponta)

Padrão usado na galeria de unhas (`.metodo__gallery`) e galeria do curso (`.curso-gallery`).

### Regras críticas pra loop seamless

```css
.gallery-track {
  display: flex;
  width: max-content;
  /* SEM gap — usa margin-right em cada item */
  animation: scroll 40s linear infinite;
}
@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.gallery-item {
  flex-shrink: 0;
  margin: 0 18px 0 0; /* gap como margin pra metade da track == outra metade */
  /* ... resto do estilo do card ... */
}
```

### HTML: duplicar TODOS os items pra loop perfeito

```html
<div class="gallery-wrap">
  <div class="gallery-track">
    <!-- Set A (5 items reais) -->
    <figure class="gallery-item">...</figure>
    ...
    <!-- Set B (idênticos) -->
    <figure class="gallery-item" aria-hidden="true">...</figure>
    ...
  </div>
</div>
```

### Fade nas pontas (esconde corte visual)

```css
.gallery-wrap {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
}
```

### Pause on hover

```css
.gallery-wrap:hover .gallery-track {
  animation-play-state: paused;
}
```

---

## 7. Marquee X (faixa cruzada — divisor)

Padrão único usado entre Hero e VSL. Duas faixas rotacionadas formando um X.

```html
<section class="marquee" aria-label="...">
  <div class="marquee__lane marquee__lane--back" aria-hidden="true">
    <div class="marquee__track marquee__track--right" data-marquee-track>
      <ul class="marquee__group"><li class="marquee__item">Texto</li>...</ul>
    </div>
  </div>
  <div class="marquee__lane marquee__lane--front">
    <div class="marquee__track marquee__track--left" data-marquee-track>
      <ul class="marquee__group">...</ul>
    </div>
  </div>
</section>
```

**Chaves do design:**
- `.marquee` com `overflow: visible` e `margin: -60px 0` (sobrepõe os blocos adjacentes)
- `.marquee__lane` com `overflow: hidden` (texto contido na fita bege)
- Lanes com `left: -40%; right: -40%` (vazam pelas bordas)
- Ângulos baixos (`±2.5°` desktop, `±4°` mobile)
- Front com `box-shadow`, back com `filter: blur(3px)` e fully opaque
- `pointer-events: none` em tudo (decorativo, não bloqueia clicks)

JS duplica o `.marquee__group` automaticamente pro loop seamless.

---

## 8. Layouts de Bloco (HTML templates)

### A. Bloco centralizado simples

```html
<section class="bloco-x" id="bloco-x">
  <div class="container">
    <header class="bloco-x__head" data-fly="up">
      <h2 class="bloco-x__title">Título <em>destaque</em></h2>
      <p class="bloco-x__sub">Subtítulo opcional</p>
    </header>

    <ul class="bloco-x__grid" data-stagger>
      <li class="bloco-x__card" data-fly="up">...</li>
    </ul>

    <div class="bloco-x__cta" data-fly="up">
      <a href="#oferta" class="btn btn--primary">...</a>
    </div>
  </div>
</section>
```

### B. Split 2 colunas (foto + texto)

```html
<section class="bloco-y">
  <div class="container">
    <div class="bloco-y__grid">
      <div class="bloco-y__photo" data-fly="left">
        <img src="..." />
      </div>
      <div class="bloco-y__content" data-fly="right">
        <h2 class="bloco-y__title">...</h2>
        <p>...</p>
      </div>
    </div>
  </div>
</section>
```

```css
.bloco-y__grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
@media (max-width: 960px) {
  .bloco-y__grid { grid-template-columns: 1fr; gap: 40px; }
}
```

### C. Background image full-bleed com veil (estilo Transformação)

```html
<section class="bloco-z">
  <span class="bloco-z__veil" aria-hidden="true"></span>
  <div class="container">
    <div class="bloco-z__content" data-fly="right">
      <!-- conteúdo do lado direito; foto no bg ocupa esquerda naturalmente -->
    </div>
  </div>
</section>
```

```css
.bloco-z {
  background:
    url("imagem/foto.png") center center / cover no-repeat,
    #2a2118; /* fallback */
}
.bloco-z__veil {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(90deg,
    transparent 0%, transparent 40%,
    rgba(20, 14, 8, .55) 70%, rgba(20, 14, 8, .75) 100%);
}
```

---

## 9. Padrões Mobile

### Quando virar TUDO centralizado

```css
@media (max-width: 720px) {
  .bloco-x__head,
  .bloco-x__card,
  .bloco-x__content { text-align: center; }
  .bloco-x__card { align-items: center; }
}
```

### Grid responsive padrão

```css
.grid { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
```

### data-fly mobile (offsets menores)

Já implementado globalmente:
```css
@media (max-width: 960px) {
  [data-fly="left"]  { transform: translate3d(-40px, 0, 0); }
  [data-fly="right"] { transform: translate3d( 40px, 0, 0); }
}
@media (max-width: 520px) {
  /* Mobile: left/right viram up pra evitar overflow horizontal */
  [data-fly="left"], [data-fly="right"] { transform: translate3d(0, 24px, 0); }
}
```

### Galeria mobile (peek effect)

Em vez de muitas fotos pequenas, mostrar **1 grande com peek das vizinhas**:
```css
@media (max-width: 720px) {
  .gallery-item { width: 70vw; max-width: 320px; }
}
```

---

## 10. Performance (LCP/TBT — checklist)

### `<head>` obrigatório

```html
<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload da imagem LCP -->
<link rel="preload" as="image" href="imagem/hero.png" fetchpriority="high" />

<!-- Fontes — APENAS as variantes usadas -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" />
```

### Imagens — sempre

```html
<img
  src="imagem/foto.png"
  alt="Descrição"
  width="600"          <!-- evita CLS -->
  height="900"
  loading="lazy"        <!-- below-the-fold -->
  decoding="async"
/>

<!-- Para LCP image (above-the-fold) -->
<img ... loading="eager" fetchpriority="high" />

<!-- Para versão mobile/desktop diferente -->
<picture>
  <source media="(max-width: 720px)" srcset="imagem/foto-mobile.png" />
  <img src="imagem/foto-desktop.png" ... />
</picture>
```

### Scripts

```html
<script src="script.js" defer></script>
```

### Iframes (YouTube/Vimeo)

Carregar **on-demand** via IntersectionObserver. Adicionar `dns-prefetch`:
```html
<link rel="dns-prefetch" href="https://www.youtube.com" />
```

### Cache (Cloudflare `_headers` se for Pages)

```
/imagem/*
  Cache-Control: public, max-age=31536000, immutable

/styles.css
  Cache-Control: public, max-age=86400, must-revalidate
```

### Otimização de assets (fora do código)

- Converter PNGs grandes pra **WebP** ou **AVIF** (reduz 60–80% do tamanho)
- Comprimir JPGs com tools como TinyJPG, Squoosh
- Considerar lazy loading de iframes/videos com `loading="lazy"` (Chrome 122+)

---

## 11. Estrutura de Arquivos

```
projeto/
├── index.html                  # página única (landing page)
├── styles.css                  # todo o CSS (4000+ linhas — organizado por blocos)
├── script.js                   # JS vanilla (marquee, reveals, observers, depoimentos toggle)
├── wrangler.toml               # config Cloudflare Workers + Static Assets
├── _headers                    # cache + security headers (Pages-style)
├── _redirects                  # redirects (Pages-style)
├── package.json                # script "build" no-op pra CI passar
├── .gitignore
├── DESIGN_SYSTEM.md            # este arquivo
├── imagem/                     # backgrounds, logo, hero
├── fotosunha/                  # galeria de trabalhos
├── curso/                      # fotos das alunas/eventos
└── depoimentos/                # prints + vídeos de testimonials
```

---

## 12. Convenções de nomenclatura BEM

Todo bloco segue:
```
.bloco
.bloco__elemento
.bloco__elemento--modificador
```

Exemplos do projeto:
- `.hero`, `.hero__copy`, `.hero__cta`
- `.problema`, `.problema__card`, `.problema__card-num`
- `.depoimentos__card`, `.depoimentos__card--video`

Estados:
- `.is-in` (animação entrou)
- `.is-revealed` (reveal scroll-driven)
- `.is-expanded` (collapsible aberto)
- `.is-hidden` (oculto inicialmente)
- `.is-open` / `.is-playing` (estados de UI específicos)

---

## 13. Quick Reference — Snippets prontos

### Eyebrow + título + sub

```html
<header class="section__head" data-fly="up">
  <h2 class="section-title">
    Texto principal <em>destaque</em>
  </h2>
  <p class="section-sub">Subtítulo opcional</p>
</header>
```

### Grid de cards com stagger

```html
<ul class="cards-grid" data-stagger>
  <li class="card" data-fly="up">
    <span class="card__num">01</span>
    <h3 class="card__title">Título</h3>
    <p class="card__desc">Descrição</p>
  </li>
  <!-- ... -->
</ul>
```

### Quote/destaque editorial

```html
<blockquote class="quote" data-fly="scale">
  <span class="quote__mark" aria-hidden="true">"</span>
  <p class="quote__lead">Lead grande em italic serif</p>
  <p class="quote__text">Texto explicativo menor</p>
</blockquote>
```

### CTA finalizador

```html
<div class="cta-wrap" data-fly="up">
  <a href="#oferta" class="btn btn--primary">
    <span>Texto do CTA</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</div>
```

---

## 14. Princípios de Design

1. **Hierarquia tipográfica clara** — display serif italic > body sans > eyebrow uppercase tiny
2. **Accent #b8763a** em momentos pontuais (links em em, números, dots, borders)
3. **Glass + atmosphere** em blocos premium (oferta, expert, métodos) — backdrop-filter + orbs
4. **Movimento contido** — animações sutis (60s carrosséis lentos, transitions 0.4–1s, blur orgânico)
5. **Mobile centralizado** — tudo vira coluna única com text-align center
6. **Generosidade no respiro** — clamp paddings ~80px, gap ~16-18px, line-height ≥ 1.6
7. **Refinamento nos detalhes** — drop-shadows duplas, border-gradients, mask fades, hover lifts
