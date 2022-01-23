import React from 'react';
import { theme } from '../../../shared/theme';
import StartButtonUrl from '../../../public/img/StartButton.png';

const START_BUTTON_HEIGHT_SIZE = '8rem';
const START_BUTTON_WIDTH_SIZE = '21.25rem';
const START_FONT_SIZE = '22px';

/**
 * @param {{ children: React.ReactNode, type: 'primary' | 'secondary', onClick: () => void }} props
 */
const StartButton = ({ children, type, onClick }) => {
  const event = React.useCallback(() => {
    if (type === 'primary') {
      onClick();
    }
  }, [type, onClick]);

  return (
    <button
      type='button'
      css={{
        width: START_BUTTON_WIDTH_SIZE,
        height: START_BUTTON_HEIGHT_SIZE,
        background: `url(${StartButtonUrl}) center center / cover`,
        color: type === 'secondary' ? theme.colors.primary.main : theme.colors.common.white,
        fontSize: START_FONT_SIZE,
        textTransform: 'uppercase',
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

export { StartButton, START_BUTTON_WIDTH_SIZE, START_BUTTON_HEIGHT_SIZE, START_FONT_SIZE };
