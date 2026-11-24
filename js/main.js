(function () {
  'use strict';

  const c = (typeof config !== 'undefined') ? config : null;
  if (!c) { console.error('[site] O arquivo js/config.js não foi carregado.'); return; }

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (m) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  /* ---------- Dados derivados ---------- */
  const numero = String(c.whatsapp || '').replace(/\D/g, '');
  const wa = (msg) => 'https://wa.me/' + numero + '?text=' + encodeURIComponent(msg);
  const msgBase = (c.mensagemWhatsapp || 'Olá! Gostaria de fazer uma encomenda.').replace('{nome}', c.nome);
  const igUser = String(c.instagram || '').replace(/^@/, '').trim();
  const igUrl = 'https://www.instagram.com/' + encodeURIComponent(igUser) + '/';
  const mapaUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.endereco || '');
  const brl = (n) => typeof n === 'number'
    ? n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : String(n);
  const telFormatado = () => {
    const d = numero;
    if (d.length === 13 && d.startsWith('55')) return '(' + d.slice(2, 4) + ') ' + d.slice(4, 9) + '-' + d.slice(9);
    if (d.length === 12 && d.startsWith('55')) return '(' + d.slice(2, 4) + ') ' + d.slice(4, 8) + '-' + d.slice(8);
    return '+' + d;
  };
  const absoluta = (url) => { try { return new URL(url, location.href).href; } catch (e) { return url; } };
  const dias = Number((c.encomenda && c.encomenda.diasAntecedencia) || 0);

  /* ---------- Cores ---------- */
  const root = document.documentElement.style;
  if (c.cores) {
    root.setProperty('--principal', c.cores.principal);
    root.setProperty('--secundaria', c.cores.secundaria);
    root.setProperty('--texto', c.cores.texto);
    const tc = $('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', c.cores.secundaria);
  }

  /* ---------- SEO ---------- */
  const descSeo = (c.seo && c.seo.descricao) || c.descricao;
  const imgSeo = absoluta((c.seo && c.seo.imagemCompartilhamento) || c.hero.imagem);
  document.title = c.nome + ' | ' + c.slogan;
  const meta = (sel, v) => { const m = $(sel); if (m) m.setAttribute('content', v); };
  meta('meta[name="description"]', descSeo);
  meta('meta[property="og:title"]', c.nome + ' | ' + c.slogan);
  meta('meta[property="og:description"]', descSeo);
  meta('meta[property="og:image"]', imgSeo);
  $('#ldjson').textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: c.nome,
    description: descSeo,
    image: imgSeo,
    telephone: '+' + numero,
    address: { '@type': 'PostalAddress', streetAddress: c.endereco },
    sameAs: [igUrl]
  });

  /* ---------- Textos simples e links do WhatsApp ---------- */
  $$('[data-nome]').forEach((e) => { e.textContent = c.nome; });
  $$('[data-wa]').forEach((a) => {
    a.href = wa(msgBase); a.target = '_blank'; a.rel = 'noopener';
  });
  $('#slogan').textContent = c.slogan;
  $('#descricao').textContent = c.descricao;
  $('#antecedencia').textContent = dias > 0
    ? 'Encomendas com ' + dias + (dias === 1 ? ' dia' : ' dias') + ' de antecedência.' : '';
  $('#ano').textContent = new Date().getFullYear();
  const cred = $('#credito');
  if (c.credito) cred.textContent = c.credito; else cred.remove();

  const heroImg = $('#heroImg');
  heroImg.src = c.hero.imagem; heroImg.alt = c.hero.alt || c.nome;

  /* ---------- Produtos ---------- */
  const grid = $('#produtosGrid');
  const filtros = $('#filtros');
  const cats = (c.categorias || []).filter((k) => c.produtos.some((p) => p.categoria === k.id));
  const nomeCat = (id) => { const k = (c.categorias || []).find((x) => x.id === id); return k ? k.nome : ''; };
  let filtro = 'todos';

  filtros.innerHTML = [{ id: 'todos', nome: 'Todos' }].concat(cats).map((k) =>
    '<button type="button" class="chip" data-cat="' + esc(k.id) + '" aria-pressed="' + (k.id === filtro) + '">' + esc(k.nome) + '</button>').join('');

  const precoHtml = (p) =>
    (p.prefixo ? '<small>' + esc(p.prefixo) + '</small> ' : '') + esc(brl(p.preco)) +
    (p.nota ? ' <small>' + esc(p.nota) + '</small>' : '');

  function renderProdutos() {
    const lista = c.produtos.filter((p) => filtro === 'todos' || p.categoria === filtro);
    grid.innerHTML = lista.map((p) =>
      '<article class="card">' +
        '<div class="card__img"><img src="' + esc(p.imagem) + '" alt="' + esc(p.alt || p.nome) + '" width="640" height="800" loading="lazy" decoding="async"></div>' +
        '<div class="card__corpo">' +
          '<span class="card__cat">' + esc(nomeCat(p.categoria)) + '</span>' +
          '<h3>' + esc(p.nome) + '</h3>' +
          '<p>' + esc(p.descricao) + '</p>' +
          '<div class="card__rod"><span class="preco">' + precoHtml(p) + '</span>' +
          '<a class="pedir" href="' + wa('Olá! Gostaria de encomendar: ' + p.nome + '.') + '" target="_blank" rel="noopener">Pedir<span class="sr"> ' + esc(p.nome) + ' pelo WhatsApp</span></a></div>' +
        '</div></article>').join('');
  }
  filtros.addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    filtro = b.dataset.cat;
    $$('.chip', filtros).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderProdutos();
  });
  renderProdutos();

  /* ---------- Sobre ---------- */
  const s = c.sobre;
  $('#sobreTitulo').textContent = s.titulo;
  $('#sobreTextos').innerHTML = s.textos.map((t) => '<p>' + esc(t) + '</p>').join('');
  $('#sobreDestaques').innerHTML = (s.destaques || []).map((t) => '<li>' + esc(t) + '</li>').join('');
  const sImg = $('#sobreImg'); sImg.src = s.imagem; sImg.alt = s.alt || '';

  /* ---------- Galeria ---------- */
  $('#galeriaGrid').innerHTML = c.galeria.map((g) => {
    const f = typeof g === 'string' ? { imagem: g, alt: '' } : g;
    return '<figure><img src="' + esc(f.imagem) + '" alt="' + esc(f.alt || c.nome) + '" width="640" height="800" loading="lazy" decoding="async"></figure>';
  }).join('');

  /* ---------- Encomendas (formulário -> WhatsApp) ---------- */
  $('#encTitulo').textContent = (c.encomenda && c.encomenda.titulo) || 'Faça sua encomenda';
  $('#encTexto').textContent = (c.encomenda && c.encomenda.texto) || '';
  const selProd = $('#fProduto');
  selProd.innerHTML = '<option value="" disabled selected>Selecione</option>' +
    c.produtos.map((p) => '<option>' + esc(p.nome) + '</option>').join('') +
    '<option>Outro / personalizado</option>';

  const campoData = $('#fData');
  const min = new Date(); min.setDate(min.getDate() + dias);
  campoData.min = [min.getFullYear(), String(min.getMonth() + 1).padStart(2, '0'), String(min.getDate()).padStart(2, '0')].join('-');

  $('#formEnc').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.reportValidity()) return;
    const v = (n) => f.elements[n].value.trim();
    const linhas = ['Olá, ' + c.nome + '! Gostaria de fazer uma encomenda.', '', 'Nome: ' + v('nome'), 'Produto: ' + v('produto')];
    if (v('qtd')) linhas.push('Quantidade/tamanho: ' + v('qtd'));
    if (v('data')) linhas.push('Data desejada: ' + v('data').split('-').reverse().join('/'));
    if (v('obs')) linhas.push('Detalhes: ' + v('obs'));
    const url = wa(linhas.join('\n'));
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  });

  /* ---------- Contato ---------- */
  const igBtn = $('#igBtn'); igBtn.href = igUrl; igBtn.textContent = 'Instagram ' + c.instagram;
  const linha = (t, d) => '<div class="linha"><dt>' + t + '</dt><dd>' + d + '</dd></div>';
  $('#listaContato').innerHTML =
    linha('WhatsApp', '<a href="' + wa(msgBase) + '" target="_blank" rel="noopener">' + esc(telFormatado()) + '</a>') +
    linha('Instagram', '<a href="' + igUrl + '" target="_blank" rel="noopener">' + esc(c.instagram) + '</a>') +
    linha('Endereço', esc(c.endereco) + '<br><a href="' + mapaUrl + '" target="_blank" rel="noopener">Ver no mapa</a>') +
    linha('Horários', '<ul class="horarios">' + c.horarios.map((h) =>
      '<li><span>' + esc(h.dias) + '</span><span>' + esc(h.horas) + '</span></li>').join('') + '</ul>');

  /* ---------- Menu mobile e cabeçalho ---------- */
  const topo = $('#topo'), menu = $('#menu'), burger = $('.burger');
  const fechar = () => {
    menu.classList.remove('aberto'); burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu'); document.body.classList.remove('trava');
  };
  burger.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    burger.setAttribute('aria-expanded', String(aberto));
    burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('trava', aberto);
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) fechar(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) fechar(); });
  const aoRolar = () => topo.classList.toggle('rolou', window.scrollY > 24);
  window.addEventListener('scroll', aoRolar, { passive: true }); aoRolar();

  /* ---------- Seção ativa no menu ---------- */
  if ('IntersectionObserver' in window) {
    const links = $$('a', menu);
    const spy = new IntersectionObserver((itens) => {
      itens.forEach((i) => {
        if (!i.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === '#' + i.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((sec) => spy.observe(sec));

    /* ---------- Revelar ao rolar ---------- */
    const io = new IntersectionObserver((itens, obs) => {
      itens.forEach((i) => { if (i.isIntersecting) { i.target.classList.add('visivel'); obs.unobserve(i.target); } });
    }, { threshold: 0.12 });
    $$('.revelar').forEach((el) => io.observe(el));
  } else {
    $$('.revelar').forEach((el) => el.classList.add('visivel'));
  }

  /* ---------- Imagem que falhar vira um placeholder ---------- */
  document.addEventListener('error', (e) => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.fallback) {
      t.dataset.fallback = '1'; t.src = 'assets/img/placeholder.svg';
    }
  }, true);
})();
