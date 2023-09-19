// src/GreenLightRedLight.js
import React, { useState, useEffect } from 'react';

const GreenLightRedLight = ({ difficulty }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [isGreen, setIsGreen] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setTimeout(() => {
        setIsGreen(Math.random() < 0.5);
      }, 1000 + Math.random() * 1000);
    }
    return () => clearTimeout(timer);
  }, [gameStarted]);

  useEffect(() => {
    if (isGreen) {
      setMessage('Click the Green Box!');
    } else {
      setMessage('Game Over!');
      setGameStarted(false);
    }
  }, [isGreen]);

  const handleBoxClick = () => {
    if (isGreen) {
      setScore(score + 1);
      if (score === getWinningScore(difficulty)) {
        setMessage('You Win!');
        setGameStarted(false);
      } else {
        setIsGreen(false);
      }
    } else {
      setMessage('Game Over!');
      setGameStarted(false);
    }
  };

  const getWinningScore = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 10;
      case 'Medium':
        return 15;
      case 'Hard':
        return 25;
      default:
        return 0;
    }
  };

  return (
    <div className="green-light-red-light">
      <h2>Green Light, Red Light</h2>
      {gameStarted ? (
        <>
          <div
            className={`box ${isGreen ? 'green' : 'red'}`}
            onClick={handleBoxClick}
          ></div>
          <p>Score: {score}</p>
          <p>{message}</p>
        </>
      ) : (
        <button onClick={() => setGameStarted(true)}>Start Game</button>
      )}
    </div>
  );
};

export default GreenLightRedLight;
