import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OverViewGraph } from '.';
import {
    INVESTMENT_VALUE,
    INVESTMENT_PERCENTAGE,
    BITCOIN_VALUE,
    BITCOIN_PERCENTAGE
} from '../../../utils/constants';
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe('overViewGraph', () => {
    it('should render with Typography', () => {
        render(
            <OverViewGraph
                investmentValue={INVESTMENT_VALUE}
                investmentPercentage={INVESTMENT_PERCENTAGE}
                bitcoinValue={BITCOIN_VALUE}
                bitcoinPercentage={BITCOIN_PERCENTAGE}
                isNewUser={false}
                crytpoCoin={'Ethereum'}
            />
        );
        const text = screen.getAllByText('Ethereum')[0];
        expect(text).toBeInTheDocument();
    });

    it('should render with icon', () => {
        render(
            <OverViewGraph
                investmentValue={'$ 123'}
                investmentPercentage={'-1.25%'}
                bitcoinValue={'$ 134'}
                bitcoinPercentage={'+1.3%'}
                isNewUser={false}
            />
        );
        const icon = screen.getByAltText('downArrow');
        expect(icon).toBeInTheDocument();
    });

    it('should render empty graph for new user',()=>{
        render(
            <OverViewGraph
                investmentValue={'$ 123'}
                investmentPercentage={'-1.25%'}
                bitcoinValue={'$ 134'}
                bitcoinPercentage={'+1.3%'}
                isNewUser
            />
        );
        expect(screen.getByAltText("empty portfolio image")).toBeInTheDocument();
    })
});
