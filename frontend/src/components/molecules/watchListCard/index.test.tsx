import React from 'react';
import WatchListCard from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-setUp';

describe('WatchListCard tests', () => {
    test('should render the WatchListCard component', () => {
        render(
            <WatchListCard
                cryptoIcon={Bitcoin}
                currencyType={'Bitcoin'}
                amount={'$3,00,439.93'}
                growthGraph={'graph'}
                growthRate={'+1.2%'}
                growthStatus={'increased'}
            />
        );
    });
    test('should have text Bitcoin within the component', () => {
        render(
            <WatchListCard
                cryptoIcon={Bitcoin}
                currencyType={'Bitcoin'}
                amount={'$3,00,439.93'}
                growthGraph={'graph'}
                growthRate={'+1.2%'}
                growthStatus={'decreased'}
            />
        );
        const buttonBox=screen.getByTestId("container");
        fireEvent.click(buttonBox)
        const text = screen.getByText('Bitcoin');
        expect(text).toBeInTheDocument();
    });
});


