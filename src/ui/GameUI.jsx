import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useGameEngine, UIProxy } from '../shared';
import { GameCanvas } from './GameCanvas';

const GameUI = () => {
  const gameEngine = useGameEngine();
  const [running, setRunning] = useState(false);
  const [distance, setDistance] = useState(0);

  /** @type {React.MutableRefObject<HTMLCanvasElement | undefined>} */
  const ref = useRef();

  const uiProxy = useMemo(() => new UIProxy((val) => setDistance(val)), []);

  useLayoutEffect(() => {
    if (ref.current) {
      gameEngine.initialize(ref.current, uiProxy);
    }
  }, [gameEngine, uiProxy]);

  return (
    <>
      <div css={{ display: 'flex', gap: '10px' }}>
        <span>UI Root</span>
        {running ? (
          <button
            type='button'
            onClick={() => {
              gameEngine.stop();
              setRunning(false);
            }}
          >
            Stop
          </button>
        ) : (
          <button
            type='button'
            onClick={() => {
              gameEngine.start();
              setRunning(true);
            }}
          >
            Start
          </button>
        )}
        <button
          type='button'
          onClick={() => {
            gameEngine.reset();
            setRunning(false);
            setDistance(0);
          }}
        >
          Reset
        </button>
        <span>Distance: {distance}</span>
      </div>
      <GameCanvas ref={ref} />
    </>
  );
};

export { GameUI };
