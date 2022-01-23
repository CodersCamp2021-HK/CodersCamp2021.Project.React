import { fireEvent, render, screen } from '@testing-library/react';
import { StartButton } from './StartButton';

describe('StartButton', () => {
  it('should render the button', () => {
    render(
      <StartButton type='selected' onSelect={() => {}}>
        start
      </StartButton>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    expect(button).toBeInTheDocument();
  });

  it('can be clicked', () => {
    const onSelect = jest.fn();
    render(
      <StartButton type='normal' onSelect={onSelect}>
        start
      </StartButton>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('can not be clicked', () => {
    const onSelect = jest.fn();
    render(
      <StartButton type='selected' onSelect={onSelect}>
        start
      </StartButton>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
