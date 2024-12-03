import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import ResetPasswordModal from '../components/ResetPasswordModal';

const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const validate = (values: { username: string; password: string }) => {
    const errors: { username?: string; password?: string } = {};
    if (!values.username) {
      errors.username = 'El usuario es requerido.';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      setError('');
      try {
        const response = await login(values.username, values.password);

        // Guardar token y username en localStorage
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('username', response.username);

        alert(`Inicio de sesión exitoso. ¡Bienvenido, ${response.username}!`);
        navigate('/home'); // Redirigir al Home
      } catch (err: any) {
        // Manejo de errores personalizados
        if (err.response) {
          // Error de autenticación o respuesta del servidor
          switch (err.response.status) {
            case 401:
              setError('Credenciales incorrectas. Por favor, revise su usuario o contraseña.');
              break;
            case 403:
              setError('Su cuenta está bloqueada. Contacte al soporte.');
              break;
            case 500:
              setError('Error en el servidor. Inténtelo nuevamente más tarde.');
              break;
            default:
              setError('Error al iniciar sesión. Inténtelo nuevamente.');
          }
        } else if (err.request) {
          // Error de red o servidor no responde
          setError('No se pudo conectar al servidor. Verifique su conexión a internet.');
        } else {
          // Otros errores
          setError('Ocurrió un error inesperado. Inténtelo nuevamente.');
        }
      }
    },
  });

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Inicie Sesión</h2>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
            {formik.touched.username && formik.errors.username && (
              <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.username}</div>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.password}</div>
            )}
          </div>
          {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4caf50',
              color: 'white',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Iniciar Sesión
          </button>
        </form>
        <a
          href="#"
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'block',
            marginTop: '15px',
            color: '#007bff',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          ¿Olvidé Contraseña?
        </a>

        {isModalOpen && <ResetPasswordModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default Login;
