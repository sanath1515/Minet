import TransactionCard from '.';
import React from 'react';
import theme from '../../../theme';
import verified from '../../../../public/assets/icons/verified.svg';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TRANSACTION_CARD_ALT_TEXT } from '../../../utils/constants';

describe('Transaction Card Component', () => {
    it('should render card properly', () => {
        render(
            <TransactionCard
                transactionDate={'June 23'}
                currencyName={'Bitcoin BTC'}
                currenySymbol="BTC"
                transactionType={'sold'}
                amount={0.00234}
                balance={23000}
                cardSx={{ width: theme.spacing(10) }}
                transactionStatusIcon={verified}
                isCryptoWallet={false}
            />
        );
        expect(screen.getByText('sold')).toBeInTheDocument();
        expect(
            screen.getByAltText(TRANSACTION_CARD_ALT_TEXT)
        ).toBeInTheDocument();
    });

    it('should render transaction card with username properly', () => {
        render(
            <TransactionCard
                transactionDate={'June 23'}
                currencyName={'Bitcoin BTC'}
                currenySymbol="BTC"
                transactionType={'purchased'}
                amount={0.00234}
                balance={23000}
                cardSx={{ width: theme.spacing(10) }}
                transactionStatusIcon={verified}
                isCryptoWallet={true}
                userName="Badgley"
            />
        );
        expect(screen.getByText('purchased')).toBeInTheDocument();
        expect(screen.getByText(/Badgley/i)).toBeInTheDocument();
    });
});
