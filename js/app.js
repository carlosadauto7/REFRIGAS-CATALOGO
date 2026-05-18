/* ═══════════════════════════════════════════════════════════════
   REFRIGAS — JavaScript principal
═══════════════════════════════════════════════════════════════ */

// ─── Estado global ────────────────────────────────────────────
const estado = {
  filtroCategoria: "todos",
  buscaTermo: "",
  ordenacao: "padrao",
  carrinho: JSON.parse(localStorage.getItem("carrinho") || "[]"),
  favoritos: JSON.parse(localStorage.getItem("favoritos") || "[]"),
  tema: localStorage.getItem("tema") || "claro",
};

// ─── Inicialização ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  aplicarTema();
  renderizarCategorias();
  renderizarProdutos();
  renderizarCarrinho();
  bindEventos();
  animarScroll();
  atualizarBadgeCarrinho();
});

// ─── Tema claro/escuro ─────────────────────────────────────────
function aplicarTema() {
  document.documentElement.setAttribute("data-tema", estado.tema);
  const btn = document.getElementById("btnTema");
  if (btn) btn.textContent = estado.tema === "escuro" ? "☀️" : "🌙";
}

function alternarTema() {
  estado.tema = estado.tema === "claro" ? "escuro" : "claro";
  localStorage.setItem("tema", estado.tema);
  aplicarTema();
}

// ─── Renderizar categorias ─────────────────────────────────────
function renderizarCategorias() {
  const container = document.getElementById("filtrosCategorias");
  if (!container) return;
  container.innerHTML = CATEGORIAS.map(cat => `
    <button
      class="filtro-btn ${estado.filtroCategoria === cat.id ? "ativo" : ""}"
      onclick="filtrarCategoria('${cat.id}')">
      ${cat.icone} ${cat.nome}
    </button>
  `).join("");
}

function filtrarCategoria(id) {
  estado.filtroCategoria = id;
  renderizarCategorias();
  renderizarProdutos();
}

