import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameEngineProvider, GlobalStyles } from './shared';
import { GameUI, LevelSelectPage, CreditsPage, HomePage, NotFound } from './ui';
import { githubPrefix } from './shared/ui';
import './public/index.css';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path={githubPrefix} element={<HomePage />} />
          <Route path={`${githubPrefix}level-select`} element={<LevelSelectPage />} />
          <Route
            path={`${githubPrefix}level-select/:levelSelectId`}
            element={
              <GameEngineProvider>
                <GameUI />
              </GameEngineProvider>
            }
          />
          <Route path={`${githubPrefix}credits`} element={<CreditsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
