import React from 'react';
import { css } from '@emotion/react';
import { theme } from '../../shared/theme';
import { LevelButton, LEVEL_BUTTON_SIZE } from '../LevelButton';
import { scenes } from '../../game/scenes';
import { LevelScene } from '../../game/scenes/LevelScene';
import headerUrl from '../../public/img/header.png';
import backgroundUrl from '../../public/img/background.png';

const LEVEL_GRID_SPACING = '2rem';

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

const header = css`
  display: flex;
  justify-content: center;
`;

const headerImg = css`
  width: 100%;
  max-width: max(60vw, 500px);
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
    <main css={wrapper}>
      <header css={header}>
        <img src={headerUrl} alt='Level Select' css={headerImg} />
      </header>
      <section css={levelGrid}>
        {Object.values(scenes)
          .filter((scene) => scene.prototype instanceof LevelScene)
          .map((_, i) => {
            const levelNumber = i + 1;

            return (
              // eslint-disable-next-line react/no-array-index-key
              <LevelButton
                key={levelNumber}
                type={selected === levelNumber ? 'selected' : 'unlocked'}
                onSelect={() => setSelected(levelNumber)}
              >
                {levelNumber}
              </LevelButton>
            );
          })}
      </section>
    </main>
  );
};

export { LevelSelectPage };
