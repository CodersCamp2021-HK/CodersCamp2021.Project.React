import React from 'react';
import ReactDOM from 'react-dom';
import { GameEngineProvider, GlobalStyles } from './shared';
import { GameUI } from './ui';
import './public/index.css';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <GameEngineProvider>
        <GameUI />
      </GameEngineProvider>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
