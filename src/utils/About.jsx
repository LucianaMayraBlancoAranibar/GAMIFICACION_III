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
        <Typography variant="h2" style={{ color: '#810236' }} className="mb-2 text-left text-4xl font-semibold">
       Sobre nosotros
      </Typography>
      <div className="border-b-3  border-red-900 w-1/4"></div> 
    <br></br>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Lorem ipsum dolor
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Tempor incididunt
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Lorem ipsum dolor
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
