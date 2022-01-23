import React from 'react';
import { theme } from '../../../shared/theme';
import ButtonUrl from '../../../public/img/silverButton.png';

const BUTTON_HEIGHT_SIZE = '8rem';
const BUTTON_WIDTH_SIZE = '21.25rem';
const BUTTON_FONT_SIZE = '22px';

/**
 * @param {{ children: React.ReactNode, type: 'primary' | 'secondary', onClick: () => void }} props
 */
const Button = ({ children, type, onClick }) => {
  const event = React.useCallback(() => {
    if (type === 'primary') {
      onClick();
    }
  }, [type, onClick]);

  return (
    <button
      type='button'
      css={{
        width: BUTTON_WIDTH_SIZE,
        height: BUTTON_HEIGHT_SIZE,
        background: `url(${ButtonUrl}) center center / cover`,
        color: type === 'secondary' ? theme.colors.primary.main : theme.colors.common.white,
        fontSize: BUTTON_FONT_SIZE,
        textTransform: 'capitalize',
        '&:hover': {
          color: theme.colors.primary.main,
        },
      }}
      onClick={event}
    >
      {children}
    </button>
  );
};

export { Button, BUTTON_HEIGHT_SIZE, BUTTON_WIDTH_SIZE, BUTTON_FONT_SIZE };
