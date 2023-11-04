import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "../partials/SidebarStudent";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import '../css/MainCards.css'


function UserSanction() {
  const [SidebarStudentOpen, setSidebarStudentOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarStudent SidebarStudentOpen={SidebarStudentOpen} setSidebarStudentOpen={setSidebarStudentOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header SidebarStudentOpen={SidebarStudentOpen} setSidebarStudentOpen={setSidebarStudentOpen} />
        <div className="relative pt-4 rounded-sm overflow-hidden overflow-y-scroll">
          <h1 className="text-4xl font-semibold mb-4 px-4">Mis Sanciones</h1>
          
        </div>
      </div>
    </div>
  );
}

export default UserSanction;



