/* ==========================================================
   CONFIGURAÇÃO DO SITE
   Edite apenas este arquivo para personalizar o site inteiro.
   Veja o README.md para o passo a passo.
   ========================================================== */

const config = {
  // ---------- Identidade ----------
  nome: "Doce Encanto",
  slogan: "Momentos especiais merecem doces especiais",
  descricao:
    "Bolos, doces finos e tortas feitos à mão, com ingredientes selecionados e decoração sob medida para cada comemoração.",

  // ---------- Contato ----------
  // WhatsApp: 55 + DDD + número, somente números (sem espaços, traços ou parênteses)
  whatsapp: "5511999999999",
  instagram: "@doceencanto",
  endereco: "Rua das Flores, 123 - Jardim Primavera, São Paulo - SP",
  horarios: [
    { dias: "Segunda a sexta", horas: "9h às 18h" },
    { dias: "Sábado", horas: "9h às 14h" },
    { dias: "Domingo e feriados", horas: "Somente retirada agendada" }
  ],

  // Mensagem enviada no WhatsApp pelos botões do site ({nome} vira o nome da confeitaria)
  mensagemWhatsapp: "Olá, {nome}! Vim pelo site e gostaria de fazer uma encomenda.",

  // ---------- Cores ----------
  cores: {
    principal: "#D98C9A",   // botões e destaques
    secundaria: "#FFF5F2",  // fundo do site
    texto: "#49312F"        // textos e seções escuras
  },

  // ---------- Imagens principais ----------
  hero: { imagem: "assets/img/bolo-rosa.svg", alt: "Bolo decorado com frutas vermelhas" },

  // ---------- Sobre nós ----------
  sobre: {
    titulo: "Feito à mão, com tempo e carinho",
    textos: [
      "A Doce Encanto nasceu na cozinha de casa, com receitas de família e uma vontade grande de adoçar os dias das pessoas. Hoje, cada encomenda ainda é produzida artesanalmente, uma de cada vez.",
      "Usamos manteiga, chocolate de verdade e frutas frescas, sem corantes artificiais. O resultado é um doce bonito de ver e ainda melhor de comer."
    ],
    destaques: [
      "Ingredientes frescos e selecionados",
      "Decoração personalizada para a sua festa",
      "Retirada no local ou entrega combinada"
    ],
    imagem: "assets/img/macaron-rosa.svg",
    alt: "Caixa de macarons coloridos"
  },

  // ---------- Encomendas ----------
  encomenda: {
    diasAntecedencia: 3, // também define a data mínima do formulário
    titulo: "Encomende do seu jeito",
    texto: "Bolos para festas, caixas de doces para presentear ou brigadeiros para o evento. Conte o que você imagina e a gente cuida do resto."
  },

  // ---------- Categorias (a ordem aqui é a ordem dos botões de filtro) ----------
  categorias: [
    { id: "bolos", nome: "Bolos" },
    { id: "doces", nome: "Doces" },
    { id: "brigadeiros", nome: "Brigadeiros" },
    { id: "cupcakes", nome: "Cupcakes" },
    { id: "tortas", nome: "Tortas" }
  ],

  // ---------- Produtos ----------
  // preco: número (ex.: 189) ou texto (ex.: "Sob consulta")
  // prefixo e nota são opcionais (ex.: "a partir de" / "unidade")
  produtos: [
    { categoria: "bolos", nome: "Bolo Rosa de Frutas Vermelhas", descricao: "Massa de baunilha, creme de leite fresco e geleia de frutas vermelhas, finalizado com frutas frescas.", preco: 189, prefixo: "a partir de", nota: "1,5 kg", imagem: "assets/img/bolo-rosa.svg" },
    { categoria: "bolos", nome: "Bolo Trufado de Chocolate", descricao: "Massa de chocolate meio amargo, recheio de brigadeiro gourmet e cobertura de ganache.", preco: 210, prefixo: "a partir de", nota: "1,5 kg", imagem: "assets/img/bolo-chocolate.svg" },
    { categoria: "doces", nome: "Caixa de Macarons", descricao: "Oito macarons de sabores sortidos, em caixa para presente.", preco: 72, nota: "caixa", imagem: "assets/img/macaron-rosa.svg" },
    { categoria: "doces", nome: "Macarons de Chocolate e Café", descricao: "Casca crocante e recheio cremoso de ganache de chocolate com café.", preco: 78, nota: "caixa com 8", imagem: "assets/img/macaron-cafe.svg" },
    { categoria: "brigadeiros", nome: "Brigadeiro Tradicional", descricao: "Chocolate belga, leite condensado e granulado, enrolado na hora.", preco: 3.5, nota: "unidade", imagem: "assets/img/brigadeiro-tradicional.svg" },
    { categoria: "brigadeiros", nome: "Brigadeiro de Leite Ninho", descricao: "Cremoso, com leite em pó e confeitos delicados. O queridinho das festas.", preco: 4, nota: "unidade", imagem: "assets/img/brigadeiro-ninho.svg" },
    { categoria: "cupcakes", nome: "Cupcake de Morango", descricao: "Massa fofinha de baunilha, recheio de geleia de morango e chantilly.", preco: 9.5, nota: "unidade", imagem: "assets/img/cupcake-morango.svg" },
    { categoria: "cupcakes", nome: "Cupcake de Baunilha", descricao: "Massa amanteigada com frosting de baunilha e confeitos.", preco: 8.5, nota: "unidade", imagem: "assets/img/cupcake-baunilha.svg" },
    { categoria: "tortas", nome: "Torta de Morango", descricao: "Massa sablée, creme de confeiteiro e morangos frescos com glacê brilhante.", preco: 98, nota: "inteira", imagem: "assets/img/torta-morango.svg" },
    { categoria: "tortas", nome: "Torta de Limão Siciliano", descricao: "Creme cítrico sobre massa crocante de manteiga, com toque de raspas.", preco: 89, nota: "inteira", imagem: "assets/img/torta-limao.svg" }
  ],

  // ---------- Galeria (lista de fotos; pode usar quantas quiser) ----------
  galeria: [
    { imagem: "assets/img/bolo-rosa.svg", alt: "Bolo rosa com frutas vermelhas" },
    { imagem: "assets/img/cupcake-morango.svg", alt: "Cupcake de morango" },
    { imagem: "assets/img/torta-morango.svg", alt: "Torta de morango" },
    { imagem: "assets/img/macaron-rosa.svg", alt: "Macarons coloridos" },
    { imagem: "assets/img/brigadeiro-tradicional.svg", alt: "Brigadeiros tradicionais" },
    { imagem: "assets/img/bolo-chocolate.svg", alt: "Bolo trufado de chocolate" },
    { imagem: "assets/img/cupcake-baunilha.svg", alt: "Cupcake de baunilha" },
    { imagem: "assets/img/torta-limao.svg", alt: "Torta de limão siciliano" },
    { imagem: "assets/img/brigadeiro-ninho.svg", alt: "Brigadeiros de leite ninho" },
    { imagem: "assets/img/macaron-cafe.svg", alt: "Macarons de chocolate e café" }
  ],

  // ---------- SEO ----------
  seo: {
    descricao: "Doce Encanto: confeitaria artesanal em São Paulo. Bolos, doces finos, brigadeiros, cupcakes e tortas sob encomenda.",
    imagemCompartilhamento: "assets/img/bolo-rosa.svg" // ideal: JPG 1200x630 (veja o README)
  },

  // ---------- Rodapé ----------
  // Deixe vazio ("") para esconder o crédito
  credito: "Site desenvolvido por Seu Nome"
};
