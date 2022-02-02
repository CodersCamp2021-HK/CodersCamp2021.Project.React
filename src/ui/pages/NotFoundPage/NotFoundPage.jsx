import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import backgroundUrl from '../../../public/img/background.jpg';
import { Button } from '../../components/Button';
import { githubPrefix } from '../../../shared/ui';

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
        Sorry, there&apos;s nothing here
      </h1>
      <Link to={githubPrefix}>
        <Button type='silver'>go back to homepage</Button>
      </Link>
    </main>
  );
};

export { NotFound };
