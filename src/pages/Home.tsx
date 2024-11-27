import React, { useState, useEffect } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import Slider from '../components/Slider';
import { Product } from '../types/Product';

interface HomeProps {
  onAddToCart: () => void; 
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const { products, loading, error } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // qu'e es all? usemos constantes para definir valores fijos
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // igual aqu'i
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <main>
      <SearchBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      <Slider />
      <section className="products">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            thumbnail={product.thumbnail}
            onAddToCart={onAddToCart} 
          />
        ))}
      </section>
    </main>
  );
};


