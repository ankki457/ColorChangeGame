import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './RegistrationForm.css'; // Import custom CSS

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    difficulty: 'easy',
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [targetColor, setTargetColor] = useState('red');
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartGame = () => {
    if (validateForm()) {
      // Start the game when the form is valid
      setIsGameStarted(true);
      setGameStatus('');
      startGameRound();
    } else {
      setSubmitError('Please correct the errors in the form.');
    }
  };

  const getRandomTime = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000; // Random time between 1s and 2s
  };

  const startGameRound = () => {
    setTargetColor(Math.random() < 0.5 ? 'red' : 'green'); // Randomly set the target color
    setTimeout(endGameRound, getRandomTime());
  };

  const endGameRound = () => {
    if (targetColor === 'red') {
      setGameStatus('Game Over!');
      setIsGameStarted(false);
    }
  };

  const handleBoxClick = () => {
    if (isGameStarted && targetColor === 'green') {
      setScore(score + 1);
      if (score + 1 === getTargetScore()) {
        setGameStatus('You win!');
        setIsGameStarted(false);
      } else {
        startGameRound();
      }
    }
  };

  const getTargetScore = () => {
    const difficulty = formData.difficulty;
    switch (difficulty) {
      case 'easy':
        return 10;
      case 'medium':
        return 15;
      case 'hard':
        return 25;
      default:
        return 10; // Default to easy difficulty
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      startGameRound();
    }
  }, [isGameStarted]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mt-5">User Registration</h1>
          {!isGameStarted ? (
            <form onSubmit={handleStartGame}>
              {/* Existing form fields */}
              {/* ... */}
              <button type="button" onClick={handleStartGame} className="btn btn-primary">
                Start Game
              </button>
            </form>
          ) : (
            <div className="game-container">
              <div
                onClick={handleBoxClick}
                className={`color-box ${targetColor}`}
              ></div>
              <p className="game-status">{gameStatus}</p>
              <p className="score">Score: {score}</p>
            </div>
          )}
          {submitError && (
            <div className="text-danger mt-2">{submitError}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
