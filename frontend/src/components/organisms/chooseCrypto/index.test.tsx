import React from 'react';
import '@testing-library/jest-dom';
import { ChooseCrypto } from '.';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-setUp';
import { useAppContext } from '../../../context';

jest.mock('../../../context', () => {
    return {
        ...jest.requireActual('../../../context'),
        useAppContext: jest.fn()
    };
});

describe('ChooseCrypto', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: 1
        }));
    });

    it('should render with Typography', () => {
        render(<ChooseCrypto setSelectedCrypto={jest.fn()} />);
        const text = screen.getAllByText('Choose crypto')[0];
        expect(text).toBeInTheDocument();
    });

    it('should enable border and tickMark when clicked on cryptoCard', async () => {
        render(<ChooseCrypto setSelectedCrypto={jest.fn()} />);
        const card = await screen.findAllByTestId('crypto-card');
        fireEvent.click(card[0]);
        const tickMark = await screen.findByAltText('tick');
        expect(tickMark).toBeInTheDocument();
    });
});
