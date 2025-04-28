import React, { useRef, useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { drawGame } from '../utils/canvas';
import GameOver from './GameOver';
import Score from './Score';

interface GameProps {
  onExit: () => void;
  walletAddress: string;
}

const Game: React.FC<GameProps> = ({ onExit, walletAddress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 600 });
  const { 
    gameState,
    score,
    isGameOver,
    startGame,
    restartGame,
    jump,
    update
  } = useGameState(canvasSize);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 40, 400);
      const height = Math.min(window.innerHeight - 150, 600);
      setCanvasSize({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Game loop
  useEffect(() => {
    if (!canvasRef.current || isGameOver) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const render = () => {
      update();
      drawGame(ctx, canvasSize, gameState);
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [canvasSize, gameState, update, isGameOver]);

  // Simulate blockchain transaction when score changes
  useEffect(() => {
    if (score > 0 && score === gameState.pipes.length) {
      console.log(`Transaction for pipe ${score} would be sent to MegaETH from wallet: ${walletAddress}`);
      // This is where the actual blockchain transaction code would go
    }
  }, [score, gameState.pipes.length, walletAddress]);

  const handleCanvasClick = () => {
    if (isGameOver) {
      restartGame();
    } else {
      jump();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Score score={score} />
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={handleCanvasClick}
          className="bg-gray-50 rounded-lg shadow-md cursor-pointer"
        />
        
        {isGameOver && (
          <GameOver 
            score={score} 
            onRestart={restartGame} 
            onExit={onExit}
          />
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        {walletAddress ? (
          <p className="truncate max-w-xs">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
        ) : (
          <p>Wallet not connected</p>
        )}
      </div>
    </div>
  );
};

export default Game;