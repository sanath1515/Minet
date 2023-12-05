import React from 'react';
import TransactionCard from '.';
import theme from '../../../theme';
import verified from '../../../../public/assets/icons/verified.svg';
import error from '../../../../public/assets/icons/error.svg';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'molecules/Transaction Card'
} as Meta<typeof TransactionCard>;

const Template: StoryFn<typeof TransactionCard> = (args) => (
    <TransactionCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
    transactionDate: 'June 23',
    currencyName: 'Bitcoin BTC',
    currenySymbol: 'BTC',
    transactionType: 'sold',
    amount: 0.023451,
    balance: 34000,
    cardSx: {
        flexDirection: 'column',
        maxWidth: theme.spacing(99.5),
        minHeight: theme.spacing(24.75),
        padding: '0px, 24px, 24px, 24px',
        gap: theme.spacing(2)
    },
    isCryptoWallet: false,
    transactionStatusIcon: verified
};

export const CryptoWallet = Template.bind({});
CryptoWallet.args = {
    transactionDate: 'Feb 20',
    currencyName: 'Bitcoin',
    currenySymbol: 'BTC',
    transactionType: 'Purchased',
    amount: 0.001,
    balance: 900,
    cardSx: {
        flexDirection: 'row',
        maxWidth: theme.spacing(297),
        minHeight: theme.spacing(15.5),
        padding: '0px, 24px, 0px, 0px',
        alignItems: 'center'
    },
    isCryptoWallet: true,
    userName: 'Badgley',
    transactionStatusIcon: error
};
