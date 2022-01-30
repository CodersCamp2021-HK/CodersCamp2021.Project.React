import { css } from '@emotion/react';
import { Button } from '../Button';
import { Popup } from '../Popup';

import defeatPopup from '../../../public/img/defeatPopup.png';
import victoryPopup from '../../../public/img/victoryPopup.png';

const box = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const img = css`
  width: 17.5rem;
  height: 13rem;
  margin-bottom: 3rem;
  margin-top: 2rem;
`;

const button = css`
  flex-direction: column;
  margin-bottom: 1rem;
`;

/**
 * @param {{ open: boolean, onClose: () => void, variant: 'victory' | 'defeat'  }} props
 */

const PopupLevel = ({ open, onClose, variant }) => {
  let showImg;
  let buttonText;
  let altText;
  if (variant === 'victory') {
    showImg = victoryPopup;
    buttonText = 'next';
    altText = 'victory';
  } else {
    showImg = defeatPopup;
    buttonText = 'retry';
    altText = 'defeat';
  }

  return (
    <Popup open={open} onClose={onClose} variant='LevelPopup'>
      <div css={box}>
        <img css={img} src={showImg} alt={altText} />
        <div css={button}>
          <Button type='gold' onClick={() => {}}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export { PopupLevel };