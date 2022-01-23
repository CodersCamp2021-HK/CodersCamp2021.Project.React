import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render the button', () => {
    render(
      <Button type='normal' onSelect={() => {}}>
        Sterowanie
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Sterowanie' });
    expect(button).toBeInTheDocument();
  });
});
