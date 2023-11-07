import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root"); 

function ModalConfirmacion({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confirmación de Creación"
      className="modal-content"
      overlayClassName="modal-overlay"
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Ancho máximo para pantallas pequeñas
          maxWidth: "400px", // Ancho máximo para pantallas grandes
        },
      }}
    >
      <div className="bg-white rounded-md p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">
            Creado con éxito
          </h2>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-5xl mb-4"
          />
          <br></br>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={closeModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirmacion;
