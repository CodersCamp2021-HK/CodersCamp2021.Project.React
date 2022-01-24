import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render the button', () => {
    render(
      <Button type='silver' onClick={() => {}}>
        Sterowanie
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Sterowanie' });
    expect(button).toBeInTheDocument();
  });

  it('can be clicked', () => {
    const onSelect = jest.fn();
    render(
      <Button type='gold' onClick={onSelect}>
        start
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'start' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
