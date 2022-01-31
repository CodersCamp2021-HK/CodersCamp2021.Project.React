import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CreditsPage } from './CreditsPage';

describe('CreditsPage', () => {
  it('should render the page', () => {
    render(
      <MemoryRouter>
        <CreditsPage />
      </MemoryRouter>,
    );

    const header = screen.getByRole('heading', { name: 'Credits' });
    expect(header).toBeInTheDocument();
  });
});
