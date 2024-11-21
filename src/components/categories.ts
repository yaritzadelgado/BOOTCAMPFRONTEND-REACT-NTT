import { Category } from '../interfaces/category';

export function displayCategories(categories: Category[]): void {
  const categorySelect = document.querySelector('select') as HTMLSelectElement;
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    // esto podr'ia estar en un util
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  });
}
