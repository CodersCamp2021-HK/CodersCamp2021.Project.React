import { render, screen } from '@testing-library/react';
import { Popup } from './Popup';

describe('Popup', () => {
    it('should not show', () => {
        const handleClose = jest.fn();

        render(<Popup open={false} onClose={handleClose}><div>children</div></Popup>)
        const children = screen.queryByText('children')

        expect(children).toBeNull();
    });

    it('should show popup content', () => {
        const handleClose = jest.fn();

        render(<Popup open={true} onClose={handleClose}><div>children</div></Popup>)
        expect(screen.getByText('children')).toBeTruthy();
    });
});
