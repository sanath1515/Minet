import React from 'react';
import PurchasePage from '.';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../test-setUp';
import { useAppContext } from '../../context';

jest.mock('../../context', () => {
    return {
        ...jest.requireActual('../../context'),
        useAppContext: jest.fn()
    };
});

describe('PurchasePage', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: Number
        }));
    });
    
    it('should render the component correctly', async () => {
        const { getByText } = render(<PurchasePage />);
        expect(getByText('Checkout')).toBeInTheDocument();
    });

    it('should handle the purchase process correctly', async () => {
        render(<PurchasePage />);
        fireEvent.click(screen.getByText('BUY NOW'));
    });

    it('should handle insufficient balance', async () => {
        render(<PurchasePage />);
        fireEvent.click(screen.getByText('BUY NOW'));
    });
});
