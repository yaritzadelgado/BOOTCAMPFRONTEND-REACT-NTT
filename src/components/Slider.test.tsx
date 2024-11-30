import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Slider from './Slider';

describe('Slider', () => {
  test('debe renderizar el slider con la primera imagen activa', () => {
    render(<Slider />);
    const activeImage = screen.getByAltText('Oferta Especial 1');
    expect(activeImage).toBeInTheDocument();
  });

  test('debe cambiar a la siguiente imagen al hacer clic en el botón "next"', async () => {
    render(<Slider />);

    const nextButton = screen.getByRole('button', { name: '❯' });
    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      const updatedActiveImage = screen.getByAltText('Oferta Especial 2');
      expect(updatedActiveImage).toBeInTheDocument();
    });
  });

  test('debe cambiar a la imagen anterior al hacer clic en el botón "prev"', async () => {
    render(<Slider />);

    const nextButton = screen.getByRole('button', { name: '❯' });
    act(() => {
      fireEvent.click(nextButton);
    });

    const prevButton = screen.getByRole('button', { name: '❮' });
    act(() => {
      fireEvent.click(prevButton);
    });

    await waitFor(() => {
      const updatedActiveImage = screen.getByAltText('Oferta Especial 1');
      expect(updatedActiveImage).toBeInTheDocument();
    });
  });

  test('debe cambiar automáticamente a la siguiente imagen cada 3 segundos', async () => {
    jest.useFakeTimers();
    render(<Slider />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      const updatedActiveImage = screen.getByAltText('Oferta Especial 2');
      expect(updatedActiveImage).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      const updatedActiveImage = screen.getByAltText('Oferta Especial 3');
      expect(updatedActiveImage).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
