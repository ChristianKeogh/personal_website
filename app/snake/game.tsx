import { useState } from "react";

export default function SnakeGame() {
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [justStarted, setJustStarted] = useState(true);

  const startGame = () => {
    if (justStarted) {
      setIsPlaying(true);
      setJustStarted(false);

      return;
    }

    !gameOver && setIsPlaying(!isPlaying);
  };
  return (
    <div id="entire-game" onClick={startGame}>
      Loading...
    </div>
  );
}
