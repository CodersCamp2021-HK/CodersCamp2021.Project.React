import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import { PageHeader, Button } from '../../components';
import backgroundUrl from '../../../public/img/background.jpg';

const wrapper = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const btnGroup = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 3rem;
  gap: 3rem;
`;
const HomePage = () => {
  return (
    <main css={wrapper}>
      <PageHeader>King and Pigs</PageHeader>
      <section css={btnGroup}>
        <Button type='gold' onClick={() => {}}>
          start
        </Button>
        <Button type='silver' onClick={() => {}}>
          Controls
        </Button>
        <Button type='silver' onClick={() => {}}>
          Credits
        </Button>
      </section>
    </main>
  );
};

export { HomePage };
