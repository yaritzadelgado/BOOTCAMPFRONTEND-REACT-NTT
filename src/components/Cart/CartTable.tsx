// falta test
import React from 'react';
import { Product } from '../../types/Product';

interface CartTableProps {
  productos: Product[];
  setProductosEnCarrito: React.Dispatch<React.SetStateAction<Product[]>>;
  calcularTotal: () => number;
}

const CartTable: React.FC<CartTableProps> = ({ productos, setProductosEnCarrito, calcularTotal }) => {
  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) return;
    setProductosEnCarrito((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
      )
    );
  };

  const eliminarProducto = (id: number) => {
    setProductosEnCarrito((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <img src={producto.thumbnail} alt={producto.title} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{producto.title}</td>
              <td>
                <button onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}>-</button>
                <span>{producto.cantidad}</span>
                <button onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}>+</button>
              </td>
              <td>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <strong>Total: S/ {calcularTotal().toFixed(2)}</strong>
    </div>
  );
};

export default CartTable;
