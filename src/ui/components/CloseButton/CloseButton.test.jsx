import { fireEvent, render, screen } from '@testing-library/react';
import { CloseButton } from './CloseButton';

describe('Close button', () => {
  it('should render the close button', () => {
    render(<CloseButton onClick={() => {}} />);

    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toBeInTheDocument();
  });

  it('can be clicked', () => {
    const onClose = jest.fn();
    render(<CloseButton onClose={onClose} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
