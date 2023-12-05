import React from 'react';
import '@testing-library/jest-dom';
import CryptoPortfolio from '.';
import { MOCK_CRYPTO_LIST } from '../../../utils/constants';
import { fireEvent, render } from '../../../test-setUp';

describe('CryptoPortfolio Component', () => {
    test('should render My portfolio heading', () => {
        const { getByText } = render(
            <CryptoPortfolio
                totalBalance={34000}
                cryptoCurrenciesList={MOCK_CRYPTO_LIST}
            />
        );
        const heading = getByText('My portfolio');
        expect(heading).toBeInTheDocument();
    });

    test('should render CryptoCard for each currency', () => {
        const { getAllByTestId } = render(
            <CryptoPortfolio
                totalBalance={34000}
                cryptoCurrenciesList={MOCK_CRYPTO_LIST}
            />
        );
        const cryptoCards = getAllByTestId('crypto-card');
        expect(cryptoCards).toHaveLength(MOCK_CRYPTO_LIST.length);
        fireEvent.click(cryptoCards[0]);
    });

    test('should render Total Balance', () => {
        const { getByText } = render(
            <CryptoPortfolio
                totalBalance={34000}
                cryptoCurrenciesList={MOCK_CRYPTO_LIST}
            />
        );
        const totalBalanceText = getByText('Total Balance');
        const totalBalanceValue = getByText(`$ 34,000.00`);
        expect(totalBalanceText).toBeInTheDocument();
        expect(totalBalanceValue).toBeInTheDocument();
    });
});
