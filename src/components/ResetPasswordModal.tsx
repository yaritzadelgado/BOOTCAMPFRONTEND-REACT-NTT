import React, { useState } from 'react';

interface ResetPasswordModalProps {
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }
    alert(`Se envió la información al correo ingresado: ${email}`);
    setEmail('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Resetea tu contraseña</h2>
        <p style={{ fontSize: '14px', marginBottom: '20px' }}>Ingresa tu correo electrónico</p>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleSubmit} style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Enviar</button>
          <button onClick={onClose} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
