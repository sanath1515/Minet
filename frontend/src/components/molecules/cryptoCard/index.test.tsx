import React from 'react';
import CryptoCard from '.';
import '@testing-library/jest-dom';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import { render, screen } from '@testing-library/react';

describe('CryptoCard tests', () => {
    test('should render the CryptoCard component without growth rate', () => {
        render(
            <CryptoCard
                cryptoIcon={Bitcoin}
                amount={'$13,000.00'}
                currencyType={'Bitcoin'}
                currencyCode={'BTC'}
            />
        );
        const text = screen.getByText('Bitcoin');
        expect(text).toBeInTheDocument();
    });

    test('should render the CryptoCard component with growth rate', () => {
        render(
            <CryptoCard
                cryptoIcon={Bitcoin}
                amount={'$13,000.00'}
                currencyType={'Bitcoin'}
                currencyCode={'BTC'}
                growthRate={'+1.5%'}
                growthStatus={'increased'}
            />
        );
        const growthRate = screen.getByText('+1.5%');
        expect(growthRate).toBeInTheDocument();
    });

    test('should render the CryptoCard component with growth rate with growth status decreased', () => {
        render(
            <CryptoCard
                cryptoIcon={Bitcoin}
                amount={'$13,000.00'}
                currencyType={'Bitcoin'}
                currencyCode={'BTC'}
                growthRate={'+1.5%'}
                growthStatus={'decreased'}
            />
        );
        const growthRate = screen.getByText('+1.5%');
        expect(growthRate).toBeInTheDocument();
        expect(growthRate).toHaveStyle('color:#B71A33');
    });
});
