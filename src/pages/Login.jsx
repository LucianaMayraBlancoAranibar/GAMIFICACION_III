import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function Login(){
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuario, setUsuario] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7220/api/Usuarios")
      .then((response) => {
        console.log(response.data);
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const validateForm = () => {
    let isValid = true;

    if(!email) {
      setemailError("El email es obligatorio");
      isValid = false;
    } else { 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)) { 
        setemailError("El email no tiene un formato valido");
        isValid = false;
      } else { 
        setemailError("");
      }
    }

    if(!password) {
      setpasswordError("La contraseña es obligatorio");
      isValid = false;
    } else if(password.length <= 6 || password.length > 10) { 
      setpasswordError("La contraseña debe tener entre 6 y 10 caracteres");
      isValid = false;
    } else {
      setpasswordError("");
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    if(validateForm()){
      const data = {
        email: email,
        password: password,
      };

      try{
        const response = await axios.put('https://localhost:7220/api/Usuarios')
      }catch (error) {
        console.error("Error al registrar la facultad:", error);
    }
  }

  return(
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            
          </div>
          <br/><br/>
          <form>
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            
            <label>Email</label> <br/>
            <input 
              type="text"
              id="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <br/> <br/>
            <label>Password</label> <br/>
            <input 
              type="password"
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
               
            <br/>
            <br/>

            <button 
              className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  }
}
export default Login;