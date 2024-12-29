import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ReviewCarousel.css';

const ReviewCarousel = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4 } },
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="review-carousel">
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet.</p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="review-item"
            variants={reviewVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3>{reviews[currentIndex].name}</h3>
            <p>{reviews[currentIndex].review}</p>
            <div className="stars">
              {[...Array(5)].map((_, idx) => (
                <span
                  key={idx}
                  className={`star ${idx < reviews[currentIndex].rating ? 'filled' : ''}`}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation Arrows */}
      <button
        className="arrow-btn arrow-left"
        onClick={handlePrev}
        aria-label="Previous review"
      >
        &#8592;
      </button>
      <button
        className="arrow-btn arrow-right"
        onClick={handleNext}
        aria-label="Next review"
      >
        &#8594;
      </button>

      {/* Dots Indicator */}
      <div className="dots-container">
        {reviews.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
