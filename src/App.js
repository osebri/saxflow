import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import LibraryPage from './LibraryPage';
import CircleRectangleAnimation from './CircleRectangleAnimation';
import Metronome from './Metronome';
import Tuner from './Tuner';
import './Navbar.css';
import './MyStudio.css';

const MyStudio = () => (
  <div className="my-studio">
    <nav>
      <ul>
        <li><Link to="/my-studio/metronome">Metronome</Link></li>
        <li><Link to="/my-studio/tuner">Tuner</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="metronome" element={<Metronome />} />
      <Route path="tuner" element={<Tuner />} />
      <Route path="/" element={<Metronome />} />
    </Routes>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="logo"><img src="/logo.png" alt="Logo" className="logo-img" /></Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/my-studio">MyStudio</Link></li>
            <li><Link to="/practice-session">Practice Session</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Slideshow />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/my-studio/*" element={<MyStudio />} />
          <Route path="/practice-session" element={<CircleRectangleAnimation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
