import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function TypeAchievementForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    // Lógica para enviar el formulario con la imagen
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Nuevo Tipo de Logro{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="Name"
                >
                  Nombre del tipo de logro
                </label>
                <input
                  type="text"
                  id="Name"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <br></br>

              <br></br>
              <div className="my-4">
                <div className="flex items-left justify-left">
                  <label className="flex flex-col border-4 border-dashed w-1/2 h-32 hover:bg-gray-100 hover:border-blue-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                      <p className="lowercase text-sm text-gray-400 group-hover:text-blue-600 pt-1 tracking-wider">
                        Seleccione un logo
                      </p>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      id="image"
                      name="image"
                      accept="image/jpg, image/jpeg, image/png"
                      onChange={handleImageChange}
                    />
                  </label>
                  <div>
                    {image && (
                      <div className="ml-4">
                        <img
                          className="h-32 rounded-md object-cover"
                          src={image}
                          alt="Previsualización de la imagen"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <br></br>
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TypeAchievementForm;
