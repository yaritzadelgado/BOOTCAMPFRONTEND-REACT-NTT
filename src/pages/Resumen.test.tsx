import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Resumen } from './Resumen';
import { useNavigate } from 'react-router-dom';
import { useDistritos } from '../hooks/useDistritos';


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../hooks/useDistritos', () => ({
  useDistritos: jest.fn(),
}));

describe('Resumen Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
   
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useDistritos as jest.Mock).mockReturnValue({ distritos: [{ id: '1', nombre: 'Lima' }], loading: false });
  });

  it('debe renderizar correctamente el componente', () => {
    render(<Resumen />);

    
    expect(screen.getByText(/Resumen de la Compra/i)).toBeInTheDocument();

    
    expect(screen.getByLabelText(/Nombres:/i)).toBeInTheDocument();
  });

  it('debe actualizar el formulario correctamente', async () => {
    render(<Resumen />);

    
    const nombreInput = screen.getByLabelText(/Nombres:/i);
    fireEvent.change(nombreInput, { target: { value: 'Juan' } });

    
    expect(nombreInput).toHaveValue('Juan');
  });

  it('debe manejar el envío del formulario correctamente', async () => {
    render(<Resumen />);

    fireEvent.change(screen.getByLabelText(/Nombres:/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellidos:/i), { target: { value: 'Perez' } });
    fireEvent.change(screen.getByLabelText(/Distrito:/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Dirección:/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Referencia:/i), { target: { value: 'Cerca del parque' } });
    fireEvent.change(screen.getByLabelText(/Celular:/i), { target: { value: '999999999' } });

    
    const submitButton = screen.getByText(/Comprar/i);
    fireEvent.click(submitButton);

    
    await waitFor(() => screen.getByText(/¡Compra exitosa!/i));
    expect(screen.getByText(/¡Compra exitosa!/i)).toBeInTheDocument();
  });

  it('debe limpiar el formulario y redirigir después de una compra exitosa', async () => {
    render(<Resumen />);

   
    fireEvent.change(screen.getByLabelText(/Nombres:/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellidos:/i), { target: { value: 'Perez' } });
    fireEvent.change(screen.getByLabelText(/Distrito:/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Dirección:/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Referencia:/i), { target: { value: 'Cerca del parque' } });
    fireEvent.change(screen.getByLabelText(/Celular:/i), { target: { value: '999999999' } });

    fireEvent.click(screen.getByText(/Comprar/i));

    
    await waitFor(() => screen.getByText(/¡Compra exitosa!/i));

    
    fireEvent.click(screen.getByText(/Aceptar/i));

    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
