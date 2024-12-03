import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetPasswordModal from './ResetPasswordModal';

describe('ResetPasswordModal', () => {
  const mockOnClose = jest.fn();
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    mockOnClose.mockClear();
    mockAlert.mockClear();
  });

  afterAll(() => {
    mockAlert.mockRestore(); 
  });

  test('renders correctly with all elements', () => {
    render(<ResetPasswordModal onClose={mockOnClose} />);

    expect(screen.getByText(/Resetea tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviar/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  test('displays an error when an invalid email is submitted', () => {
    render(<ResetPasswordModal onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText(/Correo electrónico/i);
    const submitButton = screen.getByText(/Enviar/i);

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Por favor, ingresa un correo válido./i)).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<ResetPasswordModal onClose={mockOnClose} />);

    const closeButton = screen.getByText(/Cancelar/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not show an error when a valid email is submitted', () => {
    render(<ResetPasswordModal onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText(/Correo electrónico/i);
    const submitButton = screen.getByText(/Enviar/i);

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(mockAlert).toHaveBeenCalledWith(
      'Se envió la información al correo ingresado: test@example.com'
    );
    expect(screen.queryByText(/Por favor, ingresa un correo válido./i)).not.toBeInTheDocument();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
