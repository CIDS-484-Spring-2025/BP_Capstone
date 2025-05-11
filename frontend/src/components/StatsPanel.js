import React from 'react';
import './StatsPanel.css';

function StatsPanel({ averageLength, encores, rarest }) {
  return (
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
  );
}

export default StatsPanel;
