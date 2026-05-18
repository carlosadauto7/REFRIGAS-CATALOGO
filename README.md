# 🔵 Refrigas — Site Profissional

Catálogo online completo para a distribuidora de gás **Refrigas**, pronto para hospedar no **GitHub Pages**.

---

## 🗂️ Estrutura de arquivos

```
refrigas/
├── index.html          ← Página principal (não altere a estrutura)
├── css/
│   └── estilo.css      ← Todos os estilos visuais
└── js/
    ├── produtos.js     ← ⭐ ARQUIVO PRINCIPAL DE DADOS (edite aqui!)
    └── app.js          ← Lógica do site (não precisa alterar)
```

---

## 🚀 Como hospedar no GitHub Pages (passo a passo)

1. Crie uma conta em [github.com](https://github.com) (se não tiver)
2. Clique em **"New repository"** (novo repositório)
3. Nomeie como: `refrigas` (ou qualquer nome)
4. Deixe **público** e clique em **Create repository**
5. Faça upload de todos os arquivos da pasta `refrigas/`
6. Vá em **Settings → Pages**
7. Em **Source**, selecione **main branch** e clique **Save**
8. Aguarde 1-2 minutos e acesse: `https://SEU-USUARIO.github.io/refrigas`

---

## ➕ Como adicionar um novo produto

Abra o arquivo `js/produtos.js` e copie um bloco existente dentro do array `PRODUTOS`. Exemplo:

```javascript
{
  id: 7,                           // ← número único, sempre diferente
  nome: "Meu Novo Produto",
  categoria: "acessorio",          // botijao | acessorio | peca
  preco: 49.90,
  precoAntigo: 59.90,              // null se não tiver promoção
  destaque: false,                 // true para aparecer como destaque
  maisVendido: false,              // true para badge "Mais vendido"
  disponivel: true,
  descricaoCurta: "Descrição curta para o card.",
  descricaoCompleta: "Descrição longa para o modal de detalhes.",
  specs: [
    { label: "Peso", valor: "1 kg" },
    { label: "Material", valor: "Aço" },
  ],
  imagem: "images/meu-produto.jpg",    // ou URL externa
  imagens: [
    "images/meu-produto.jpg",
    "images/meu-produto-2.jpg",
  ],
  whatsapp: "5583999999999",
},
```

---

## 🖼️ Como trocar imagens

**Opção 1 — Usar imagens da pasta:**
1. Coloque o arquivo `.jpg` ou `.png` na pasta `images/`
2. No campo `imagem`, coloque: `"images/nome-do-arquivo.jpg"`

**Opção 2 — Usar URL externa (mais simples):**
1. Envie a foto para o Google Drive, Imgur ou similar
2. Copie o link público direto da imagem
3. Cole no campo `imagem`: `"https://link-da-imagem.jpg"`

---

## 💲 Como atualizar preços

No arquivo `js/produtos.js`, localize o produto pelo nome e altere o campo `preco`:

```javascript
preco: 90.00,        // ← novo preço
precoAntigo: 85.00,  // ← preço antigo (aparece riscado) ou null para remover
```

---

## 🏷️ Como criar uma nova categoria

No arquivo `js/produtos.js`, adicione na array `CATEGORIAS`:

```javascript
{ id: "servico", nome: "Serviços", icone: "🔧" },
```

E use `categoria: "servico"` nos produtos dessa categoria.

---

## ⚙️ Configurações gerais

No final do arquivo `js/produtos.js`, edite o objeto `CONFIG`:

```javascript
const CONFIG = {
  nome: "Refrigas",
  slogan: "Gás com qualidade...",
  whatsapp: "5583999999999",   // ← seu número (só dígitos, com DDI 55)
  instagram: "@refrigas",
  endereco: "João Pessoa — PB",
  horario: "Seg–Sáb: 7h às 19h",
  email: "contato@refrigas.com.br",
};
```

> **Dica WhatsApp:** o número deve ter DDI + DDD + número, sem espaços ou traços.
> Exemplo: Brasil (55) + DDD (83) + número (999999999) = `5583999999999`

---

## 🌙 Funcionalidades incluídas

| Recurso | Descrição |
|---|---|
| 🌙 Tema claro/escuro | Alternável pelo botão no header |
| 🛒 Carrinho | Persistido no localStorage |
| ❤️ Favoritos | Persistido no localStorage |
| 🔍 Busca em tempo real | Filtra por nome, descrição e categoria |
| 📂 Filtro por categoria | Botões acima do catálogo |
| 🔃 Ordenação | Por preço (menor/maior) e nome |
| 📱 Modal de produto | Com galeria de imagens e specs |
| 💬 WhatsApp direto | Mensagem pré-preenchida para cada produto |
| 📋 Pedido pelo carrinho | Resume todos os itens no WhatsApp |
| 📞 Formulário de contato | Redireciona para WhatsApp |
| 📌 WhatsApp flutuante | Sempre visível em todas as páginas |
| 📱 Responsivo | Mobile, tablet e desktop |

---

## 🆘 Dúvidas?

Entre em contato com o desenvolvedor ou busque apoio na comunidade GitHub Pages.
