// test?
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('accessToken'); // Verificar el token en localStorage
      if (!token) {
        // Si no hay token, redirige al Dashboard
        navigate('/dashboard');
      }
    }, [navigate]);

    const token = localStorage.getItem('accessToken');

    // Retorna null si no hay token mientras se redirige
    if (!token) {
      return null;
    }

    // Renderiza el componente si el usuario está autenticado
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
