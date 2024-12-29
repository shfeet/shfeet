import React, {} from 'react';
import './AboutUs.css';
import Footer from '../Footer';
import { motion } from "framer-motion";

// import ReviewCarousel from './ReviewCarousel'; 

const AboutUs = () => {

  return (
    <div>
      <section className="about-us-section">
        <div className="content-container">
          <div className="image-placeholder"></div>
          <div className="about-text">
            <h1>About Us</h1>
            <p>
            At SH Feet we believe that true craftsmanship speaks for itself. we specialise in creating handmmade high quality footwear that combines comfort, style and durability.
            Each pair is carefully crafted with attention to detail ensuring that your footwears are as unique as you are.
            </p>
            <p>
              In addition to our signature footwear, we offer a curated selection of other leather products including belts, wallets, bags and bracelets.
              Every item is made with the same commitment to excellence designed to stand the test of time. 
              Our mission is simple ; to offer timeless and beautifully created leather products that compliments your lifestyle.
              We strive to bring you pieces that will become a lasting part of your journey.
            </p>
            <p>Thank you for always choosing SH Feet where quality meets craftsmanship.</p>
           
            <a href="/menu">
        <motion.button
          className="explore-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Explore More
        </motion.button>
        </a>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default AboutUs;
