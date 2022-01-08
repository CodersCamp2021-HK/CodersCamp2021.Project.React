import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('<App/>', () => {
  it('should render "Hello Vite + React!"', () => {
    // Given-When
    render(<App />);

    // Then
    expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument();
  });

  it('should render "count is: 1" when click on btn', () => {
    // Given
    render(<App />);

    // When
    userEvent.click(screen.getByRole('button', { name: /0/ }));

    // Then
    expect(screen.queryByRole('button', { name: /0/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1/ })).toBeInTheDocument();
  });
});
