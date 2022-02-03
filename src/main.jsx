import React from 'react';
import ReactDOM from 'react-dom';
import process from 'process';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameEngineProvider, GlobalStyles } from './shared';
import { GameUI, LevelSelectPage, CreditsPage, HomePage, NotFound } from './ui';
import './public/index.css';

const githubPrefix = process.env.NODE_ENV === 'production' ? '/CodersCamp2021.Project.React' : '/';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter basename={githubPrefix}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/level-select' element={<LevelSelectPage />} />
          <Route
            path='/level-select/:levelSelectId'
            element={
              <GameEngineProvider>
                <GameUI />
              </GameEngineProvider>
            }
          />
          <Route path='/credits' element={<CreditsPage />} />
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
