import Typography from '.';
import theme from '../../../theme';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Atoms/Typography',
    component: Typography
} satisfies Meta<typeof Typography>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        variant: 'body1',
        color: theme.palette.minetText.highEmphasis,
        children: 'Minet'
    }
};
