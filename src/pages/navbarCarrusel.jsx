import React from "react";
import Carousel from "./Carrusel";
import Navbar from "./navbar";

function navbarCarrusel() {
  return (
    <div className="navbarCarrusel">
      <Navbar />
      <Carousel />
    </div>
  );
}

export default navbarCarrusel;