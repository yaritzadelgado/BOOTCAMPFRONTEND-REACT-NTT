import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Resumen } from './pages/Resumen';

const App: React.FC = () => {
  // esto podr'ia estar en el contexto para evitarlo crearlo aqu'i y pasarlo como prop a los componentes
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);

    
  };

  // las rutas pueden estar en enum para evitar escribirlas directamente
  return (
    <Router>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/Resumen" element={<Resumen />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
