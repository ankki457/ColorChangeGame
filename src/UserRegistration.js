// src/UserRegistration.js
import React, { useState } from 'react';

const UserRegistration = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  const handleStartGame = () => {
    if (name && email && mobile) {
      onStartGame({ name, email, mobile, difficulty });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default UserRegistration;
