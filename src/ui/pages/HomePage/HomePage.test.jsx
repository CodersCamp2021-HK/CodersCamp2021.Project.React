import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('should render the page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const header = screen.getByRole('heading', { name: 'King and Pigs' });
    expect(header).toBeInTheDocument();
  });
});
