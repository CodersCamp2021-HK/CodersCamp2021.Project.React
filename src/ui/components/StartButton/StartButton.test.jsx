import { fireEvent, render, screen } from '@testing-library/react';
import { StartButton } from './StartButton';

describe('StartButton', () => {
  it('should render the button', () => {
    render(
      <StartButton type='secondary' onClick={() => {}}>
        start
      </StartButton>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    expect(button).toBeInTheDocument();
  });

  it('can be clicked', () => {
    const onSelect = jest.fn();
    render(
      <StartButton type='primary' onClick={onSelect}>
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
      <StartButton type='secondary' onClick={onSelect}>
        start
      </StartButton>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
