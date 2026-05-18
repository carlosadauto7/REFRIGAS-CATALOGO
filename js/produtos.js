// ═══════════════════════════════════════════════════════════════
//  REFRIGAS — Base de Produtos
//  Para adicionar um produto, copie um objeto e edite os campos.
//  Imagens: coloque na pasta /images e use o nome do arquivo.
// ═══════════════════════════════════════════════════════════════

const PRODUTOS = [
  {
    id: 1,
    nome: "Gás GLP P13 — 13kg",
    categoria: "botijao",
    preco: 85.00,
    precoAntigo: null,
    destaque: true,
    maisVendido: true,
    disponivel: true,
    descricaoCurta: "Botijão de gás 13kg para uso residencial. Entrega rápida na sua porta.",
    descricaoCompleta: "O botijão GLP P13 é o mais utilizado nas residências brasileiras. Ideal para fogões domésticos, aquecedores e churrasqueiras. Produto de alta qualidade com procedência garantida. Entregamos em sua casa com segurança e rapidez.",
    specs: [
      { label: "Peso líquido", valor: "13 kg" },
      { label: "Tipo", valor: "GLP — Gás Liquefeito de Petróleo" },
      { label: "Uso", valor: "Residencial" },
      { label: "Validade", valor: "Conforme data gravada no botijão" },
    ],
    imagem: "https://placehold.co/600x600/1B3A6B/FFFFFF?text=GLP+P13",
    imagens: [
      "https://placehold.co/600x600/1B3A6B/FFFFFF?text=GLP+P13",
      "https://placehold.co/600x600/2563EB/FFFFFF?text=Lateral",
      "https://placehold.co/600x600/0EA5E9/FFFFFF?text=Detalhe",
    ],
    whatsapp: "5583999999999",
  },
  {
    id: 2,
    nome: "Gás GLP P20 — 20kg",
    categoria: "botijao",
    preco: 130.00,
    precoAntigo: 145.00,
    destaque: true,
    maisVendido: false,
    disponivel: true,
    descricaoCurta: "Botijão de 20kg ideal para estabelecimentos comerciais e famílias grandes.",
    descricaoCompleta: "O botijão GLP P20 é indicado para uso em bares, lanchonetes, pequenos restaurantes e residências com alto consumo de gás. Maior autonomia, economia e praticidade. Entrega com segurança por nossa equipe especializada.",
    specs: [
      { label: "Peso líquido", valor: "20 kg" },
      { label: "Tipo", valor: "GLP — Gás Liquefeito de Petróleo" },
      { label: "Uso", valor: "Comercial / Residencial intensivo" },
      { label: "Validade", valor: "Conforme data gravada no botijão" },
    ],
    imagem: "https://placehold.co/600x600/047857/FFFFFF?text=GLP+P20",
    imagens: [
      "https://placehold.co/600x600/047857/FFFFFF?text=GLP+P20",
      "https://placehold.co/600x600/059669/FFFFFF?text=Lateral",
    ],
    whatsapp: "5583999999999",
  },
  {
    id: 3,
    nome: "Gás GLP P45 — 45kg",
    categoria: "botijao",
    preco: 280.00,
    precoAntigo: null,
    destaque: false,
    maisVendido: false,
    disponivel: true,
    descricaoCurta: "Botijão industrial de 45kg para restaurantes, padarias e indústrias.",
    descricaoCompleta: "O botijão GLP P45 é a solução ideal para negócios com alto consumo de gás, como restaurantes, padarias, lavanderias e indústrias. Alta capacidade e economia de escala. Instalação e entrega feita por nossa equipe técnica.",
    specs: [
      { label: "Peso líquido", valor: "45 kg" },
      { label: "Tipo", valor: "GLP — Gás Liquefeito de Petróleo" },
      { label: "Uso", valor: "Industrial / Comercial" },
      { label: "Validade", valor: "Conforme data gravada no botijão" },
    ],
    imagem: "https://placehold.co/600x600/7C3AED/FFFFFF?text=GLP+P45",
    imagens: [
      "https://placehold.co/600x600/7C3AED/FFFFFF?text=GLP+P45",
    ],
    whatsapp: "5583999999999",
  },
  {
    id: 4,
    nome: "Mangueira Reguladora",
    categoria: "acessorio",
    preco: 35.00,
    precoAntigo: null,
    destaque: false,
    maisVendido: true,
    disponivel: true,
    descricaoCurta: "Mangueira reguladora de alta pressão com certificação INMETRO.",
    descricaoCompleta: "Mangueira reguladora para gás GLP com certificação INMETRO. Fabricada em material resistente e flexível, proporciona segurança máxima na conexão entre o botijão e o fogão. Comprimento padrão de 1,2m.",
    specs: [
      { label: "Comprimento", valor: "1,20 m" },
      { label: "Certificação", valor: "INMETRO" },
      { label: "Material", valor: "PVC Reforçado" },
      { label: "Compatível com", valor: "P13, P20, P45" },
    ],
    imagem: "https://placehold.co/600x600/B45309/FFFFFF?text=Mangueira",
    imagens: [
      "https://placehold.co/600x600/B45309/FFFFFF?text=Mangueira",
    ],
    whatsapp: "5583999999999",
  },
  {
    id: 5,
    nome: "Registro de Gás",
    categoria: "acessorio",
    preco: 25.00,
    precoAntigo: null,
    destaque: false,
    maisVendido: false,
    disponivel: true,
    descricaoCurta: "Registro regulador de pressão com válvula de segurança integrada.",
    descricaoCompleta: "Registro regulador de pressão para gás GLP com válvula de segurança integrada. Produto certificado pelo INMETRO, garante fluxo constante e seguro de gás. Fácil instalação e manutenção.",
    specs: [
      { label: "Pressão de saída", valor: "28 mbar" },
      { label: "Certificação", valor: "INMETRO" },
      { label: "Material", valor: "Latão e Alumínio" },
      { label: "Compatível com", valor: "P13, P20, P45" },
    ],
    imagem: "https://placehold.co/600x600/BE123C/FFFFFF?text=Registro",
    imagens: [
      "https://placehold.co/600x600/BE123C/FFFFFF?text=Registro",
    ],
    whatsapp: "5583999999999",
  },
  {
    id: 6,
    nome: "Válvula P13",
    categoria: "peca",
    preco: 18.00,
    precoAntigo: 22.00,
    destaque: false,
    maisVendido: false,
    disponivel: true,
    descricaoCurta: "Válvula de reposição para botijão P13. Original e certificada.",
    descricaoCompleta: "Válvula de reposição para botijão GLP P13. Peça original, certificada e homologada para uso seguro. Indicada para substituição em botijões com válvula danificada ou com vazamento.",
    specs: [
      { label: "Compatível com", valor: "Botijão P13" },
      { label: "Material", valor: "Latão" },
      { label: "Certificação", valor: "INMETRO" },
      { label: "Garantia", valor: "6 meses" },
    ],
    imagem: "https://placehold.co/600x600/0F766E/FFFFFF?text=Válvula",
    imagens: [
      "https://placehold.co/600x600/0F766E/FFFFFF?text=Válvula",
    ],
    whatsapp: "5583999999999",
  },
];

// Categorias do catálogo
const CATEGORIAS = [
  { id: "todos",    nome: "Todos os Produtos", icone: "🏪" },
  { id: "botijao",  nome: "Botijões",          icone: "🔵" },
  { id: "acessorio",nome: "Acessórios",        icone: "🔧" },
  { id: "peca",     nome: "Peças",             icone: "⚙️" },
];

// Configurações gerais da loja
const CONFIG = {
  nome: "Refrigas",
  slogan: "Gás com qualidade, segurança e entrega na sua porta.",
  whatsapp: "5583999999999",
  instagram: "@refrigas",
  endereco: "João Pessoa — PB",
  horario: "Seg–Sáb: 7h às 19h  |  Dom: 8h às 14h",
  email: "contato@refrigas.com.br",
};
