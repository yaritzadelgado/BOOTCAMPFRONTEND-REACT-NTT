import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { Product } from '../types/Product';

const TestComponent: React.FC = () => {
  const { cart, addToCart, cartCount } = useCart();

  const productoMock: Product = {
    id: 1,
    title: 'Producto de prueba',
    thumbnail: 'imagen.jpg',
    cantidad: 1,
    price: 10,
    description: 'Descripción de prueba',
    category: 'Categoría de prueba',
  };

  const productoMock2: Product = {
    id: 2,
    title: 'Producto adicional',
    thumbnail: 'imagen2.jpg',
    cantidad: 1,
    price: 15,
    description: 'Descripción de prueba 2',
    category: 'Categoría de prueba 2',
  };

  return (
    <div>
      <button onClick={() => addToCart(productoMock)}>Añadir producto 1 al carrito</button>
      <button onClick={() => addToCart(productoMock2)}>Añadir producto 2 al carrito</button>
      <div data-testid="cart-count">{cartCount}</div>
      <ul>
        {cart.map((producto) => (
          <li key={producto.id}>{producto.title}</li>
        ))}
      </ul>
    </div>
  );
};

describe('CartContext', () => {
  test('debe permitir agregar productos al carrito y actualizar el contador de productos', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );


    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByText('Producto de prueba')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Añadir producto 1 al carrito'));

    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
  });

  test('debe mantener el carrito actualizado al agregar más productos', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );


    fireEvent.click(screen.getByText('Añadir producto 1 al carrito'));

    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Añadir producto 2 al carrito'));

    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
    expect(screen.getByText('Producto adicional')).toBeInTheDocument();
  });
});
