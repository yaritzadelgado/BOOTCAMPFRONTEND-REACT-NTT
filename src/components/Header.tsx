import React from 'react';
import { Link } from 'react-router-dom';

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
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/resumen">RESUMEN</Link></li>
        </ul>
      </nav>
      <div className="login-container">
        <button className="login-btn">
          <i className="fas fa-sign-in-alt"></i> INICIAR SESIÓN
        </button>
      </div>
      <div className="cart">
        <Link to="#">
          <img src="/src/assets/imagen/carr.png" alt="Carrito de compras" className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
};
