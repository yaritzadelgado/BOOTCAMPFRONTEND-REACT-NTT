import { render, screen, waitFor, act } from '@testing-library/react';
import { Product } from '../types/Product';
import ProductList from './ProductList';


jest.mock('../services/api', () => ({
  fetchProducts: jest.fn(),
}));

const mockFetchProducts = require('../services/api').fetchProducts;

describe('ProductList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Muestra los productos correctamente después de cargar', async () => {
    
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Producto 1',
        description: 'Descripción 1',
        price: 100,
        category: 'Categoría 1',
        thumbnail: 'https://via.placeholder.com/150',
        cantidad: 1,
      },
      {
        id: 2,
        title: 'Producto 2',
        description: 'Descripción 2',
        price: 200,
        category: 'Categoría 2',
        thumbnail: 'https://via.placeholder.com/150',
        cantidad: 1,
      },
    ];

   
    mockFetchProducts.mockResolvedValueOnce(mockProducts);

    
    await act(async () => {
      render(<ProductList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument();
      expect(screen.getByText('Producto 2')).toBeInTheDocument();
    });
  });

  test('Muestra un mensaje de error si fetchProducts falla', async () => {
  
    mockFetchProducts.mockRejectedValueOnce(new Error('Error fetching products'));

    await act(async () => {
      render(<ProductList />);
    });

    
    await waitFor(() => {
      expect(screen.getByText('No se pudieron cargar los productos.')).toBeInTheDocument();
    });
  });

  test('Muestra un mensaje de carga mientras se obtienen los productos', async () => {
    
    mockFetchProducts.mockImplementation(() => new Promise(() => {}));

   
    await act(async () => {
      render(<ProductList />);
    });

    
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });
});
