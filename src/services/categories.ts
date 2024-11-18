
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) {
    throw new Error('Error fetching categories');
  }
  return response.json(); // Debería retornar un array de categorías
}
