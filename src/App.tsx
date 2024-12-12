// falta test
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Resumen } from './pages/Resumen';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);

    
  };

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
