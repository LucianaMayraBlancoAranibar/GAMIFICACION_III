import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import "../css/MainCards.css";
import { PageTitle } from "../utils/page-title";

function InfoMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="rounded-container">
        
        <PageTitle heading="Explorando el Sistema de Logros Estudiantiles">
        Descubre cómo nuestro sistema de logros y rankings potencia tu experiencia educativa.
        </PageTitle>
        
        <div className="item-container">
          <div className="card">
            <img src="/src/images/imgM1.png" alt="User" />
            <label className="card-title">Tu Progreso en Competencia</label>
            <label className="card-text">
              El ranking estudiantil es una carrera entre los estudiantes para
              medir los logros que ganen en su tiempo de estudio.
            </label>
          </div>
          <div className="card">
            <img src="/src/images/imgM2.png" alt="User" />
            <label className="card-title">¿CÓMO SUBIR DE RANGO?</label>
            <label className="card-text">
            Descubre cómo tus logros académicos te impulsan a subir de rango y destacarte.
            </label>
          </div>
          <div className="card">
            <img src="/src/images/imgM3.png" alt="User" />
            <label className="card-title">¿CÓMO PARTICIPO EN ESTO?</label>
            <label className="card-text">
            Tu aventura inicia al matricularte en Univalle, comenzando desde el primer escalón hacia la cima.
            </label>
          </div>
          <div className="card">
            <img src="/src/images/imgM4.png" alt="User" />
            <label className="card-title">¿QUÉ SON LOS BADGES?</label>
            <label className="card-text">
            Conoce los badges, emblemas únicos que destacan tus logros y habilidades especiales.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoMain;
