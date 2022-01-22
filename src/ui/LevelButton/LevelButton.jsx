import React from 'react';
import { theme } from '../../shared/theme';
import levelButtonUrl from '../../public/img/levelButton.png';
import levelButtonSelectedUrl from '../../public/img/levelButtonSelected.png';

const LEVEL_BUTTON_SIZE = '4rem';

/**
 * @param {{ children: React.ReactNode, type: 'locked' | 'unlocked' | 'selected', onSelect: () => void }} props
 */
const LevelButton = ({ children, type, onSelect }) => {
  const onClick = React.useCallback(() => {
    if (type === 'unlocked') {
      onSelect();
    }
  }, [type, onSelect]);

  return (
    <button
      type='button'
      css={{
        width: LEVEL_BUTTON_SIZE,
        height: LEVEL_BUTTON_SIZE,
        background: `url(${type === 'selected' ? levelButtonSelectedUrl : levelButtonUrl}) center center / cover`,
        color: type === 'selected' ? theme.colors.primary.main : theme.colors.common.white,
        opacity: type === 'locked' ? '0.25' : '1',
      }}
      onClick={onClick}
      disabled={type === 'locked'}
    >
      {children}
    </button>
  );
};

export { LevelButton, LEVEL_BUTTON_SIZE };
