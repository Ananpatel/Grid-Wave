import React, { useState, useEffect } from "react";

const GridWave = ({ rows = 15, cols = 20 }) => {
  const [wavePosition, setWavePosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for moving right, -1 for moving left
  const [waveColors, setWaveColors] = useState(["#ff6b6b", "#6bc1ff", "#6bff95"]);
  const [currentColor, setCurrentColor] = useState(waveColors[0]);
  const [colorChanged, setColorChanged] = useState(false);

  // Function to determine the color and opacity of each cell
  const getCellStyle = (col) => {
    const distanceFromWave = Math.abs(col - wavePosition);

    if (distanceFromWave < 3) {
      // First 5 columns: Bright colors with decreasing opacity
      const opacity = 1 - distanceFromWave * 0.2; // Reducing opacity by 0.2 for each distance
      return {
        backgroundColor: currentColor,
        opacity: opacity,
      };
    } else {
      // Beyond wave: Transparent background
      return { backgroundColor: "transparent" };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWavePosition((prev) => {
        if (prev === cols - 1 && direction === 1 && !colorChanged) {
          // Wave reaches the right edge
          setDirection(-1); // Change direction
          setColorChanged(true); // Change color once
          setCurrentColor((prevColor) => {
            const nextIndex = (waveColors.indexOf(prevColor) + 1) % waveColors.length;
            return waveColors[nextIndex];
          });
        } else if (prev === 0 && direction === -1 && !colorChanged) {
          // Wave reaches the left edge
          setDirection(1); // Change direction
          setColorChanged(true);
          setCurrentColor((prevColor) => {
            const nextIndex = (waveColors.indexOf(prevColor) + 1) % waveColors.length;
            return waveColors[nextIndex];
          });
        } else if (prev !== cols - 1 && prev !== 0) {
          setColorChanged(false); // Reset color change flag
        }

        return prev + direction; // Update wave position
      });
    }, 200); // Adjust wave speed

    return () => clearInterval(interval);
  }, [cols, direction, waveColors, colorChanged]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gap: "2px",
        backgroundColor: "#000", // White background for visibility
        padding: "10px",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid #555555", // Optional: Add border for better grid visibility
              transition: "background-color 0.2s, opacity 0.2s",
              ...getCellStyle(col), // Apply color and opacity based on wave logic
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
      <h1 style={{ color: "#000", textAlign: "center" }}>Wave Effect Grid</h1>
      <GridWave rows={15} cols={20} />
    </div>
  );
};

export default App;
