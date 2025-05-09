import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h1 className="footer-logo">Crave<span>Cart</span></h1>
          <p>🍩 Taste the Love in Every Bite!</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className='footer-section'>
          <h3>Explore</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-section'>
          <h3>Contact</h3>
          <ul>
            <li>📞 +91 2567 3456 34</li>
            <li>📧 contact@cravecart.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copy'>© 2025 CraveCart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
