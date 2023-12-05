import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { TradePage } from '.';
import { render } from '../../test-setUp';
import { useAppContext } from '../../context';

jest.mock('../../context', () => {
    return {
        ...jest.requireActual('../../context'),
        useAppContext: jest.fn()
    };
});

describe('tradePage', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            userId: 1
        }));
    });
    
    it('should render with typography', () => {
        render(
        <TradePage tabValue={0} />
        );
        const text = screen.getByText('All assets');
        expect(text).toBeInTheDocument();
    });

    it('should change tab value and check search crypto curency', async () => {
        render(<TradePage tabValue={1}/>);
        const slidesTab = screen.getByRole('tab', { name: 'All Assets' });
        fireEvent.click(slidesTab);

        await waitFor(()=>{
            expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument()
            expect(screen.getByText(/Ethereum/i)).toBeInTheDocument()
        })

        const watchlistIcons = screen.getAllByAltText('Watchlist Icon');
        expect(watchlistIcons).toHaveLength(3);

        fireEvent.click(watchlistIcons[0]);

        await waitFor(()=>{
            const updatedWatchlistIcon1 = screen.getAllByAltText('Watchlist Icon')[0];
            expect(updatedWatchlistIcon1).toBeInTheDocument();
        })

        expect(slidesTab).toHaveClass('Mui-selected');
        const inputElement = screen.getByPlaceholderText('Search all assets');
        fireEvent.change(inputElement, { target: { value: 'bi' } });

        await waitFor(() => {
            expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
        });
        
        const iconElement = screen.getByAltText('Cross Icon Image');
        fireEvent.click(iconElement);
        const list = screen.getByText('Watchlist');
        fireEvent.click(list);
        expect(list).toBeInTheDocument();
    });
});