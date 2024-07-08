import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import anime from 'animejs';

const CircleRectangleAnimation = () => {
  const location = useLocation();
  const { tutorial } = location.state || {};
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (tutorial && tutorial.notes) {
      animateNotes(tutorial.notes);
    }
  }, [tutorial]);

  const animateRectangle = (rectangle, targetElement, speed, disappearanceDuration, key) => {
    const { top, left, width: targetWidth } = targetElement.getBoundingClientRect();
    const initialWidth = rectangle.getBoundingClientRect().width;

    const distance = left + (targetWidth / 2) - rectangle.getBoundingClientRect().left - 1800;
    const movementDuration = Math.abs(distance) / speed;

    anime({
      targets: rectangle,
      translateX: distance,
      duration: movementDuration,
      easing: 'linear',
      complete: () => {
        const startTime = performance.now();
        anime({
          targets: rectangle,
          width: [initialWidth, 0],
          duration: disappearanceDuration,
          easing: 'linear',
          begin: () => {
            const noteName = key;
            const audioFilePath = `/sax-notes/${encodeURIComponent(noteName)}.wav`;
            const audio = new Audio(audioFilePath);
            audio.currentTime = 3;
            audio.volume = volume; // Set volume
            audio.play().catch((error) => {
              console.log('Audio playback failed:', error);
            });
            rectangle.audio = audio;
          },
          complete: (anim) => {
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            console.log(`Note started to disappear at ${startTime} ms and took ${elapsedTime} ms to disappear.`);
            if (anim.animatables[0].target.audio) {
              anim.animatables[0].target.audio.pause();
              anim.animatables[0].target.audio.currentTime = 0;
            }
            rectangle.remove();
          }
        });
      }
    });
  };

  const triggerSingleAnimation = (noteName, noteDuration) => {
    const keysToAnimate = noteMap[noteName] || [];
    keysToAnimate.forEach(key => {
      const targetElement = document.getElementById(key);
      if (targetElement) {
        const svgNS = "http://www.w3.org/2000/svg";
        const rectangle = document.createElementNS(svgNS, 'rect');
        const initialWidth = 250 * noteDuration;
        const disappearanceDuration = (60 / (tutorial?.bpm || 90)) * 1000 * noteDuration;
        const speed = initialWidth / disappearanceDuration;
        rectangle.setAttribute('width', `${initialWidth}`);
        rectangle.setAttribute('height', '25');
        rectangle.setAttribute('fill', 'white');
        rectangle.setAttribute('rx', '15');
        rectangle.setAttribute('style', 'filter: drop-shadow(0 0 5px white);');
        
        const cy = targetElement.getAttribute('cy');
        if (cy) {
          rectangle.setAttribute('y', cy - 15);
        } else {
          const { top } = targetElement.getBoundingClientRect();
          rectangle.setAttribute('y', `${top + window.scrollY + 5}`);
        }
        rectangle.setAttribute('x', `${window.innerWidth + 2000}`);
  
        document.querySelector('#animation-container').appendChild(rectangle);
        animateRectangle(rectangle, targetElement, speed, disappearanceDuration, noteName);
      } else {
        console.warn(`Element with ID ${key} is out of bounds.`);
      }
    });
  };

  const animateNotes = (notes) => {
    const baseInterval = 0;
    let timeCounter = 0;  
    notes.forEach((note, index) => {
      const noteName = note[0];
      const noteDuration = parseFloat(note[1]);
      setTimeout(() => {
        triggerSingleAnimation(noteName, noteDuration);
        console.log(`Animating note ${noteName} at index ${index}`);
      }, ((60 / (tutorial?.bpm || 90)) * timeCounter * 1000) + ((index + 1) * baseInterval));
      timeCounter += noteDuration;
    });
  };

  const noteMap = {
    'C4': ['Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6', 'Key7'],
    'D4': ['Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6'],
    'D#4': ['Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6', 'sharp2'],
    'E4': ['Key1', 'Key2', 'Key3', 'Key4', 'Key5'],
    'F4': ['Key1', 'Key2', 'Key3', 'Key4'],
    'F#4': ['Key1', 'Key2', 'Key3', 'Key5'],
    'G4': ['Key1', 'Key2', 'Key3'],
    'G#4': ['Key1', 'Key2', 'Key3', 'sharp1'],
    'A4': ['Key1', 'Key2'],
    'A#4': ['Key1', 'Bis'],
    'B4': ['Key1'],
    'C5': ['Key2'],
    'C#5': ['Reed'],
    'C5': ['Octave', 'Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6', 'Key7'],
    'D5': ['Octave', 'Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6'],
    'D#5': ['Octave', 'Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6', 'sharp2'],
    'E5': ['Octave', 'Key1', 'Key2', 'Key3', 'Key4', 'Key5'],
    'F5': ['Octave', 'Key1', 'Key2', 'Key3', 'Key4'],
    'F#5': ['Octave', 'Key1', 'Key2', 'Key3', 'Key5'],
    'G5': ['Octave', 'Key1', 'Key2', 'Key3'],
    'G#5': ['Octave', 'Key1', 'Key2', 'Key3', 'sharp1'],
    'A5': ['Octave', 'Key1', 'Key2'],
    'A#5': ['Octave', 'Key1', 'Bis'],
    'B5': ['Octave', 'Key1'],
    'C5': ['Octave', 'Key2'],
    'C#5': ['Octave', 'Reed'],
    'rest': [],
  };

  if (!tutorial) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: '#000', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
        <div>
          <h1>{tutorial.title}</h1>
          <h2>{tutorial.author}</h2>
        </div>
        <button className="button" onClick={() => animateNotes(tutorial.notes)}>Start Animation</button>
        <div>
          <label>Volume: </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))} 
            className="slider" 
          />
        </div>
      </div>
      <svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg" id="animation-container" style={{ width: '100%', height: '70vh', overflow: 'visible', transform: 'translateX(-15%)' }}>
        <g id="Desktop - 1">
          <g id="Keys" style={{ stroke: 'white', strokeWidth: 1, filter: 'drop-shadow(0 0 5px white)' }}>
            <path id="Key7" cy="840" d="M45 812.918C45 812.918 59.3939 812.918 79 812.918C98.6061 812.918 116 812.918 116 813.844C116 833.812 100.145 850 80.5385 850C60.9324 850 45 832.887 45 812.918Z" fill="black"/>
            <path id="sharp2" cy="820" d="M116 804.807C116 804.807 101.606 804.807 82 804.807C62.3939 804.807 45 804.807 45 803.881C45 783.913 60.8554 767.725 80.4615 767.725C100.068 767.725 116 784.838 116 804.807Z" fill="black"/>
            <ellipse id="Key6" cx="81" cy="719.056" rx="25" ry="23.176" fill="black"/>
            <ellipse id="Key5" cx="81" cy="639.099" rx="25" ry="23.176" fill="black"/>
            <ellipse id="Key4" cx="81" cy="559.142" rx="25" ry="23.176" fill="black"/>
            <ellipse id="sharp1" cx="81" cy="467.017" rx="40" ry="13.3262" fill="black"/>
            <ellipse id="Key3" cx="81" cy="400.966" rx="25" ry="23.7554" fill="black"/>
            <ellipse id="Key2" cx="81" cy="327.382" rx="25" ry="23.176" fill="black"/>
            <ellipse id="Bis" cx="81" cy="267.124" rx="15" ry="13.9056" fill="black"/>
            <ellipse id="Key1" cx="81" cy="220.773" rx="25" ry="23.176" fill="black"/>
            <path id="Octave" cy="160" d="M100 153.746C100 160.179 91.4934 174.421 81 174.421C70.5066 174.421 62 160.179 62 153.746C62 147.312 81 89.6762 81 99.1793C81 88.7565 100 147.312 100 153.746Z" fill="black"/>
            <rect id="Reed" cy="50" x="50" y="40" width="62" height="17.382" fill="black"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CircleRectangleAnimation;
