
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function SanctionTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Sancion, setSancion] = useState([]);
  const [Estudiante, setEstudiante] = useState([]);
  const [Carrera, setCarrera] = useState([]);
  const [Usuario, setUsuario] = useState([]);
  const [sancionToDelete, setSancionToDelete] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de Sancion
    axios
      .get("https://localhost:7220/api/Sanctions")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setSancion(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });    

      axios
      .get("https://localhost:7220/api/Students")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setEstudiante(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

      axios
      .get("https://localhost:7220/api/Careers")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setCarrera(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });   

      axios
      .get("https://localhost:7220/api/Usuarios")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });  
  }, []);


  const handleDeleteSucursal = () => {
    if (sancionToDelete) {
      // Realiza una solicitud DELETE a la API para eliminar la Sancion
      axios
        .delete(`https://localhost:7220/api/Sanctions/${sancionToDelete}`)
        .then((response) => {
          // Actualiza la lista de Sancion después de la eliminación
          setSancion((prevSancion) =>
            prevSancion.filter((Sancion) => Sancion.idSanctions !== sancionToDelete)
          );
          setSancionToDelete(null); // Restablece el estado
        })
        .catch((error) => {
          console.error(error);
          setSancionToDelete(null); // Restablece el estado en caso de error
        });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <h1 className="text-2xl font-semibold mb-4">Lista de Sanciones</h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/SanctionForm"> {/* Enlace a la página de añadir Sancion */}
              <button  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Añadir Sancion
              </button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="font-semibold text-left">
                    Nombre
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="font-semibold text-left">
                    Descripción
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="font-semibold text-left">Acciones</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {Sancion.map((Sancion) => (
                <tr key={Sancion.idSanctions} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                <td className="px-6 py-4">{Estudiante.find((Estudiante) => Estudiante.idStudent === Sancion.idStudent)?.firstName + " " + Estudiante.find((Estudiante) => Estudiante.idStudent === Sancion.idStudent)?.lastName }</td>

                <td className="px-6 py-4">{Sancion.description}</td>
                  <td className="px-6 py-4 text-left">
                  <Link to={`/SanctionEdit/${Sancion.idSanctions}`}> {/* Redirigir a la página de edición con el ID */}
                    <button
                     className="px-4 py-4 mr-4 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-500 focus:outline-none focus:bg-gray-600"
                    >
                      Editar
                    </button>
                    </Link>
                    <button
                     className="px-4 py-4 ml-3 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-gray-600"
                      onClick={() => setSancionToDelete(Sancion.idSanctions)} // Establece el ID de la Sancion para eliminar
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {sancionToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar esta Sancion?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDeleteSucursal}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setSancionToDelete(null)} // Cancelar la eliminación
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SanctionTable;
