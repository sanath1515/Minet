import Dropdown from '.';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ITEM_LIST } from '../../../utils/constants';

export default {
    title: 'molecules/Dropdown',
    component: Dropdown
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = ({ ...args }) => (
    <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
    itemList: ITEM_LIST
};
