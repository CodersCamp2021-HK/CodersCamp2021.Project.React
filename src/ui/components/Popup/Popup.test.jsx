import { render, screen } from '@testing-library/react';
import { Popup } from './Popup';

describe('Popup', () => {
  it('should not show', () => {
    const handleClose = jest.fn();

    render(
      <Popup open={false} onClose={handleClose} variant='Control'>
        <div>children</div>
      </Popup>,
    );
    const children = screen.queryByText('children');

    expect(children).toBeNull();
  });

  it('should show Control popup content', () => {
    const handleClose = jest.fn();

    render(
      <Popup open onClose={handleClose} variant='Control'>
        <div>children</div>
      </Popup>,
    );
    expect(screen.getByText('children')).toBeTruthy();
  });

  it('should show Level popup content', () => {
    const handleClose = jest.fn();

    render(
      <Popup open onClose={handleClose} variant='LevelPopup'>
        <div>children</div>
      </Popup>,
    );
    expect(screen.getByText('children')).toBeTruthy();
  });
});
