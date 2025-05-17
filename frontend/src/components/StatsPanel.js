import React from 'react';
import './StatsPanel.css';
import '../App.css';

function StatsPanel({ averageLength, encores, rarest, openers, artistName, range }) {
  const rangeText = range === "all" ? "entire setlist history" : `last ${range} shows`;

  return (
    <div style={{ width: '100%' }}>
      {artistName && (
        <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
          <h2 style={{
            fontSize: '3rem',
            marginTop: '0',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            textShadow: '0 0 12px rgba(255, 80, 0, 0.55), 0 0 20px rgba(255, 140, 0, 0.2)',
            position: 'relative',
          }}>
            💯
            <span className="flame-text" style={{
              fontFamily: "'Bangers', cursive",
              backgroundImage: 'url("/Flames.gif")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'flicker-soft 2s infinite',
            }}>
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
          {Array.isArray(encores) && encores.length > 0 ? (
            <ol>
              {encores.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))}
            </ol>
          ) : (
            <p>Encore Data unavailable</p>
          )}
        </div>

        <div className="stat-card">
          <h3>Top Opener Songs</h3>
          {Array.isArray(openers) && openers.length > 0 ? (
            <ol>
              {openers.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))}
            </ol>
          ) : (
            <p>Opener Data unavailable</p>
          )}
        </div>

        <div className="stat-card">
          <h3>Rarest Songs</h3>
          {Array.isArray(rarest) && rarest.length > 0 ? (
            <ol>
              {rarest.map((song, index) => (
                <li key={index}>
                  {song.title} ({song.count}x)
                </li>
              ))}
            </ol>
          ) : (
            <p>Rarest Data unavailable</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
