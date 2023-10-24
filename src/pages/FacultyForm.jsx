import React, { useState, useEffect } from "react";
import axios from "axios";

function RankForm() {
  const [NameRank, setNameRank] = useState("");
  const [NameSubrank, setNameSubrank] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        "https://localhost:7187/api/Ranks",
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

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
              <option value="">Selecciona una imagen</option>
              <option value="image1.jpg">Imagen 1</option>
              <option value="image2.jpg">Imagen 2</option>
              <option value="image3.jpg">Imagen 3</option>
            </select>
            {errors.selectedImage && (
              <p className="error">{errors.selectedImage}</p>
            )}
          </div>
        </div>
        <button type="submit">Crear Rango</button>
      </form>
      <Modal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}

export default RankForm;