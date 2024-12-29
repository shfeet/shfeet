import React from 'react';
import './OrderModal.css';
import { motion } from 'framer-motion';

const Modal = ({ status, closeModal }) => {
  const modalVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: { opacity: 1, y: '0' },
    exit: { opacity: 0, y: '100vh' }
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="modal-content">
        <h2>{status === 'success' ? 'Order Successful 🎉' : 'Order Failed 😢'}</h2>
        <p>
          {status === 'success'
            ? 'Thank you for your order! Your items will be delivered within 7 working days.'
            : 'Something went wrong with your order. Please try again later.'}
        </p>
        <button className="close-modal-btn" onClick={closeModal}>Close</button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
