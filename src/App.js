import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom'; 
import Navbar from './Navbar';
// import Modal from './Modal';
import MenuPage from './Pages/MenuPage';
import WomenMenuPage from './Pages/WomenMenuPage';
import Checkout from './Pages/Checkout'; // Import the Checkout component
import AboutUs from './Pages/AboutUs';
import OrderModal from './Pages/OrderModal';// Import the OrderModal component
import Home from './Pages/Home';


const AppContent = ({ cartItems, setCartItems, updateCartItem, clearCart, showOrderModal, setShowOrderModal, orderStatus }) => {
  // const [showModal, setShowModal] = useState(true);
  // const location = useLocation(); 

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setShowModal(true);
  //   } else {
  //     setShowModal(false); 
  //   }
  // }, [location.pathname]); 

  return (
    <div className="App">
      <Navbar 
        cartItems={cartItems} 
        updateCartItem={updateCartItem} 
        removeFromCart={removeFromCart} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage cartItems={cartItems} setCartItems={setCartItems} />} /> 
        <Route path="/menu2" element={<WomenMenuPage cartItems={cartItems} setCartItems={setCartItems} />} /> 
        
        <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} setShowOrderModal={setShowOrderModal} />} /> {/* Pass setShowOrderModal to Checkout */}
        <Route path="/about" element={<AboutUs />} />
      
        {/* Other routes here */}
      </Routes>
      {/* {location.pathname === '/' && <Modal show={showModal} onClose={handleCloseModal} />} */}
      {/* Render OrderModal based on orderStatus */}
      {showOrderModal && <OrderModal status={orderStatus} onClose={() => setShowOrderModal(false)} />}
    </div>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false); // State for OrderModal visibility
  const [orderStatus, setOrderStatus] = useState(''); // State to manage order status (success or failure)

  // Update cart item quantity
  const updateCartItem = (index, quantity) => {
    const newCartItems = [...cartItems];
    if (quantity <= 0) {
      newCartItems.splice(index, 1); 
    } else {
      newCartItems[index].quantity = quantity;
    }
    setCartItems(newCartItems);
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]); // This will clear the cart
  };

  // Retrieve cart items from localStorage when the app loads
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems)); // Set cartItems to saved items
    }
  }, []);

  // Store the cartItems in localStorage every time cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Store updated cart items in localStorage
    }
  }, [cartItems]);

  return (
    <Router>
      <AppContent 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        updateCartItem={updateCartItem} 
        clearCart={clearCart} 
        showOrderModal={showOrderModal} 
        setShowOrderModal={setShowOrderModal} 
        orderStatus={orderStatus} 
        setOrderStatus={setOrderStatus}
      />
    </Router>
  );
}

export default App;
