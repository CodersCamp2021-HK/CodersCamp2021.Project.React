import React from 'react';
import { theme } from '../../../shared/theme';
import levelButtonUrl from '../../../public/img/levelButton.png';
import levelButtonSelectedUrl from '../../../public/img/levelButtonSelected.png';

const LEVEL_BUTTON_SIZE = '4rem';

/**
 * @param {{ children: React.ReactNode, type: 'locked' | 'unlocked' | 'selected' }} props
 */
const LevelButton = ({ children, type }) => {
  return (
    <button
      type='button'
      css={{
        width: LEVEL_BUTTON_SIZE,
        height: LEVEL_BUTTON_SIZE,
        background: `url(${type === 'selected' ? levelButtonSelectedUrl : levelButtonUrl}) center center / cover`,
        color: type === 'selected' ? theme.colors.primary.main : theme.colors.common.white,
        opacity: type === 'locked' ? '0.25' : '0.9',
        transition: 'opacity 0.25s',
        '&:hover': {
          opacity: type === 'locked' ? '0.25' : '1',
          color: type === 'unlocked' ? theme.colors.primary.main : null,
          background: type === 'unlocked' ? `url(${levelButtonSelectedUrl}) center center / cover` : null,
        },
      }}
      disabled={type === 'locked'}
    >
      {children}
    </button>
  );
};

export { LevelButton, LEVEL_BUTTON_SIZE };
