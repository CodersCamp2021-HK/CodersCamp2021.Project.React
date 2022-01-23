import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render the button', () => {
    render(
      <Button type='secondary' onClick={() => {}}>
        Sterowanie
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Sterowanie' });
    expect(button).toBeInTheDocument();
  });

  it('can be clicked', () => {
    const onSelect = jest.fn();
    render(
      <Button type='primary' onClick={onSelect}>
        Sterowanie
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Sterowanie' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('can not be clicked', () => {
    const onSelect = jest.fn();
    render(
      <Button type='secondary' onClick={onSelect}>
        Sterowanie
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Sterowanie' });
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
