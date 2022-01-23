import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('should render the header with correct text', () => {
    render(<PageHeader>King and Pigs</PageHeader>);

    const header = screen.getByRole('heading', { name: 'King and Pigs' });
    expect(header).toBeInTheDocument();
  });
});
