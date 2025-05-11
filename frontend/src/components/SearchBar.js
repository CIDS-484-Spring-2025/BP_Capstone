import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import StatsPanel from './StatsPanel';
import './SearchBar.css';
import SetlistFMCredit from './SetlistFMCredit';

function SearchBar() {
  //holds which dropdown range value is selected
  const [range, setRange] = useState("20");
  //store artist input from user
  const [artistName, setArtistName] = useState('');
  const debouncedArtist = useDebounce(artistName, 500);
  //store results from backend
  const [encores, setEncores] = useState([]);
  const [rarest, setRarest] = useState([]);
  const [averageLength, setAverageLength] = useState(null);

  //show loading while data being fetched
  const [loading, setLoading] = useState(false);

//react hook that runs side effects like HTTP requests
//block to address issue of frontend not updating searches when user changes input
useEffect(() => {
  //dont fetch when artist input empty
  if (!debouncedArtist.trim()) return;

  //clear old results and show loading
  setEncores([]);
  setRarest([]);
  setLoading(true);

  console.log(`fetching stats for ${debouncedArtist} with range=${range}`);
  //fetch only runs when artist or range changes

  //fetch top encores
  fetch(`/api/setlists/encores?artist=${encodeURIComponent(debouncedArtist)}&setlistRange=${range}`)
    //when backend responds with json, store data in encore songs
    .then(res => res.json())
    .then(data => setEncores(data))
    //catch bad responses and log them
    .catch(err => {
      console.error('error fetching encore stats:', err);
      setEncores([]);
    });

  //fetch rarest songs
  fetch(`/api/setlists/rarest?artist=${encodeURIComponent(debouncedArtist)}&setlistRange=${range}`)
    .then(res => res.json())
    .then(data => setRarest(data))
    .catch(err => {
      console.error('Rarest fetch error:', err);
      setRarest([]);
    })
    .finally(() => setLoading(false));

}, [debouncedArtist, range]);

  //trigger on search click
  const handleSearch = async () => {
    setLoading(true);
    try {
      //fetch top encore songs from backend
      const encoreRes = await fetch(`http://localhost:8080/api/setlists/encores?artist=${debouncedArtist}&setlistRange=${range}`);
      const encoreData = await encoreRes.json();
      console.log("Encore response:", encoreData);
      setEncores(encoreData);

      //fetch rarest songs from backend
      const rareRes = await fetch(`http://localhost:8080/api/setlists/rarest?artist=${debouncedArtist}&setlistRange=${range}`);
      const rareData = await rareRes.json();
      setRarest(rareData);

      //fetch avg  setlist length
      const avgLengthRes = await fetch(`http://localhost:8080/api/setlists/averageLength?artist=${debouncedArtist}&setlistRange=${range}`);
      const avgLengthData = await avgLengthRes.json();
      setAverageLength(avgLengthData);

    } catch (err) {
      console.error("Error fetching setlist data:", err);
    }
    finally {
    setLoading(false);
    }
  };

//confirm what frontend actually received to debug
console.log("Encore songs:", encores);
console.log("Rarest songs:", rarest);
console.log("Avg length:", averageLength);

  return (
  <>
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Enter Artist Name for Setlist Insights"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
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
        <option value="all">ALL TIME STATS!!! (May take 60+ seconds to process due to Setlist.FM API rate limit)</option>
      </select>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>

    <div className="results-panel">
          {loading && <p className="loading-message">Loading stats...</p>}

          {!loading && encores && rarest && averageLength !== null && (
            <>
              <StatsPanel
                averageLength={averageLength}
                encores={encores}
                rarest={rarest}
              />
              <SetlistFMCredit />
            </>
          )}
        </div>
        </>
  );
}

export default SearchBar;