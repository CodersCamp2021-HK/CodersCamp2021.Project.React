import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameEngineProvider, GlobalStyles } from './shared';
import { GameUI, HomePage, LevelSelectPage, CreditsPage, NotFound } from './ui';
import './public/index.css';

const App = () => {
  return <HomePage />;
};

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route
          path='game'
          element={
            <GameEngineProvider>
              <GameUI />
            </GameEngineProvider>
          }
        />
        <Route path='level-select' element={<LevelSelectPage />} />
        <Route path='credits' element={<CreditsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
