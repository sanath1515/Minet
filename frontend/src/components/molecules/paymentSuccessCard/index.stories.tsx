import PaymentSuccessCard from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'molecules/PaymentSuccessCard',
    component: PaymentSuccessCard
} satisfies Meta<typeof PaymentSuccessCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        amount: '0.0234510 BTC'
    }
};
