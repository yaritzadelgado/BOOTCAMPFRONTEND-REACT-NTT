import { Product } from '../interfaces/product';

export function displayProducts(products: Product[]): void {
  const productContainer = document.querySelector('.products') as HTMLElement;
  productContainer.innerHTML = '';

  if (products.length === 0) {
    const noProductsMessage = document.createElement('p');
    noProductsMessage.textContent = 'No hay productos disponibles.';
    productContainer.appendChild(noProductsMessage);
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    img.classList.add('product-image');

    const title = document.createElement('h2');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');

    price.innerHTML = `<strong>Precio:</strong> S/ ${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.classList.add('btn');

    button.addEventListener('click', incrementCart);

    productCard.append(img, title, description, price, button);
    productContainer.appendChild(productCard);
  });
}

function incrementCart(): void {
  const cartCount = document.querySelector('.cart-count') as HTMLElement;
  cartCount.textContent = (parseInt(cartCount.textContent || '0') + 1).toString();
}
