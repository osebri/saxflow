import React, { useState } from 'react';
import './LibraryPage.css';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    scales: {
      major: false,
      minor: false,
    },
    arpeggios: {
      majorChords: false,
      minorChords: false,
    },
    songs: {
      jazz: false,
      pop: false,
      classical: false,
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const musicSheets = [
    {
      path: `${process.env.PUBLIC_URL}/hymntun.pdf`,
      title: 'Sheet 1',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'scales',
      subcategory: 'major',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Sheet 2',
      author: 'Author 2',
      preview: 'sh3.jpg',
      category: 'scales',
      subcategory: 'minor',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Sheet 3',
      author: 'Author 3',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymntun.pdf',
      title: 'Sheet 1',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'scales',
      subcategory: 'major',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Sheet 2',
      author: 'Author 2',
      preview: 'sh3.jpg',
      category: 'scales',
      subcategory: 'minor',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Sheet 3',
      author: 'Author 3',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymntun.pdf',
      title: 'Sheet 1',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'scales',
      subcategory: 'major',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Sheet 2',
      author: 'Author 2',
      preview: 'sh3.jpg',
      category: 'scales',
      subcategory: 'minor',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Sheet 3',
      author: 'Author 3',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymntun.pdf',
      title: 'Sheet 1',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'scales',
      subcategory: 'major',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Sheet 2',
      author: 'Author 2',
      preview: 'sh3.jpg',
      category: 'scales',
      subcategory: 'minor',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Sheet 3',
      author: 'Author 3',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymntun.pdf',
      title: 'Sheet 1',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'scales',
      subcategory: 'major',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Sheet 2',
      author: 'Author 2',
      preview: 'sh3.jpg',
      category: 'scales',
      subcategory: 'minor',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Sheet 3',
      author: 'Author 3',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category, subcategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [subcategory]: !prevFilters[category][subcategory],
      },
    }));
  };

  const filteredSheets = musicSheets.filter((sheet) => {
    const matchesSearchTerm = sheet.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filters[sheet.category]?.[sheet.subcategory];
    return matchesSearchTerm && (!Object.values(filters).some(subCategory => Object.values(subCategory).some(value => value)) || matchesFilter);
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSheets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSheets.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="library-page">
      <div className="filters">
        <div>
          <h4>Scales</h4>
          <label>
            <input
              type="checkbox"
              checked={filters.scales.major}
              onChange={() => handleFilterChange('scales', 'major')}
            />
            Major
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.scales.minor}
              onChange={() => handleFilterChange('scales', 'minor')}
            />
            Minor
          </label>
        </div>
        <div>
          <h4>Arpeggios</h4>
          <label>
            <input
              type="checkbox"
              checked={filters.arpeggios.majorChords}
              onChange={() => handleFilterChange('arpeggios', 'majorChords')}
            />
            Major Chords
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.arpeggios.minorChords}
              onChange={() => handleFilterChange('arpeggios', 'minorChords')}
            />
            Minor Chords
          </label>
        </div>
        <div>
          <h4>Songs</h4>
          <label>
            <input
              type="checkbox"
              checked={filters.songs.jazz}
              onChange={() => handleFilterChange('songs', 'jazz')}
            />
            Jazz
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.songs.pop}
              onChange={() => handleFilterChange('songs', 'pop')}
            />
            Pop
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.songs.classical}
              onChange={() => handleFilterChange('songs', 'classical')}
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
            placeholder="Search..."
          />
        </div>
        <div className="music-sheets">
          {currentItems.map((sheet, index) => (
            <div key={index} className="sheet-item">
              <a href={sheet.path} target="_blank" rel="noopener noreferrer">
                <img src={sheet.preview} alt={sheet.title} className="sheet-preview" />
              </a>
              <div className="sheet-info">
                <strong>{sheet.title}</strong>
                <p>{sheet.author}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
