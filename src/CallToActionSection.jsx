import React from "react";
import { motion } from "framer-motion";
import "./CallToActionSection.css";

const CallToActionSection = () => {
  const menImages = [
    "https://res.cloudinary.com/daxeovezx/image/upload/v1732801132/BeauToday_Chunky_Brogue_Shoes_for_Men_fkp79y.jpg",
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735415400/13_hlaugz.jpg",
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735415400/14_jyf4vd.jpg",
  ];

  const womenImages = [
    "https://res.cloudinary.com/daxeovezx/image/upload/v1732803182/French_Flat_Slippers_Women_s_Summer_Wear_Retro_Buckle_Sandals_Lazy_Casual_Vacation_Beach_Shoes_-_Black_38_czi930.jpg",
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735422505/13_rszfsi.jpg",
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735422509/11_d57r2y.jpg",
  ];

  return (
    <section className="">
        <div className="produc">
        <h2 className="section-title">Shop Our Footwears</h2>
        </div>
        <div className="cta-section">
      <div className="cta-box">
        <a href="/menu" className="cta-link">
          <div className="image-slider">
            {menImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt="Men Footwear"
                className="background-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 3,
                  delay: index * 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
          <div className="overlay"></div>
          <motion.h2
            className="cta-text"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: [0, 1, 0] }}
            // transition={{
            //   duration: 2,
            //   repeat: Infinity,
            // }}
          >
            Men Footwear
          </motion.h2>
        </a>
      </div>
      <div className="cta-box">
        <a href="/menu2" className="cta-link">
          <div className="image-slider">
            {womenImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt="Women Footwear"
                className="background-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 4,
                  delay: index * 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
          <div className="overlay"></div>
          <motion.h2
            className="cta-text"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: [0, 1, 0] }}
            // transition={{
            //   duration: 3,
            //   repeat: Infinity,
            // }}
          >
            Women Footwear
          </motion.h2>
        </a>
      </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
