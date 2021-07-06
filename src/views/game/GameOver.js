import React from 'react';
import { useSelector } from 'react-redux';

export const GameOver = () => {
  const correctWord = useSelector((state) => state.hangman.correctWord);
  const isGameOver = useSelector((state) => state.hangman.gameOver);

  if (!isGameOver) {
    return null;
  }

  return (
    <div
      style={{
        textAlign: 'center',
        background: 'rgba(0,0,0,0.05)',
        padding: '8px',
      }}>
      <h1>GAME OVER</h1>
      <h2>your word was: </h2>
      <h1>{correctWord}</h1>
    </div>
  );
};
