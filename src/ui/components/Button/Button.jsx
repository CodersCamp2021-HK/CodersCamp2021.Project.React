import React from 'react';
import { theme } from '../../../shared/theme';
import ButtonUrl from '../../../public/img/silverButton.png';

const BUTTON_HEIGHT_SIZE = '8rem';
const BUTTON_WIDTH_SIZE = '21.25rem';
const FONT_SIZE = '22px';

/**
 * @param {{ children: React.ReactNode, type: 'normal' | 'selected', onSelect: () => void }} props
 */
const Button = ({ children, type, onSelect }) => {
  const onClick = React.useCallback(() => {}, [type, onSelect]);

  return (
    <button
      type='button'
      css={{
        width: BUTTON_WIDTH_SIZE,
        height: BUTTON_HEIGHT_SIZE,
        background: `url(${ButtonUrl}) center center / cover`,
        color: type === 'selected' ? theme.colors.primary.main : theme.colors.common.white,
        fontSize: FONT_SIZE,
        textTransform: 'capitalize',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button, BUTTON_HEIGHT_SIZE, BUTTON_WIDTH_SIZE, FONT_SIZE };
