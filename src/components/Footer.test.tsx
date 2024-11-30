// src/components/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('debe renderizar los enlaces a las redes sociales', () => {
    render(<Footer />);


    const facebookLink = screen.getByAltText(/Facebook/i);
    const instagramLink = screen.getByAltText(/Instagram/i);
    const whatsappLink = screen.getByAltText(/Whatsapp/i);

    
    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(whatsappLink).toBeInTheDocument();

    
    expect(facebookLink).toHaveAttribute('src', '/src/assets/redessociales/fb.png');
    expect(instagramLink).toHaveAttribute('src', '/src/assets/redessociales/ig.jpg');
    expect(whatsappLink).toHaveAttribute('src', '/src/assets/redessociales/whatsapp.png');
  });

  test('debe mostrar el texto de derechos reservados', () => {
    render(<Footer />);

  
    const copyrightText = screen.getByText(/© 2024 Minimarket. Todos los derechos reservados/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('debe mostrar el texto de redes sociales', () => {
    render(<Footer />);

    
    const socialMediaText = screen.getByText(/Síguenos en nuestras redes sociales/i);
    expect(socialMediaText).toBeInTheDocument();
  });
});
