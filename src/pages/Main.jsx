import React, { useState, useEffect } from "react";
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

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="relative pt-4 rounded-sm overflow-hidden overflow-y-scroll">
          <h1 className="text-4xl font-semibold mb-4 px-4">Ranking de estudiantes</h1>
          <div className=" flex flex-col items-center pt-5">
            <button className="font-bold	text-xl	pt-2 w-2/12 h-24 bg-gradient-to-t from-cyan-300 to-blue-500 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("DIAMANTE")}
            >
              DIAMANTE
            </button>
            {showDataListDiamante && (
              <div className="bg-cyan-300 w-2/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold	text-xl	mt-2  w-4/12 h-24 bg-gradient-to-t from-cyan-200 to-gray-200 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("PLATINO")}>
              PLATINO
            </button>
            {showDataListPlatino && (
              <div className="bg-cyan-200 w-4/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold	text-xl	 mt-2  w-6/12 h-24 bg-gradient-to-t from-yellow-400 to-yellow-200 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("ORO")}>
              ORO
            </button>
            {showDataListOro && (
              <div className="bg-yellow-400 w-6/12 shadow rounded p-4 text-center text-white	fade-in">
                <div className="py-2">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold	text-xl	 mt-2  w-8/12 h-24 bg-gradient-to-t from-gray-400 to-gray-200 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("PLATA")}>
              PLATA
            </button>
            {showDataListPlata && (
              <div className="bg-gray-400 w-8/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
            <button className="font-bold	text-xl	 mt-2  w-10/12 h-24 bg-gradient-to-t from-amber-600 to-amber-700 shadow rounded flex justify-center items-center"
              onClick={() => toggleDataList("BRONCE")}>
              BRONCE
            </button>
            {showDataListBronce && (
              <div className="bg-amber-600 w-10/12 shadow rounded p-4 text-center text-white fade-in">
                <div className="py-2">
                  <a href="#">Rango 1</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 2</a>
                </div>
                <div className="py-2">
                  <a href="#">Rango 3</a>
                </div>
              </div>
            )}
          </div>
            
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



