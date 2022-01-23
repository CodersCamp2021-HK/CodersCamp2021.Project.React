import { css } from '@emotion/react';
import { theme } from '../../shared/theme';
import kingUrl from '../../public/img/king.svg';
import pigUrl from '../../public/img/pig.svg';

const header = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const sideImg = css`
  height: 3rem;
  width: auto;
`;

const centerSection = css`
  background: ${theme.colors.gradient.colorful};
  background-clip: text;
  text-fill-color: transparent;
  -webkit-text-stroke: 0.0625em ${theme.colors.text.primary};
  text-align: center;

  font-size: 2rem;
  line-height: 3rem;

  @media screen and (max-width: 576px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

/**
 * @param {{ children: React.ReactNode }} props
 * */
const PageHeader = ({ children }) => {
  return (
    <header css={header}>
      <img src={kingUrl} alt='' css={sideImg} />
      <h1 css={centerSection}>{children}</h1>
      <img src={pigUrl} alt='' css={sideImg} />
    </header>
  );
};

export { PageHeader };
