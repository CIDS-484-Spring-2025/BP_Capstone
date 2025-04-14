import React, { useState } from "react";

function SearchBar() {
  const [artist, setArtist] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //call backend endpoint
    fetch(`http://localhost:8080/api/setlists?artist=${artist}`)
      .then((res) => res.json())
      .then((data) => console.log("Fetched setlists:", data))
      .catch((err) => console.error("Error fetching setlists:", err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "1rem 1.5rem",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
      }}
    >
      <input
        type="text"
        placeholder="Search artist..."
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        style={{
          padding: "0.6rem 1rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #888",
          backgroundColor: "#222",
          color: "#eee",
          width: "250px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          borderRadius: "5px",
          backgroundColor: "#C0C0C0", // silver
          border: "none",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 0 8px rgba(192,192,192,0.5)",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
