import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { GameEngineProvider } from '../../../shared';
import { GameUI } from './GameUI';

const GameUIWrapper = ({ children, level = 1 }) => (
  <MemoryRouter initialEntries={[`/level-select/${level}`]}>
    <Routes>
      <Route path='/level-select/:levelSelectId' element={<GameEngineProvider>{children}</GameEngineProvider>} />
    </Routes>
  </MemoryRouter>
);

describe('GameUI', () => {
  it('should render GameUI', () => {
    render(<GameUI />, { wrapper: GameUIWrapper });

    const header = screen.getByRole('heading', { name: 'Level 1' });
    expect(header).toBeInTheDocument();
  });
});
