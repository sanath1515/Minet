import React from 'react';
import theme from '../../../theme';
import CryptoTable from '.';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TABLE_DATA } from '../../../utils/constants';
import { BrowserRouter } from 'react-router-dom';

describe('Crypto Trade Row', () => {
    it('should render the Crypto Trade Row component correctly', () => {
        render(
        <BrowserRouter>
        <CryptoTable table={TABLE_DATA} />
        </BrowserRouter>
        );
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('BTC')).toBeInTheDocument();
        expect(screen.getByText('$60.1T')).toBeInTheDocument();
        const cryptoValue = screen.getByText('+1.06%');
        expect(cryptoValue).toHaveStyle(
            `color:${theme.palette.minetSuccess[700]}`
        );
    });

    it('should render header labels correctly', () => {
        render(<BrowserRouter>
            <CryptoTable table={TABLE_DATA} />
            </BrowserRouter>);
        const headerLabels = ['Name', 'Price', 'Change', 'Market Cap', 'Watch'];
        headerLabels.forEach((label) => {
            const headerElement = screen.getByText(label);
            expect(headerElement).toBeInTheDocument();
        });
    });

    it('should render CryptoTradeRow components based on TABLE_DATA', () => {
        render(<BrowserRouter>
            <CryptoTable table={TABLE_DATA} />
            </BrowserRouter>);
        const cryptoTradeRows = screen.getAllByTestId('cryptoTradeRow');
        expect(cryptoTradeRows).toHaveLength(TABLE_DATA.length);
    });

    it('should render Market Cap icon in the header', () => {
        render(<BrowserRouter>
            <CryptoTable table={TABLE_DATA} />
            </BrowserRouter>);
        const marketCapIcon = screen.getByAltText('Market Cap Icon');
        expect(marketCapIcon).toBeInTheDocument();
    });

    it('should toggle cryptoWatchlist state when the Watchlist icon is clicked', () => {
        render(<BrowserRouter>
            <CryptoTable table={TABLE_DATA} />
            </BrowserRouter>);
        const watchlistIcons = screen.getAllByAltText('Null Watchlist Icon');
        expect(watchlistIcons).toHaveLength(TABLE_DATA.length);

        fireEvent.click(watchlistIcons[0]);
        const updatedWatchlistIcon1 = screen.getAllByAltText('Null Watchlist Icon')[0];
        expect(updatedWatchlistIcon1).toBeInTheDocument();

        fireEvent.click(screen.getAllByText(/Bitcoin/i)[0])
        expect(screen.getByText(/BTC/i)).toBeInTheDocument()
    });
});
