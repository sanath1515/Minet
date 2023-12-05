import React from 'react';
import SellPage from '.';
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

describe('SellPage', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: 1
        }));
    });
    
    it('should render the component correctly', async () => {
        const { getByText } = render(<SellPage />);
        expect(getByText('Checkout')).toBeInTheDocument();
    });

    it('should handle the sell process correctly', async () => {
        render(<SellPage />);
        fireEvent.click(screen.getByText('SELL NOW'));
        expect(screen.getByText('Sell Crypto')).toBeInTheDocument();
    });
});
