import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-black bg-opacity-30 px-4 py-2 rounded-full">
        <p className="text-white text-2xl font-bold">{score}</p>
      </div>
    </div>
  );
};

export default Score;