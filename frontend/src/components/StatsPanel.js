import React from 'react';
import './StatsPanel.css';
import '../App.css';

//include artistName and range as props
function StatsPanel({ averageLength, encores, rarest, openers, artistName, range }) {
  //determine readable range
  const rangeText = range === "-1" ? "entire setlist history" : `last ${range} shows`;

  return (
    <div style={{ width: '100%' }}>
      {artistName && (
        <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
          <h2
            style={{
              fontSize: '3rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              textDecoration: 'underline',
              margin: '0.5rem 0',
            }}
          >
            <span
              className="flame-text"
              style={{
                fontFamily: "'Bangers', cursive",
                backgroundImage: 'url("/Flames.gif")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'flicker-soft 1.2s infinite',
              }}
            >

            Stats for {artistName}'s {rangeText}
          </span>{' '}
          👀
        </h2>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Average Songs Per Show</h3>
          {typeof averageLength === 'number' && !isNaN(averageLength) ? (
            <p>{averageLength.toFixed(2)} songs per show</p>
          ) : (
            <p>Average setlist length not available</p>
          )}
        </div>

        <div className="stat-card">
          <h3>Top Encore Songs</h3>
          <ul>
            {Array.isArray(encores) ? (
              encores.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))
            ) : (
              <li>Encore Data unavailable</li>
            )}
          </ul>
        </div>

        <div className="stat-card">
          <h3>Top Opener Songs</h3>
          <ul>
            {Array.isArray(openers) ? (
              openers.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))
            ) : (
              <li>Opener Data unavailable</li>
            )}
          </ul>
        </div>

        <div className="stat-card">
          <h3>Rarest Songs</h3>
          <ul>
            {Array.isArray(rarest) ? (
              rarest.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))
            ) : (
              <li>Rarest Data unavailable</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
