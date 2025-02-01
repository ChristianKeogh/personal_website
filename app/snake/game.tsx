import { useState, useEffect } from "react";
import SnakeGame from "./snake-game";

export default function ClickToStart() {
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [justStarted, setJustStarted] = useState(true);

  function startGame() {
    if (justStarted) {
      setIsPlaying(true);
      setJustStarted(false);
      return;
    }

    !gameOver && setIsPlaying(!isPlaying);
  }

  // Reset the game when it ends
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setGameOver(false);
        setIsPlaying(false);
        setJustStarted(true);
      }, 1000); // 2-second delay before restart
    }
  }, [gameOver]);

  return (
    <div id="entire-game" onClick={startGame}>
      {justStarted && <p className="new-game-hint">Click here to start</p>}
      {!gameOver && !justStarted && (
        <SnakeGame
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setGameOver={setGameOver}
        />
      )}
      {gameOver && <p className="game-over-text">Game Over</p>}
    </div>
  );
}
