import React from 'react';
import { Typography } from "@material-tailwind/react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8" style={{ background: 'white' }}>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <img src="/src/images/imageSliderTop/imageS3.jpg" alt="Office" className="w-full rounded shadow-md" />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
        <Typography variant="h2" style={{ color: 'black' }} className="mb-2 text-left text-4xl font-semibold">
       Sobre nosotros
      </Typography>
      <div className="border-b-3  border-gray-500 w-1/4"></div> 
    <br></br>
          <p className="mb-4">
          El concepto de "Univalle para toda la vida" responde a la necesidad de convertir la educación superior en una constante, acompañando al futuro profesional incluso antes de ser parte de nuestra casa de estudios superiores, a través de programas de orientación vocacional y apoyo académico.
          </p>
          <h3 className="text-2xl font-bold mb-4">Porque escogernos?</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Acreditacion con Mercosur
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Asociacion U A L C P I
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> PAME
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
