import React from 'react';
import '@testing-library/jest-dom';
import UpArrow from '../../../../public/assets/icons/UpArrow.svg';
import { PortFolioValue } from '.';
import { render, screen } from '@testing-library/react';

describe('PortfolioValue', () => {

    it('should render with Icon', () => {
        render(
            <PortFolioValue
                text={'Investment'}
                value={'1.2'}
                variant={'h6'}
                bool={true}
                src={UpArrow}
                alt="UpArrow"
            />
        );
        const icon = screen.getByAltText('UpArrow');
        expect(icon).toBeInTheDocument();
    });

    it('should render with Typography', () => {
        render(
            <PortFolioValue
                text={'Investment'}
                value={'1.2'}
                variant={'h6'}
                bool={false}
            />
        );
        const text = screen.getByText('Investment');
        expect(text).toBeInTheDocument();
    });
    
});

