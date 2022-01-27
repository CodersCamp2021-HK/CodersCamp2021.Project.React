import { render, screen } from '@testing-library/react';
import { Popup } from './Popup';

describe('Popup', () => {
    it('should show popup children', () => {
        const handleClose = jest.fn();
        const open = true;

        render(<Popup open={open} onClose={handleClose}><div>children</div></Popup>)
        expect(screen.getByText('children')).toBeTruthy();
    });
});
