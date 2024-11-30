// src/services/api.test.tsx
import { fetchProducts, fetchCategories } from './api';
import { Product } from '../types/Product';

// Mock del global fetch
global.fetch = jest.fn();

describe('API functions', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Espía el console.error para evitar ruido en los tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  afterAll(() => {
    // Restaurar console.error después de las pruebas
    consoleErrorSpy.mockRestore();
  });

  test('fetchProducts devuelve una lista de productos', async () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Producto 1', description: 'Descripción 1', price: 100, category: 'Categoría 1', thumbnail: 'img1.jpg', cantidad: 1 },
      { id: 2, title: 'Producto 2', description: 'Descripción 2', price: 200, category: 'Categoría 2', thumbnail: 'img2.jpg', cantidad: 1 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: mockProducts }),
    });

    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  test('fetchCategories devuelve una lista de categorías', async () => {
    const mockCategories = ['Categoría 1', 'Categoría 2'];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    const categories = await fetchCategories();
    expect(categories).toEqual(mockCategories);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/categories');
  });

  test('fetchProducts lanza un error si la API falla', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchProducts()).rejects.toThrow('No se pudieron obtener los productos. Inténtalo más tarde.');
  });

  test('fetchCategories lanza un error si la API falla', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchCategories()).rejects.toThrow('No se pudieron obtener las categorías. Inténtalo más tarde.');
  });
});

