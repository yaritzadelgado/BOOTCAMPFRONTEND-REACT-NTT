//main.ts.//
import './style.css';
import { fetchProducts, fetchProductsByCategory } from './services/products';
import { fetchCategories } from './services/categories';
import { displayProducts } from './components/products';
import { displayCategories } from './components/categories';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Obtener productos
    const productsResponse = await fetchProducts();
    displayProducts(productsResponse.products);

     // Obtener categorías
     const categoriesResponse = await fetchCategories();
     // Ahora, categoriesResponse debe ser un array de categorías
     displayCategories(categoriesResponse);
 
   } catch (error) {
     console.error('Error initializing app:', error);
   }
  // Configurar el evento para el filtro por categorías
  const categorySelect = document.querySelector('select') as HTMLSelectElement;
  categorySelect.addEventListener('change', async (event) => {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory === 'all') {
      const allProductsResponse = await fetchProducts();
      displayProducts(allProductsResponse.products);
    } else {
      // Usar la función fetchProductsByCategory para obtener productos filtrados
      const filteredProductsResponse = await fetchProductsByCategory(selectedCategory);
      displayProducts(filteredProductsResponse.products);
    }
  });

  // Configurar el evento para la búsqueda en tiempo real
  const searchBar = document.querySelector('.search-bar input') as HTMLInputElement;
  searchBar.addEventListener('input', (event) => {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
      const title = card.querySelector('h2')?.textContent?.toLowerCase() || '';
      (card as HTMLElement).style.display = title.includes(searchQuery) ? 'block' : 'none';
    });
  });
});
