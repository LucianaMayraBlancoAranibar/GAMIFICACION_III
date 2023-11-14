import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import "../css/MainCards.css";

function InfoMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="rounded-container">
        <label className="container-title">¿DE QUÉ SE TRATA?</label>
        <div className="item-container">
          <div className="card">
            <img src="/src/images/imgM1.png" alt="User" />
            <label className="card-title">RANKING ESTUDIANTIL</label>
            <label className="card-text">
              El ranking estudiantil es una carrera entre los estudiantes para
              medir los logros que ganen en su tiempo de estudio.
            </label>
          </div>
          <div className="card">
            <img src="/src/images/imgM2.png" alt="User" />
            <label className="card-title">¿CÓMO SUBIR DE RANGO?</label>
            <label className="card-text">
              Se podrá subir de rango dependiendo de los logros que ganen
            </label>
          </div>
          <div className="card">
            <img src="/src/images/imgM3.png" alt="User" />
            <label className="card-title">¿CÓMO PARTICIPO EN ESTO?</label>
            <label className="card-text">
              Se podrá participar cuando la persona se inscriba en la
              Universidad Univalle y comenzará en el rango más bajo
            </label>
          </div>
          <div className="card">
            <img src="/src/images/imgM4.png" alt="User" />
            <label className="card-title">¿QUÉ SON LOS BADGES?</label>
            <label className="card-text">
              Los badges son pequeñas insignias que se utilizan para representar
              información adicional o destacar ciertos logros, características o
              estados.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoMain;
