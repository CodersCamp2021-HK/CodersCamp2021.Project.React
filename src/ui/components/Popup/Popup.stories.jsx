import React from 'react';
import { css } from '@emotion/react';
import { Popup } from './Popup';
import { theme } from '../../../shared/theme';
import keyboardArrowsUrl from '../../../public/img/keyboard_arrows.png';
import jumpUrl from '../../../public/img/jump.png';
import groundUrl from '../../../public/img/ground.png';
import keyXUrl from '../../../public/img/key_x.png';
import keyZUrl from '../../../public/img/key_z.png';
import attackUrl from '../../../public/img/attack.png';

const POPUP_INNER_BORDER_WIDTH = '10px';

const btn = css({
  color: theme.colors.primary.main,
});

const heading2 = css({
  fontSize: theme.fontSize.btnBigger,
  color: theme.colors.text.primary,
  width: '100%',
  textAlign: 'left',
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
  margin: '30px auto 0 auto',
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
  gap: '40px',
  margin: '30px auto 0 auto',
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
  gap: '25px',
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

export default {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
  },
};

export const PopupWithButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button css={btn} onClick={handleOpen}>
        open modal
      </button>
      <Popup open={open} onClose={handleClose}>
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
    </div>
  );
};
