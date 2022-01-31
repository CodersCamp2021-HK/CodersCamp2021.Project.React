import { css } from '@emotion/react';
import { useLayoutEffect, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  max-width: max(min(50vw, 1080px), 1076px);
  max-height: 1000vh;
  overflow-y: auto;
  border: 1rem solid ${theme.colors.primary.main};
  display: flex;
  place-items: center;
  background: ${theme.colors.background.transparent};
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

  const params = useParams();

  return (
    <div css={wrapper}>
      <PageHeader>Level {params.levelSelectId}</PageHeader>{' '}
      <div css={gameBorder}>
        <canvas css={{ width: '1024px', height: '608px' }} height={608} width={1024} id='GameCanvas' ref={ref} />
      </div>
    </div>
  );
};

export { GameUI };
