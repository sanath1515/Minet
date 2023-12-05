import CryptoTransaction from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'organisms/CryptoTransaction',
    component: CryptoTransaction
} satisfies Meta<typeof CryptoTransaction>;

export default meta;

type Story = StoryObj<typeof meta>;


export const BuyCrypto: Story = {
    args: {
       heading:"Buy Crypto",
       paymentType:"buy",
       totalBalance:34000,
       setTransactionData:()=>{}
    }
};

export const SellCrypto: Story = {
    args: {
       heading:"Sell Crypto",
       paymentType:"sell",
       totalBalance:0.0234510,
       setTransactionData:()=>{}
    }
};
