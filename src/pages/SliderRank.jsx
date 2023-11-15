import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PageTitle} from "../utils/page-title";

import "../css/MainCards.css";

function SliderRank() {
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

        const autoChangeInterval = setInterval(autoChangeSlide, intervalTime);

        // Función de limpieza que se ejecutará cuando el componente se desmonte
        return () => {
          clearInterval(autoChangeInterval);
        };
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
    <div >
      <div >
      <PageTitle heading="Medallas de los rangos">
           Los estudiamtes en diferentes niveles ,deacuerdo a asus logros
          </PageTitle>
          <br></br>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
        <div className="swiper mySwiper">
          <div className="containerCarrousel">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Bronce1.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>BRONCE I</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Bronce2.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>BRONCE II</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Bronce3.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>BRONCE III</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Plata1.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>PLATA I</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Plata2.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>PLATA II</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Plata3.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>PLATA III</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Oro1.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>ORO I</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Oro2.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>ORO II</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Oro3.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>ORO III</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Platino1.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>PLATINO I</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Platino2.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>PLATINO II</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Platino3.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>PLATINO III</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Diamante1.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>DIAMANTE I</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Diamante2.png"
                    className="imagesize"
                    alt=""
                  ></img>
                  <span>DIAMANTE II</span>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img
                    src="/src/images/rank/Diamante3.png"
                    className="imagesize"
                    alt=""
                  ></img>
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
      </div>
    </div>
  );
}

export default SliderRank;
