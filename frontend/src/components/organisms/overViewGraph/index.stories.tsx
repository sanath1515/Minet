import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { OverViewGraph, OverViewGraphProps } from '.';

const meta: Meta = {
    title: 'organisms/OverViewGraph',
    component: OverViewGraph
};

export default meta;

const Template: StoryFn<OverViewGraphProps> = (args) => (
    <OverViewGraph {...args} />
);

export const Default = Template.bind({});
Default.args = {
    investmentValue: '$ 11900204',
    investmentPercentage: '-1.2%',
    bitcoinValue: '$ 12,400',
    bitcoinPercentage: '+8.2%',
    isNewUser:false
};
