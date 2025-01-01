import React from 'react'
import Hero from '../Hero';
import ProductLines from '../ProductLines';
import WhyChooseSHFeet from '../WhyChooseSHFeet';
import Review from './Review';
import Footer from '../Footer';
import './Home.css';
import ContactUs from '../ContactUs';
import CallToActionSection from '../CallToActionSection';

 function Home() {
  return (
    <>
    <Hero/>
    <ProductLines/>
    <CallToActionSection/>
    <WhyChooseSHFeet/>
    <Review/>
    <ContactUs/>
    <Footer/>
    
    
    </>
  )
}

export default Home;