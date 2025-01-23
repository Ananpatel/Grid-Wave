import React, { useState, useEffect } from "react";
import "./App.css";

const GridWave = ({ rows = 15, cols = 20 }) => {
  const [wavePosition, setWavePosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [waveColors, setWaveColors] = useState(["#ff6b6b", "#6bc1ff", "#6bff95"]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Generate grid cell colors based on wave logic
  const getCellColor = (row, col) => {
    const distanceFromWave = Math.abs(col - wavePosition);
    const intensity = Math.max(0, 255 - distanceFromWave * 50);
    return `rgb(${intensity}, ${255 - intensity}, 50)`;
  };

  useEffect(() => {
    // Change wave position to oscillate
    const interval = setInterval(() => {
      setWavePosition((prev) => {
        if (prev === cols - 1) {
          setDirection(-1); // Reverse direction to left
        } else if (prev === 0) {
          setDirection(1); // Reverse direction to right
        }
        return prev + direction;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [cols, direction]);

  useEffect(() => {
    // Change wave color periodically
    const colorChangeInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % waveColors.length);
    }, 2000);

    return () => clearInterval(colorChangeInterval);
  }, [waveColors.length]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gap: "2px",
        backgroundColor: "#111",
        padding: "10px",
      }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: getCellColor(row, col),
              transition: "background-color 0.3s ease",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1 style={{ color: "#fff", textAlign: "center" }}>Oscillating Grid Wave</h1>
      <GridWave rows={15} cols={20} />
    </div>
  );
};

export default App;
