import { css } from '@emotion/react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useGameEngine, UIProxy } from '../shared';

const btn = css({
  border: '1px black solid',
  padding: '5px 15px',
  '&:hover': {
    background: '#e1e1e1',
  },
});

const GameUI = () => {
  const gameEngine = useGameEngine();
  const [running, setRunning] = useState(true);
  const [lose, setLose] = useState(false);
  const [distance, setDistance] = useState(0);

  /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
  const ref = useRef(null);

  const uiProxy = useMemo(() => new UIProxy((val) => setDistance(val)), []);

  useLayoutEffect(() => {
    if (ref.current) {
      gameEngine.initialize(ref.current, uiProxy).start();
    }
  }, [gameEngine, uiProxy]);

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px', height: '300px' }}>
      <div css={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {running ? (
          <button
            css={btn}
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
            css={btn}
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
          css={btn}
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
      {lose && (
        <span css={{ fontSize: '35px', textTransform: 'uppercase', position: 'absolute', left: '190px', top: '110px' }}>
          You Lose
        </span>
      )}
      <canvas css={{ width: '500px', height: '200px' }} height={200} width={500} id='GameCanvas' ref={ref} />
    </div>
  );
};

export { GameUI };
