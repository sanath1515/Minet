import React from 'react';
import AvatarCaret from '.';
import Profile from '../../../../public/assets/icons/Profile.svg';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Molecules/AvatarCaret',
    component: AvatarCaret
} as Meta;

const Template: StoryFn = (args) => (
    <AvatarCaret src={Profile} alt={'Avatar Image'} {...args} />
);

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
    src:Profile,
    alt:"Avatar Image",
};


