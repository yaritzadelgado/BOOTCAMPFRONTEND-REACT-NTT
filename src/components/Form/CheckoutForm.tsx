// src/components/Form/CheckoutForm.tsx
import React, { useState } from 'react';
import { useDistritos } from '../../hooks/useDistritos'; 

const CheckoutForm: React.FC = () => {
  // uniformizar idioma
  const { distritos, loading } = useDistritos(); 
  // hay que tipar el objeto para que solo admita las keys necesarias
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    distrito: '',
    direccion: '',
    referencia: '',
    celular: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      {/* Otros campos del formulario */}

      {/* Desplegable de distritos */}
      <div>
        <label htmlFor="distrito">Distrito:</label>
        {loading ? (
          <div>Cargando distritos...</div>
        ) : (
          <select
            id="distrito"
            name="distrito"
            value={formData.distrito}
            onChange={handleChange}
          >
            <option value="">Seleccione un distrito</option>
            {distritos.map((distrito) => (
              <option key={distrito.id} value={distrito.id}>
                {distrito.nombre}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Otros campos del formulario */}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default CheckoutForm;
