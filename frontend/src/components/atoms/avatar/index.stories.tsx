import { Meta, StoryFn } from '@storybook/react';
import Profile from '../../../../public/assets/icons/Profile.svg';
import { Avatar, AvatarProps } from '.';
import React from 'react';

const meta: Meta = {
    title: 'atoms/Avatar',
    component: Avatar
};

export default meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    src: Profile,
    alt: 'image is loading',
    onClick: () => {
        alert('Avatar clicked!');
    }
};
