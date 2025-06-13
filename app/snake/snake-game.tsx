import { useEffect, useRef } from "react";
import { SnakeGameEngine } from "./snake-engine";

interface SnakeGame {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SnakeGame({
  isPlaying,
  setIsPlaying,
  setGameOver
}: SnakeGame) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const snakes = useRef<SnakeGameEngine | null>(null);

  // Function to update canvas size based on parent div
  const updateCanvasSize = () => {
    const parent = document.getElementById("entire-game");

    if (canvasRef.current && parent) {
      const newSize = parent.clientWidth;
      canvasRef.current.width = newSize;
      canvasRef.current.height = newSize;
    }
  };

  useEffect(() => {
    const parent = document.getElementById("entire-game");

    if (!canvasRef.current || !parent) {
      console.warn("Canvas or parent div not found");
      return;
    }

    updateCanvasSize();

    context.current = canvasRef.current.getContext("2d");

    if (context.current) {
      const ctx = context.current;
      snakes.current = new SnakeGameEngine(
        ctx,
        canvasRef.current.width,
        setGameOver,
        isPlaying
      );
      const snakeGame = snakes.current;

      window.onkeydown = (e) => {
        switch (e.key) {
          case "w":
          case "ArrowUp":
            snakeGame.snake.changeMovement("to top");
            break;
          case "s":
          case "ArrowDown":
            snakeGame.snake.changeMovement("to bottom");
            break;
          case "d":
          case "ArrowRight":
            snakeGame.snake.changeMovement("to right");
            break;
          case "a":
          case "ArrowLeft":
            snakeGame.snake.changeMovement("to left");
            break;
          case "Escape":
            setIsPlaying((prevIsPlaying) => !prevIsPlaying);
            break;
          default:
            break;
        }
      };
    }

    // Handle window resize
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvasRef.current = null;
      context.current = null;
      snakes.current = null;
    };
  }, []);

  useEffect(() => {
    if (snakes.current) {
      snakes.current.animate(isPlaying);
    }
  }, [isPlaying]);

  return (
    <div id="entire-game">
      <canvas id="game-canvas" ref={canvasRef}></canvas>
    </div>
  );
}
