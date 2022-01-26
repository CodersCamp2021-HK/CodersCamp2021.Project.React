import { render, fireEvent, screen } from '@testing-library/react';
import { Popup } from './Popup';

test('modal shows the children and a close button', () => {
  const handleClose = jest.fn();
  const open = jest.fn();

  render(
    <Popup open={open} onClose={handleClose}>
      <div>children</div>
    </Popup>,
  );

  expect(screen.getByText('children')).toBeTruthy();

  fireEvent.click(screen.getByRole('button'));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
