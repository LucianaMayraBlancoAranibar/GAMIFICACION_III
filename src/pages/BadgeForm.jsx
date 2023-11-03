import React, { useState } from 'react';
import axios from 'axios';

const BadgeForm = () => {
  const [badgeName, setBadgeName] = useState('');
  const [idTypeAchievement, setIdTypeAchievement] = useState('');
  const [administratorId, setAdministratorId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7205/api/Badges/CreateDefaults', {
        BadgeName: badgeName,
        IdTypeAchievement: idTypeAchievement,
        AdministratorId: administratorId,
      });

      // Manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito o redirigir
      console.log(response.data);
    } catch (error) {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
      console.error('Hubo un error al enviar los datos:', error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Badge:
        <input
          type="text"
          value={badgeName}
          onChange={(e) => setBadgeName(e.target.value)}
        />
      </label>

      <label>
        ID del Tipo de Logro:
        <input
          type="number"
          value={idTypeAchievement}
          onChange={(e) => setIdTypeAchievement(e.target.value)}
        />
      </label>

      <label>
        ID del Administrador:
        <input
          type="number"
          value={administratorId}
          onChange={(e) => setAdministratorId(e.target.value)}
        />
      </label>

      <button type="submit">Crear Badges Predeterminados</button>
    </form>
  );
};

export default BadgeForm;
