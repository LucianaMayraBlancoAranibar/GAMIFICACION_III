import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Carrusel = () => {
  const images = [
    'https://www.boliviaentusmanos.com/amarillas1/businesscard/imagenes/univalle1.jpg',
    'https://www.boliviaentusmanos.com/amarillas1/businesscard/imagenes/univalle4.jpg',
    'https://4.bp.blogspot.com/-qLFmJSQYXDQ/TskgOVGYpzI/AAAAAAAAAB0/rOQFFiIqiTo/s1600/univalle02.jpg',
    // Agrega las URLs de tus imágenes
  ];

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Carousel
        autoPlay // Habilita la reproducción automática
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        interval={3000}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;






