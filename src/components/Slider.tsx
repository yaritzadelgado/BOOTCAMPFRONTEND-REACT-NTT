import React, { useState, useEffect } from 'react';
import banner1 from '../assets/imagen/banner.jpg';
import banner2 from '../assets/imagen/banner2.jpg';
import banner3 from '../assets/imagen/banner3.jpg';
import './Slider.css'; 

const images = [
  { src: banner1, alt: 'Oferta Especial 1' },
  { src: banner2, alt: 'Oferta Especial 2' },
  { src: banner3, alt: 'Oferta Especial 3' },
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage(); 
    }, 3000);

    
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <section className="slider">
      <button className="prev" onClick={prevImage}>
        &#10094;
      </button>
      <div className="slides">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <button className="next" onClick={nextImage}>
        &#10095;
      </button>
    </section>
  );
};

export default Slider;
