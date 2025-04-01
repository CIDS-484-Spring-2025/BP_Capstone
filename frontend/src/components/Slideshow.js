import React, { useState, useEffect } from 'react';

//hardcoded image data for now
const images = [
  {
    src: '/images/Godspeed_You!_Black_Emperor_@_Roadburn_Festival_2018-04-21_003.jpg',
    artist: 'Godspeed! You Black Emperor',
    date: '2018-04-21',
    location: 'Tilburg, NL',
  },
  {
    src: '/images/swans-band-live.jpg',
    artist: 'Swans',
    date: '2015-07-02',
    location: 'London, UK',
  },
  {
    src: '/images/BTWP2424_Unwound-1.jpg',
    artist: 'Unwound',
    date: '2024-07-24',
    location: 'Toronto, ON',
  },
];

function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const current = images[index];

  return (
    <div
      style={{
        backgroundImage: `url(${current.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.9rem'
      }}>
        {current.artist} – {current.date} @ {current.location}
      </div>
    </div>
  );
}

export default Slideshow;
