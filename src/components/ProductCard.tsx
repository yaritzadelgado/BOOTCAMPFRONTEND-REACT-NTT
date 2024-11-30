import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  onAddToCart: () => void; 
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  thumbnail,
  onAddToCart
}) => {
  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} className="product-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>Precio:</strong> S/ {price}</p>
      <button className="btn" onClick={onAddToCart}>Agregar al carrito</button> {}
    </div>
  );
};

