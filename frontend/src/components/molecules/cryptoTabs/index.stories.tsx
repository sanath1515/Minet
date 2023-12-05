import React from 'react';
import CryptoTabs from '.';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'molecules/CryptoTabs',
    component: CryptoTabs
} as Meta<typeof CryptoTabs>;

const Template: StoryFn<typeof CryptoTabs> = ({ ...args }) => (
    <CryptoTabs {...args} />
);

export const Default = Template.bind({});
Default.args = {
    onClick: () => {
        console.log('chip clicked');
    }
};
