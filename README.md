# Site para Confeitaria (modelo personalizável)

Site em HTML, CSS e JavaScript puros, sem banco de dados e sem serviços pagos. Toda a personalização é feita em **um único arquivo: `js/config.js`**. O restante do site se atualiza sozinho.

## Estrutura

```
index.html          página principal (estrutura)
css/style.css       visual do site
js/config.js        TUDO que você precisa editar
js/main.js          lógica (não precisa mexer)
assets/img/         imagens (troque pelas fotos reais)
.nojekyll           necessário para o GitHub Pages
```

## Ver o site no seu computador

Abra o `index.html` no navegador (duplo clique). Se preferir um servidor local: `python3 -m http.server` na pasta e acesse `http://localhost:8000`.

## O que editar no `config.js`

| Campo | O que muda |
|---|---|
| `nome`, `slogan`, `descricao` | Título do início, nome no menu/rodapé e texto de apresentação |
| `whatsapp` | Número no formato `55` + DDD + número, só dígitos (ex.: `5511999999999`). Todos os botões e o formulário usam este número |
| `instagram` | Usuário com `@`. O link do botão é gerado automaticamente |
| `endereco` | Endereço exibido; o botão "Ver no mapa" abre o Google Maps com ele |
| `horarios` | Lista de linhas `{ dias, horas }`. Adicione ou remova linhas à vontade |
| `mensagemWhatsapp` | Mensagem pronta dos botões gerais (`{nome}` vira o nome da confeitaria) |
| `cores` | `principal` (botões e destaques), `secundaria` (fundo), `texto` (textos e seção escura). As demais tonalidades são calculadas |
| `hero`, `sobre` | Foto de destaque, textos e foto da seção "Sobre nós" |
| `encomenda` | Título, texto e `diasAntecedencia` (define a data mínima do formulário) |
| `categorias` | Botões de filtro dos produtos (`id` e `nome`) |
| `produtos` | Cada produto: `categoria`, `nome`, `descricao`, `preco`, `imagem` e, opcionalmente, `prefixo` ("a partir de") e `nota` ("unidade") |
| `galeria` | Lista de fotos da galeria |
| `seo` | Descrição para o Google e imagem de compartilhamento |
| `credito` | Linha no rodapé (deixe `""` para esconder) |

### Adicionar ou remover um produto

Copie uma linha da lista `produtos`, altere os campos e use um `categoria` que exista em `categorias`. Para remover, apague a linha. O formulário de encomendas e os filtros se ajustam sozinhos.

### Criar uma categoria nova

Adicione `{ id: "salgados", nome: "Salgados" }` em `categorias` e use `categoria: "salgados"` nos produtos. Categorias sem produtos não aparecem.

## Trocar as imagens

As imagens incluídas são **ilustrações de exemplo**. Para usar fotos reais:

1. Coloque as fotos em `assets/img/` (JPG ou WebP).
2. Troque o caminho no `config.js` (ex.: `imagem: "assets/img/bolo-festa.jpg"`).

Recomendações: formato vertical 4:5 (ex.: 800 x 1000 px), até 150 KB cada. Use [squoosh.app](https://squoosh.app) (gratuito) para reduzir o tamanho. Imagens que não carregarem são substituídas por um fundo neutro, sem quebrar o layout.

## Publicar no GitHub Pages (gratuito)

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (o `index.html` deve ficar na raiz).
2. Em **Settings > Pages**, em *Build and deployment*, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Aguarde alguns minutos. O endereço será `https://seu-usuario.github.io/nome-do-repositorio/`.

Domínio próprio: em **Settings > Pages > Custom domain**, informe o domínio e aponte o DNS conforme as instruções do GitHub.

## SEO básico incluído

- Título, descrição e `lang="pt-BR"` gerados a partir do `config.js`
- Tags Open Graph para pré-visualização em WhatsApp e redes sociais
- Dados estruturados (`schema.org/Bakery`) com nome, telefone, endereço e Instagram
- Imagens com `alt`, `width`/`height` e carregamento preguiçoso

Para um compartilhamento ideal no WhatsApp/Instagram, use em `seo.imagemCompartilhamento` um **JPG 1200 x 630 px** (as redes sociais não exibem SVG). Se publicar em domínio próprio, considere acrescentar uma tag `<link rel="canonical">` no `index.html`.

## Checklist para entregar a um cliente

- [ ] Trocar nome, slogan, descrição, endereço e horários
- [ ] Conferir o número de WhatsApp (clique no botão e veja se abre a conversa certa)
- [ ] Trocar as fotos por fotos reais dos produtos
- [ ] Ajustar produtos e preços
- [ ] Ajustar as cores à identidade da marca
- [ ] Atualizar `credito` e `seo`
- [ ] Publicar e testar no celular

## Observações

- O formulário de encomendas não envia dados para servidor nenhum: ele monta a mensagem e abre o WhatsApp do cliente.
- As fontes (Fraunces e Figtree) vêm do Google Fonts, gratuito. Sem internet, o site usa fontes do sistema.
