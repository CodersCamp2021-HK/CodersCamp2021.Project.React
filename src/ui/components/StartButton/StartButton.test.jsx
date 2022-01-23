import { render, screen } from '@testing-library/react';
import { StartButton } from './StartButton';

describe('StartButton', () => {
  it('should render the button', () => {
    render(
      <StartButton type='normal' onSelect={() => {}}>
        start
      </StartButton>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    expect(button).toBeInTheDocument();
  });
});
