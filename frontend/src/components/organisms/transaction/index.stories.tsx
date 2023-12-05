import Transaction from '.';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'organisms/Transaction',
    component: Transaction
} as Meta<typeof Transaction>;

const Template: StoryFn<typeof Transaction> = (args) => (
    <Transaction {...args} />
);

export const BuyCryptoCard = Template.bind({});
BuyCryptoCard.args = {
    isBuyCrypto: true,
    currencySymbol: 'BTC',
    currencyValue: 3406069.54,
    currencyQuantity: 0.023451,
    currencyName:"Bitcoin",
    amount:35000
};

export const SellCryptoCard = Template.bind({})
SellCryptoCard.args = {
    isBuyCrypto: false,
    currencySymbol:"ETH",
    currencyValue:1297.93,
    currencyQuantity:0.5234510,
    currencyName:"Ethereum",
    amount:648.54
}
