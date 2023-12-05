import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SideBar, SideBarProps } from '.';

const meta: Meta = {
    title: 'organisms/SideBar',
    component: SideBar
};
export default meta;

const Template: StoryFn<SideBarProps> = (args) => <SideBar {...args}/>;
export const Default = Template.bind({});
Default.args={
    handleLogout:()=>{console.log("logout")}
}