import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from "../pages/Login";
import axios from 'axios';

jest.mock('axios'); 
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock de window.alert
beforeAll(() => {
  global.alert = jest.fn();  // Mock de la función alert
});

afterAll(() => {
  jest.restoreAllMocks(); // Restaurar los mocks después de las pruebas
});

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    localStorage.clear(); // Limpiar localStorage después de cada prueba
  });

  test('should store token and username in localStorage on successful login', async () => {
    const mockResponse = {
      data: {
        id: 1,
        username: 'testUser',
        token: 'mockToken123',
      },
    };

    // Simulamos una respuesta exitosa de la API
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <Login />
      </Router>
    );

    // Simulamos el llenado del formulario
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    // Esperamos a que el localStorage se actualice
    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('mockToken123');
      expect(localStorage.getItem('username')).toBe('testUser');
    });

    // Verificamos que la llamada a la API fue realizada correctamente
    expect(mockedAxios.post).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
      username: 'testUser',
      password: 'password123',
    });

    // Verificamos que la alerta se haya llamado con el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Inicio de sesión exitoso. ¡Bienvenido, testUser!');
  });

  test('should throw an error on login failure', async () => {
    // Simulamos un error en la solicitud de login
    mockedAxios.post.mockRejectedValueOnce(new Error('Request failed'));

    render(
      <Router>
        <Login />
      </Router>
    );

    // Simulamos el llenado del formulario con credenciales incorrectas
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    // Esperamos que aparezca el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/ocurrió un error inesperado/i)).toBeInTheDocument();
    });

    // Verificamos que el localStorage no contenga los valores esperados
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
  });
});
