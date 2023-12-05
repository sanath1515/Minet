import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ChooseCryptoCard, ChooseCryptoCardProps } from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
const meta: Meta = {
    title: 'molecules/ChooseCryptoCard',
    component: ChooseCryptoCard
};
export default meta;

const Template: StoryFn<ChooseCryptoCardProps> = (args) => (
    <ChooseCryptoCard {...args} />
);
export const Default = Template.bind({});
Default.args = {
    text: 'Bitcoin',
    value: '$3,406,069.54',
    src: Bitcoin,
    alt: 'Bitcoin',
    bool: true
};

export const Primary = Template.bind({});
Primary.args = {
    text: 'Ethereum',
    value: '$1,297.93',
    src: Bitcoin,
    alt: 'Bitcoin',
    bool: false
};
