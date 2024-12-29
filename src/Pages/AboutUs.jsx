import React, {} from 'react';
import './AboutUs.css';
import Footer from '../Footer';
// import ReviewCarousel from './ReviewCarousel'; 

const AboutUs = () => {

  return (
    <div>
      <section className="about-us-section">
        <div className="content-container">
          <div className="image-placeholder"></div>
          <div className="about-text">
            <h1>Our Story</h1>
            <p>
              Established in the heart of Nigeria, we specialize in creating top-quality leather shoes. 
              With a passion for craftsmanship, each pair of shoes is handmade using 100% leather, 
              designed with utmost precision and love. Our commitment to excellence sets us apart as 
              leaders in the industry, bringing both style and durability together.
            </p>
            <p>
              We believe in the power of handmade artistry. From the South of Nigeria, our artisans pour 
              their heart and soul into every creation, ensuring that each pair is not just a product, 
              but a piece of heritage that connects with your unique style.
            </p>
            <button className="explore-button">Explore More</button>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default AboutUs;
