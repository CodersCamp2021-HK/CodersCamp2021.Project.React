import React from 'react';
import { theme } from '../../../shared/theme';
import StartButtonUrl from '../../../public/img/StartButton.png';

const BUTTON_HEIGHT_SIZE = '8rem';
const BUTTON_WIDTH_SIZE = '21.25rem';
const FONT_SIZE = '22px';

/**
 * @param {{ children: React.ReactNode, type: 'normal' | 'selected', onSelect: () => void }} props
 */
const StartButton = ({ children, type, onSelect }) => {
  const onClick = React.useCallback(() => {
    if (type === 'normal') {
      onSelect();
    }
  }, [type, onSelect]);

  return (
    <button
      type='button'
      css={{
        width: BUTTON_WIDTH_SIZE,
        height: BUTTON_HEIGHT_SIZE,
        background: `url(${StartButtonUrl}) center center / cover`,
        color: type === 'selected' ? theme.colors.primary.main : theme.colors.common.white,
        fontSize: FONT_SIZE,
        textTransform: 'uppercase',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { StartButton };