// ─── Renderizar produtos ───────────────────────────────────────
function renderizarProdutos() {
  const container = document.getElementById("produtosGrid");
  if (!container) return;

  let lista = [...PRODUTOS];

  // Filtro categoria
  if (estado.filtroCategoria !== "todos") {
    lista = lista.filter(p => p.categoria === estado.filtroCategoria);
  }

  // Busca
  if (estado.buscaTermo.trim()) {
    const t = estado.buscaTermo.toLowerCase();
    lista = lista.filter(p =>
      p.nome.toLowerCase().includes(t) ||
      p.descricaoCurta.toLowerCase().includes(t) ||
      p.categoria.toLowerCase().includes(t)
    );
  }

  // Ordenação
  if (estado.ordenacao === "menor")  lista.sort((a, b) => a.preco - b.preco);
  if (estado.ordenacao === "maior")  lista.sort((a, b) => b.preco - a.preco);
  if (estado.ordenacao === "nome")   lista.sort((a, b) => a.nome.localeCompare(b.nome));

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="sem-resultados">
        <div class="emoji">🔍</div>
        <p><strong>Nenhum produto encontrado</strong></p>
        <p>Tente outra busca ou categoria.</p>
      </div>`;
    return;
  }

  container.innerHTML = lista.map((p, i) => `
    <div class="produto-card" style="animation-delay:${i * 0.07}s">
      <div class="produto-img-wrap">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
        <div class="produto-badges">
          ${p.destaque   ? '<span class="badge badge-destaque">⭐ Destaque</span>' : ""}
          ${p.maisVendido ? '<span class="badge badge-vendido">🔥 Mais vendido</span>' : ""}
          ${p.precoAntigo ? '<span class="badge badge-promo">Promoção</span>' : ""}
        </div>
        <button
          class="btn-favorito ${estado.favoritos.includes(p.id) ? "ativo" : ""}"
          onclick="alternarFavorito(${p.id})"
          title="Favoritar">
          ${estado.favoritos.includes(p.id) ? "❤️" : "🤍"}
        </button>
      </div>
      <div class="produto-corpo">
        <span class="produto-cat">${nomCategoria(p.categoria)}</span>
        <h3 class="produto-nome">${p.nome}</h3>
        <p class="produto-desc">${p.descricaoCurta}</p>
        <div class="produto-preco-wrap">
          <span class="produto-preco">R$ ${formatarPreco(p.preco)}</span>
          ${p.precoAntigo ? `<span class="produto-preco-antigo">R$ ${formatarPreco(p.precoAntigo)}</span>` : ""}
        </div>
        <div class="produto-acoes">
          <button class="btn-sm btn-primario" onclick="abrirModal(${p.id})">
            🔍 Ver detalhes
          </button>
          <button class="btn-sm btn-whatsapp" onclick="comprarWhatsApp(${p.id})">
            💬 WhatsApp
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// ─── Modal de produto ──────────────────────────────────────────
let imagemAtualModal = 0;

function abrirModal(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  imagemAtualModal = 0;

  const modal = document.getElementById("modal");
  const conteudo = document.getElementById("modalConteudo");

  conteudo.innerHTML = `
    <div class="modal__topo">
      <button class="modal__fechar" onclick="fecharModal()">✕</button>
    </div>
    <div class="modal__corpo">
      <div class="modal__galeria">
        <div class="modal__img-principal">
          <img id="modalImgPrincipal" src="${p.imagens[0]}" alt="${p.nome}">
        </div>
        ${p.imagens.length > 1 ? `
        <div class="modal__miniaturas">
          ${p.imagens.map((img, i) => `
            <div class="modal__miniatura ${i === 0 ? "ativa" : ""}"
                 onclick="trocarImagemModal(${i}, '${img}', this)">
              <img src="${img}" alt="Imagem ${i+1}">
            </div>
          `).join("")}
        </div>` : ""}
      </div>
      <div class="modal__info">
        <p class="modal__cat">${nomCategoria(p.categoria)}</p>
        <h2 class="modal__nome">${p.nome}</h2>
        <div class="produto-preco-wrap" style="margin-bottom:.75rem">
          <span class="modal__preco">R$ ${formatarPreco(p.preco)}</span>
          ${p.precoAntigo ? `<span class="produto-preco-antigo">R$ ${formatarPreco(p.precoAntigo)}</span>` : ""}
        </div>
        <p class="modal__desc">${p.descricaoCompleta}</p>
        <div class="modal__specs">
          <p class="modal__specs-titulo">Especificações</p>
          ${p.specs.map(s => `
            <div class="spec-item">
              <span class="spec-label">${s.label}</span>
              <span class="spec-valor">${s.valor}</span>
            </div>
          `).join("")}
        </div>
        <div class="modal__btns">
          <button class="btn btn-whatsapp" onclick="comprarWhatsApp(${p.id})">
            💬 Pedir pelo WhatsApp
          </button>
          <button class="btn btn-primario" onclick="adicionarCarrinho(${p.id})">
            🛒 Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>`;

  modal.classList.add("aberto");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  document.getElementById("modal").classList.remove("aberto");
  document.body.style.overflow = "";
}

function trocarImagemModal(idx, src, el) {
  document.getElementById("modalImgPrincipal").src = src;
  document.querySelectorAll(".modal__miniatura").forEach(m => m.classList.remove("ativa"));
  el.classList.add("ativa");
}

// ─── Carrinho ──────────────────────────────────────────────────
function adicionarCarrinho(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;

  const existente = estado.carrinho.find(c => c.id === id);
  if (existente) {
    existente.qtd++;
  } else {
    estado.carrinho.push({ id: p.id, nome: p.nome, preco: p.preco, imagem: p.imagem, qtd: 1 });
  }

  salvarCarrinho();
  renderizarCarrinho();
  atualizarBadgeCarrinho();
  mostrarToast("✅ Produto adicionado ao carrinho!", "sucesso");
}

function removerCarrinho(id) {
  const idx = estado.carrinho.findIndex(c => c.id === id);
  if (idx > -1) {
    if (estado.carrinho[idx].qtd > 1) {
      estado.carrinho[idx].qtd--;
    } else {
      estado.carrinho.splice(idx, 1);
    }
  }
  salvarCarrinho();
  renderizarCarrinho();
  atualizarBadgeCarrinho();
}

function renderizarCarrinho() {
  const itens = document.getElementById("carrinhoItens");
  const total = document.getElementById("carrinhoTotal");
  if (!itens) return;

  if (estado.carrinho.length === 0) {
    itens.innerHTML = `
      <div class="carrinho-vazio">
        <div class="emoji">🛒</div>
        <p>Seu carrinho está vazio</p>
      </div>`;
    if (total) total.textContent = "R$ 0,00";
    return;
  }

  itens.innerHTML = estado.carrinho.map(item => `
    <div class="carrinho-item">
      <img class="carrinho-item-img" src="${item.imagem}" alt="${item.nome}">
      <div class="carrinho-item-info">
        <p class="carrinho-item-nome">${item.nome}</p>
        <p class="carrinho-item-preco">R$ ${formatarPreco(item.preco * item.qtd)}</p>
      </div>
      <div class="carrinho-item-qtd">
        <button class="qtd-btn" onclick="removerCarrinho(${item.id})">−</button>
        <span class="qtd-num">${item.qtd}</span>
        <button class="qtd-btn" onclick="adicionarCarrinho(${item.id})">+</button>
      </div>
    </div>
  `).join("");

  const soma = estado.carrinho.reduce((acc, c) => acc + c.preco * c.qtd, 0);
  if (total) total.textContent = `R$ ${formatarPreco(soma)}`;
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(estado.carrinho));
}

