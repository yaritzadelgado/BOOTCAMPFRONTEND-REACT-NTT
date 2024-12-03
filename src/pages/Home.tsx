import React, { useState, useEffect } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import usePagination from '../hooks/usePagination'; 
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  
  const itemsPerPage = 6;

  
  const {
    currentPageItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(filteredProducts, itemsPerPage);

  
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
        {currentPageItems.map((product) => (
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
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Anterior
        </button>
        <span style={{ padding: '10px', fontWeight: 'bold' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
};
