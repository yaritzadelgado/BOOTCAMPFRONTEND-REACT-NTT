import { useState, useEffect } from 'react';

interface Distrito {
  id: number;
  nombre: string;
}

export const useDistritos = () => {
  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const distritosData = [
        { id: 1, nombre: 'VillaMaria' },
        { id: 2, nombre: 'Lima' },
        { id: 3, nombre: 'Pachacamac' },
    
      ];
      setDistritos(distritosData);
      setLoading(false);
    }, 1000); 
  }, []);

  return { distritos, loading };
};
