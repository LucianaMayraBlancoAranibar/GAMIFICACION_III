import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "../partials/SidebarStudent";
import Header from "../partials/Header";

import { Link } from "react-router-dom";
import '../css/sanction.css'


function UserBadges() {
  const [SidebarStudentOpen, setSidebarStudentOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarStudent SidebarStudentOpen={SidebarStudentOpen} setSidebarStudentOpen={setSidebarStudentOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header SidebarStudentOpen={SidebarStudentOpen} setSidebarStudentOpen={setSidebarStudentOpen} />

        <div className="relative pt-4 rounded-sm overflow-hidden overflow">
          <h1 className="text-4xl font-semibold mb-4 px-4">Mis Badges</h1>
          <div className="disposition">
            <div className="card">
              <img src="/src/images/LidEstudiantil.png" alt="Avatar" className="images"></img>
                <div className="container">
                  <h4><b>Liderasgo Estdiuantil</b></h4>
                  <p>RANGO I</p>
                </div>
            </div>
            <div className="card">
              <img src="/src/images/SerComunitario.png" alt="Avatar" className="images"></img>
                <div className="container">
                  <h4><b>Servicio Comunitario</b></h4>
                  <p>RANGO I</p>
                </div>
            </div>
            <div className="card">
              <img src="/src/images/InvCientifica.png" alt="Avatar" className="images"></img>
                <div className="container">
                  <h4><b>Investigacion Cientifica</b></h4>
                  <p>RANGO I</p>
                </div>
            </div>
            <div className="card">
              <img src="/src/images/ExeAcademica.png" alt="Avatar" className="images"></img>
                <div className="container">
                  <h4><b>Excelencia Academica</b></h4>
                  <p>RANGO I</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBadges;



