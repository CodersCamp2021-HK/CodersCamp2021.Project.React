import { css } from '@emotion/react';
import { BUTTON_HEIGHT_SIZE, BUTTON_WIDTH_SIZE, BUTTON_FONT_SIZE } from '../Button';
import { Popup, POPUP_INNER_BORDER_WIDTH, decoration } from '../Popup';
import { theme } from '../../../shared/theme';
import keyboardArrowsUrl from '../../../public/img/keyboard_arrows.png';
import jumpUrl from '../../../public/img/jump.png';
import groundUrl from '../../../public/img/ground.png';
import keyXUrl from '../../../public/img/key_x.png';
import keyZUrl from '../../../public/img/key_z.png';
import attackUrl from '../../../public/img/attack.png';
import ButtonSilverUrl from '../../../public/img/silverButton.png';
import steelDecorationUrl from '../../../public/img/stealDecoration.svg';

const heading1 = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: BUTTON_WIDTH_SIZE,
  height: BUTTON_HEIGHT_SIZE,
  background: `url(${ButtonSilverUrl}) center center / cover`,
  color: theme.colors.common.white,
  fontSize: BUTTON_FONT_SIZE,
  position: 'absolute',
  top: '0',
  transform: 'translateY(-50%)',
  left: `-${POPUP_INNER_BORDER_WIDTH}`,
  zIndex: 1,
});

const heading2 = css({
  fontSize: theme.fontSize.btnBigger,
  color: theme.colors.text.primary,
  width: '100%',
  textAlign: 'left',
});

const deco = css({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const text = css({
  fontFamily: theme.fontFamily.primary,
  fontSize: theme.fontSize.primary,
  color: theme.colors.text.primary,
  textAlign: 'center',
});

const content = css({
  display: 'flex',
  gap: POPUP_INNER_BORDER_WIDTH,
  position: 'relative',
  '&:after': {
    content: '""',
    width: POPUP_INNER_BORDER_WIDTH,
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    transform: 'translateX(-50%)',
    background: theme.colors.gradient.steel,
    '@media (max-width: 1024px)': {
      left: 0,
      right: 0,
      top: '50%',
      width: 'auto',
      height: POPUP_INNER_BORDER_WIDTH,
      transform: 'translateY(-50%)',
    },
  },
  '& > *': {
    flex: 1,
    padding: '4rem 2rem 3rem 2rem',
  },
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
  },
});

const innerWrapper1 = css({
  position: 'relative',
  display: 'inline-block',
  margin: '2rem auto 0 auto',
  '& > div': {
    position: 'absolute',
  },
});

const col = css({
  textAlign: 'center',
});

const innerWrapper2 = css({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '2rem',
  margin: '1.5rem auto 0 auto',
});

const image1 = css({
  padding: '3.5rem 5.7rem',
  '@media (max-width: 1440px)': {
    padding: '5rem 7rem',
  },
  '@media (max-width: 768px)': {
    padding: '3rem 6rem',
  },
});

const description = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const keyLeftDescription = css({
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
});

const keyRightDescription = css({
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
});

const keyUpDescription = css({
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
});

const keyDownDescription = css({
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
});

const exampleImg = css({
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

/**
 * @param {{ open: boolean, onClose: () => void  }} props
 */

const PopupControls = ({ open, onClose }) => {
  return (
    <Popup open={open} onClose={onClose}>
      <img
        src={steelDecorationUrl}
        css={css`
          ${deco};
          ${decoration};
        `}
        alt=''
      />
      <div css={heading1}>Controls</div>
      <div css={content}>
        <div css={col}>
          <h2 css={heading2}>Movement</h2>
          <div css={innerWrapper1}>
            <div
              css={css`
                ${keyLeftDescription};
                ${description}
              `}
            >
              <p css={text}>
                Move
                <br />
                to left
              </p>
            </div>
            <div
              css={css`
                ${keyRightDescription};
                ${description}
              `}
            >
              <p css={text}>
                Move <br />
                to right
              </p>
            </div>
            <div
              css={css`
                ${keyUpDescription};
                ${description}
              `}
            >
              <img src={jumpUrl} css={exampleImg} alt='' />
              <p css={text}>Jump</p>
            </div>
            <div
              css={css`
                ${keyDownDescription};
                ${description}
              `}
            >
              <img src={groundUrl} css={exampleImg} alt='' />
              <p css={text}>Crouch</p>
            </div>
            <img css={image1} src={keyboardArrowsUrl} alt='' />
          </div>
        </div>
        <div css={col}>
          <h2 css={heading2}>Action</h2>
          <div css={innerWrapper2}>
            <div
              css={css`
                ${description}
              `}
            >
              <img src={keyZUrl} alt='' />
              <p css={text}>Attack</p>
              <img src={attackUrl} css={exampleImg} alt='' />
            </div>
            <div
              css={css`
                ${description}
              `}
            >
              <img src={keyXUrl} alt='' />
              <p css={text}>Throw</p>
              <img src={attackUrl} css={exampleImg} alt='' />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export { PopupControls };
