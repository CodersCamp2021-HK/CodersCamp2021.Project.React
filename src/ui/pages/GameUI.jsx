import { css } from '@emotion/react';
import { useLayoutEffect, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGameEngine, UIProxy, theme } from '../../shared';
import backgroundUrl from '../../public/img/background.jpg';
import { Button, BUTTON_HEIGHT_SIZE, BUTTON_WIDTH_SIZE, PageHeader } from '../components';

const wrapper = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const gameBorder = css`
  position: relative;
  width: 100%;
  max-width: max(min(50vw, 1080px), 1076px);
  max-height: 1000vh;
  border: 1rem solid ${theme.colors.primary.main};
  display: flex;
  place-items: center;
  background: ${theme.colors.background.transparent};
`;

const buttonWrapper = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: calc(-${BUTTON_HEIGHT_SIZE} / 2 - 1.9rem);
  left: 0;
  right: 0;
`;

const GameUI = () => {
  const gameEngine = useGameEngine();

  useEffect(() => {
    gameEngine.start();
  }, [gameEngine]);

  /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
  const ref = useRef(null);

  const uiProxy = useMemo(
    () =>
      new UIProxy(() => {
        gameEngine.stop();
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
      <div css={gameBorder}>
        <canvas css={{ width: '1024px', height: '512' }} height={512} width={1024} id='GameCanvas' ref={ref} />

        <div css={buttonWrapper}>
          <Link to='/'>
            <Button type='silver'>
              change <br />
              level
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { GameUI };
