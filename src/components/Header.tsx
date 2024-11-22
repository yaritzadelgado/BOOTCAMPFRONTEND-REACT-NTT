import React from 'react';

interface HeaderProps {
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/src/assets/imagen/logo.png" alt="My Market Logo" className="logo" />
        <h1>Minimarket</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">PRODUCTOS</a></li>
          <li><a href="#">CONTACTO</a></li>
        </ul>
      </nav>
      <div className="login-container">
        <button className="login-btn">
          <i className="fas fa-sign-in-alt"></i> INICIAR SESIÓN
        </button>
      </div>
      <div className="cart">
        <a href="#">
          <img src="/src/assets/imagen/carr.png" alt="Carrito de compras" className="cart-icon" />
          <span className="cart-count">{cartCount}</span> {}
        </a>
      </div>
    </header>
  );
};
