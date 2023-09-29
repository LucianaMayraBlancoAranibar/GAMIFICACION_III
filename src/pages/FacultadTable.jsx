import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function FacultadTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [facultades, setFacultades] = useState([]);
  const [facultyToDelete, setFacultyToDelete] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de facultades
    axios
      .get("https://localhost:7220/api/Faculties")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setFacultades(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });
  }, []);

  const handleDeleteFaculty = () => {
    if (facultyToDelete) {
      // Realiza una solicitud DELETE a la API para eliminar la facultad
      axios
        .delete(`https://localhost:7220/api/Faculties/${facultyToDelete}`)
        .then((response) => {
          // Actualiza la lista de facultades después de la eliminación
          setFacultades((prevFacultades) =>
            prevFacultades.filter((faculty) => faculty.idFaculty !== facultyToDelete)
          );
          setFacultyToDelete(null); // Restablece el estado
        })
        .catch((error) => {
          console.error(error);
          setFacultyToDelete(null); // Restablece el estado en caso de error
        });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <h1 className="text-2xl font-semibold mb-4">Lista de Facultades</h1>
          <div className="mb-4">
            <Link to="/FacultadForm"> {/* Enlace a la página de añadir facultades */}
              <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-2 py-1">
                Añadir Facultad
              </button>
            </Link>
          </div>
          <div className="max-h-[700px] overflow-y-auto">
          <table className="table-auto w-full dark:text-slate-300 overflow-y-auto ">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">ID de Facultad</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">
                    Nombre de Facultad
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Acciones</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {facultades.map((Faculty) => (
                <tr key={Faculty.idFaculty}>
                  <td className="p-2">{Faculty.idFaculty}</td>
                  <td className="p-2">{Faculty.facultyName}</td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 mx-1"
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                      onClick={() => setFacultyToDelete(Faculty.idFaculty)} // Establece el ID de la facultad para eliminar
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {facultyToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar esta facultad?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDeleteFaculty}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setFacultyToDelete(null)} // Cancelar la eliminación
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

export default FacultadTable;
