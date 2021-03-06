import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import closeButtonUrl from '../../../public/img/closeButton.jpg';

const CLOSE_BUTTON_BORDER_WIDTH = '10px';

const btn = css({
  width: '3.9rem',
  height: '3.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `${CLOSE_BUTTON_BORDER_WIDTH} solid`,
  borderImageSlice: 1,
  borderImageSource: theme.colors.gradient.steel,
  background: `url(${closeButtonUrl}) center center / cover`,
  svg: {
    path: {
      transition: theme.transitions.default,
    },
  },
  '&:hover': {
    borderImageSource: theme.colors.gradient.selectedLevel,
    svg: {
      path: {
        fill: theme.colors.primary.main,
        transition: theme.transitions.default,
      },
    },
  },
});

/**
 * @param {{ onClose: () => void }} props
 */

const CloseButton = ({ onClose }) => {
  return (
    <button onClick={onClose} type='button' css={btn} aria-label='Close'>
      <svg width='1.2rem' height='1.2rem' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M32.8802 3.39883L29.572 0.0905762L16.4563 13.2063L3.3406 0.0905762L0.0323486 3.39883L13.148 16.5145L0.0323486 29.6302L3.3406 32.9385L16.4563 19.8228L29.572 32.9385L32.8802 29.6302L19.7646 16.5145L32.8802 3.39883Z'
          fill='white'
        />
      </svg>
    </button>
  );
};

export { CloseButton };
