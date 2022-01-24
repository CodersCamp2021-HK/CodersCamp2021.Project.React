import { theme } from '../../../shared/theme';
import ButtonSilverUrl from '../../../public/img/silverButton.png';
import ButtonGoldUrl from '../../../public/img/goldButton.png';

const BUTTON_HEIGHT_SIZE = '8rem';
const BUTTON_WIDTH_SIZE = '21.25rem';
const BUTTON_FONT_SIZE = '1.375rem';

/**
 * @param {{ children: React.ReactNode, type: 'silver' | 'gold', onClick: () => void }} props
 */
const Button = ({ children, type, onClick }) => {
  return (
    <button
      type='button'
      css={{
        width: BUTTON_WIDTH_SIZE,
        height: BUTTON_HEIGHT_SIZE,
        background:
          type === 'silver'
            ? `url(${ButtonSilverUrl}) center center / cover`
            : `url(${ButtonGoldUrl}) center center / cover`,
        color: theme.colors.common.white,
        fontSize: BUTTON_FONT_SIZE,
        textTransform: type === 'gold' ? 'uppercase' : 'none',
        '&:hover': {
          color: theme.colors.primary.main,
        },
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button, BUTTON_HEIGHT_SIZE, BUTTON_WIDTH_SIZE, BUTTON_FONT_SIZE };
