import React from "react";
import Modal from "./Modal";


const ConfirmModal = ({ open, title, message, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="confirm-modal">
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-confirm"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;