import Tabs from '.';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { cryptoDetailItems } from '../../../utils/constants';
import theme from '../../../theme';

export default {
    title: 'molecules/Tabs',
    component: Tabs
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => <Tabs {...args} />;

export const CryptoDetailTab = Template.bind({});
CryptoDetailTab.args = {
    value: 0,
    typographyVariant: 'subtitle2',
    tabItems: cryptoDetailItems,
    sx: {
        textTransform: 'none',
        color: theme.palette.minetText.mediumEmphasis
    }
};
