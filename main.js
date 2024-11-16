// Función para obtener productos desde la API
async function fetchProducts() {
  try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      displayProducts(data.products); // Llama a la función para renderizar los productos
  } catch (error) {
      console.error('Error fetching products:', error);
  }
}

// Función para mostrar los productos dinámicamente en HTML
function displayProducts(products) {
  const productContainer = document.querySelector('.products');
  productContainer.innerHTML = ''; // Limpiar contenido previo

  if (products.length === 0) {
      // Mostrar mensaje si no hay productos
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
      const strong = document.createElement('strong');
      strong.textContent = 'Precio: ';
      price.appendChild(strong);
      price.append(`S/ ${product.price}`);


      const button = document.createElement('button');
      button.textContent = 'Agregar al carrito';
      button.classList.add('btn');

      button.addEventListener('click', () => incrementCart());

      productCard.append(img, title, description, price, button);
      productContainer.appendChild(productCard);
  });
}

// Función para incrementar el contador del carrito
function incrementCart() {
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = parseInt(cartCount.textContent) + 1;
}

// Función para obtener categorías desde la API
async function fetchCategories() {
  try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const categories = await response.json();
      displayCategories(categories); // Llama a la función para renderizar las categorías
  } catch (error) {
      console.error('Error fetching categories:', error);
  }
}

// Función para mostrar categorías en el desplegable
function displayCategories(categories) {
  const categorySelect = document.querySelector('select');
  categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(option);
  });
}

// Filtrar productos por categoría
async function filterByCategory(event) {
  const selectedCategory = event.target.value;
  try {
      if (selectedCategory === 'all') {
          fetchProducts(); // Cargar todos los productos si selecciona "Todos"
      } else {
          const response = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`);
          const data = await response.json();
          displayProducts(data.products);
      }
  } catch (error) {
      console.error('Error filtering products by category:', error);
  }
}

// Filtrar productos por búsqueda
function filterBySearch(event) {
  const searchQuery = event.target.value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      if (title.includes(searchQuery)) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}

// Inicializar eventos y cargar datos
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  fetchCategories();

  const categorySelect = document.querySelector('select');
  categorySelect.addEventListener('change', filterByCategory);

  const searchBar = document.querySelector('.search-bar input');
  searchBar.addEventListener('input', filterBySearch);
});
