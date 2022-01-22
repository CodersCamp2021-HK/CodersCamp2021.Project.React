import { render, screen } from '@testing-library/react';
import { LevelSelectPage } from './LevelSelectPage';

describe('LevelSelectPage', () => {
  it('should render the page', () => {
    render(<LevelSelectPage />);

    const header = screen.getByAltText('Level Select');
    expect(header).toBeInTheDocument();
  });
});
