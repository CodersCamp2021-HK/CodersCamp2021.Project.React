import { fireEvent, render, screen } from '@testing-library/react';
import { LevelButton } from './LevelButton';

describe('LevelButton', () => {
  it('should render the button', () => {
    render(<LevelButton type='unlocked'>1</LevelButton>);

    const button = screen.getByRole('button', { name: '1' });
    expect(button).toBeInTheDocument();
  });

  it('should be disabled when locked', () => {
    const onSelect = jest.fn();
    render(<LevelButton type='locked'>3</LevelButton>);

    const button = screen.getByRole('button', { name: '3' });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
