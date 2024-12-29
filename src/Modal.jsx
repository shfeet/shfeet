import React from 'react';
import './index.css'; // Make sure to create this CSS file for modal styling

const Modal = ({ show, onClose }) => {
  if (!show) return null; // If `show` is false, don't render the modal

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Welcome to Our Homepage!</h2>
        <p>This is a stylish modern modal that appears on page reload!</p>
        <button className="modal-action" onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
};

export default Modal;
