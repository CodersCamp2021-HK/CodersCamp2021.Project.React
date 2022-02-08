import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Popup } from '../Popup';

import defeatPopup from '../../../public/img/defeatPopup.png';
import victoryPopup from '../../../public/img/victoryPopup.png';
import gameOverPopup from '../../../public/img/gameOverPopup.png';

const box = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const img = css`
  width: 17.5rem;
  margin-bottom: 3rem;
  margin-top: 2rem;
`;

const button = css`
  flex-direction: column;
  margin-bottom: 1rem;
`;

/**
 * @param {{ open: boolean, onClick: () => void, variant: 'playing' | 'victory' | 'defeat' | 'gameOver', nextLevel: number, path: string  }} props
 */

const PopupLevel = ({ open, onClick, variant, nextLevel, path }) => {
  let showImg;
  let buttonText;
  let altText;
  if (variant === 'victory') {
    showImg = victoryPopup;
    buttonText = 'next';
    altText = 'victory';
  }
  if (variant === 'defeat') {
    showImg = defeatPopup;
    buttonText = 'retry';
    altText = 'defeat';
  }
  if (variant === 'gameOver') {
    showImg = gameOverPopup;
    buttonText = 'homepage';
    altText = 'victory';
  }

  return (
    <Popup open={open} onClose={() => {}} variant='LevelPopup'>
      <div css={box}>
        <img css={img} src={showImg} alt={altText} />
        <div css={button}>
          <Link to={path} key={nextLevel}>
            <Button onClick={onClick} type='gold'>
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export { PopupLevel };
