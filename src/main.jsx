import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './theme';
import { App } from './app';
import './public/index.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
