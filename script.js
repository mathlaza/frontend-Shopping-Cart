// Recupera a ol do carrinho onde irão os itens escolhidos:
const ol = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = ({ target }) => {
    // Remove o item do DOM:
    target.remove();
    // Atualiza o cart com o que restou dentro da ol:
    saveCartItems(ol.innerHTML);
    // Atualiza o total-price:
    // allPrices();
};

// Torna os itens do carrinho removíveis com clique:
const removeCartItems = () => {
  const li = document.querySelectorAll('.cart__item');
  li.forEach((cartProduct) => cartProduct.addEventListener('click', cartItemClickListener));
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const moveItemToCart = async (item) => {
  // Recupera o id de meu item:
  const itemId = getSkuFromProductItem(item);
  const { id, title, price } = await fetchItem(itemId);
  const itemToPutOnCart = {
    sku: id,
    name: title,
    salePrice: price,
  };

  ol.appendChild(createCartItemElement(itemToPutOnCart));

  saveCartItems(ol.innerHTML); // Salva o item no localStorage.

  // allPrices(); // Atualiza o total-price.
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  btn.addEventListener('click', () => moveItemToCart(section));
  section.appendChild(btn);

  return section;
};

const listItems = async () => {
  // loadingMessage(); // Exibe mensagem de carregando.
  const itemsSection = document.querySelector('.items');
  const data = await fetchProducts('computador');
  const { results } = data;

  results.forEach(({ id, title, thumbnail }) => {
    const itemToRender = {
      sku: id,
      name: title,
      image: thumbnail,
    };

    itemsSection.appendChild(createProductItemElement(itemToRender));
  });
  // eraseLoadingMessage();
};

window.onload = () => {
  listItems();
};
