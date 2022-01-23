import { render, screen } from '@testing-library/react';
import { LevelSelectPage } from './LevelSelectPage';

describe('LevelSelectPage', () => {
  it('should render the page', () => {
    render(<LevelSelectPage />);

    const header = screen.getByRole('heading', { name: 'Level Select' });
    expect(header).toBeInTheDocument();
  });
});
