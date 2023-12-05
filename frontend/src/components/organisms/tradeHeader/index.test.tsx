import React from 'react';
import TradeHeader from '.';
import '@testing-library/jest-dom';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import { render, screen, fireEvent } from '@testing-library/react';

describe('TradeHeader Component', () => {
    test('should render the crypto properties correctly', () => {
        render(
            <TradeHeader
                marketValue="64.2"
                volume="2.9"
                supplyValue="18.8"
                cryptoImage={Bitcoin}
                cryptoText="Bitcoin"
                shortName="BTC"
                cryptoValue="8.2"
                cryptoId={1}
                addCrypto={jest.fn()}
            />
        );
        expect(screen.getByText("Bitcoin")).toBeInTheDocument();
        expect(screen.getByText("$64.2T")).toBeInTheDocument();
        expect(screen.getByText("18.8M BTC")).toBeInTheDocument();
        expect(screen.getByText("BTC")).toBeInTheDocument();
        expect(screen.getByText("8.2%")).toBeInTheDocument();
    });

    test("should handle Watchlist button onclick property correctly",()=>{
        const handleWatchList = jest.fn()
        render(
            <TradeHeader
                marketValue="$64.2T"
                volume="$2.9T"
                supplyValue="18.8M BTC"
                cryptoImage={Bitcoin}
                cryptoText="Bitcoin"
                shortName="BTC"
                cryptoValue="8.2%"
                cryptoId={1}
                isWatchListed
                addCrypto={handleWatchList}
            />
        );

        const watchlistButton = screen.getByText("ADDED TO WATCHLIST")
        expect(watchlistButton).toBeInTheDocument();
        expect(watchlistButton).toBeEnabled();
        fireEvent.click(watchlistButton);
        expect(handleWatchList).toHaveBeenCalledTimes(1)
    })
});
