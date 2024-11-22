import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  
  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <Home onAddToCart={handleAddToCart} />
      <Footer />
    </>
  );
};

export default App;

