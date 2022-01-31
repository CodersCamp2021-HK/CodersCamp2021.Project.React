import React from 'react';
import { css } from '@emotion/react';
import { Link, Outlet } from 'react-router-dom';
import { theme } from '../../../shared/theme';
import { PageHeader, LevelButton, LEVEL_BUTTON_SIZE } from '../../components';
import { scenes } from '../../../game/scenes';
import { LevelScene } from '../../../game/scenes/LevelScene';
import backgroundUrl from '../../../public/img/background.jpg';

const LEVEL_GRID_SPACING = '2rem';

const levels = Object.values(scenes).filter((scene) => scene.prototype instanceof LevelScene);

const wrapper = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const levelGrid = css`
  width: 100%;
  max-width: max(min(50vw, 1000px), 500px);
  max-height: 50vh;
  overflow-y: auto;
  padding: ${LEVEL_GRID_SPACING} ${LEVEL_GRID_SPACING} 5rem;
  border: 1rem solid ${theme.colors.primary.main};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${LEVEL_BUTTON_SIZE}, 1fr));
  gap: ${LEVEL_GRID_SPACING};
  place-items: center;
  background: ${theme.colors.background.transparent};
`;

const LevelSelectPage = () => {
  const [selected, setSelected] = React.useState(/** @type {number?} */ (null));

  return (
    <>
      <main css={wrapper}>
        <PageHeader>Level Select</PageHeader>
        <section css={levelGrid}>
          {levels.map((_, i) => {
            const levelNumber = i + 1;

            return (
              <Link to='/game' key={levelNumber}>
                <LevelButton
                  type={selected === levelNumber ? 'selected' : 'unlocked'}
                  onSelect={() => setSelected(levelNumber)}
                >
                  {levelNumber}
                </LevelButton>
              </Link>
            );
          })}
        </section>
      </main>
      <Outlet />
    </>
  );
};

export { LevelSelectPage };
