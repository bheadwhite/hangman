import React from 'react';
import { GameOver } from './GameOver';
import { Winner } from './Winner';

export const FeedbackOverlay = () => {
  return (
    <div>
      <Winner />
      <GameOver />
    </div>
  );
};
