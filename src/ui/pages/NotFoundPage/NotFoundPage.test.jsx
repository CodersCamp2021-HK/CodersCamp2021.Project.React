import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should render the page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const header = screen.getByRole('heading', { name: "Sorry, there's nothing here" });
    expect(header).toBeInTheDocument();
  });
});
