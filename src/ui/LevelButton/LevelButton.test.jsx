import { fireEvent, render, screen } from '@testing-library/react';
import { LevelButton } from './LevelButton';

describe('LevelButton', () => {
  it('should render the button', () => {
    render(<LevelButton type='selected'>1</LevelButton>);

    const button = screen.getByRole('button', { text: '1' });
    expect(button).toBeInTheDocument();
  });

  it('can be clicked when unlocked', () => {
    const onSelect = jest.fn();
    render(
      <LevelButton type='unlocked' onSelect={onSelect}>
        2
      </LevelButton>,
    );

    const button = screen.getByRole('button', { text: '2' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when locked', () => {
    const onSelect = jest.fn();
    render(
      <LevelButton type='locked' onSelect={onSelect}>
        3
      </LevelButton>,
    );

    const button = screen.getByRole('button', { text: '3' });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
