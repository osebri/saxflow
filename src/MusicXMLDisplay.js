import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MusicXMLDisplay = () => {
  const [musicPiece, setMusicPiece] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusicPiece = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/music_piece/');
        setMusicPiece(response.data);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchMusicPiece();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!musicPiece) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Music Piece</h2>
      <p><strong>Title:</strong> {musicPiece.title}</p>
      <p><strong>Author:</strong> {musicPiece.author}</p>
      <p><strong>BPM:</strong> {musicPiece.bpm}</p>
      <p><strong>Time Signature:</strong> {musicPiece.time_signature}</p>
      <h3>Notes:</h3>
      <ul>
        {musicPiece.notes.map((note, index) => (
          <li key={index}>
            {note[0]} ({note[1]})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicXMLDisplay;
