import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import './Footer.css'; // Create a corresponding CSS file for styling
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="https://res.cloudinary.com/daxeovezx/image/upload/v1732570971/Group_241_sq2s3t.png" alt="SH-FEET Handmade Shoe" className="logo-img" />
        </div>
        <div className="footer-section">
          <h4>SH_FEET</h4>
          <ul className='links'>
            <li ><a href="/about" style={{ color: 'black' }}>About Us</a>
            </li>
            <li className='link'><Link to="/menu" style={{ color: 'black' }}>Men's Footwear</Link></li>
            <li className='link'><Link to="/menu2" style={{ color: 'black' }}>Women's Footwear</Link></li>

        
          </ul>
        </div>
        <div className="footer-section">
          <h4>Address</h4>
          <p>Dawaki, FCT Abuja Nigeria.</p>
        </div>
        <div className="footer-section">
          <h4>Socials</h4>
          <ul className="social-icons">
            <li className='instagram'><a href="https://www.instagram.com/sh_feet_official/profilecard/?igsh=emUxMW5xMGlvNXAw" ><FaInstagram color="#E1306C" /></a></li>
            <li className='facebook'><a href="https://www.facebook.com/chisom.ugongene?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FaFacebookF color="#4267B2"/></a></li>
            <li className='linkedin'><a href="https://wa.me/2348133267721" target="_blank" rel="noopener noreferrer"><FaWhatsapp color="#1DA1F2"/></a></li>
          </ul>
        </div>
      </div>
      <div className='copy1'>
        <p className='copy'>Copyright @ SH_FEET 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
