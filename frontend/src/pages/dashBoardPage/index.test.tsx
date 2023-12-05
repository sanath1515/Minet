import DashBoardPage from '.';
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../test-setUp';
import {
    DISCOVERY_ASSETS_CONTENT,
    WATCHLIST_CONTENT
} from '../../utils/constants';
import { useAppContext } from '../../context';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

jest.mock('../../context', () => {
    return {
        ...jest.requireActual('../../context'),
        useAppContext: jest.fn()
    };
});

describe('DashBoard Page', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: 1
        }));
    });
    it('should render dashboard page properly', () => {
        render(<DashBoardPage />);
        expect(screen.getByTestId('dashboard-template')).toBeInTheDocument();
        expect(screen.getByTestId('dashboard-body')).toBeInTheDocument();
    });

    it('should render watchlisted cryptocoins along with graph', async () => {
        render(<DashBoardPage />);
        await waitFor(() => {
            expect(screen.getByText(/216678.1/i)).toBeInTheDocument();
            expect(screen.getAllByAltText('graph')).toHaveLength(6);
        });
        const discoveryText = screen.getByText(DISCOVERY_ASSETS_CONTENT);
        fireEvent.click(discoveryText);
        const watchListText = screen.getByText(WATCHLIST_CONTENT);
        fireEvent.click(watchListText);
    });

    it('should render graph on clicking on crypto tabs', async () => {
        render(<DashBoardPage />);
        await waitFor(() => {
            expect(screen.getByText(/3285553.73/i)).toBeInTheDocument();
        });
        const cryptoTab = screen.getByRole('button', { name: 'Ethereum' });
        fireEvent.click(cryptoTab);
        const graph = screen.getByRole('img', { name: 'chart' });
        expect(graph).toBeInTheDocument();
    });
});
