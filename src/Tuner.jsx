import React, { useEffect, useRef, useState } from 'react';
import { PitchDetector } from 'pitchy';
import RingOfFire from './RingOfFire';
import './Tuner.css';

const Tuner = () => {
  const [pitch, setPitch] = useState(null);
  const [note, setNote] = useState('');
  const [detune, setDetune] = useState(0);
  const [started, setStarted] = useState(false);
  const [transposition, setTransposition] = useState(0);
  const [temperament, setTemperament] = useState('equal');
  const [referencePitch, setReferencePitch] = useState(440);
  const [sensitivity, setSensitivity] = useState(0.8);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferLengthRef = useRef(2048);
  const pitchDetectorRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const [buffer, setBuffer] = useState(new Float32Array(bufferLengthRef.current));
  const pitchHistory = useRef([]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const getMicrophoneAccess = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = bufferLengthRef.current;
      source.connect(analyserRef.current);

      pitchDetectorRef.current = PitchDetector.forFloat32Array(bufferLengthRef.current);
      detectPitch();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const detectPitch = () => {
    const updatePitch = () => {
      if (analyserRef.current) {
        analyserRef.current.getFloatTimeDomainData(buffer);
        const [detectedPitch, clarity] = pitchDetectorRef.current.findPitch(buffer, audioContextRef.current.sampleRate);
        if (clarity > sensitivity && detectedPitch) {
          // Add pitch to history for smoothing
          pitchHistory.current.push(detectedPitch);
          if (pitchHistory.current.length > 5) {
            pitchHistory.current.shift(); // Maintain a fixed size for the history
          }

          // Calculate average pitch
          const averagePitch = pitchHistory.current.reduce((sum, p) => sum + p, 0) / pitchHistory.current.length;
          const { note, detune } = getNoteAndDetune(averagePitch);
          setPitch(averagePitch);
          setNote(note);
          setDetune(detune);
        } else {
          setPitch(null);
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(updatePitch);
    };
    updatePitch();
  };

  const getNoteAndDetune = (frequency) => {
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4 = referencePitch;
    const semitoneRatio = Math.pow(2, 1 / 12);
    const noteIndex = Math.round(12 * Math.log2(frequency / A4));
    let noteName = noteStrings[(noteIndex + 69) % 12];
    const detune = 1200 * Math.log2(frequency / (A4 * Math.pow(semitoneRatio, noteIndex)));

    if (temperament === 'just') {
      noteName = adjustToJustIntonation(noteName);
    } else if (temperament === 'pythagorean') {
      noteName = adjustToPythagorean(noteName);
    }

    noteName = noteStrings[(noteStrings.indexOf(noteName) + transposition) % 12];

    return { note: noteName, detune };
  };

  const adjustToJustIntonation = (note) => {
    const justRatios = {
      'C': 1,
      'C#': 16 / 15,
      'D': 9 / 8,
      'D#': 6 / 5,
      'E': 5 / 4,
      'F': 4 / 3,
      'F#': 45 / 32,
      'G': 3 / 2,
      'G#': 8 / 5,
      'A': 5 / 3,
      'A#': 9 / 5,
      'B': 15 / 8,
    };
    return justRatios[note];
  };

  const adjustToPythagorean = (note) => {
    const pythagoreanRatios = {
      'C': 1,
      'C#': 2187 / 2048,
      'D': 9 / 8,
      'D#': 32 / 27,
      'E': 81 / 64,
      'F': 4 / 3,
      'F#': 729 / 512,
      'G': 3 / 2,
      'G#': 128 / 81,
      'A': 27 / 16,
      'A#': 16 / 9,
      'B': 243 / 128,
    };
    return pythagoreanRatios[note];
  };

  const handleStart = () => {
    getMicrophoneAccess();
    setStarted(true);
  };

  const handleStop = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    setStarted(false);
    setPitch(null);
    setNote('');
    setDetune(0);
  };

  return (
    <div className="wrapper">
      <div className="info">
        <h1 className="title">Tuner</h1>
        <div className="controls">
          <label>
            Transposition:
            <select value={transposition} onChange={(e) => setTransposition(parseInt(e.target.value))} className="select">
              <option value={0}>C</option>
              <option value={1}>C#</option>
              <option value={2}>D</option>
              <option value={3}>D#</option>
              <option value={4}>E</option>
              <option value={5}>F</option>
              <option value={6}>F#</option>
              <option value={7}>G</option>
              <option value={8}>G#</option>
              <option value={9}>A</option>
              <option value={10}>A#</option>
              <option value={11}>B</option>
            </select>
          </label>
          <label>
            Temperament:
            <select value={temperament} onChange={(e) => setTemperament(e.target.value)} className="select">
              <option value="equal">Equal Temperament</option>
              <option value="just">Just Intonation</option>
              <option value="pythagorean">Pythagorean</option>
            </select>
          </label>
          <label>
            Tuning Reference (Hz):
            <input type="number" value={referencePitch} onChange={(e) => setReferencePitch(parseFloat(e.target.value))} className="input" />
          </label>
          <label>
            Sensitivity:
            <input type="range" min="0" max="1" step="0.1" value={sensitivity} onChange={(e) => setSensitivity(parseFloat(e.target.value))} className="slider" />
          </label>
        </div>
        <p className="pitch">Pitch: {started ? (pitch ? pitch.toFixed(2) : 'N/A') : ''}</p>
        <p className="note">Note: {started ? note : ''}</p>
        <p className="detune">Detune: {started ? (detune ? detune.toFixed(2) : 'N/A') : ''} cents</p>
        <p className="status">{started ? (detune > 0 ? 'Sharp' : detune < 0 ? 'Flat' : 'In Tune') : ''}</p>
      </div>
      <div className="circle-container">
        <RingOfFire pitch={pitch} detune={detune} />
        {!started ? (
          <button className="button" onClick={handleStart}>Start Tuning</button>
        ) : (
          <button className="button" onClick={handleStop}>Stop Tuning</button>
        )}
      </div>
      <svg>
        <filter id="wavy">
          <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2">
            <animate attributeName="baseFrequency" dur="60s" values="0.02;0.005;0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>
    </div>
  );
};

export default Tuner;
