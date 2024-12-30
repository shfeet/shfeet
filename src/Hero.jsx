import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735557211/hero_replacement-min_ldivnm.jpg", // Replace with your Cloudinary links
    "https://res.cloudinary.com/daxeovezx/image/upload/v1732734941/pexels-kalz-michael-1277172-3558804-min_x7wavq.jpg",
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735494758/hero3_lutn7h.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-section">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>
 <div className="hero-overlay"></div> {/* Dark overlay */}
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          HANDMADE LEATHER FOOTWEAR!
        </motion.h1>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Each piece is made from a 100% leather quality and handmade with extreme precision and love.
        </motion.p>
        {/* <a href="/menu">
        <motion.button
          className="explore-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Explore More
        </motion.button>
        </a> */}
      </div>
    </div>
  );
};

export default HeroSection;
