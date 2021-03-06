import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LevelSelectPage } from './LevelSelectPage';

describe('LevelSelectPage', () => {
  it('should render the page', () => {
    render(
      <MemoryRouter>
        <LevelSelectPage />
      </MemoryRouter>,
    );

    const header = screen.getByRole('heading', { name: 'Level Select' });
    expect(header).toBeInTheDocument();
  });
});
