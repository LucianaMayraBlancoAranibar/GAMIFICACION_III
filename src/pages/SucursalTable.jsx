import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function SucursalTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Sucursal, setSucursal] = useState([]);
  const [sucursalToDelete, setSucursalToDelete] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de Sucursal
    axios
      .get("https://localhost:7187/api/AcademicUnities")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setSucursal(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });
  }, []);

  const handleDeleteSucursal = () => {
    if (sucursalToDelete) {
      // Realiza una solicitud DELETE a la API para eliminar la sucursal
      axios
        .delete(`https://localhost:7187/api/AcademicUnities/${sucursalToDelete}`)
        .then((response) => {
          // Actualiza la lista de Sucursal después de la eliminación
          setSucursal((prevSucursal) =>
            prevSucursal.filter((Sucursal) => Sucursal.idAcademicUnity !== sucursalToDelete)
          );
          setSucursalToDelete(null); // Restablece el estado
        })
        .catch((error) => {
          console.error(error);
          setSucursalToDelete(null); // Restablece el estado en caso de error
        });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <h1 className="text-2xl font-semibold mb-4">Lista de Sucursales</h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/SucursalForm"> {/* Enlace a la página de añadir Sucursal */}
              <button  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Añadir Sucursal
              </button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="font-semibold text-left">
                    Nombre de Sucursal
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="font-semibold text-left">Acciones</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {Sucursal.map((Sucursal) => (
                <tr key={Sucursal.idAcademicUnity} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                  <td className="px-6 py-4">{Sucursal.academicUnityName}</td>
                  <td className="px-6 py-4 text-left">
                  <Link to={`/SucursalEdit/${Sucursal.idAcademicUnity}`}> {/* Redirigir a la página de edición con el ID */}
                    <button
                     className="px-4 py-4 mr-4 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-500 focus:outline-none focus:bg-gray-600"
                    >
                      Editar
                    </button>
                    </Link>
                    <button
                     className="px-4 py-4 ml-3 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-gray-600"
                      onClick={() => setSucursalToDelete(Sucursal.idAcademicUnity)} // Establece el ID de la sucursal para eliminar
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {sucursalToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar esta sucursal?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDeleteSucursal}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setSucursalToDelete(null)} // Cancelar la eliminación
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

export default SucursalTable;
