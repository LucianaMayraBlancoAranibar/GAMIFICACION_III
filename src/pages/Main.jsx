import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
// import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
// import Header2 from "../partials/Header2";
import "../css/MainCards.css";
import { Navbar } from "./Navbar";
import RankMain from "./RankMain";
import  InfoMain  from "./InfoMain";
import SliderRank from "./SliderRank";
import About from "../utils/About"
import Footer from "./Footer"
import { Collapse } from "@material-tailwind/react";

function Main() {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDataListDiamante, setShowDataListDiamante] = useState(false);
  const [showDataListPlatino, setShowDataListPlatino] = useState(false);
  const [showDataListOro, setShowDataListOro] = useState(false);
  const [showDataListPlata, setShowDataListPlata] = useState(false);
  const [showDataListBronce, setShowDataListBronce] = useState(false);
  const toggleDataList = (option) => {
    switch (option) {
      case "DIAMANTE":
        setShowDataListDiamante(!showDataListDiamante);
        break;
      case "PLATINO":
        setShowDataListPlatino(!showDataListPlatino);
        break;
      case "ORO":
        setShowDataListOro(!showDataListOro);
        break;
      case "PLATA":
        setShowDataListPlata(!showDataListPlata);
        break;
      case "BRONCE":
        setShowDataListBronce(!showDataListBronce);
        break;
      default:
        break;
    }
  };
  const routes = [
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Información", href: "#informacion" },
    { name: "Ranking", href: "#rank" },
    { name: "Medallas", href: "#medallas" },
   
  ];

  const swiperRef = useRef(null);

  useEffect(() => {
    // Carga Swiper desde el CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js";
    script.async = true;
    script.onload = () => {
      swiperRef.current = new Swiper(".containerCarrousel", {
        effect: "coverflow",
        grabCursor: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        centeredSlides: true,
        slidesPerView: "1",

        breakpoints: {
          768: {
            slidesPerView: "3",
          },
        },
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          /*el: ".swiper-pagination",*/
          clickable: true,
        },
      });
    };
    document.body.appendChild(script);

    /*Carrousel de imagenes de arriba de la pagina*/
    const buttons = document.querySelectorAll("[data-carousel-button]");
    const intervalTime = 5000; // Cambiar de imagen cada 5 segundos

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
      });
    });

    function autoChangeSlide() {
      const nextButton = document.querySelector("[data-carousel-button='next']");
      if (nextButton) {
        nextButton.click();
      }
    }

    // Configura un intervalo para cambiar automáticamente las diapositivas
    let autoChangeInterval = setInterval(autoChangeSlide, intervalTime);

    // Detiene el cambio automático cuando el mouse está sobre el carrusel
    const carousel = document.querySelector("[data-carousel]");
    carousel.addEventListener("mouseover", () => {
      clearInterval(autoChangeInterval);
    });

    // Reanuda el cambio automático cuando el mouse sale del carrusel
    carousel.addEventListener("mouseout", () => {
      autoChangeInterval = setInterval(autoChangeSlide, intervalTime);
    });
  }, []);

  return (
    <div>
        
        <Navbar routes={routes} />
       
    <div className="flex h-screen overflow-hidden">
        
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
     
        <div className="relative pt-4 rounded-sm overflow-hidden overflow-y-scroll"  style={{ background: 'white' }}>
          <div className="carousel" data-carousel>
            <button
              className="carousel-button prev"
              data-carousel-button="prev"
            >
              &#8656;
            </button>
            <button
              className="carousel-button next"
              data-carousel-button="next"
            >
              &#8658;
            </button>
            <ul data-slides>
              <li className="slide" data-active>
                <img src="/src/images/imageSliderTop/imageS1.jpg" alt="#1" />
              </li>
              <li className="slide">
                <img src="/src/images/imageSliderTop/imageS2.jpg" alt="2" />
              </li>
              <li className="slide">
                <img src="/src/images/imageSliderTop/imageS3.jpg" alt="#3" />
              </li>
            </ul>
          </div>
          <div id="about">
            <br></br><br></br>
            <About />
          </div>
          <div id="rank">
            <br></br><br></br>
            <RankMain />
          </div>
          <div id="medallas">
          <br></br><br></br>
            <SliderRank/>
          </div>
          <div id="informacion">
         <InfoMain></InfoMain>
          </div>
          <div>
         <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Main;
