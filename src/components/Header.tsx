import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  username: string | null; 
}

export const Header: React.FC<HeaderProps> = ({ cartCount, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar datos del session/local storage y redirigir al login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

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
      <div className="user-info">
        {username ? (
          <>
            <span>Bienvenido: {username}</span>
            <a
              href="#"
              onClick={handleLogout}
              style={{ marginLeft: '20px', color: 'red', textDecoration: 'none' }}
            >
              Cerrar sesión
            </a>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            <i className="fas fa-sign-in-alt"></i> INICIAR SESIÓN
          </Link>
        )}
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

export default Header;