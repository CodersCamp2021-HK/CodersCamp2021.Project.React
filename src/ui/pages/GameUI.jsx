import { css } from '@emotion/react';
import { useLayoutEffect, useMemo, useRef, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import _ from 'lodash';
import { levels } from './LevelSelectPage/LevelSelectPage';
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
  border: 1rem solid ${theme.colors.primary.main};
  margin-bottom: calc(${BUTTON_HEIGHT_SIZE} + 0.9rem);
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
  const params = useParams();

  useEffect(() => {
    gameEngine.start();

    return () => gameEngine.stop();
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

  const levelExists = () => {
    const levelsArray = _.range(1, levels.length + 1);

    return levelsArray.includes(Number(params.levelSelectId));
  };

  return (
    <>
      {!levelExists() ? <Navigate to='/level-select' replace /> : ''}
      <main css={wrapper}>
        <PageHeader>Level {params.levelSelectId}</PageHeader>{' '}
        <section css={gameBorder}>
          <canvas css={{ width: '65vw' }} height={512} width={1024} id='GameCanvas' ref={ref} />
          <div css={buttonWrapper}>
            <Link to='/level-select'>
              <Button type='silver'>
                change <br />
                level
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export { GameUI };
