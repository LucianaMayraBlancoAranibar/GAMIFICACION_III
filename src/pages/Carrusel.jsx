import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Cambia de imagen cada 3 segundos (ajusta el intervalo según tus necesidades)
  
      return () => {
        clearInterval(interval);
      };
    }, [images]);
}

function Carrusel() {

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
                    <h1 className="text-2xl font-semibold mb-4">Carrusel</h1>

                    <div className="carusel-container">
                        {images.map((image, index) => (
                            <img
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            className={`carousel-slide ${index === currentIndex ? 'active' : ''} `}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );

}
export default Carrusel();