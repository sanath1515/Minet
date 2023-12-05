import Transaction from '.';
import React from 'react';
import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react';
import { BUY_CRYPTO_BUTTON, SELL_CRYPTO_BUTTON } from '../../../utils/constants';

describe('Transaction tests', () => {
    it('should render transaction buy card properly', () => {
        render(
            <Transaction
                isBuyCrypto={true}
                currencySymbol={'BTC'}
                currencyQuantity={0.023451}
                currencyValue={3406069.54}
                currencyName={'Bitcoin'}
                amount={35000}
            />
        );
        expect(screen.getByText("You are buying")).toBeInTheDocument()
        expect(screen.getAllByText(/BTC/i)).toHaveLength(4)
        expect(screen.getByRole('button',{name:BUY_CRYPTO_BUTTON})).toBeInTheDocument()
    });

    it('should render selling crypto card properly', () => {
        render(
            <Transaction
                isBuyCrypto={false}
                currencySymbol={'BTC'}
                currencyQuantity={0.023451}
                currencyValue={3406069.54}
                currencyName={'Bitcoin'}
                amount={35000}
            />
        );
        expect(screen.getByText("You are selling")).toBeInTheDocument()
        expect(screen.getByRole("button",{name:SELL_CRYPTO_BUTTON})).toBeInTheDocument()
    });
});
