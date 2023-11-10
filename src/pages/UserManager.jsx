import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import React, { useState } from "react";
import GestorImage from "../images/usergestor.png";
import StudentImage from "../images/userstudent.png";
import { Link } from "react-router-dom";

function UserManager() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Nuevo Tipo de Usuario{" "}
            </h1>
          </div>
          <br></br>
          <div className="flex flex-wrap -mx-2">
            {/* Primera tarjeta */}
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/* Contenido de la primera tarjeta */}
                <div className="flex justify-end px-4 pt-4">
                  {/* Botón y otros elementos */}
                </div>
                <div class="flex flex-col items-center pb-10">
                  <img
                    class="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={GestorImage}
                    alt="Bonnie image"
                  />
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Gestor
                  </h5>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Usuario
                  </span>
                  <div class="flex mt-4 space-x-3 md:mt-6">
                    <Link
                      to="/ManagerForm"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                 
                      Add friend
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda tarjeta */}
            <div className="w-full md:w-1/2 px-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4"></div>
                <div class="flex flex-col items-center pb-10">
                  <img
                    class="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={StudentImage}
                    alt="Bonnie image"
                  />
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Estudiante
                  </h5>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Usuario
                  </span>
                  <div class="flex mt-4 space-x-3 md:mt-6">
                    <a
                      href="#"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add friend
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserManager;
