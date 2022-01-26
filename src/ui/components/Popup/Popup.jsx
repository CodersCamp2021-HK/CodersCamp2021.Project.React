import ReactDOM from 'react-dom';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { theme } from '../../../shared/theme';
import { CloseButton } from '../CloseButton';
import steelDecorationUrl from '../../../public/img/stealDecoration.svg';

const POPUP_INNER_BORDER_WIDTH = '10px';

const decoration = css({
  position: 'absolute',
  zIndex: 1,
});

const decoOne = css({
  top: `-${POPUP_INNER_BORDER_WIDTH}`,
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(-90deg)',
});
const decoTwo = css({
  top: '50%',
  right: `-${POPUP_INNER_BORDER_WIDTH}`,
  transform: 'translate(50%, -50%)',
});

const decoThree = css({
  bottom: `-${POPUP_INNER_BORDER_WIDTH}`,
  left: '50%',
  transform: 'translate(-50%, 50%) rotate(-90deg)',
});

const decoFour = css({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const decoFive = css({
  top: '50%',
  left: `-${POPUP_INNER_BORDER_WIDTH}`,
  transform: 'translate(-50%, -50%)',
});

const btnContainer = css({
  position: 'absolute',
  right: `-${POPUP_INNER_BORDER_WIDTH}`,
  top: `-${POPUP_INNER_BORDER_WIDTH}`,
});

const popupContainer = css({
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.background.transparent,
  overflowY: 'auto',
});

const popupInner = css({
  position: 'relative',
  width: 'clamp(1160px, 60vw, 1920px)',
  border: `${POPUP_INNER_BORDER_WIDTH} solid`,
  borderImageSlice: 1,
  borderImageSource: theme.colors.gradient.steel,
  backgroundColor: theme.colors.primary.main,
  '&:after': {
    content: '""',
    width: POPUP_INNER_BORDER_WIDTH,
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    transform: 'translateX(-50%)',
    background: theme.colors.gradient.steel,
  },
  '@media (max-width: 1200px)': {
    width: '96%',
    margin: '40px 0',
  },
  '@media (max-width: 1024px)': {
    '&:after': {
      left: 0,
      right: 0,
      top: '50%',
      width: 'auto',
      height: POPUP_INNER_BORDER_WIDTH,
      transform: 'translateY(-50%)',
    },
  },
});

const Popup = ({ open, onClose, children }) => {
  useEffect(() => {
    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.querySelector('body')?.append(portal);
    return () => {
      document.getElementById('portal').remove();
    };
  }, []);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div css={popupContainer}>
      <div css={popupInner}>
        <img
          src={steelDecorationUrl}
          css={css`
            ${decoOne};
            ${decoration};
          `}
          alt=''
        />
        <img
          src={steelDecorationUrl}
          css={css`
            ${decoTwo};
            ${decoration};
          `}
          alt=''
        />
        <img
          src={steelDecorationUrl}
          css={css`
            ${decoThree};
            ${decoration};
          `}
          alt=''
        />
        <img
          src={steelDecorationUrl}
          css={css`
            ${decoFour};
            ${decoration};
          `}
          alt=''
        />
        <img
          src={steelDecorationUrl}
          css={css`
            ${decoFive};
            ${decoration};
          `}
          alt=''
        />

        <div css={btnContainer}>
          <CloseButton onClose={onClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('portal'),
  );
};

export { Popup };
