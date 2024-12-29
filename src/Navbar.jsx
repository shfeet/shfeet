import React, { useState} from 'react';
import './index.css';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ cartItems, updateCartItem, removeFromCart, onCheckout }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
 

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  


  

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="">
        <a href="/"><img className='logo-img' src='https://res.cloudinary.com/daxeovezx/image/upload/v1732570971/Group_241_sq2s3t.png' alt='logo'></img> {/* You can use Link here if using React Router */} </a>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/about">ABOUT US</Link></li>
       
        <li><Link to="/menu">MEN'S FOOTWEAR</Link></li>
        <li><Link to="/menu2">WOMEN'S FOOTWEAR</Link></li>
      </ul>

      <AnimatePresence>
        {/* Mobile Menu Animation */}
        {isMobile && (
          <motion.ul
            className="nav-links-mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <li><Link to="/" onClick={() => setIsMobile(false)}>HOME</Link></li>
            <li><Link to="/about" onClick={() => setIsMobile(false)}>ABOUT US</Link></li>

          

            <li><Link to="/menu" onClick={() => setIsMobile(false)}>MEN FOOTWEAR</Link></li>
            <li><Link to="/menu2" onClick={() => setIsMobile(false)}>WOMEN FOOTWEAR</Link></li>
         
            <div className="close-icon" onClick={toggleMenu}>
              <FaTimes />
            </div>
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="menu-icon" onClick={toggleMenu}>
        {isMobile ? <FaBars /> : <FaBars />}
      </div>

      <div className="cart-icon" onClick={toggleCart}>
        <FaShoppingCart />
        {itemCount > 0 && <span className="cart-counter">{itemCount}</span>}
      </div>

      <AnimatePresence>
        {/* Cart Dropdown Animation */}
        {isCartOpen && (
          <motion.div
            className="cart-dropdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Cart 
              cartItems={cartItems}
              updateCartItem={updateCartItem}
              removeFromCart={removeFromCart}
              closeCart={closeCart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
