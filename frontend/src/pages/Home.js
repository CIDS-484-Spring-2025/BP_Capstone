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
          height: '100vh',
          //make sure its imposed over slideshow
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          //make tight vertical spacing between title and search
          gap: '0.25rem',
          padding: '0.75rem 1rem',
          //silver text
          color: '#C0C0C0',
          //keep slideshow fully visible
          overflow: 'hidden',
          //dark transparent background for white text
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            fontSize: '2.8rem',
            margin: 0,
            paddingBottom: '0.25rem',
            textShadow: '2px 2px 8px black',
            fontWeight: 'bold',
            letterSpacing: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '0.25rem 0.5rem',
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
