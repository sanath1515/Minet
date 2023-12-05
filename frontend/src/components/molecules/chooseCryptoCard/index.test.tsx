import React from 'react';
import '@testing-library/jest-dom';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import { render, screen } from '@testing-library/react';
import { ChooseCryptoCard } from '.';

describe('chooseCryptoCard', () => {

    it('should render with icon', () => {
        render(
            <ChooseCryptoCard
                src={Bitcoin}
                alt="Bitcoin"
                text={'Bitcoin'}
                value={'$123'}
                bool={true}
            />
        );
        const icon = screen.getByAltText('Bitcoin');
        expect(icon).toBeInTheDocument();
    });

    it('should render with Typography', () => {
        render(
            <ChooseCryptoCard
                src={Bitcoin}
                alt="Bitcoin"
                text={'Bitcoin'}
                value={'$123'}
                bool={false}
            />
        );
        const text = screen.getByAltText('Bitcoin');
        expect(text).toBeInTheDocument();
    });
    
});
