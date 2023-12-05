import React from 'react';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import Arrow from '../../../../public/assets/icons/Arrow.svg';
import theme from '../../../theme';
import { Meta, StoryFn } from '@storybook/react';
import { Card, CardProps } from '.';

const meta: Meta = {
    title: 'molecules/IconLabel',
    component: Card
};
export default meta;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
    mainText: 'Bitcoin',
    subText: 'BTC',
    mainVariant: 'body1',
    subVariant: 'overline',
    src: Bitcoin,
    alt: 'Bitcoin',
    layout: 'iconDualText',
    sx: {
        mainText: theme.palette.minetText.highEmphasis,
        subText: theme.palette.minetText.mediumEmphasis,
        height: '42px',
        width: '42px'
    }
};

export const ReverseText = Template.bind({});
ReverseText.args = {
    mainText: 'Discover assets',
    mainVariant: 'body1',
    src: Arrow,
    alt: 'Bitcoin',
    layout: 'reverse',
    sx: { mainText: theme.palette.primary.main, height: '22px', width: '22px'}
};

