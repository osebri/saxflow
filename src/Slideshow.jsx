import React, { useState } from 'react';
import './Slideshow.css';

const Slideshow = () => {
  const images = [
    'cover1.jpg', // Replace with your image paths
    'cover2.jpg',
    'cover3.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow-container">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="buttons-container">
        <button className="slideshow-button">Join Our Community</button>
        <button className="slideshow-button">SaxFlow for Teachers</button>
      </div>
    </div>
  );
};

export default Slideshow;
