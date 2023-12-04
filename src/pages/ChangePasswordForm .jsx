import React, { useState } from 'react';
import axios from 'axios';
import LogoImage from '../images/Univalle_bol_cbb_logo.png';
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
 
const ChangePasswordForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Estado para almacenar las entradas del usuario
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  // Estado para almacenar mensajes de error o éxito
  const [message, setMessage] = useState({ error: '', success: '' });
 
  // Manejador para los cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
 
  // Manejador para el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Restablece los mensajes
    setMessage({ error: '', success: '' });
 
    // Validación básica en el frontend
    if (!inputs.oldPassword) {
      setMessage({ error: 'La antigua contraseña es obligatoria.', success: '' });
      return;
    }
 
    if (!inputs.newPassword | !inputs.confirmNewPassword) {
      setMessage({ error: 'Las nuevas contraseña son obligatoria.', success: '' });
      return;
    } else if (inputs.newPassword.length < 6 | inputs.newPassword.length > 12 | inputs.confirmNewPassword.length < 6 | inputs.confirmNewPassword.length > 12) {
      setMessage({ error: 'Las nueva contraseña deben tener entre 6 a 12 caracteres.', success: '' });
      return;
    }
 
    if (inputs.newPassword !== inputs.confirmNewPassword) {
      setMessage({ error: 'Las contraseñas nuevas no coinciden.', success: '' });
      return;
    }
 
    // Obtiene el email del usuario almacenado, por ejemplo, durante el inicio de sesión
    const userEmail = localStorage.getItem("userEmail");
 
    if (!userEmail) {
      setMessage({ error: 'No se encontró el correo electrónico del usuario.', success: '' });
      return;
    }
 
    try {
      // Llamada a la API para cambiar la contraseña
      const response = await axios.post('https://localhost:7205/api/Usuarios/api/users/change-password', {
        Email: userEmail,
        OldPassword: inputs.oldPassword,
        NewPassword: inputs.newPassword,
        ConfirmNewPassword: inputs.confirmNewPassword
      });
 
      // Si todo va bien, actualiza el mensaje de éxito
      setMessage({ error: '', success: 'Contraseña actualizada con éxito.' });
      // Opcional: limpia los inputs o redirige al usuario
    } catch (error) {
      // Actualiza el mensaje de error; podrías personalizar el mensaje basado en la respuesta de la API
      setMessage({ error: error.response.data, success: '' });
    }
  };
 
  // Formulario JSX
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                class="w-8 h-8 mr-2"
                src={LogoImage}
                alt="logo"
              />
              Univalle
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Cambio de contraseña
                </h1>
                <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Anterior Contraeseña
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      maxLength={15}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      size="lg"
                      value={inputs.oldPassword}
                      placeholder="Antigua contraseña"
                      onChange={handleInputChange}
                      required
                    />
                    <br />
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      size="lg"
                      maxLength={15}
                      placeholder="Nueva contraseña"
                      name="newPassword"
                      value={inputs.newPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <br />
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Repita nueva contraseña
                    </label>
                    <input
                      type="password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      size="lg"
                      maxLength={15}
                      placeholder="Nueva contraseña"
                      name="confirmNewPassword"
                      value={inputs.confirmNewPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <br />
                    <button
                      className={`bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white p-2 mb-4 w-full font-medium rounded-lg  transition duration-200 transform hover:scale-105`}
                      type='submit'
                    >
                      Confirmar
                    </button>
                    {message.error && <p className="error">{message.error}</p>}
                    {message.success && <p className="success">{message.success}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
 
export default ChangePasswordForm;