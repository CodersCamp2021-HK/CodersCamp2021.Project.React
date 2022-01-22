import { css } from '@emotion/react';
import { scenes } from '../game/scenes';
import headerUrl from '../public/img/header.png';
import backgroundUrl from '../public/img/background.png';
import levelButtonUrl from '../public/img/levelButton.png';
import { LevelScene } from '../game/scenes/LevelScene';

const LEVEL_BUTTON_SIZE = '4rem';
const LEVEL_GRID_SPACING = '2rem';

const wrapper = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: var(--colors-background-solid) url(${backgroundUrl}) center center / cover;
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
  max-width: min(50vw, 1000px);
  max-height: 50vh;
  overflow-y: auto;
  padding: ${LEVEL_GRID_SPACING} ${LEVEL_GRID_SPACING} 5rem;
  border: 1rem solid var(--colors-primary-main);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${LEVEL_BUTTON_SIZE}, 1fr));
  gap: ${LEVEL_GRID_SPACING};
  place-items: center;
  background: var(--colors-background-transparent);
`;

const levelButton = css`
  width: ${LEVEL_BUTTON_SIZE};
  height: ${LEVEL_BUTTON_SIZE};
  background: url(${levelButtonUrl}) center center / cover;
`;

/**
 * @param {{ children: React.ReactNode }} props
 */
const LevelButton = ({ children }) => (
  <button type='button' css={levelButton}>
    {children}
  </button>
);

const LevelSelectPage = () => {
  return (
    <main css={wrapper}>
      <header css={header}>
        <img src={headerUrl} alt='Level Select' css={headerImg} />
      </header>
      <section css={levelGrid}>
        {Object.values(scenes)
          .filter((scene) => scene.prototype instanceof LevelScene)
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <LevelButton key={i}>{i + 1}</LevelButton>
          ))}
      </section>
    </main>
  );
};

export { LevelSelectPage };
