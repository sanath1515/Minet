import React from 'react';
import WalletPage from '.';
import { screen } from '@testing-library/react';
import { render } from '../../test-setUp';
import { useAppContext } from '../../context';

jest.mock('../../context', () => {
    return {
        ...jest.requireActual('../../context'),
        useAppContext: jest.fn()
    };
});

describe('WalletPage Component', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: 1
        }));
    });

    it('should render the total balance correctly', async () => {
        render(<WalletPage />);
        await new Promise((r) => setTimeout(r, 2000));
        const totalBalance = screen.getByText(/total balance/i);
    });
});
