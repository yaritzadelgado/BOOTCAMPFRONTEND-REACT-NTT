import { ProductResponse } from '../interfaces/product';

const BASE_URL = 'https://dummyjson.com/products';

export async function fetchProducts(): Promise<ProductResponse> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  return response.json();
}

export async function fetchProductsByCategory(category: string): Promise<ProductResponse> {
  const response = await fetch(`${BASE_URL}/category/${category}`);
  if (!response.ok) {
    throw new Error('Error fetching products by category');
  }
  return response.json();
}
