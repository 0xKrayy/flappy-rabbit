import { useState, useCallback, useEffect } from 'react';
import { GameState, Pipe } from '../types';

// Constants
const GRAVITY = 0.5;
const JUMP_FORCE = -8;
const PIPE_SPEED = 3;
const PIPE_WIDTH = 60;
const PIPE_GAP = 160;
const PIPE_SPAWN_RATE = 120; // frames

export function useGameState(canvasSize: { width: number; height: number }) {
  const [gameState, setGameState] = useState<GameState>({
    rabbit: {
      x: canvasSize.width / 3,
      y: canvasSize.height / 2,
      width: 30,
      height: 30,
      velocity: 0
    },
    pipes: [],
    frameCount: 0,
    lastPipeFrame: 0
  });
  
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  // Reset game state
  const startGame = useCallback(() => {
    setGameState({
      rabbit: {
        x: canvasSize.width / 3,
        y: canvasSize.height / 2,
        width: 30,
        height: 30,
        velocity: 0
      },
      pipes: [],
      frameCount: 0,
      lastPipeFrame: 0
    });
    setScore(0);
    setIsGameOver(false);
    setIsActive(true);
  }, [canvasSize]);
  
  // Restart game
  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);
  
  // Make rabbit jump
  const jump = useCallback(() => {
    if (!isActive || isGameOver) return;
    
    setGameState(prev => ({
      ...prev,
      rabbit: {
        ...prev.rabbit,
        velocity: JUMP_FORCE
      }
    }));
  }, [isActive, isGameOver]);
  
  // Check for collisions
  const checkCollisions = useCallback((state: GameState) => {
    const { rabbit, pipes } = state;
    
    // Check if rabbit hits the ground or ceiling
    if (rabbit.y <= 0 || rabbit.y + rabbit.height >= canvasSize.height) {
      return true;
    }
    
    // Check if rabbit collides with any pipe
    for (const pipe of pipes) {
      // Horizontal collision
      if (
        rabbit.x + rabbit.width > pipe.x &&
        rabbit.x < pipe.x + PIPE_WIDTH
      ) {
        // Vertical collision (either top or bottom pipe)
        if (
          rabbit.y < pipe.gapStart ||
          rabbit.y + rabbit.height > pipe.gapStart + PIPE_GAP
        ) {
          return true;
        }
      }
    }
    
    return false;
  }, [canvasSize.height]);
  
  // Update score when passing pipes
  const updateScore = useCallback((state: GameState) => {
    let newScore = 0;
    
    for (let i = 0; i < state.pipes.length; i++) {
      // If rabbit has passed this pipe
      if (state.rabbit.x > state.pipes[i].x + PIPE_WIDTH && !state.pipes[i].passed) {
        newScore++;
        state.pipes[i].passed = true;
      }
    }
    
    if (newScore > 0) {
      setScore(prev => prev + newScore);
    }
    
    return state;
  }, []);
  
  // Generate new pipes
  const generatePipes = useCallback((state: GameState) => {
    const { frameCount, lastPipeFrame } = state;
    
    // Create new pipes periodically
    if (frameCount - lastPipeFrame > PIPE_SPAWN_RATE) {
      const gapStart = Math.floor(Math.random() * (canvasSize.height - PIPE_GAP - 100)) + 50;
      
      const newPipe: Pipe = {
        x: canvasSize.width,
        gapStart,
        passed: false
      };
      
      return {
        ...state,
        pipes: [...state.pipes, newPipe],
        lastPipeFrame: frameCount
      };
    }
    
    return state;
  }, [canvasSize.height]);
  
  // Update game state
  const update = useCallback(() => {
    if (!isActive || isGameOver) return;
    
    setGameState(prevState => {
      // Update rabbit position
      let newState = {
        ...prevState,
        rabbit: {
          ...prevState.rabbit,
          y: prevState.rabbit.y + prevState.rabbit.velocity,
          velocity: prevState.rabbit.velocity + GRAVITY
        },
        frameCount: prevState.frameCount + 1
      };
      
      // Update pipes position and remove offscreen pipes
      newState.pipes = newState.pipes
        .map(pipe => ({
          ...pipe,
          x: pipe.x - PIPE_SPEED
        }))
        .filter(pipe => pipe.x + PIPE_WIDTH > 0);
      
      // Generate new pipes
      newState = generatePipes(newState);
      
      // Update score
      newState = updateScore(newState);
      
      // Check for collisions
      if (checkCollisions(newState)) {
        setIsGameOver(true);
        return prevState;
      }
      
      return newState;
    });
  }, [isActive, isGameOver, generatePipes, updateScore, checkCollisions]);
  
  // Initialize game when component mounts
  useEffect(() => {
    startGame();
  }, [startGame]);
  
  return {
    gameState,
    score,
    isGameOver,
    startGame,
    restartGame,
    jump,
    update
  };
}