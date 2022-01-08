import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import logo from '../public/logo.svg';
import { theme } from '../theme';

const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const appLogoAnimation = css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${appLogoSpin} infinite 20s linear;
  }
`;

const appLink = css({
  color: theme.colors.link,
});

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      css={{
        textAlign: 'center',
      }}
    >
      <header
        css={{
          backgroundColor: theme.colors.background,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'calc(10px + 2vmin)',
          color: 'white',
        }}
      >
        <img
          css={[
            {
              height: '40vmin',
              pointerEvents: 'none',
            },
            appLogoAnimation,
          ]}
          src={logo}
          alt='logo'
        />
        <p>Hello Vite + React!</p>
        <p>
          <button
            css={{
              fontSize: 'calc(10px + 2vmin)',
            }}
            type='button'
            onClick={() => setCount((c) => c + 1)}
          >
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a css={[appLink]} href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React
          </a>
          {' | '}
          <a css={[appLink]} href='https://vitejs.dev/guide/features.html' target='_blank' rel='noopener noreferrer'>
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export { App };
