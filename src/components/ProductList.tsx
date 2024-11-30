import React, { useState, useEffect } from 'react'; 
import { fetchProducts } from '../services/api'; 
import { ProductCard } from './ProductCard'; 
import { Product } from '../types/Product'; 

const ProductList: React.FC = () => {

  // Estado para almacenar los productos y el carrito
  const [productos, setProductos] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar los productos de la API al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProductos(fetchedProducts);
      } catch (error) {
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Función para agregar un producto al carrito
  const addToCart = (producto: Product) => {
    setCart((prevCart) => [...prevCart, producto]);
  };

  // Mostrar mensaje de carga o error si es necesario
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className="product-list">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            title={producto.title}
            description={producto.description}
            price={producto.price}
            thumbnail={producto.thumbnail}
            onAddToCart={() => addToCart(producto)} 
          />
        ))}
      </div>

      {/* Mostrar el carrito */}
      <div>
        <h2>Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.title}</td>
                  <td>S/ {producto.price}</td>
                  <td>{producto.cantidad || 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
