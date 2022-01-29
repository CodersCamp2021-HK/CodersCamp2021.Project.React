import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';

const container = css`
  display: flex;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const devImage = css`
  height: 3.08rem;
  width: auto;
  margin-right: 1.85rem;
`;

const infoContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.fontFamily.primary};
  h2 {
    color: ${theme.colors.text.secondary};
  }
`;

/**
 * @param {{ image: string, name: string, devRole: string }} props
 * */
const DevInfo = ({ image, name, devRole }) => {
  return (
    <div css={container}>
      <img src={image} alt={name} css={devImage} />
      <div css={infoContainer}>
        <h2>{name}</h2>
        <p>{devRole}</p>
      </div>
    </div>
  );
};

export { DevInfo };
