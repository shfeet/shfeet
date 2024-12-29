import React, { useState } from 'react';
import './Checkout.css';
import { AnimatePresence } from 'framer-motion';
import OrderModal from './OrderModal';

const Checkout = ({ cartItems, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    customize: '', // Optional customization field
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [orderStatus, setOrderStatus] = useState(''); // Order status for modal ('success' or 'failure')
  const [buttonText, setButtonText] = useState('Finish'); // Button text state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state for button disabling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting the following data:', { items: cartItems, clientInfo: formData }); // Log the payload
    setButtonText('Processing...');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/checkout', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems, clientInfo: formData }),
      });

      if (response.ok) {
        setOrderStatus('success'); // Set order status to success
        setButtonText('Submitted!');
        clearCart(); // Clear the cart on success
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          customize: '', // Reset customization field on success
        });
      } else {
        throw new Error('Order processing failed'); // Throw an error if response is not ok
      }
    } catch (error) {
      console.error('Error:', error);
      setOrderStatus('failure'); // Set order status to failure
      setButtonText('Try Again');
    } finally {
      setIsModalOpen(true); // Open the modal after submission
      setTimeout(() => {
        setButtonText('Finish'); // Reset button text
        setIsSubmitting(false);
      }, 2000); // Reset state after 2 seconds
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <section className="checkouts">
      <div className="checkout-page">
        <h1>Checkout</h1>
        <div className="cart-summary">
          <h2>Items in Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <p>
                  {item.name} - ₦{item.price} x {item.quantity}
                </p>
                <p>
                  <strong>Size:</strong> {item.size}
                </p>
              </div>
            ))
          )}
          <h3>Total: ₦{calculateTotal()}</h3>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Client Information</h2>
          <label>
            Name:
            <input
              className="input"
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              className="input"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              className="input"
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Customize Your Order:
            <input
              className="input"
              type="text"
              placeholder="Customize your order color"
              name="customize"
              value={formData.customize}
              onChange={handleChange}
              required
            />
          </label>

          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'disabled' : ''}`}
            disabled={isSubmitting}
          >
            {buttonText}
          </button>
          <p>Note: All orders will be fulfilled & delivered after 7 working days.</p>
        </form>

        {/* Modal for Order Status */}
        <AnimatePresence>
          {isModalOpen && (
            <OrderModal
              status={orderStatus}
              closeModal={() => setIsModalOpen(false)} // Pass function to close modal
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;
