import { css } from '@emotion/react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useGameEngine, UIProxy, theme } from '../../shared';
import backgroundUrl from '../../public/img/background.jpg';
import { PageHeader } from '../components';

const wrapper = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const gameBorder = css`
  width: 100%;
  max-width: max(min(50vw, 1200px), 1200px);
  max-height: 1000vh;
  overflow-y: auto;

  border: 1rem solid ${theme.colors.primary.main};
  display: grid;

  place-items: center;
  background: ${theme.colors.background.transparent};
`;

const btn = css({
  border: '1px black solid',
  marginBottom: '30px',
  '&:hover': {
    background: '#e1e1e1',
  },
});

const GameUI = () => {
  const gameEngine = useGameEngine();
  const [running, setRunning] = useState(false);
  const [lose, setLose] = useState(false);

  /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
  const ref = useRef(null);

  const reset = () => {
    gameEngine.reset();
    setRunning(false);
    setLose(false);
  };

  const uiProxy = useMemo(
    () =>
      new UIProxy(() => {
        setLose(true);
        gameEngine.stop();
        setRunning(false);
      }),
    [gameEngine],
  );

  useLayoutEffect(() => {
    if (ref.current) {
      gameEngine.initialize(ref.current, uiProxy);
    }
  }, [gameEngine, uiProxy]);

  return (
    <div css={wrapper}>
      <PageHeader>Level 1</PageHeader>{' '}
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
      {lose && (
        <span css={{ fontSize: '35px', textTransform: 'uppercase', position: 'absolute', left: '190px', top: '110px' }}>
          You Lose
        </span>
      )}
      <div css={gameBorder}>
        <canvas css={{ width: '1150px', height: '512px' }} height={512} width={512} id='GameCanvas' ref={ref} />
      </div>
    </div>
    // </div>
  );
};

export { GameUI };
