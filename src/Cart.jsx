import React, { useEffect, useRef } from 'react';
import './Cart.css';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cartItems, updateCartItem, removeFromCart, closeCart, onCheckout, clearCart }) => {
  const cartRef = useRef(null);

  // Close cart when clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeCart]);

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
  };

  return (
    <motion.div
      className="cart-dropdown-content"
      ref={cartRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with Close Button */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btns" onClick={closeCart}>
          <FaTimes />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div>
          <p className="empty">Your cart is empty!!</p>
          <Link to="/menu" className="browse-btn">
            Browse our categories
          </Link>
        </div>
      ) : (
        <AnimatePresence>
          {cartItems.map((item, index) => (
            <motion.div
              key={index}
              className="cart-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.name}</p>
                <p>Price: ₦{item.price}</p>
                <p>Size: {item.size}</p> {/* Display shoe size */}
                <div className="quantity-controls">
                  <button
                    className="minus"
                    onClick={(e) => {
                      handleButtonClick(e);
                      updateCartItem(index, item.quantity - 1);
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="plus"
                    onClick={(e) => {
                      handleButtonClick(e);
                      updateCartItem(index, item.quantity + 1);
                    }}
                  >
                    +
                  </button>
                  <div
                    className="delete"
                    onClick={(e) => {
                      handleButtonClick(e);
                      removeFromCart(index);
                    }}
                  >
                    <FaTrash />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {cartItems.length > 0 && (
        <motion.button
          className="checkout-btn"
          whileHover={{ scale: 1.05, backgroundColor: '#006400' }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-block',
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '0.8rem 1.25rem',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'background-color 0.3s ease',
          }}
          onClick={onCheckout}
        >
          <Link
            to="/checkout"
            onClick={clearCart}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            CHECKOUT
          </Link>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Cart;
