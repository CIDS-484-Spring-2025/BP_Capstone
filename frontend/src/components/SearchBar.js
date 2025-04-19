import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  //store artist input from user
  const [artistName, setArtistName] = useState('');
  //store results from backend
  const [encores, setEncores] = useState([]);
  const [rarest, setRarest] = useState([]);

  //update input as user types
  const handleInputChange = (e) => {
    setArtistName(e.target.value);
  };

  //trigger on search click
  const handleSearch = async () => {
    try {
      //fetch top encore songs from backend
      const encoreRes = await fetch(`http://localhost:8080/api/setlists/encores?artist=${artistName}`);
      const encoreData = await encoreRes.json();
      setEncores(encoreData);

      //fetch rarest songs from backend
      const rareRes = await fetch(`http://localhost:8080/api/setlists/rarest?artist=${artistName}`);
      const rareData = await rareRes.json();
      setRarest(rareData);
    } catch (err) {
      console.error("Error fetching setlist data:", err);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for an artist..."
        value={artistName}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      <div className="results-container">
        <h3>Top Encore Songs</h3>
        <ul>
          {encores.map((song, idx) => <li key={idx}>{song}</li>)}
        </ul>

        <h3>Rarest Songs</h3>
        <ul>
          {rarest.map((song, idx) => <li key={idx}>{song}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
