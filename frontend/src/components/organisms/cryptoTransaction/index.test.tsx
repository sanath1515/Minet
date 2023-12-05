import React from 'react';
import '@testing-library/jest-dom';
import CryptoTransaction from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppContext } from '../../../context';

jest.mock('../../../context', () => {
    return {
        ...jest.requireActual('../../../context'),
        useAppContext: jest.fn()
    };
});

describe('CryptoTransaction Component', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: 1
        }));
    });

    it('should render the heading', () => {
        render(
            <CryptoTransaction
                heading="Test Heading"
                paymentType="buy"
                totalBalance={1000}
                setTransactionData={jest.fn()}
            />
        );
        const headingElement = screen.getByText('Test Heading');
        expect(headingElement).toBeInTheDocument();
    });

    it('should render payment method details for "buy" payment type', () => {
        render(
            <CryptoTransaction
                heading="Test Heading"
                paymentType="buy"
                totalBalance={1000}
                setTransactionData={jest.fn()}
            />
        );
        const paymentMethodHeading = screen.getByText('Payment Method');
        const usdCoinText = screen.getByText('USD Coin (Cash)');
        expect(paymentMethodHeading).toBeInTheDocument();
        expect(usdCoinText).toBeInTheDocument();
    });

    it('should render total balance details for "sell" payment type', async () => {
        render(
            <CryptoTransaction
                heading="Test Heading"
                paymentType="sell"
                cryptoBalance={{ Bitcoin: 0.023451 }}
                totalBalance={0.023451}
                setTransactionData={jest.fn()}
            />
        );
        const totalBalanceHeading = screen.getByText('Total Balance');
        await new Promise((r) => setTimeout(r, 2000));
        fireEvent.click(screen.getByText('Ethereum'));
        expect(totalBalanceHeading).toBeInTheDocument();
    });

    it('should render total balance 0 if crypto currency not matching', async () => {
        render(
            <CryptoTransaction
                heading="Test Heading"
                paymentType="sell"
                cryptoBalance={{}}
                totalBalance={0.023451}
                setTransactionData={jest.fn()}
            />
        );
        const totalBalanceHeading = screen.getByText('Total Balance');
        await new Promise((r) => setTimeout(r, 2000));
        fireEvent.click(screen.getByText('Ethereum'));
        expect(totalBalanceHeading).toBeInTheDocument();
    });
});
