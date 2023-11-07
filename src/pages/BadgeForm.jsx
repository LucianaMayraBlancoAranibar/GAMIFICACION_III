import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Asegúrate de instalar react-select con npm install react-select

const BadgeCreationForm = () => {
  const [badgeName, setBadgeName] = useState('');
  const [idTypeAchievement, setIdTypeAchievement] = useState(null);
  const [tipoLogros, setTipoLogros] = useState([]);
  const [loading, setLoading] = useState(false);

  // Suponiendo que tengas una URL base para tu API
  const API_BASE_URL = "https://localhost:7205/api";

  // Aquí debes cargar tus tipos de logro de la API o definirlos si son estáticos.
  useEffect(() => {
    // Ejemplo de carga de los tipos de logro:
    const cargarTipoLogros = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/TypeAchievements`);
        setTipoLogros(response.data.map(tl => ({ value: tl.idTypeAchievement, label: tl.nameTypeAchievement })));
      } catch (error) {
        console.error('Error cargando los tipos de logro', error);
      } finally {
        setLoading(false);
      }
    };

    cargarTipoLogros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Obtener el ID del usuario administrador desde el almacenamiento local.
    const adminId = localStorage.getItem('userID');

    try {
      const response = await axios.post(`${API_BASE_URL}/Badges/CreateDefaults`, {
        AdministratorId: adminId,
        BadgeName: badgeName,
        // Aquí se usa el operador ternario para enviar null si idTypeAchievement no está seleccionado
        IdTypeAchievement: idTypeAchievement ? idTypeAchievement.value : null,
      });

      console.log(response.data);
      // Manejar la respuesta o redirigir al usuario.
    } catch (error) {
      console.error('Hubo un error al crear los badges');
  if (error.response) {
    // La respuesta del servidor fue fuera de rango 2xx
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió respuesta
    console.error('Request:', error.request);
  } else {
    // Algo más causó un error
    console.error('Error:', error.message);
  }
    } finally {
      setLoading(false);
    }
};


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="badgeName" className="block text-sm font-medium text-gray-700">Nombre del Badge</label>
        <input
          type="text"
          id="badgeName"
          value={badgeName}
          onChange={(e) => setBadgeName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="idTypeAchievement" className="block text-sm font-medium text-gray-700">Tipo de Logro</label>
        <Select
          id="idTypeAchievement"
          value={idTypeAchievement}
          onChange={setIdTypeAchievement}
          options={tipoLogros}
          className="mt-1 block w-full"
          isClearable={true}
          isSearchable={true}
          isLoading={loading}
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Badges'}
        </button>
      </div>
    </form>
  );
};

export default BadgeCreationForm;
