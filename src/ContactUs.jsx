import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // Feedback message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('Failed to send the message.');
      }
    } catch (error) {
      setFormStatus('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-us">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Contact <span>Us</span>
          </h1>
          <p>Let us help you! Fill out the form below to get in touch with us.</p>
        </motion.div>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
          {formStatus && (
            <motion.p
              className="form-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {formStatus}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default ContactUs;
