import React, { Component } from 'react';
import './ColorChangeGame.css'; // Import a CSS file for styling

class ColorChangeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      isGameRunning: true,
      isGameOver: false,
      isGameWon: false,
      targetColor: 'red',
    };
  }

  componentDidMount() {
    this.startGame();
  }

  startGame = () => {
    this.timer = setInterval(this.changeColor, this.getRandomTime());
    this.gameTimer = setTimeout(this.endGame, this.props.gameDuration * 1000);
  };

  getRandomTime = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000; // Random time between 1s and 2s
  };

  changeColor = () => {
    const newColor = this.state.targetColor === 'red' ? 'green' : 'red';
    this.setState({ targetColor: newColor });
  };

  handleBoxClick = () => {
    if (this.state.targetColor === 'green') {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      if (this.state.score === this.props.targetScore) {
        this.setState({ isGameWon: true, isGameRunning: false });
        clearInterval(this.timer);
      } else {
        clearInterval(this.timer);
        this.timer = setInterval(this.changeColor, this.getRandomTime());
      }
    } else {
      this.setState({ isGameOver: true, isGameRunning: false });
      clearInterval(this.timer);
    }
  };

  endGame = () => {
    this.setState({ isGameOver: true, isGameRunning: false });
    clearInterval(this.timer);
  };

  render() {
    return (
      <div className="game-container">
        {this.state.isGameRunning ? (
          <div
            onClick={this.handleBoxClick}
            className={`color-box ${this.state.targetColor}`}
          ></div>
        ) : null}
        {this.state.isGameOver ? <p className="game-message">Game Over!</p> : null}
        {this.state.isGameWon ? <p className="game-message">You win!</p> : null}
        <p className="score">Score: {this.state.score}</p>
      </div>
    );
  }
}

ColorChangeGame.defaultProps = {
  gameDuration: 10, // Default game duration in seconds
  targetScore: 5, // Default target score to win the game
};

export default ColorChangeGame;
