import React from 'react';
import SearchBar from '../components/SearchBar';
import Slideshow from '../components/Slideshow';

function Home() {
  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/*full-screen rotating slideshow in background*/}
      <Slideshow />

      {/*overlay on top of slideshow*/}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          //make sure its imposed over slideshow
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          //silver text
          color: '#C0C0C0',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 8px black',
            fontWeight: 'bold',
            letterSpacing: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
          }}
        >
          Setlist Aggregator
        </h1>
        <SearchBar />
      </div>
    </div>
  );
}

export default Home;
