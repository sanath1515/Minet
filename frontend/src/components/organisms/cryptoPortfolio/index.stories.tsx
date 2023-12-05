import CryptoPortfolio from '.';
import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_CRYPTO_LIST } from '../../../utils/constants';

const meta = {
    title: 'organisms/CryptoPortfolio',
    component: CryptoPortfolio
} satisfies Meta<typeof CryptoPortfolio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        totalBalance: 34000,
        cryptoCurrenciesList: MOCK_CRYPTO_LIST
    }
};
