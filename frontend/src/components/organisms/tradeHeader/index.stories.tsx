import React from 'react';
import TradeHeader from '.';
import { Meta, StoryFn } from '@storybook/react';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import Ethereum from "../../../../public/assets/icons/ethereum.svg"

export default {
    title: 'Organisms/TradeHeader',
    component: TradeHeader
} as Meta<typeof TradeHeader>;

const Template: StoryFn<typeof TradeHeader> = (args) => <TradeHeader {...args} />;

export const BitcoinTradeHeader = Template.bind({});
BitcoinTradeHeader.args={
    marketValue:"64.2",
    volume:"2.9",
    supplyValue:"18.8",
    cryptoImage:Bitcoin,
    cryptoText:"Bitcoin",
    shortName:"BTC",
    cryptoValue:"8.2"
}

export const EtheriumTradeHeader = Template.bind({});
EtheriumTradeHeader.args={
    marketValue:"162.92",
    volume:"11.5",
    supplyValue:"122.60",
    cryptoImage:Ethereum,
    cryptoText:"Ethereum",
    shortName:"ETH",
    cryptoValue:"0.64"
}

