// si pongo espacios en blanco en el formulario registra la solicitud 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Product } from '../types/Product';
import { useDistritos } from '../hooks/useDistritos';


interface FormErrors {
  nombres?: string;
  apellidos?: string;
  distrito?: string;
  direccion?: string;
  referencia?: string;
  celular?: string;
}

const productos: Product[] = [
  { 
    id: 1, 
    category: "", 
    title: 'Essence Mascara Lash Princess', 
    cantidad: 1, 
    price: 9.99, 
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png", 
    description: "" 
  },
  { 
    id: 2, 
    category: "", 
    title: 'Calvin Klein CK One', 
    cantidad: 1, 
    price: 49.99, 
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png", 
    description: "" 
  },
  { 
    id: 3, 
    category: "", 
    title: 'Apple', 
    cantidad: 1, 
    price: 1.99, 
    thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png", 
    description: "" 
  },
  { 
    id: 4, 
    category: "", 
    title: 'Ice Cream', 
    cantidad: 1, 
    price: 5.49, 
    thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png", 
    description: "" 
  },
];

export const Resumen: React.FC = () => {
  const navigate = useNavigate(); 
  const [productosEnCarrito, setProductosEnCarrito] = useState<Product[]>(productos);
  const { distritos, loading } = useDistritos();

  // hay que tipar el state para solo permitir las keys necesarias y no dejarlo libre
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    distrito: '',
    direccion: '',
    referencia: '',
    celular: '',
  });

  // uniformizar el idioma, mantener ingl'es o espa;ol
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Función para manejar el cambio de los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors: FormErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) return; 

    setProductosEnCarrito((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: nuevaCantidad }
          : producto
      )
    );
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id: number) => {
    setProductosEnCarrito((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );
  };

  // Función para calcular el total de la compra
  const calcularTotal = () => {
    return productosEnCarrito.reduce((total, producto) => {
      return total + producto.price * producto.cantidad;
    }, 0);
  };

  // Función para validar el formulario
  const validateForm = () => {
    let errors: FormErrors = {};
    // el regex deber'ia estar en otro archivo para reutilizarlo en otros casos
    if (!formData.nombres || /\d/.test(formData.nombres)) {
      errors.nombres = 'Debe ingresar un valor válido';
    }
    if (!formData.apellidos || /\d/.test(formData.apellidos)) {
      errors.apellidos = 'Debe ingresar un valor válido';
    }
    if (!formData.distrito) {
      errors.distrito = 'Campo obligatorio';
    }
    if (!formData.direccion) {
      errors.direccion = 'Campo obligatorio';
    }
    if (!formData.referencia) {
      errors.referencia = 'Campo obligatorio';
    }
    // el regex deber'ia estar en otro archivo para reutilizarlo en otros casos
    if (!formData.celular || !/^\d{9}$/.test(formData.celular)) {
      errors.celular = 'Debe ingresar un número de celular válido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Mostrar el mensaje de compra exitosa
      setCompraExitosa(true);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  };

  // Función para manejar el cierre del mensaje de compra exitosa
  const handleCompraExitosa = () => {
    // Limpiar los datos del carrito y redirigir al inicio
    setProductosEnCarrito([]);
    setFormData({
      nombres: '',
      apellidos: '',
      distrito: '',
      direccion: '',
      referencia: '',
      celular: '',
    });
    setFormErrors({});
    setCompraExitosa(false);

    // Redirigir a la página de inicio de "Home"
    navigate('/');
  };

  // no usemos inline style creemos uan clase 
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center' }}>Resumen de la Compra</h1>

        {/* Mostrar mensaje de compra exitosa */}
        {compraExitosa && (
          <div style={{ backgroundColor: '#d4edda', padding: '10px', textAlign: 'center' }}>
            <h2>¡Compra exitosa!</h2>
            <p>Gracias por tu compra. Serás redirigido al inicio.</p>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={handleCompraExitosa}
            >
              Aceptar
            </button>
          </div>
        )}

        {/* Tabla de resumen de productos */}
        {!compraExitosa && (
          <div className="resumen-page" style={{ marginBottom: '40px' }}>
            <table style={{ width: '100%', margin: '0 auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#444', color: '#fff' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Producto</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cantidad</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {productosEnCarrito.map((producto) => (
                  <tr key={producto.id} style={{ textAlign: 'center' }}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <img
                        src={producto.thumbnail}
                        alt={producto.title}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{producto.title}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <button
                        style={{ padding: '5px 10px' }}
                        onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                      >
                        -
                      </button>
                      <span style={{ margin: '0 10px' }}>{producto.cantidad}</span>
                      <button
                        style={{ padding: '5px 10px' }}
                        onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                      >
                        +
                      </button>
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <button
                        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <center>
                <h3>Total: S/{calcularTotal().toFixed(2)}</h3>
              </center>
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
              <h2>Detalles de Envío</h2>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="nombres">Nombres:</label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
                {formErrors.nombres && <div style={{ color: 'red' }}>{formErrors.nombres}</div>}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
                {formErrors.apellidos && <div style={{ color: 'red' }}>{formErrors.apellidos}</div>}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="distrito">Distrito:</label>
                {loading ? (
                  <div>Cargando distritos...</div>
                ) : (
                  <select
                    id="distrito"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                  >
                    <option value="">Seleccione un distrito</option>
                    {distritos?.map((distrito) => (
                      <option key={distrito.id} value={distrito.id}>
                        {distrito.nombre}
                      </option>
                    ))}
                  </select>
                )}
                {formErrors.distrito && <div style={{ color: 'red' }}>{formErrors.distrito}</div>}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
                {formErrors.direccion && <div style={{ color: 'red' }}>{formErrors.direccion}</div>}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="referencia">Referencia:</label>
                <input
                  type="text"
                  id="referencia"
                  name="referencia"
                  value={formData.referencia}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
                {formErrors.referencia && <div style={{ color: 'red' }}>{formErrors.referencia}</div>}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="celular">Celular:</label>
                <input
                  type="text"
                  id="celular"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
                {formErrors.celular && <div style={{ color: 'red' }}>{formErrors.celular}</div>}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Comprar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

