import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Home';


jest.mock('../hooks/useFetchProducts', () => {
  return jest.fn(() => ({
    products: [
      { id: 1, title: 'Product 1', description: 'Description 1', price: 100, thumbnail: 'url1', category: 'furniture' },
      { id: 2, title: 'Product 2', description: 'Description 2', price: 200, thumbnail: 'url2', category: 'groceries' },
      { id: 3, title: 'Product 3', description: 'Description 3', price: 150, thumbnail: 'url3', category: 'furniture' },
    ],
    loading: false,
    error: null
  }));
});

describe('Home', () => {
  test('renders products correctly', () => {
    render(
      <Router>
        <Home onAddToCart={() => {}} />
      </Router>
    );

   
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  test('filters products by search query', async () => {
    render(
      <Router>
        <Home onAddToCart={() => {}} />
      </Router>
    );

   
    const searchInput = screen.getByPlaceholderText(/Buscar productos.../i);
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
    });
  });

  test('filters products by category', async () => {
    render(
      <Router>
        <Home onAddToCart={() => {}} />
      </Router>
    );

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'furniture' } });

    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });
  });

  test('increments cart count when "Add to Cart" is clicked', () => {
    const mockAddToCart = jest.fn();

    render(
      <Router>
        <Home onAddToCart={mockAddToCart} />
      </Router>
    );

 
    expect(mockAddToCart).not.toHaveBeenCalled();

    
    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

   
    expect(mockAddToCart).toHaveBeenCalled();
  });
});
