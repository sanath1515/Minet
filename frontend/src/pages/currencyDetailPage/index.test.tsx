import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import CurrencyDetailPage from '.';
import { MOCK_CRYPTO_LIST } from '../../utils/constants';
import '@testing-library/jest-dom';
import { render } from '../../test-setUp';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

jest.mock('../../services/API', () => ({
    get: jest.fn().mockImplementation((url) => {
        return Promise.resolve({
            data: MOCK_CRYPTO_LIST
        });
    })
}));

jest.mock('axios');

describe('Currency Detail Page', () => {
    it('should render without errors', () => {
        render(<CurrencyDetailPage />);
        expect(screen.getByTestId('dashboard-template')).toBeInTheDocument();
        expect(screen.getByTestId('dashboard-body')).toBeInTheDocument();
    });

    it('should render the wallet screen correctly when clicked on wallet tab', () => {
        render(<CurrencyDetailPage />);
        const wallet = screen.getByText('Wallet');
        expect(wallet).toBeInTheDocument();
        fireEvent.click(wallet);
        const balance = screen.getByText('Total Balance');
        expect(balance).toBeInTheDocument();
        const { getByPlaceholderText } = render(<CurrencyDetailPage />);
        const inputElement = getByPlaceholderText('Search all assets');
        expect(inputElement).toBeInTheDocument();
        const buttonElement = screen.getAllByRole('button', { name: /BUY/i })[0];
        fireEvent.click(buttonElement);
        const sellButton = screen.getAllByRole('button', { name: /SELL/i })[0];
        fireEvent.click(sellButton);
    });
});
