import RecentTransactions from '.';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MOCK_TRANSACTIONS } from '../../../utils/constants';

export default {
    title: 'organisms/Recent Transactions',
    component: RecentTransactions
} as Meta<typeof RecentTransactions>;

const Template: StoryFn<typeof RecentTransactions> = (args) => (
    <RecentTransactions {...args} />
);

export const Default = Template.bind({});
Default.args = {
    currentBalance: 34000,
    transactions: MOCK_TRANSACTIONS,
    isNewUser: false
};
