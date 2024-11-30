// src/components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockOnAddToCart = jest.fn(); // Mock de la función onAddToCart

  const product = {
    title: 'Producto de prueba',
    description: 'Descripción del producto de prueba',
    price: 50,
    thumbnail: '/path/to/image.jpg',
  };

  test('debe renderizar el título, descripción y precio del producto', () => {
    render(<ProductCard {...product} onAddToCart={mockOnAddToCart} />);

    
    const title = screen.getByText(product.title);
    expect(title).toBeInTheDocument();

    
    const description = screen.getByText(product.description);
    expect(description).toBeInTheDocument();

    
    const price = screen.getByText((content) =>
      content.includes('S/') && content.includes(`${product.price}`)
    );
    expect(price).toBeInTheDocument();
  });

  test('debe renderizar la imagen del producto con el src correcto', () => {
    render(<ProductCard {...product} onAddToCart={mockOnAddToCart} />);

    
    const img = screen.getByAltText(product.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', product.thumbnail);
  });

  test('debe llamar a onAddToCart cuando se haga clic en el botón', () => {
    render(<ProductCard {...product} onAddToCart={mockOnAddToCart} />);

    
    expect(mockOnAddToCart).not.toHaveBeenCalled();

    
    const button = screen.getByText('Agregar al carrito');
    fireEvent.click(button);

    
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });
});

