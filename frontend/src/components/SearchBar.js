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
  const [openers, setOpeners] = useState([]);

  //show loading while data being fetched
  const [loading, setLoading] = useState(false);

//react hook that runs side effects like HTTP requests
//block to address issue of frontend not updating searches when user changes input
/*useEffect(() => {
  //dont fetch when artist input empty
  if (!debouncedArtist.trim()) return;

  //clear old results and show loading
  setEncores([]);
  setOpeners([]);
  setRarest([]);
  setLoading(true);
  setAverageLength(null);

  console.log(`fetching stats for ${debouncedArtist} with range=${range}`);
  //fetch only runs when artist or range changes

  //new single fetch to combined stats endpoint
  fetch(`/api/setlists/stats?artist=${debouncedArtist}&setlistRange=${range}`)
    //when backend responds with json, store data in encore songs
    .then(response => response.json())
        .then(data => {
           console.log("RAW stats response:", data);

            setEncores(Array.isArray(data.encores) ? data.encores : []);
            setOpeners(Array.isArray(data.openers) ? data.openers : []);
            setRarest(Array.isArray(data.rarest) ? data.rarest : []);

            const avg = parseFloat(data.averageLength);
            setAverageLength(!isNaN(avg) ? avg : null);

            setLoading(false);
        })
    //catch bad responses and log them
    .catch(error => {
          console.error("Error fetching stats:", error);
          setLoading(false);
        });
}, [debouncedArtist, range]);
*/
  //trigger on search click
  const handleSearch = async () => {
    //skip empty input
    if (!artistName.trim())
        return;

    setLoading(true);
    setEncores([]);
    setOpeners([]);
    setRarest([]);
    setAverageLength(null);
    try {
      //fetch all stats from consolidated backend endpoint
      const res = await fetch(`http://localhost:8080/api/setlists/stats?artist=${artistName}&setlistRange=${range}`);
      const data = await res.json();

      console.log("Stats API response:", data);

      //handle possible invalid values
      setEncores(Array.isArray(data.encores) ? data.encores : []);
      setOpeners(Array.isArray(data.openers) ? data.openers : []);
      setRarest(Array.isArray(data.rarest) ? data.rarest : []);

      const avg = parseFloat(data.averageLength);
      setAverageLength(!isNaN(avg) ? avg : null);

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // restored original centered layout
        alignItems: 'center',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '0.5rem',
        // removed gap to eliminate extra space between search and stats
      }}
    >
      <div
        className="search-bar-container"
        style={{ marginBottom: '0rem' }}
      >
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

      <div
        className="results-panel"
        style={{
          overflow: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // supposed to remove any gap before stats panel- why still gap
          marginTop: '0',
        }}
      >
        {loading && <p className="loading-message">Loading stats...</p>}

        {!loading && averageLength !== null && (
          <>
            <StatsPanel
              averageLength={averageLength}
              encores={encores}
              openers={openers}
              rarest={rarest}
              artistName={artistName}
              range={range}
            />
            <SetlistFMCredit />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
