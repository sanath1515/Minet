import React from 'react';
import UpArrow from '../../../../public/assets/icons/UpArrow.svg';
import { Meta, StoryFn } from '@storybook/react';
import { PortFolioValue, PortFolioValueProps } from '.';
import theme from '../../../theme';

const meta: Meta = {
    title: 'molecules/PortfolioValue',
    component: PortFolioValue
};
export default meta;

const Template: StoryFn<PortFolioValueProps> = (args) => (
    <PortFolioValue {...args} />
);

export const Default = Template.bind({});
Default.args = {
    text: 'Total Investment',
    src: UpArrow,
    alt: 'UpArrow',
    percentValue: '0.0%',
    bool: true,
    value: '$ 0.00',
    variant: 'h6',
    textColor:theme.palette.minetSuccess[700] 
};

export const Primary = Template.bind({});
Primary.args = {
    text: 'Market cap',
    bool: false,
    value: '$64.2T',
    variant: 'body1'
};

