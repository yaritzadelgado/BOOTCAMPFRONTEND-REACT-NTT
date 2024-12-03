import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


beforeAll(() => {
  global.alert = jest.fn();  
});

afterAll(() => {
  jest.restoreAllMocks(); 
});

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
    localStorage.clear(); 
  });

  test('should redirect to /home and store token on successful login', async () => {
    const mockResponse = {
      data: {
        id: 1,
        username: 'testUser',
        token: 'mockToken123',
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <Login />
      </Router>
    );

  
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    
    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('mockToken123');
      expect(localStorage.getItem('username')).toBe('testUser');
    });


    expect(mockedAxios.post).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
      username: 'testUser',
      password: 'password123',
    });

    
    expect(global.alert).toHaveBeenCalledWith('Inicio de sesión exitoso. ¡Bienvenido, testUser!');
  });

  test('should display error message on login failure', async () => {
    
    mockedAxios.post.mockRejectedValueOnce(new Error('Request failed'));

    render(
      <Router>
        <Login />
      </Router>
    );

 
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    
    await waitFor(() => {
      expect(screen.getByText(/Ocurrió un error inesperado. Inténtelo nuevamente./i)).toBeInTheDocument();
    });

    
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
  });

  test('should open reset password modal when "¿Olvidé Contraseña?" is clicked', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.queryByText(/Recuperar Contraseña/i)).not.toBeInTheDocument();

    
    fireEvent.click(screen.getByText(/¿Olvidé Contraseña?/i));

    
    await waitFor(() => {
      
      expect(screen.getByText(/Enviar/i)).toBeInTheDocument();
    });

   
    fireEvent.click(screen.getByText(/Cancelar/i));

    
    expect(screen.queryByText(/Recuperar Contraseña/i)).not.toBeInTheDocument();
  });
});
