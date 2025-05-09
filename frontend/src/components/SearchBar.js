import React, { useState } from 'react';
import './SearchBar.css';
import SetlistFMCredit from './SetlistFMCredit';

function SearchBar() {
  const [range, setRange] = useState("50");
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
      const encoreRes = await fetch(`http://localhost:8080/api/setlists/encores?artist=${artistName}&setlistRange=${range}`);
      const encoreData = await encoreRes.json();
      console.log("Encore response:", encoreData);
      setEncores(encoreData);

      //fetch rarest songs from backend
      const rareRes = await fetch(`http://localhost:8080/api/setlists/rarest?artist=${artistName}&setlistRange=${range}`);
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
      <label htmlFor="range-select">Select data range:</label>
      <select
        id="range-select"
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="range-select"
      >
        <option value="20">Last 20 Most Recent Shows</option>
        <option value="100">Last 100 Most Recent Shows</option>
        <option value="all">ALL TIME STATS!!! (May take 10-15 seconds to process due to Setlist.FM API rate limit)</option>
      </select>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      <div className="results-container">
        <h3>Top Encore Songs</h3>
        <ul>
          {Array.isArray(encores) && encores.map((song, idx) => (
            <li key={idx}>{song}</li>
          ))}
        </ul>

        <h3>Rarest Songs</h3>
        <ul>
          {Array.isArray(rarest) && rarest.map((song, idx) => (
            <li key={idx}>{song}</li>
          ))}
        </ul>
        <SetlistFMCredit />
      </div>
    </div>
  );
}

export default SearchBar;
