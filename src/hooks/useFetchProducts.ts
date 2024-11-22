import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { Product } from '../types/Product';

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts(); // Llamamos a la función fetchProducts desde api.ts
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { products, loading, error };
};

export default useFetchProducts;
