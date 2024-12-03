import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Header } from './Header';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Header Component', () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders correctly with username and cart count', () => {
    render(
      <Router>
        <Header cartCount={5} username="TestUser" />
      </Router>
    );

    expect(screen.getByText(/Bienvenido: TestUser/i)).toBeInTheDocument();
    expect(screen.getByText(/HOME/i)).toBeInTheDocument();
    expect(screen.getByText(/RESUMEN/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); 
  });

  test('renders login button when no username is provided', () => {
    render(
      <Router>
        <Header cartCount={0} username={null} />
      </Router>
    );

    expect(screen.getByText(/INICIAR SESIÓN/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bienvenido:/i)).not.toBeInTheDocument();
  });

  test('redirects to login and clears localStorage on logout', () => {
    localStorage.setItem('accessToken', 'mockToken');
    localStorage.setItem('username', 'TestUser');

    render(
      <Router>
        <Header cartCount={5} username="TestUser" />
      </Router>
    );

    const logoutLink = screen.getByText(/Cerrar sesión/i);
    fireEvent.click(logoutLink);

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('renders the cart with the correct count', () => {
    render(
      <Router>
        <Header cartCount={3} username="TestUser" />
      </Router>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByAltText(/Carrito de compras/i)).toBeInTheDocument();
  });
});
