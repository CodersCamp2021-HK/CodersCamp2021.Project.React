import React from 'react';
import ReactDOM from 'react-dom';
import { css, Global } from '@emotion/react';
import { variables } from './theme';
import { App } from './app';
import './public/index.css';

const styles = css`
  :root {
    ${Object.entries(variables)
      .map(([k, v]) => `${k}: ${v};`)
      .join('\n')}
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Global styles={styles} />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
