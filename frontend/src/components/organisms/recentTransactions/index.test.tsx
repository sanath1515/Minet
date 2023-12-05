import RecentTransactions from '.';
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_TRANSACTIONS } from '../../../utils/constants';

describe('Recent Transactions Component', () => {
    it('should render all transactions properly', () => {
        render(
            <RecentTransactions
                currentBalance={34000}
                transactions={MOCK_TRANSACTIONS}
                isNewUser
            />
        );
        expect(screen.getByText(/Recent Transactions/i)).toBeInTheDocument();
        expect(
            screen.getByAltText('empty transactions image')
        ).toBeInTheDocument();
    });

    it('should render transactions with scrollbar when clicked on View All Button', () => {
        render(
            <RecentTransactions
                currentBalance={34000}
                transactions={MOCK_TRANSACTIONS}
                isNewUser={false}
            />
        );
        expect(screen.getAllByTestId('transaction-card')).toHaveLength(
            MOCK_TRANSACTIONS.length
        );
        const viewAllButton = screen.getByRole('button', { name: 'View All' });
        expect(screen.getByTestId('transaction-box')).toHaveStyle(
            'overflow: hidden'
        );
        fireEvent.click(viewAllButton);
        expect(screen.getByTestId('transaction-box')).toHaveStyle(
            'overflow:auto'
        );
        expect(
            screen.getByRole('button', { name: 'View Less' })
        ).toBeInTheDocument();
    });
});
