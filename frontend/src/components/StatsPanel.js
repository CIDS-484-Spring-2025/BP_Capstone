import React from 'react';
import './StatsPanel.css';
import '../App.css';

//include artistName and range as props
function StatsPanel({ averageLength, encores, rarest, artistName, range }) {
  //determine readable range
  const rangeText = range === "-1" ? "entire setlist history" : `last ${range} shows`;

  return (
    <div>
      {/*dynamic title shown if artistName exists */}
      {artistName && (
        <h2
        style={{
           fontSize: '3rem',
           textAlign: 'center',
           textTransform: 'uppercase',
           letterSpacing: '2px',
           textDecoration: 'underline',
           marginBottom: '2rem',
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
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Average Songs Per Show</h3>
          <p>{averageLength ? averageLength.toFixed(1) : 'Loading...'}</p>
        </div>

        <div className="stat-card">
          <h3>Top Encore Songs</h3>
          <ul>
            {encores.map((song, index) => (
              <li key={index}>{song.title} ({song.count}x)</li>
            ))}
          </ul>
        </div>

        <div className="stat-card">
          <h3>Rarest Songs</h3>
          <ul>
            {rarest.map((song, index) => (
              <li key={index}>{song.title} ({song.count}x)</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
