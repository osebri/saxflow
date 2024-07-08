import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: example@example.com</p>
        <p>Phone: +123-456-7890</p>
      </div>
      <div className="footer-section">
        <p>All rights reserved. &copy; 2024</p>
      </div>
      <div className="footer-section">
        <h4>Info:</h4>
        <p>Contact Us</p>
        <p>Mission</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
