import { GameState } from '../types';

// Constants
const PIPE_WIDTH = 60;
const PIPE_GAP = 160;

export function drawGame(
  ctx: CanvasRenderingContext2D,
  canvasSize: { width: number; height: number },
  gameState: GameState
) {
  const { rabbit, pipes } = gameState;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  
  // Draw background
  ctx.fillStyle = '#f9fafb'; // Light gray, almost white
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
  
  // Draw pipes
  ctx.fillStyle = '#111111'; // Almost black
  pipes.forEach(pipe => {
    // Top pipe
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapStart);
    
    // Bottom pipe
    ctx.fillRect(
      pipe.x,
      pipe.gapStart + PIPE_GAP,
      PIPE_WIDTH,
      canvasSize.height - pipe.gapStart - PIPE_GAP
    );
  });
  
  // Draw rabbit (simple black silhouette)
  ctx.fillStyle = '#111111';
  
  // Body
  ctx.beginPath();
  ctx.ellipse(
    rabbit.x + rabbit.width / 2,
    rabbit.y + rabbit.height / 2,
    rabbit.width / 2,
    rabbit.height / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  // Ears
  const earHeight = rabbit.height * 0.7;
  const earWidth = rabbit.width * 0.3;
  
  // Left ear
  ctx.beginPath();
  ctx.ellipse(
    rabbit.x + rabbit.width * 0.3,
    rabbit.y - earHeight / 2,
    earWidth / 2,
    earHeight / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  // Right ear
  ctx.beginPath();
  ctx.ellipse(
    rabbit.x + rabbit.width * 0.7,
    rabbit.y - earHeight / 2,
    earWidth / 2,
    earHeight / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
}