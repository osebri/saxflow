import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './Metronome.css'; // Import the CSS file

const Metronome = () => {
  const [bpm, setBpm] = useState(60); // Default BPM
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatsPerBar, setBeatsPerBar] = useState(4); // Default beats per bar
  const [subdivision, setSubdivision] = useState(1); // Default subdivision
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      startMetronome();
    } else {
      stopMetronome();
    }

    return () => stopMetronome();
  }, [isPlaying, bpm, beatsPerBar, subdivision]);

  useEffect(() => {
    if (isPlaying) {
      updatePendulumAnimation();
    }
  }, [bpm]);

  const startMetronome = () => {
    playClick(true); // Play a click sound immediately
    const interval = (60 / bpm) * 1000 / subdivision;
    let beatCounter = 0;
    timerRef.current = setInterval(() => {
      if (beatCounter % subdivision === 0) {
        setCurrentBeat(prev => (prev + 1) % beatsPerBar);
        playClick(true); // Normal volume for the beat
      } else {
        playClick(false); // Lower volume for subdivisions
      }
      beatCounter++;
    }, interval);
    updatePendulumAnimation();
  };

  const stopMetronome = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setCurrentBeat(0);
    }
    anime.remove('#Pendulum');
    anime.remove('#Marker');
    anime.remove('#Marker_2');
  };

  const playClick = (isBeat) => {
    const audio = new Audio('./Perc_ClickToy_hi.wav'); // Path to the click sound file
    audio.volume = isBeat ? 1 : 0.5;
    audio.play();
  };

  const updatePendulumAnimation = () => {
    const duration = (60 / bpm) * 1000;

    // Pendulum animation
    anime({
      targets: '#Pendulum',
      rotate: [
        { value: 40, duration: 0 },
        { value: 0, duration: duration / 2, easing: 'linear' },
        { value: -40, duration: duration / 2, easing: 'linear' },
        { value: 0, duration: duration / 2, easing: 'linear' },
        { value: 40, duration: duration / 2, easing: 'linear' },
      ],
      loop: true,
    });

    // Ellipse color change animation
    anime({
      targets: ['#Ellipse 1', '#Ellipse 2'],
      fill: [
        { value: 'red', duration: duration / 4, easing: 'linear' },
        { value: 'none', duration: duration / 4, easing: 'linear' },
        { value: '#fff', duration: duration / 4, easing: 'linear' },
        { value: 'none', duration: duration / 4, easing: 'linear' },
      ],
      loop: true
    });
  };

  const handleBpmChange = (newBpm) => {
    setBpm(Math.max(40, Math.min(newBpm, 240)));
  };

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <h1 style={styles.heading}>Metronome</h1>
        <div style={styles.bpmControl}>
          <label>BPM: </label>
          <input
            type="number"
            value={bpm}
            onChange={(e) => handleBpmChange(parseInt(e.target.value))}
            min="40"
            max="240"
            style={styles.input}
          />
        </div>
        <div style={styles.dropdown}>
          <label>Beats per Bar: </label>
          <select
            value={beatsPerBar}
            onChange={(e) => setBeatsPerBar(parseInt(e.target.value))}
            style={styles.select}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div style={styles.dropdown}>
          <label>Subdivision: </label>
          <select
            value={subdivision}
            onChange={(e) => setSubdivision(parseInt(e.target.value))}
            style={styles.select}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <button onClick={() => setIsPlaying(!isPlaying)} className="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>
        <div style={styles.beatContainer}>
          {Array.from({ length: beatsPerBar }, (_, i) => (
            <div
              key={i}
              style={{
                ...styles.beatBox,
                backgroundColor: currentBeat === i ? 'white' : 'black',
                color: currentBeat === i ? 'black' : 'white',
                borderColor: currentBeat === i ? 'white' : 'gray',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.pendulumContainer}>
        <PendulumAnimation bpm={bpm} isPlaying={isPlaying} />
        <div style={styles.sliderContainer}>
          <button
            onClick={() => handleBpmChange(bpm - 1)}
            className="adjustButton"
          >
            -
          </button>
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => handleBpmChange(parseInt(e.target.value))}
            className="slider"
          />
          <button
            onClick={() => handleBpmChange(bpm + 1)}
            className="adjustButton"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const PendulumAnimation = ({ bpm, isPlaying }) => {
  React.useEffect(() => {
    if (isPlaying) {
      const duration = (60 / bpm) * 1000;
      anime({
        targets: '#Pendulum',
        rotate: [
          { value: 40, duration: 0 },
          { value: 0, duration: duration / 2, easing: 'linear' },
          { value: -40, duration: duration / 2, easing: 'linear' },
          { value: 0, duration: duration / 2, easing: 'linear' },
          { value: 40, duration: duration / 2, easing: 'linear' },
        ],
        loop: true,
      });

      anime({
        targets: ['#Marker_2'],
        fill: [
          { value: '#fff', duration: duration},
          { value: 'none', duration: duration},
        ],
        loop: true
      });

      anime({
        targets: ['#Marker'],
        fill: [
          { value: 'none', duration: duration},
          { value: '#fff', duration: duration},
        ],
        loop: true
      });

    } else {
      anime.remove('#Pendulum');
      anime.remove('#Ellipse 1');
      anime.remove('#Ellipse 2');
      anime({
        targets: '#Pendulum',
        rotate: { value: 40, duration: 0 },
      });
    }
  }, [bpm, isPlaying]);

  return (
    <svg
      width={385}
      height={319}
      viewBox="0 0 385 319"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1">
        <g id="Pendulum" style={{ transformOrigin: '185px 221px' }}>
          <rect
            id="stick"
            x={183.442}
            y={80.8449}
            width={3}
            height={142.894}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
          <g id="rectangle">
            <path
              id="Rectangle 2"
              d="M180.442 89.0103H189.442L187.642 101.469H182.242L180.442 89.0103Z"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            />
            <ellipse
              id="Ellipse 1"
              cx={183.142}
              cy={92.7478}
              rx={0.9}
              ry={1.24585}
              fill="none"
              stroke="#fff"
            />
            <ellipse
              id="Ellipse 2"
              cx={186.742}
              cy={92.7478}
              rx={0.9}
              ry={1.24585}
              fill="none"
              stroke="#fff"
            />
          </g>
        </g>
        <circle id="screw" cx={185} cy={221} r={4} fill="none" stroke="#fff" strokeWidth="2" style={{ filter: 'url(#glow)' }} />
        <g id="meter1">
          <path
            id="Meter"
            d="M70 85.9271C143.965 51.0973 226.171 51.619 300 85.9271V97C231.296 62.2747 149.397 60.4837 70 97V85.9271Z"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            style={{ filter: 'url(#glow)' }}
          />
          <circle id="Marker" cx={76} cy={89} r={4} fill="none" stroke="#fff" strokeWidth="2" style={{ filter: 'url(#glow)' }} />
          <circle id="Marker_2" cx={294} cy={89} r={4} fill="none" stroke="#fff" strokeWidth="2" style={{ filter: 'url(#glow)' }} />
        </g>
      </g>
    </svg>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(255,255,255,0.3)',
    width: '100vw',
    height: '100vh',
    color: '#fff',
    backgroundColor: '#000',
    margin: 0,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  heading: {
    color: '#fff',
  },
  bpmControl: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    marginLeft: '10px',
    width: '60px',
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #555',
    outline: 'none',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  dropdown: {
    marginBottom: '10px',
    color: '#fff',
  },
  select: {
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #555',
    outline: 'none',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
  },
  beatContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  beatBox: {
    width: '30px',
    height: '30px',
    margin: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    color: '#fff',
    border: '1px solid gray',
    boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
  },
  pendulumContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Metronome;
