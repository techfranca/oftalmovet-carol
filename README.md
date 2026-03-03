# Oftalmovet Landing Page - Dra. Carolina Neumann

Landing page para teste A/B da clínica de oftalmologia veterinária.

## 📁 Estrutura do Projeto

```
oftalmovet-landing/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Todos os estilos
├── js/
│   └── main.js             # Funcionalidades JavaScript
└── assets/
    └── images/
        ├── carol_hero.avif         # Foto principal (hero)
        ├── carol_sozinha.avif      # Foto da autoridade
        ├── carol_com_cachorro.avif # Foto atendimento
        ├── favicon.svg             # Ícone do site
        ├── depoimentos/            # Fotos dos depoimentos
        │   ├── depoimento_arleu.avif
        │   ├── depoimento_bruno.avif
        │   ├── depoimento_felipe.avif
        │   └── depoimento_mariana.avif
        ├── estrutura/              # ⚠️ ADICIONAR fotos da estrutura (4 fotos mesmo tamanho)
        │   └── (foto1.jpg, foto2.jpg, foto3.jpg, foto4.jpg)
        └── atendimento/            # ⚠️ ADICIONAR fotos de atendimento (5 fotos)
            └── (foto1.jpg, foto2.jpg, foto3.jpg, foto4.jpg, foto5.jpg)
```

## 🖼️ Imagens Pendentes (PLACEHOLDERS)

As seguintes imagens precisam ser substituídas quando a cliente enviar:

### Seção "Atendimento dedicado" (Carrossel automático)
- `assets/images/atendimento/foto1.jpg` - Foto de atendimento 1
- `assets/images/atendimento/foto2.jpg` - Foto de atendimento 2
- `assets/images/atendimento/foto3.jpg` - Foto de atendimento 3
- `assets/images/atendimento/foto4.jpg` - Foto de atendimento 4

### Seção "Estrutura da clínica" (Grid 4 colunas uniformes)
- `assets/images/estrutura/foto1.jpg` - Foto estrutura 1
- `assets/images/estrutura/foto2.jpg` - Foto estrutura 2
- `assets/images/estrutura/foto3.jpg` - Foto estrutura 3
- `assets/images/estrutura/foto4.jpg` - Foto estrutura 4

### Seção Final (CTA)
- `assets/images/fachada.jpg` - Foto da fachada/clínica

## 🎨 Cores da Marca

```css
--color-primary: #395756    /* Verde escuro */
--color-accent: #C4B18A     /* Dourado */
```

## 🔤 Fontes

- **Display (títulos):** DM Serif Display
- **Body (textos):** DM Sans

## ✏️ Como Substituir os Placeholders

1. Adicione as imagens nas pastas corretas
2. No `index.html`, procure por `<!-- PLACEHOLDER:` e substitua:

```html
<!-- Antes -->
<div class="placeholder-image">
    <span>Foto Estrutura 1</span>
</div>

<!-- Depois -->
<img src="assets/images/estrutura/foto1.jpg" alt="Estrutura do consultório" loading="lazy">
```

**Para o carrossel de atendimento:** Lembre de duplicar as imagens no HTML para manter o loop infinito.

## 📱 Responsivo

A página está otimizada para:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (até 768px)

## 🔗 Links Importantes

- **WhatsApp:** (21) 99812-2301
- **Endereço:** Av. das Américas, 7907 - Bloco 2 Loja 119, Barra da Tijuca - RJ
- **Instagram:** @carolinaneumann_oftalmovet

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- JavaScript Vanilla (ES6+)
- Google Fonts (DM Serif Display + DM Sans)
- Ícones: Tabler Icons (inline SVG)

## 📈 Funcionalidades

- ✅ Carrossel de fotos automático (scroll infinito para esquerda)
- ✅ Carrossel de depoimentos com setas e dots
- ✅ Selo do Google no header com nota e avaliações
- ✅ FAQ accordion
- ✅ Botão flutuante WhatsApp com pulse animation
- ✅ Header sticky com efeito de sombra no scroll
- ✅ Grid uniforme na seção de estrutura (todas fotos mesmo tamanho)
- ✅ Ícones contextuais na seção "Como funciona"

## 🚀 Como usar

1. Extraia os arquivos
2. Substitua os placeholders pelas imagens reais
3. Ajuste o link do mapa do Google (se necessário)
4. Faça upload para o servidor

---

Desenvolvido para teste A/B - Franca Assessoria
