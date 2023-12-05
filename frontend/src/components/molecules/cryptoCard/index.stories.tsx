import CryptoCard from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import Usdcoin from '../../../../public/assets/icons/usdcoin.svg';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'molecules/CryptoCard',
    component: CryptoCard
} satisfies Meta<typeof CryptoCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const GrowthRate: Story = {
    args: {
        cryptoIcon: Bitcoin,
        amount: '$34,000.00',
        growthRate: '+1.06%',
        currencyType: 'Bitcoin',
        currencyCode: 'BTC',
        growthStatus: 'increased'
    }
};
export const WithoutGrowthRate: Story = {
    args: {
        cryptoIcon: Usdcoin,
        amount: '$34,000.00',
        currencyType: 'USD Coin',
        currencyCode: 'US Dollar'
    }
};

