import ReactDOM from 'react-dom';
import { css } from '@emotion/react';
import { useEffect, useRef, useMemo } from 'react';
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
  left: `-${POPUP_INNER_BORDER_WIDTH}`,
  transform: 'translate(-50%, -50%)',
});

const btnContainer = css({
  position: 'absolute',
  right: `-${POPUP_INNER_BORDER_WIDTH}`,
  top: `-${POPUP_INNER_BORDER_WIDTH}`,
  zIndex: 1,
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
  transition: theme.transitions.default,
  overflowY: 'auto',
});

const popupInner = css({
  position: 'relative',
  width: 'clamp(1160px, 60vw, 1920px)',
  border: `${POPUP_INNER_BORDER_WIDTH} solid`,
  borderImageSlice: 1,
  borderImageSource: theme.colors.gradient.steel,
  backgroundColor: theme.colors.primary.main,
  margin: '5rem 0',
  '@media (max-width: 1200px)': {
    width: '94%',
  },
});

/**
 * @param {{ open: boolean, children: React.ReactNode, onClose: () => void  }} props
 */

const Popup = ({ open, children, onClose }) => {
  const popupRef = useRef();
  const portal = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body?.appendChild(portal);
    return () => {
      document.body?.removeChild(portal);
    };
  }, [portal]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      role='dialog'
      aria-hidden='true'
      css={popupContainer}
      ref={popupRef}
      onClick={(e) => (popupRef.current === e.target ? onClose() : '')}
    >
      <div css={popupInner}>
        <img src={steelDecorationUrl} css={[decoOne, decoration]} alt='' />
        <img src={steelDecorationUrl} css={[decoTwo, decoration]} alt='' />
        <img src={steelDecorationUrl} css={[decoThree, decoration]} alt='' />
        <img src={steelDecorationUrl} css={[decoFour, decoration]} alt='' />

        <div css={btnContainer}>
          <CloseButton onClose={onClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>,
    portal,
  );
};

export { Popup, POPUP_INNER_BORDER_WIDTH, decoration };
