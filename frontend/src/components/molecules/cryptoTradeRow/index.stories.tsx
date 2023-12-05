import React from 'react';
import CryptoTradeRow from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import Ethereum from "../../../../public/assets/icons/ethereum.svg"
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Molecules/CryptoTradeRow',
    component: CryptoTradeRow
} as Meta<typeof CryptoTradeRow>;

const Template: StoryFn<typeof CryptoTradeRow> = (args) => (
    <CryptoTradeRow {...args} />
);

export const BitcoinRow = Template.bind({});
BitcoinRow.args = {
    mainText: 'Bitcoin',
    subText: 'BTC',
    src: Bitcoin,
    alt: 'Bitcoin',
    price: 3285553.73,
    changeValue: 1.06,
    marketCap: 60.1,
    rowClick:()=>{
        console.log('Bitcoin row clicked')
    },
    iconClick:()=>{
        console.log('Bitcoin icon clicked')
    },
    cryptoWatchlist:true,  
};

export const EthereumRow = Template.bind({});
EthereumRow.args = {
    mainText: 'Ethereum',
    subText: 'ETH',
    src: Ethereum,
    alt: 'Ethereum',
    price: 216678.10,
    changeValue: -5.49,
    marketCap: 25.4,
    cryptoWatchlist:false,
};
