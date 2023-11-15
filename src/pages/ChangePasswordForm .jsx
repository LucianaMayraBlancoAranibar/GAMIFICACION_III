import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
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
    <div>
      {message.error && <p className="error">{message.error}</p>}
      {message.success && <p className="success">{message.success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contraseña Actual:</label>
          <input
            type="password"
            name="oldPassword"
            value={inputs.oldPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="newPassword"
            value={inputs.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={inputs.confirmNewPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;