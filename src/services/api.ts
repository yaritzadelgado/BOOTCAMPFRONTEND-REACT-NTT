import { Product } from '../types/Product'; 
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // la url base podr'ia estar en otro archivo para reutilizarlo y no repetirlo
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('No se pudieron obtener los productos. Inténtalo más tarde.');
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('No se pudieron obtener las categorías. Inténtalo más tarde.');
  }
};
