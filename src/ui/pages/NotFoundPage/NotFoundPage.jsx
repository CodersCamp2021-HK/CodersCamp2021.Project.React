import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import backgroundUrl from '../../../public/img/background.jpg';
import { Button } from '../../components/Button';

const wrapper = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const NotFound = () => {
  return (
    <main css={wrapper}>
      <h1
        css={css`
          padding-bottom: 2rem;
        `}
      >
        Sorry, there's nothing here
      </h1>
      <Link to='/'>
        <Button type='silver' onClick={() => {}}>
          go back to homepage
        </Button>
      </Link>
    </main>
  );
};

export { NotFound };
