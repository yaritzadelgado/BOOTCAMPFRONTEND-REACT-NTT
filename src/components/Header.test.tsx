// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter as Router } from 'react-router-dom'; 

describe('Header', () => {
  const cartCount = 5;

  test('debe renderizar el logo, el título y los enlaces de navegación', () => {
    render(
      <Router>
        <Header cartCount={cartCount} />
      </Router>
    );

    
    const logo = screen.getByAltText('My Market Logo');
    expect(logo).toBeInTheDocument();

    
    const title = screen.getByText('Minimarket');
    expect(title).toBeInTheDocument();

    
    const homeLink = screen.getByText('HOME');
    const resumenLink = screen.getByText('RESUMEN');
    expect(homeLink).toBeInTheDocument();
    expect(resumenLink).toBeInTheDocument();
  });

  test('debe mostrar el botón de iniciar sesión', () => {
    render(
      <Router>
        <Header cartCount={cartCount} />
      </Router>
    );

    
    const loginButton = screen.getByText('INICIAR SESIÓN');
    expect(loginButton).toBeInTheDocument();
  });

  test('debe mostrar el número de productos en el carrito', () => {
    render(
      <Router>
        <Header cartCount={cartCount} />
      </Router>
    );

    
    const cartCountElement = screen.getByText(cartCount.toString());
    expect(cartCountElement).toBeInTheDocument();
  });
});
