import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="logo.png" alt="Logo" className="logo" />
      <div className="nav-links">
        <a href="#library">Library</a>
        <a href="#mystudio">MyStudio</a>
        <a href="#practice-session">Practice Session</a>
        <a href="#login">Log in</a>
      </div>
    </nav>
  );
};

export default Navbar;
