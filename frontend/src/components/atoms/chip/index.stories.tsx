import React from 'react';
import Chip from '.';
import theme from '../../../theme';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'atoms/Chip',
    component: Chip
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = ({ ...args }) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Bitcoin',
    variant: 'outlined',
    onClick: () => alert('Clicked'),
    sx: {
        borderRadius: '4px',
        variant: theme.typography.body1,
        background: theme.palette.minetWarning.main,
        color: theme.palette.minetText.highEmphasis,
        border: 'none',
        width: '86px',
        height: '36px'
    }
};
