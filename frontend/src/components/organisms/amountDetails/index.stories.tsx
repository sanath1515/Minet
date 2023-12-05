import AmountDetails from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'organisms/AmountDetails',
    component: AmountDetails
} satisfies Meta<typeof AmountDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currencyType:"Bitcoin",
        currencyCode:"BTC",
        totalBalance:34000,
        currencyValue:3406069.54,
        setAmountDetails:()=>{
            console.log("Amount Setter")
        }
    }
};
