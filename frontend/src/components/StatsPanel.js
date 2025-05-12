import React from 'react';
import './StatsPanel.css';
import '../App.css';

//include artistName and range as props
function StatsPanel({ averageLength, encores, rarest, openers, artistName, range }) {
  //determine readable range
  const rangeText = range === "all" ? "entire setlist history" : `last ${range} shows`;

  return (
    <div style={{ width: '100%' }}>
      {artistName && (
        <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
          <h2
            style={{
              fontSize: '3rem',
              //eliminate unwanted vertical gap
              marginTop: '0',
              //keep a little space from cards
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              //slight soft glow
              textShadow: '0 0 12px rgba(255, 80, 0, 0.55), 0 0 20px rgba(255, 140, 0, 0.2)',
              //allow absolutely positioned bar
              position: 'relative',
            }}
          >
          💯
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
                animation: 'flicker-soft 2s infinite',
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
          <ol>
            {Array.isArray(encores) ? (
              encores.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))
            ) : (
              <li>Encore Data unavailable</li>
            )}
          </ol>
        </div>

        <div className="stat-card">
          <h3>Top Opener Songs</h3>
          <ol>
            {Array.isArray(openers) ? (
              openers.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))
            ) : (
              <li>Opener Data unavailable</li>
            )}
          </ol>
        </div>

        <div className="stat-card">
          <h3>Rarest Songs</h3>
          <ol>
            {Array.isArray(rarest) ? (
              rarest.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))
            ) : (
              <li>Rarest Data unavailable</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
