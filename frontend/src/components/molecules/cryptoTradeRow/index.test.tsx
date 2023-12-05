import React from 'react';
import CryptoTradeRow from '.';
import '@testing-library/jest-dom';
import theme from '../../../theme';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import Ethereum from '../../../../public/assets/icons/ethereum.svg';
import { render, screen } from '@testing-library/react';

describe('Crypto Trade Row', () => {
    test('should render the Crypto Trade Row component correctly', () => {
        render(
            <CryptoTradeRow
                mainText="Ethereum"
                subText="ETH"
                src={Ethereum}
                alt="Ethereum"
                price={216678.1}
                changeValue={5.49}
                marketCap={25.4}
                cryptoWatchlist={false}
            />
        );
        expect(screen.getByText('Ethereum')).toBeInTheDocument();
        expect(screen.getByText('ETH')).toBeInTheDocument();
        expect(screen.getByText('$25.4T')).toBeInTheDocument();

        const cryptoValue = screen.getByText('+5.49%');
        expect(cryptoValue).toHaveStyle(
            `color:${theme.palette.minetSuccess[700]}`
        );

        const inActiveWatchlistIcon = screen.getByAltText(
            'Null Watchlist Icon'
        );
        expect(inActiveWatchlistIcon).toBeInTheDocument();
    });

    test('should render the CryptoChange style correctly based on the change value', () => {
        render(
            <CryptoTradeRow
                mainText="Ethereum"
                subText="ETH"
                src={Ethereum}
                alt="Ethereum"
                price={216678.1}
                changeValue={-5.49}
                marketCap={25.4}
                cryptoWatchlist={false}
            />
        );
        const cryptoValue = screen.getByText('-5.49%');
        expect(cryptoValue).toHaveStyle(
            `color:${theme.palette.minetError[500]}`
        );
    });

    test('should render watchlist icon properly based on Watchlist boolean value', () => {
        render(
            <CryptoTradeRow
                mainText="Bitcoin"
                subText="BTC"
                src={Bitcoin}
                alt="Bitcoin"
                price={3285553.73}
                changeValue={1.06}
                marketCap={60.1}
                cryptoWatchlist={true}
            />
        );
        const activeWatchlistIcon = screen.getByAltText('Watchlist Icon');
        expect(activeWatchlistIcon).toBeInTheDocument();
    });
});
