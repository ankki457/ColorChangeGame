// src/App.js
import React, { useState } from 'react';
import './App.css';
import UserRegistration from './UserRegistration';
import GreenLightRedLight from './GreenLightRedLight';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleStartGame = (data) => {
    setUserData(data);
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <GreenLightRedLight difficulty={userData.difficulty} />
      ) : (
        <UserRegistration onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;
