import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('should render the page', () => {
    render(<HomePage />);

    const header = screen.getByRole('heading', { name: 'King and Pigs' });
    expect(header).toBeInTheDocument();
  });
});
