import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onExit: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart, onExit }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over</h2>
        <p className="text-xl mb-6">Your Score: <span className="font-bold">{score}</span></p>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onExit}
            className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;