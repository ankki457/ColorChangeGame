// src/components/Game.js
import React, { useState, useEffect } from 'react';

function Game() {
  const [targetColor, setTargetColor] = useState('red');
  const [score, setScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (isGameRunning) {
      const timer = setInterval(changeColor, getRandomTime());
      const gameTimer = setTimeout(endGame, 40000); // 40 seconds (adjust as needed)

      return () => {
        clearInterval(timer);
        clearTimeout(gameTimer);
      };
    }
  }, [isGameRunning]);

  const getRandomTime = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000; // Random time between 1s and 2s
  };

  const changeColor = () => {
    const newColor = targetColor === 'red' ? 'green' : 'red';
    setTargetColor(newColor);
  };

  const handleBoxClick = () => {
    if (targetColor === 'green') {
      setScore(score + 1);

      if (score === 10) {
        setIsGameWon(true);
        setIsGameRunning(false);
      }
    } else {
      setIsGameOver(true);
      setIsGameRunning(false);
    }
  };

  const endGame = () => {
    setIsGameOver(true);
    setIsGameRunning(false);
  };

  return (
    <div>
      <div
        onClick={handleBoxClick}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: targetColor,
          cursor: 'pointer',
          margin: '0 auto',
          marginTop: '20px',
        }}
      ></div>
      {isGameOver ? <p className="text-danger text-center">Game Over!</p> : null}
      {isGameWon ? <p className="text-success text-center">You win!</p> : null}
      <p className="text-center">Score: {score}</p>
    </div>
  );
}

export default Game;
