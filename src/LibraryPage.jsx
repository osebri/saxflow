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
      path: `hymntun.pdf`,
      title: 'National Anthem Of Tunisia',
      author: 'AbulQcem Echebbi',
      preview: `sh2.jpg`,
      category: 'songs',
      subcategory: 'classical',
    },
    {
      path: 'hymnuk.pdf',
      title: 'National Anthem of Ukraine',
      author: 'Mykhailo Verbytsky',
      preview: 'sh3.jpg',
      category: 'songs',
      subcategory: 'classical',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'National Hymn of Palestine ',
      author: 'Said Al Muzayin ',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'classical',
    },
    {
      path: 'hymntun.pdf',
      title: 'Giorno Theme',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Hymne a la joie',
      author: 'Ludwing Van Beethoven',
      preview: 'sh3.jpg',
      category: 'songs',
      subcategory: 'classical',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'My Heart Will Go On',
      author: 'Celine Dion',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'pop',
    },
    {
      path: 'hymntun.pdf',
      title: 'Major Scales',
      author: 'Author 1',
      preview: 'sh2.jpg',
      category: 'scales',
      subcategory: 'major',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Minor Scales',
      author: 'Author 2',
      preview: 'sh3.jpg',
      category: 'scales',
      subcategory: 'minor',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Cant Help Falling In Love',
      author: 'Elvis Presley',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'classical',
    },
    {
      path: 'hymntun.pdf',
      title: 'Autumn Leaves',
      author: 'Joseph Kosma',
      preview: 'sh2.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Fly Me To The Moon',
      author: 'Frank Sinatra',
      preview: 'sh3.jpg',
      category: 'songs',
      subcategory: 'classical',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'All Of Me',
      author: 'John Legend',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'pop',
    },
    {
      path: 'hymntun.pdf',
      title: 'Pink Panther Theme',
      author: 'Henry Mancini',
      preview: 'sh2.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'hymnuk.pdf',
      title: 'Take Five',
      author: 'Dave Brubeck',
      preview: 'sh3.jpg',
      category: 'songs',
      subcategory: 'jazz',
    },
    {
      path: 'majorscalesaltosax.pdf',
      title: 'Shake It Off',
      author: 'Taylor Swift',
      preview: 'sh4.jpg',
      category: 'songs',
      subcategory: 'pop',
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
