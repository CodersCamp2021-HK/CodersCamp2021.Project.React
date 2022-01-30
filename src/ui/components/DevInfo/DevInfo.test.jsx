import { render, screen } from '@testing-library/react';
import { DevInfo } from './DevInfo';
import tcUrl from '../../../public/img/tc_pixel.png';

describe('DevInfo', () => {
  it('should render the DevInfo component with correct text', () => {
    render(<DevInfo image={tcUrl} name='Jan Kowalski' devRole='Tech lead, Programmer' />);

    const image = screen.getByRole('img', { image: tcUrl });
    const header = screen.getByRole('heading', { name: 'Jan Kowalski' });
    const devRole = screen.getByRole('heading', { devRole: 'Tech lead, Programmer' });

    expect(image).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(devRole).toBeInTheDocument();
  });
});
