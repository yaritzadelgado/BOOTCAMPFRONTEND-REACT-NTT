import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Síguenos en nuestras redes sociales:</p>
      <div className="social-media">
        <a href="#"><img src="/src/assets/redessociales/fb.png" alt="Facebook" /></a>
        <a href="#"><img src="/src/assets/redessociales/ig.jpg" alt="Instagram" /></a>
        <a href="#"><img src="/src/assets/redessociales/whatsapp.png" alt="Whatsapp" /></a>
      </div>
      <p>&copy; 2024 Minimarket. Todos los derechos reservados.</p>
    </footer>
  );
};
