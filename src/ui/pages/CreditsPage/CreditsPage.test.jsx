import { render, screen } from '@testing-library/react';
import { CreditsPage } from './CreditsPage';

describe('CreditsPage', () => {
  it('should render the page', () => {
    render(<CreditsPage />);

    const header = screen.getByRole('heading', { name: 'CreditsPage' });
    expect(header).toBeInTheDocument();
  });
});
