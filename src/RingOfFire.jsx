import React from 'react';
import './RingOfFire.css';

const RingOfFire = ({ pitch, detune }) => {
  const getColor = () => {
    if (!pitch) {
      return '#fff'; // White when no pitch is detected
    }

    // Calculate color based on detune
    const maxDetune = 50; // Maximum detune value for full red
    const normalizedDetune = Math.min(Math.abs(detune) / maxDetune, 1);
    const red = Math.floor(255 * normalizedDetune);
    const green = Math.floor(255 * (1 - normalizedDetune));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="circle" style={{ borderColor: getColor() }}></div>
  );
};

export default RingOfFire;
