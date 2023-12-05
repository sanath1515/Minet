import React from 'react';
import CryptoTabs from '.';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CryptoTabs', () => {
    it('should render the left and right icons properly', () => {
        render(<CryptoTabs onClick={jest.fn()}/>);
        const leftIcon = screen.getByAltText('Left Arrow Icon');
        const rightIcon = screen.getByAltText('Right Arrow Icon');
        expect(leftIcon).toBeInTheDocument();
        expect(rightIcon).toBeInTheDocument();
    });

    it('should render the chip labels with correct names', () => {
        render(<CryptoTabs onClick={jest.fn()}/>);
        const bitcoinChip = screen.getByText('Bitcoin');
        const xrpChip = screen.getByText('XRP');
        const polkadotChip = screen.getByText('Polkadot');
        expect(bitcoinChip).toBeInTheDocument();
        expect(xrpChip).toBeInTheDocument();
        expect(polkadotChip).toBeInTheDocument();
    });

    it('should handle click events on chips', () => {
        const onClickMock = jest.fn();
        render(<CryptoTabs onClick={onClickMock} selectedChip='Ethereum'/>);
        const ethereumChip = screen.getByText('Ethereum');
        fireEvent.click(ethereumChip)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    });
});
