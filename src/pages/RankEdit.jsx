import React, { useState, useEffect } from "react";
import axios from "axios";

function RankEdit() {
  const [NameRank, setNameRank] = useState("");
  const [NameSubrank, setNameSubrank] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [availableImages, setAvailableImages] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    async function fetchAvailableImages() {
      try {
        const response = await axios.get("https://localhost:7205/api/Ranks/availableImages");
        setAvailableImages(response.data);
      } catch (error) {
        console.error("Error al obtener las imágenes disponibles:", error);
      }
    }

    fetchAvailableImages();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});

    if (!NameRank) {
      setErrors({ NameRank: "El nombre del rango es obligatorio." });
      return;
    }

    if (!NameSubrank) {
      setErrors({ NameSubrank: "El nombre del subrango es obligatorio." });
      return;
    }

    if (!selectedImage) {
      setErrors({ selectedImage: "Debes seleccionar una imagen." });
      return;
    }

    const data = {
      NameRank: NameRank,
      NameSubrank: NameSubrank,
      ImagePath: selectedImage,
    };

    try {
      const response = await axios.post(
        "https://localhost:7205/api/Ranks",
        data
      );

      console.log("Rango creado con éxito:", response.data);

      setModalIsOpen(true);
      setNameRank("");
      setNameSubrank("");
      setSelectedImage("");
    } catch (error) {
      console.error("Error al crear el rango:", error);
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="NameRank">Nombre de Rango</label>
          <input
            type="text"
            id="NameRank"
            value={NameRank}
            onChange={(e) => setNameRank(e.target.value)}
          />
          {errors.NameRank && (
            <p className="error">{errors.NameRank}</p>
          )}
        </div>
        <div>
          <label htmlFor="NameSubrank">Nombre de Subrango</label>
          <input
            type="text"
            id="NameSubrank"
            value={NameSubrank}
            onChange={(e) => setNameSubrank(e.target.value)}
          />
          {errors.NameSubrank && (
            <p className="error">{errors.NameSubrank}</p>
          )}
        </div>
        <div>
          <label htmlFor="selectedImage">Selecciona una imagen</label>
          <select
            id="selectedImage"
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una imagen
            </option>
            {availableImages.map((image, index) => (
              <option key={index} value={image}>
                {image}
              </option>
            ))}
          </select>
          {errors.selectedImage && (
            <p className="error">{errors.selectedImage}</p>
          )}
        </div>
        <button type="submit">Crear Rango</button>
      </form>

    </div>
  );
}

export default RankEdit;
