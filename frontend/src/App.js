import React, { useState, useEffect } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/test")
            .then((response) => response.text())
            .then((data) => setMessage(data));
    }, []);

    return (
        <div>
            <h1>Setlist Aggregator</h1>
            <p>Backend Response: {message}</p>
        </div>
    );
}

export default App;
