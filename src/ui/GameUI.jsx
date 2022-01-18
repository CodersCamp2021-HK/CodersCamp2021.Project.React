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
  const [running, setRunning] = useState(false);
  const [lose, setLose] = useState(false);
  const [distance, setDistance] = useState(0);

  /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
  const ref = useRef(null);

  const reset = () => {
    gameEngine.reset();
    setRunning(false);
    setLose(false);
    setDistance(0);
  };

  const uiProxy = useMemo(
    () =>
      new UIProxy(
        (val) => setDistance(val),
        () => {
          setLose(true);
          gameEngine.stop();
          setRunning(false);
        },
      ),
    [gameEngine],
  );

  useLayoutEffect(() => {
    if (ref.current) {
      gameEngine.initialize(ref.current, uiProxy);
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
              if (lose) {
                reset();
              }
              gameEngine.start();
              setRunning(true);
            }}
          >
            Start
          </button>
        )}
        <button css={btn} type='button' onClick={reset}>
          Reset
        </button>
        <span>Distance: {distance}</span>
      </div>
      {lose && (
        <span css={{ fontSize: '35px', textTransform: 'uppercase', position: 'absolute', left: '190px', top: '110px' }}>
          You Lose
        </span>
      )}
      <canvas css={{ width: '512px', height: '512px' }} height={512} width={512} id='GameCanvas' ref={ref} />
    </div>
  );
};

export { GameUI };
