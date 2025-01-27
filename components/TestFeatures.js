import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import './TestFeatures.css';

const shipOptions = [
  { value: 'ship1', label: 'Cargo Ship 1' },
  { value: 'ship2', label: 'Cargo Ship 2' },
  { value: 'ship3', label: 'Cargo Ship 3' }
];

const TestFeatures = () => {
  const [selectedShip, setSelectedShip] = useState(null);
  const gridRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y - deltaX * 0.5
      }));

      setStartPos({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.transform = `
        rotateX(${rotation.x}deg)
        rotateY(${rotation.y}deg)
      `;
    }
  }, [rotation]);

  return (
    <div className="test-features-container">
      <div className="group-box" style={{ marginBottom: '40px', width: '400px' }}>
        <h2>Select Ship</h2>
        <Select
          options={shipOptions}
          value={selectedShip}
          onChange={setSelectedShip}
          placeholder="Select Ship"
        />
      </div>
      <div className="group-box">
        <h2>3D Grid Test</h2>
        <div 
          className="grid-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="grid-container" ref={gridRef}>
            {[...Array(10)].map((_, x) => (
              [...Array(10)].map((_, y) => (
                [...Array(5)].map((_, z) => (
                  <div 
                    key={`${x}-${y}-${z}`}
                    className="grid-cell"
                    style={{
                      transform: `translate3d(${(x - -2.5) * 40}px, ${(y - -2.5) * 40}px, ${z * 40 - 100}px)`
                    }}
                  />
                ))
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestFeatures;