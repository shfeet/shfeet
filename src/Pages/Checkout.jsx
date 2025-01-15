import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { AnimatePresence } from 'framer-motion';
import OrderModal from './OrderModal';

const statesAndRegions = {
  "North": [
    "Kano", "Kaduna", "Sokoto", "Borno", "Yobe", 
    "Kebbi", "Zamfara", "Jigawa", "Gombe", "Adamawa", 
    "Taraba", "Katsina", "Bauchi"
  ],
  "South": [
    "Lagos", "Ogun", "Ondo", "Ekiti", "Osun", 
    "Oyo", "Edo", "Delta", "Bayelsa", "Rivers", 
    "Cross River", "Akwa Ibom"
  ],
  "East": [
    "Anambra", "Enugu", "Ebonyi", "Abia", "Imo"
  ],
  "West": [
    "Kwara", "Kogi", "Niger", "Benue", "Plateau", 
    "Nassarawa", "FCT"
  ]
};

const deliveryFees = {
  North: 4000,
  South: 4000,
  East: 4000,
  West: 4000,
};

const Checkout = ({ cartItems, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    state: '',
    customize: '',
    delivery: '0', // Initialize delivery fee
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [orderStatus, setOrderStatus] = useState(''); // Order status for modal ('success' or 'failure')
  const [buttonText, setButtonText] = useState('Finish'); // Button text state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state for button disabling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    let deliveryFee = 0;

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity > 3) {
      deliveryFee = 6000; // Set delivery fee to 6000 if total quantity of items exceeds 3
    } else {
      const selectedRegion = Object.keys(statesAndRegions).find(region =>
        statesAndRegions[region].includes(formData.state)
      );
      deliveryFee = deliveryFees[selectedRegion] || 0; // Get region-based delivery fee
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      delivery: deliveryFee.toString(), // Update delivery fee
    }));
  }, [formData.state, cartItems]);

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = parseInt(formData.delivery, 10) || 0; // Use delivery fee from formData
    return itemsTotal + deliveryFee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting the following data:', { items: cartItems, clientInfo: formData }); // Log the payload
    setButtonText('Processing...');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://shfeet-backend.vercel.app/api/checkout', { // Replace with your API endpoint
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
          state: '',
          delivery: '0',
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
            State:
            <select
              className="inputs"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {Object.values(statesAndRegions).flat().map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label>
            Delivery Fee: ₦ <span>{formData.delivery || '0'}</span>
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
            />
          </label>

          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'disabled' : ''}`}
            disabled={isSubmitting}
          >
            {buttonText}
          </button>
          <p>
          Please check your mail for your order details and next steps.<br />
Note:
Orders are processed and delivered within 7 working days.<br />
Thank you for choosing us!
          </p>
        </form>

        <AnimatePresence>
          {isModalOpen && (
            <OrderModal
              status={orderStatus}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;
