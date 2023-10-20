import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function Login(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [email, setemail] = useState("");
    const [rol, setrol] = useState("3");
    const [password, setpassword] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);


    function closeModal() {
        setModalIsOpen(false);
      }

    return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
              <div className="relative">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
                  Login{" "}
                </h1>
              </div>
              <br></br>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>                
                    
                    <label
                      className="text-gray-900 dark:text-gray-900"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
    
                    <br />
                    <label
                      className="text-gray-900 dark:text-gray-900"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />          
                        
                    <br />
                  </div>
                  <br></br>
                  <div className="flex justify-left">
                    <button
                      className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
                <br></br>
                <Link to="/EstudianteTable">Login</Link>
              </form>
              {/* Modal de confirmación */}
              <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
            </div>
          </div>
        </div>
      );
}
export default Login;