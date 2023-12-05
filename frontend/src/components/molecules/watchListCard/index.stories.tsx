import WatchListCard from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import GrowthGraph from '../../../../public/assets/icons/growthGraph.svg';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'molecules/WatchListCard',
    component: WatchListCard
} satisfies Meta<typeof WatchListCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        cryptoIcon: Bitcoin,
        currencyType: 'Bitcoin',
        amount: '$3,00,439.93',
        growthGraph: GrowthGraph,
        growthRate: '+1.2%',
        growthStatus: 'increased'
    }
};


