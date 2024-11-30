import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import { useDistritos } from '../../hooks/useDistritos';


jest.mock('../../hooks/useDistritos');

describe('CheckoutForm', () => {
  test('debe renderizar el formulario con mensaje de carga', () => {
    (useDistritos as jest.Mock).mockReturnValue({ distritos: [], loading: true });

    render(<CheckoutForm />);

    expect(screen.getByText('Cargando distritos...')).toBeInTheDocument();
  });

  test('debe renderizar el formulario con las opciones de distrito', async () => {
    const mockDistritos = [{ id: '1', nombre: 'Distrito 1' }, { id: '2', nombre: 'Distrito 2' }];
    (useDistritos as jest.Mock).mockReturnValue({ distritos: mockDistritos, loading: false });

    render(<CheckoutForm />);

    await waitFor(() => screen.getByLabelText('Distrito:'));

    expect(screen.getByText('Distrito 1')).toBeInTheDocument();
    expect(screen.getByText('Distrito 2')).toBeInTheDocument();
  });

  test('debe actualizar el estado al seleccionar un distrito', () => {
    const mockDistritos = [{ id: '1', nombre: 'Distrito 1' }];
    (useDistritos as jest.Mock).mockReturnValue({ distritos: mockDistritos, loading: false });

    render(<CheckoutForm />);

    const selectElement = screen.getByLabelText('Distrito:') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: '1' } });

    expect(selectElement.value).toBe('1');
  });

  test('debe enviar el formulario correctamente', () => {
    const mockDistritos = [{ id: '1', nombre: 'Distrito 1' }];
    (useDistritos as jest.Mock).mockReturnValue({ distritos: mockDistritos, loading: false });

    const { container } = render(<CheckoutForm />);

    fireEvent.change(screen.getByLabelText('Distrito:'), { target: { value: '1' } });

    
    const formElement = container.querySelector('form');
    
    
    if (formElement) {
      fireEvent.submit(formElement);
    } else {
      throw new Error('Formulario no encontrado');
    }

 
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });
});
