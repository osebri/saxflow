import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LibraryPage.css';

const TutorialsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jazz: false,
    pop: false,
    classical: false,
  });

  const tutorials = [
    {
      path: 'path/to/tutorial1.pdf',
      title: 'Tutorial 1',
      author: 'Author 1',
      notes: [
        ['C4', 1.0], ['D4', 0.5], ['E4', 0.25], ['rest', 0.5], ['F4', 2.0]
      ],
      bpm: 90,
      category: 'jazz'
    },
    {
      path: 'path/to/tutorial2.pdf',
      title: 'Tutorial 2',
      author: 'Author 2',
      notes: [
        ['G4', 1.0], ['A4', 0.5], ['B4', 0.25], ['rest', 0.5], ['C5', 2.0]
      ],
      bpm: 100,
      category: 'pop'
    },
    // Add more tutorials as needed
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleTutorialClick = (tutorial) => {
    navigate(`/practice-session/${tutorial.title}`, { state: { tutorial } });
  };

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearchTerm = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filters[tutorial.category];
    return matchesSearchTerm && (!Object.values(filters).some(value => value) || matchesFilter);
  });

  return (
    <div className="library-page">
      <div className="filters">
        <h4>Filters</h4>
        <label>
          <input
            type="checkbox"
            checked={filters.jazz}
            onChange={() => handleFilterChange('jazz')}
          />
          Jazz
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.pop}
            onChange={() => handleFilterChange('pop')}
          />
          Pop
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.classical}
            onChange={() => handleFilterChange('classical')}
          />
          Classical
        </label>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <h2>Available Tutorials</h2>
      </div>
      <div className="library-content">
        <div className="music-sheets">
          {filteredTutorials.map((tutorial, index) => (
            <div key={index} className="sheet-item" onClick={() => handleTutorialClick(tutorial)}>
              <div className="sheet-info">
                <strong>{tutorial.title}</strong>
                <p>{tutorial.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
