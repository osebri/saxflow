import React from 'react';
import { Link } from 'react-router-dom';
import './LibraryPage.css';

const TutorialsPage = () => {
  const tutorials = [
    {
      title: 'Jazz Tutorial',
      author: 'Author 1',
      notes: [['C4', 1.0], ['D4', 0.5], ['E4', 0.25]],
      bpm: 90,
    },
    {
      title: 'Pop Tutorial',
      author: 'Author 2',
      notes: [['E4', 1.0], ['F4', 0.5], ['G4', 0.25]],
      bpm: 100,
    },
    {
      title: 'Classical Tutorial',
      author: 'Author 3',
      notes: [['G4', 1.0], ['A4', 0.5], ['B4', 0.25]],
      bpm: 80,
    },
    // Add more tutorials as needed
  ];

  return (
    <div className="library-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tutorials..."
        />
      </div>
      <div className="library-content">
        <h2>Available Tutorials</h2>
        <div className="music-sheets">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="sheet-item">
              <Link to={`/tutorial/${index}`} state={{ tutorial }}>
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
