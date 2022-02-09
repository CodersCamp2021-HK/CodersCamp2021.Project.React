import { css } from '@emotion/react';
import { useLayoutEffect, useMemo, useRef, useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import _ from 'lodash';
import { useGameEngine, UIProxy, theme } from '../../../shared';
import backgroundUrl from '../../../public/img/background.jpg';
import { Button, BUTTON_HEIGHT_SIZE, BUTTON_WIDTH_SIZE, PageHeader, PopupLevel } from '../../components';
import { getLocalStorage, unlockedLevel } from '../../../shared/game/localStorageFun';

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
  const navigate = useNavigate();
  const [variant, setVariant] = useState(/** @type {'playing' | 'victory' | 'defeat' | 'gameOver'} */ ('playing'));
  const open = variant !== 'playing';
  const selectedLevel = Number(params.levelSelectId);
  const nextLevel = variant === 'victory' ? selectedLevel + 1 : selectedLevel;
  const path = variant === 'victory' || variant === 'defeat' ? `/level-select/${nextLevel}` : '/';

  const handleClick = () => {
    setVariant('playing');
    navigate(path);
    setTimeout(() => {
      gameEngine.reset();
      gameEngine.start();
    }, 0);
  };

  useEffect(() => {
    gameEngine.start();

    return () => gameEngine.stop();
  }, [gameEngine]);

  /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
  const ref = useRef(null);

  const uiProxy = useMemo(
    () =>
      new UIProxy(
        () => {
          gameEngine.stop();
          unlockedLevel({ levelNumber: selectedLevel + 1 });
          setVariant('victory');
        },
        () => {
          gameEngine.stop();
          setVariant('defeat');
        },
        () => {
          gameEngine.stop();
          setVariant('gameOver');
        },
      ),
    [gameEngine, selectedLevel],
  );

  const levelsAvailable = useCallback(() => {
    const levelsArray = _.range(1, _.size(getLocalStorage()) + 1);

    return levelsArray.includes(selectedLevel);
  }, [selectedLevel]);

  useLayoutEffect(() => {
    if (ref.current && levelsAvailable()) {
      gameEngine.initialize(ref.current, uiProxy, selectedLevel);
    }
  }, [gameEngine, uiProxy, selectedLevel, levelsAvailable]);

  return (
    <>
      {!levelsAvailable() ? <Navigate to='/level-select' replace /> : ''}
      <main css={wrapper}>
        <PageHeader>Level {params.levelSelectId}</PageHeader>{' '}
        <section css={gameBorder}>
          <canvas css={{ width: '65vw' }} height={416} width={800} id='GameCanvas' ref={ref} />
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
      <PopupLevel open={open} onClick={handleClick} variant={variant} nextLevel={nextLevel} path={path} />
    </>
  );
};

export { GameUI };