function atualizarBadgeCarrinho() {
  const badge = document.getElementById("carrinhoBadge");
  if (!badge) return;
  const total = estado.carrinho.reduce((acc, c) => acc + c.qtd, 0);
  badge.textContent = total;
  badge.classList.toggle("visivel", total > 0);
}

function finalizarPedidoCarrinho() {
  if (estado.carrinho.length === 0) return;
  const lista = estado.carrinho.map(c => `• ${c.nome} (x${c.qtd}) — R$ ${formatarPreco(c.preco * c.qtd)}`).join("\n");
  const total = estado.carrinho.reduce((acc, c) => acc + c.preco * c.qtd, 0);
  const msg = encodeURIComponent(`Olá, Refrigas! Gostaria de fazer o seguinte pedido:\n\n${lista}\n\n*Total: R$ ${formatarPreco(total)}*`);
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
}

// ─── WhatsApp direto ───────────────────────────────────────────
function comprarWhatsApp(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(`Olá, Refrigas! Tenho interesse no produto: *${p.nome}* — R$ ${formatarPreco(p.preco)}. Poderia me dar mais informações?`);
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
}

// ─── Favoritos ─────────────────────────────────────────────────
function alternarFavorito(id) {
  const idx = estado.favoritos.indexOf(id);
  if (idx > -1) {
    estado.favoritos.splice(idx, 1);
    mostrarToast("Removido dos favoritos", "info");
  } else {
    estado.favoritos.push(id);
    mostrarToast("❤️ Adicionado aos favoritos!", "sucesso");
  }
  localStorage.setItem("favoritos", JSON.stringify(estado.favoritos));
  renderizarProdutos();
}

// ─── Formulário de contato ─────────────────────────────────────
function enviarContato(e) {
  e.preventDefault();
  const nome  = document.getElementById("contNome").value;
  const email = document.getElementById("contEmail").value;
  const msg   = document.getElementById("contMsg").value;
  const texto = `Olá, Refrigas! Meu nome é *${nome}* (${email}).\n\n${msg}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank");
  mostrarToast("✅ Redirecionando para o WhatsApp!", "sucesso");
}

// ─── Toast ─────────────────────────────────────────────────────
function mostrarToast(msg, tipo = "") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const el = document.createElement("div");
  el.className = `toast ${tipo}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── Scroll suave para seção ────────────────────────────────────
function rolarPara(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Animação ao scroll ─────────────────────────────────────────
function animarScroll() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".vantagem-card, .sobre__visual, .sobre__texto").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    obs.observe(el);
  });
}

// ─── Eventos ────────────────────────────────────────────────────
function bindEventos() {
  // Header scroll
  window.addEventListener("scroll", () => {
    document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 40);
  });

  // Busca
  const buscaInput = document.getElementById("buscaInput");
  if (buscaInput) {
    buscaInput.addEventListener("input", e => {
      estado.buscaTermo = e.target.value;
      renderizarProdutos();
    });
  }

  // Ordenação
  const ordenar = document.getElementById("ordenarSelect");
  if (ordenar) {
    ordenar.addEventListener("change", e => {
      estado.ordenacao = e.target.value;
      renderizarProdutos();
    });
  }

  // Fechar modal ao clicar fora
  document.getElementById("modal")?.addEventListener("click", e => {
    if (e.target.id === "modal") fecharModal();
  });

  // ESC fecha modal
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") fecharModal();
  });

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navMenu");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => nav.classList.toggle("aberto"));
  }

  // Formulário contato
  const formContato = document.getElementById("formContato");
  if (formContato) formContato.addEventListener("submit", enviarContato);
}

// ─── Helpers ───────────────────────────────────────────────────
function formatarPreco(n) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function nomCategoria(id) {
  return CATEGORIAS.find(c => c.id === id)?.nome || id;
}
