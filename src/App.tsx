import React, { useState, useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Resumen } from './pages/Resumen';
import Login from './pages/Login';  


const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <Router>
      <Header cartCount={cartCount} username={username} />
      <Routes>
        {/* // la pagina de inicio debe ser protegida seg'un los criterios compartidos */}
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/resumen" element={<Resumen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
