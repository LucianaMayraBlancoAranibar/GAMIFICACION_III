import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Carrusel = () => {
  const images = [
    'https://previews.123rf.com/images/kalenka8/kalenka82110/kalenka8211000001/175432762-paisaje-de-verano-verde-horizontal-con-hierba-fondo-de-primavera-id%C3%ADlico-y-soleado-con-prados.jpg',
    'https://previews.123rf.com/images/vertyr/vertyr1506/vertyr150600008/41609231-ilustraci%C3%B3n-de-dibujos-animados-horizontal-del-valle-con-cactus-y-monta%C3%B1as-en-el-fondo-de-tono.jpg',
    'https://previews.123rf.com/images/vladsogodel/vladsogodel1511/vladsogodel151100002/48690793-sol-naciente-en-un-fondo-de-las-monta%C3%B1as-horizontal-colorido-paisaje-de-la-naturaleza-en-la.jpg',
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
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;
