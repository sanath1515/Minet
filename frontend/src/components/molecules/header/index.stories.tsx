import Header from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'molecules/Header',
    component: Header
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const PaymentOptions: Story = {
    args: {
       payment:true,
       header:"Dashboard"
    }
};

export const NoPaymentOptions: Story = {
    args: {
       payment:false,
       header:"Checkout"
    }
};


