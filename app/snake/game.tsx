import { useState } from "react";
import SnakeGame from "./snake-game";

export default function clickToStart() {
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

  return (
    <div id="entire-game" onClick={startGame}>
      {justStarted && <p className="new-game-hint">Click anywhere to start</p>}
      {!gameOver && !justStarted && (
        <SnakeGame
        //   isPlaying={isPlaying}
        //   setIsPlaying={setIsPlaying}
        //   setGameOver={setGameOver}
        />
      )}
    </div>
  );
}
