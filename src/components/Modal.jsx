import { X } from "lucide-react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;