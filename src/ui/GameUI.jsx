import { useLayoutEffect, useRef } from 'react';
import { useGameEngine } from '../shared';
import { GameCanvas } from './GameCanvas';

const GameUI = () => {
  const gameEngine = useGameEngine();

  /** @type {React.MutableRefObject<HTMLCanvasElement | undefined>} */
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref.current) {
      gameEngine.initialize(ref.current).start();
    }
  }, [gameEngine]);

  return (
    <>
      <span>UI Root</span>
      <GameCanvas ref={ref} />
    </>
  );
};

export { GameUI };
