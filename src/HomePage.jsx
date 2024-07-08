import React from 'react';
import Slideshow from './Slideshow';
import VideoPlayer from './VideoPlayer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-left">
        <Slideshow />
      </div>
      <div className="homepage-right">
        <VideoPlayer />
      </div>
    </div>
  );
};

export default HomePage;
