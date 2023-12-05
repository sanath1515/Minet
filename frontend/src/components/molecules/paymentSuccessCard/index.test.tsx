import React from 'react';
import PaymentSuccessCard from '.';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('PaymentSuccessCard tests', () => {
    test('renders the PaymentSuccessCard component', () => {
        render(
            <PaymentSuccessCard
                amount={'0.0234510 BTC'}
                onBuyCryptoClick={jest.fn()}
                paymentType='sell'
                onGoToUsdCoinClick={jest.fn()}
            />
        );
        const text = screen.getByText('0.0234510 BTC');
        expect(text).toBeInTheDocument();
    });
    test('should able to click on buy crypto and goto usd buttons', () => {
        render(
            <PaymentSuccessCard
                amount={'0.0234510 BTC'}
                paymentType='buy'
                onBuyCryptoClick={jest.fn()}
                onGoToUsdCoinClick={jest.fn()}
            />
        );
        const buyCryptoButton = screen.getByText('BUY CRYPTO');
        fireEvent.click(buyCryptoButton);
        const goToUsdButton = screen.getByText('GO TO USD COIN');
        fireEvent.click(goToUsdButton);
    });
});
