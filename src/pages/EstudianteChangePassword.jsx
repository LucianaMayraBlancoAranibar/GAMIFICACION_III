import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link, useParams } from "react-router-dom";

function EstudianteChangePassword() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { id } = useParams();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [studentName, setStudentName] = useState(''); // Agrega un estado para almacenar el nombre del estudiante
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('/api/change-password', {
                studentId: id,
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                // Contraseña cambiada con éxito, puedes redirigir al estudiante a una página de confirmación
                setModalIsOpen(true); // Mostrar el modal de confirmación
            }
        } catch (error) {
            setError('Error al cambiar la contraseña. Asegúrate de que la contraseña actual sea correcta.');
        }
    };

    useEffect(() => {
        // Realiza una solicitud para obtener los datos del estudiante utilizando el ID
        axios.get(`/api/students/${id}`)
            .then((response) => {
                const { firstName, lastName } = response.data;
                setStudentName(`${firstName} ${lastName}`);
            })
            .catch((error) => {
                console.error('Error al cargar los datos del estudiante', error);
            });
    }, [id]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div>
                    <h1>Cambio de Contraseña</h1>
                    <p>Estudiante: {studentName}</p> {/* Mostrar el nombre del estudiante */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Contraseña Actual:</label>
                            <br/>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br/>
                        <div>
                            <label>Nueva Contraseña:</label>
                            <br/>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br/>
                        <div>
                            <label>Confirmar Nueva Contraseña:</label>
                            <br/>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br/>
                        <button
                            type="submit"
                            className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                        >
                            Cambiar Contraseña
                        </button>
                        <br></br>
                        <Link to="/EstudianteTable">Volver a la lista de estudiante</Link>
                    </form>                    
                    {/* Modal de confirmación */}
                    <ModalConfirmacion isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
                </div>
            </div>
        </div>
    );
}

export default EstudianteChangePassword;
