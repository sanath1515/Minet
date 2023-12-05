import ForgotPassword from '.';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'organisms/ForgotPassword',
    component: ForgotPassword
} as Meta<typeof ForgotPassword>;

const Template: StoryFn<typeof ForgotPassword> = () => <ForgotPassword />;

export const Default = Template.bind({});

