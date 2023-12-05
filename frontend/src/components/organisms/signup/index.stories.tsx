import Signup from '.';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'organisms/Signup',
    component: Signup
} as Meta<typeof Signup>;

const Template: StoryFn<typeof Signup> = () => <Signup />;

export const Default = Template.bind({});
