import React from 'react';
import '@testing-library/jest-dom';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import { Card } from '.';
import {render, screen } from '@testing-library/react';

describe('Card', () => {

    it('should render with Icon', () => {
        render(
            <Card
                src={Bitcoin}
                alt={'Bitcoin'}
                mainText={'Bitcoin'}
                layout={'iconText'}
                sx={{ mainText: 'h4' }}
            />
        );
        const icon = screen.getByAltText('Bitcoin');
        expect(icon).toBeInTheDocument();
    });

    it('should render with Icon and typography in reverse direction', () => {
        render(
            <Card
                src={Bitcoin}
                alt={'Bitcoin'}
                mainText={'Bitcoin'}
                layout={'reverse'}
                sx={{ mainText: 'h4' }}
            />
        );
        const icon = screen.getByAltText('Bitcoin');
        expect(icon).toBeInTheDocument();
    });

    it('should render with Icon and two typographies', () => {
        render(
            <Card
                src={Bitcoin}
                alt={'Bitcoin'}
                mainText={'Bitcoin'}
                subText={'BTC'}
                layout={'iconDualText'}
                sx={{ mainText: 'h4' }}
            />
        );
        const text = screen.getByText('Bitcoin');
        expect(text).toBeInTheDocument();
    });
});

