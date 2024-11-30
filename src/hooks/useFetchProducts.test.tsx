import { renderHook, waitFor } from '@testing-library/react';
import useFetchProducts from '../hooks/useFetchProducts';
import { fetchProducts } from '../services/api';

jest.mock('../services/api', () => ({
  fetchProducts: jest.fn(),
}));

describe('useFetchProducts', () => {
  it('debe manejar el estado de loading correctamente', async () => {
    (fetchProducts as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).toEqual([]);
      expect(result.current.error).toBe('');
    });
  });

  it('debe cargar productos correctamente', async () => {
    const mockProducts = [
      { id: 1, title: 'Producto A' },
      { id: 2, title: 'Producto B' },
    ];

    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.error).toBe('');
    });
  });

  it('debe manejar errores correctamente', async () => {
    const errorMessage = 'Error al cargar productos';

    (fetchProducts as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).toEqual([]);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('debe manejar una respuesta vacía correctamente', async () => {
    (fetchProducts as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).toEqual([]); 
      expect(result.current.error).toBe(''); 
    });
  });
});
