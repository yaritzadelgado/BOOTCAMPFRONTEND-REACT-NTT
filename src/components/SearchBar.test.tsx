import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('debe llamar a onSearch con el valor correcto cuando se escribe en el input', () => {
    const mockOnSearch = jest.fn();
    const mockOnCategoryChange = jest.fn();

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const input = screen.getByPlaceholderText(/Buscar productos.../i);

    fireEvent.change(input, { target: { value: 'laptop' } });

    expect(mockOnSearch).toHaveBeenCalledWith('laptop');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('debe llamar a onCategoryChange con el valor correcto cuando se selecciona una categoría', () => {
    const mockOnSearch = jest.fn();
    const mockOnCategoryChange = jest.fn();

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'beauty' } });

    expect(mockOnCategoryChange).toHaveBeenCalledWith('beauty');
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
  });

  it('debe renderizar correctamente todas las opciones en el select', () => {
    const mockOnSearch = jest.fn();
    const mockOnCategoryChange = jest.fn();

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5); // Contamos las categorías + 'All categories'
    expect(options[0]).toHaveTextContent('All categories');
    expect(options[1]).toHaveTextContent('Beauty');
    expect(options[2]).toHaveTextContent('furniture');
    expect(options[3]).toHaveTextContent('groceries');
    expect(options[4]).toHaveTextContent('fragrances');
  });
});
