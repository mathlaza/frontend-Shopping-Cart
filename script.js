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

const loading = () => {
  const itemsSection = document.querySelector('.items');
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'Carregando...';
  itemsSection.appendChild(p);
};

const eraseLoading = () => document.querySelector('.loading').remove();

const cartTotal = () => {
  const htmlPrice = document.querySelector('.total-price');
  // Buscando todas as li's, que virão como objeto NodeList:
  const liRefreshed = document.querySelectorAll('.item__price__cart');
  
  // Convertendo o objeto NodeList para um array:
  const arrayLi = Array.from(liRefreshed);

  const total = arrayLi.reduce((acc, li) => {
    let accumulator = acc;
    // O innerHTML é uma string
    accumulator += +li.innerHTML.split(': ')[1];
    return accumulator;
  }, 0);
  htmlPrice.innerHTML = `Subtotal R$: ${total.toFixed(2)}`;
};

const emptyCart = () => {
  const btnCart = document.querySelector('.empty-cart');
  btnCart.addEventListener('click', () => {
    ol.innerHTML = '';
    cartTotal();
    saveCartItems(ol.innerHTML);
  });
};

const cartItemClickListener = ({ target }) => {
  // Remove a section do DOM:
  target.parentNode.remove();
  // Atualiza o cart com o que restou dentro da ol:
  saveCartItems(ol.innerHTML);
  cartTotal();
};

// Torna os itens do carrinho removíveis com clique:
const removeCartItems = () => {
  const sections = document.querySelectorAll('.item__remove');
  sections.forEach((cartProduct) => cartProduct.addEventListener('click', cartItemClickListener));
};

const createXButton = () => {
  const xRemove = document.createElement('img');
  xRemove.className = 'item__remove';
  xRemove.src = 'cross-removebg-preview.png';
  xRemove.addEventListener('click', cartItemClickListener);
  return xRemove;
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const div = document.createElement('div');
  div.className = 'div_cart';

  const section = document.createElement('section');
  section.className = 'cart__item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.innerText = name;

  section.appendChild(createCustomElement('span', 'item__price__cart', `R$: ${salePrice}`));

  div.appendChild(createProductImageElement(image));
  div.appendChild(section);
  div.appendChild(createXButton());

  return div;
};

const moveItemToCart = async (item) => {
  // Recupera o id de meu item:
  const itemId = getSkuFromProductItem(item);
  const { id, title, price, thumbnail } = await fetchItem(itemId);
  const itemToPutOnCart = {
    sku: id,
    name: title,
    salePrice: price,
    image: thumbnail,
  };

  ol.appendChild(createCartItemElement(itemToPutOnCart));

  saveCartItems(ol.innerHTML); // Salva o item no localStorage.
  cartTotal();
};

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  const div = document.createElement('div');
  div.className = 'div_item';
  div.innerHTML = 'R$:';
  div.appendChild(createCustomElement('span', 'item__price', salePrice));
  section.appendChild(div);
  const btn = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  btn.addEventListener('click', () => moveItemToCart(section));
  section.appendChild(btn);

  return section;
};

const listItems = async () => {
  loading();
  const itemsSection = document.querySelector('.items');
  const data = await fetchProducts('computador');
  const { results } = data;

  results.forEach(({ id, title, thumbnail, price }) => {
    const itemToRender = {
      sku: id,
      name: title,
      image: thumbnail,
      salePrice: price,
    };

    itemsSection.appendChild(createProductItemElement(itemToRender));
  });
  eraseLoading();
};

window.onload = () => {
  listItems();
  ol.innerHTML = getSavedCartItems();
  removeCartItems();
  cartTotal();
  emptyCart();
};
