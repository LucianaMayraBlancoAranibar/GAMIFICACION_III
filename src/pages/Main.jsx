import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import '../css/MainCards.css'

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
            slidesPerView: "3"
          }
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

    const buttons = document.querySelectorAll("[data-carousel-button]");
    const intervalTime = 5000; // Cambiar de imagen cada 5 segundos
    
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
      });
    });
    
    function autoChangeSlide() {
      const nextButton = document.querySelector("[data-carousel-button='next']");
      nextButton.click();
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
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="relative pt-4 rounded-sm overflow-hidden overflow-y-scroll">
          <div className="carousel" data-carousel>
            <button className="carousel-button prev" data-carousel-button="prev">&#8656;</button>
            <button className="carousel-button next" data-carousel-button="next">&#8658;</button>
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
          <h1 className="text-4xl font-semibold mb-4 px-4">Ranking de estudiantes</h1>
          <div className=" flex flex-col items-center pt-5">
            <button className="font-bold	text-xl	pt-2 w-2/12 h-24 bg-gradient-to-t from-cyan-300 to-blue-500 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("DIAMANTE")}
            >
              <p className="fontSizeRank">DIAMANTE</p>
            </button>
            {showDataListDiamante && (
              <div className="bg-cyan-300 w-2/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold fontSizeRank text-xl	mt-2  w-4/12 h-24 bg-gradient-to-t from-cyan-200 to-gray-200 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("PLATINO")}>
              <p className="fontSizeRank">PLATINO</p>
            </button>
            {showDataListPlatino && (
              <div className="bg-cyan-200 w-4/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold fontSizeRank text-xl	 mt-2  w-6/12 h-24 bg-gradient-to-t from-yellow-400 to-yellow-200 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("ORO")}>
              <p className="fontSizeRank">ORO</p>
            </button>
            {showDataListOro && (
              <div className="bg-yellow-400 w-6/12 shadow rounded p-4 text-center text-white	fade-in">
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold fontSizeRank text-xl	 mt-2  w-8/12 h-24 bg-gradient-to-t from-gray-400 to-gray-200 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("PLATA")}>
              <p className="fontSizeRank">PLATA</p>
            </button>
            {showDataListPlata && (
              <div className="bg-gray-400 w-8/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold fontSizeRank text-xl	 mt-2  w-10/12 h-24 bg-gradient-to-t from-amber-600 to-amber-700 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("BRONCE")}>
              <p className="fontSizeRank">BRONCE</p>
            </button>
            {showDataListBronce && (
              <div className="bg-amber-600 w-10/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2 fontSizeSubrank">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-semibold px-4 pt-12 pb-6">Participa y sube de rango</h1>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
          <div className="swiper mySwiper">
            <div className="containerCarrousel">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Bronce1.png" className="imagesize" alt=""></img>
                    <span>BRONCE I</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Bronce2.png" className="imagesize" alt=""></img>
                    <span>BRONCE II</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Bronce3.png" className="imagesize" alt=""></img>
                    <span>BRONCE III</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Plata1.png" className="imagesize" alt=""></img>
                    <span>PLATA I</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Plata2.png" className="imagesize" alt=""></img>
                    <span>PLATA II</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Plata3.png" className="imagesize" alt=""></img>
                    <span>PLATA III</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Oro1.png" className="imagesize" alt=""></img>
                    <span>ORO I</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Oro2.png" className="imagesize" alt=""></img>
                    <span>ORO II</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Oro3.png" className="imagesize" alt=""></img>
                    <span>ORO III</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Platino1.png" className="imagesize" alt=""></img>
                    <span>PLATINO I</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Platino2.png" className="imagesize" alt=""></img>
                    <span>PLATINO II</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Platino3.png" className="imagesize" alt=""></img>
                    <span>PLATINO III</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Diamante1.png" className="imagesize" alt=""></img>
                    <span>DIAMANTE I</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Diamante2.png" className="imagesize" alt=""></img>
                    <span>DIAMANTE II</span>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="box">
                    <img src="/src/images/rank/Diamante3.png" className="imagesize" alt=""></img>
                    <span>DIAMANTE III</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination" />
          </div>
          <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>

          <div className="rounded-container">
            <label className="container-title">¿DE QUÉ SE TRATA?</label>
            <div className="item-container">
              <div className="card">
                <img src="/src/images/imgM1.png" alt="User" />
                <label className="card-title">RANKING ESTUDIANTIL</label>
                <label className="card-text">El ranking estudiantil es una carrera entre los estudiantes para medir los logros que ganen en su tiempo de estudio.</label>
              </div>
              <div className="card">
                <img src="/src/images/imgM2.png" alt="User" />
                <label className="card-title">¿CÓMO SUBIR DE RANGO?</label>
                <label className="card-text">Se podrá subir de rango dependiendo de los logros que ganen</label>
              </div>
              <div className="card">
                <img src="/src/images/imgM3.png" alt="User" />
                <label className="card-title">¿CÓMO PARTICIPO EN ESTO?</label>
                <label className="card-text">Se podrá participar cuando la persona se inscriba en la Universidad Univalle y comenzará en el rango más bajo</label>
              </div>
              <div className="card">
                <img src="/src/images/imgM4.png" alt="User" />
                <label className="card-title">¿QUÉ SON LOS BADGES?</label>
                <label className="card-text">Los badges son pequeñas insignias que se utilizan para representar información adicional o destacar ciertos logros, características o estados.</label>
              </div>
            </div>
          </div>
          <Footer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </div>
  );
}

export default Main;



