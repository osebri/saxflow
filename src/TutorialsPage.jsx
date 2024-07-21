import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TutorialsPage.css';

const TutorialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tutorials = [
    {
      title: 'Jazz Tutorial 1',
      author: 'Author 1',
      notes: [['C4', 1.0], ['D4', 0.5], ['E4', 0.25],['C4', 1.0], ['D4', 0.5], ['E4', 0.25],['C4', 1.0], ['D4', 0.5], ['E4', 0.25],['C4', 1.0], ['D4', 0.5], ['E4', 0.25],['C4', 1.0], ['D4', 0.5], ['E4', 0.25],['C4', 1.0], ['D4', 0.5], ['E4', 0.25],['C4', 1.0], ['D4', 0.5], ['E4', 0.25]],
      bpm: 90,
      preview: `${process.env.PUBLIC_URL}/sh2.jpg`,
    },
    {
      title: 'Pop Tutorial 1',
      author: 'Author 2',
      notes: [['E4', 1.0], ['F4', 0.5], ['G4', 0.25],['E4', 1.0], ['F4', 0.5], ['G4', 0.25],['E4', 1.0], ['F4', 0.5], ['G4', 0.25],['E4', 1.0], ['F4', 0.5], ['G4', 0.25],['E4', 1.0], ['F4', 0.5], ['G4', 0.25]],
      bpm: 100,
      preview: `${process.env.PUBLIC_URL}/sh3.jpg`,
    },
    {
      title: 'Classical Tutorial 1',
      author: 'Author 3',
      notes: [['G4', 1.0], ['A4', 0.5], ['B4', 0.25],['G4', 1.0], ['A4', 0.5], ['B4', 0.25],['G4', 1.0], ['A4', 0.5], ['B4', 0.25],['G4', 1.0], ['A4', 0.5], ['B4', 0.25],['G4', 1.0], ['A4', 0.5], ['B4', 0.25]],
      bpm: 80,
      preview: `${process.env.PUBLIC_URL}/sh4.jpg`,
    },
    // Add more tutorials as needed
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-page">
      <div className="filters">
        <h3>Filters</h3>
        <div>
          <h4>Song Type</h4>
          <label>
            <input
              type="checkbox"
              // onChange handler here
            />
            Jazz
          </label>
          <label>
            <input
              type="checkbox"
              // onChange handler here
            />
            Pop
          </label>
          <label>
            <input
              type="checkbox"
              // onChange handler here
            />
            Classical
          </label>
        </div>
      </div>
      <div className="library-content">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tutorials..."
          />
        </div>
        <h2>Available Tutorials</h2>
        <div className="music-sheets">
          {filteredTutorials.map((tutorial, index) => (
            <div key={index} className="sheet-item">
              <Link to={`/tutorial/${index}`} state={{ tutorial }}>
                <img src={tutorial.preview} alt={tutorial.title} className="sheet-preview" />
                <div className="sheet-info">
                  <strong>{tutorial.title}</strong>
                  <p>{tutorial.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
