import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { LoginForm } from '.';
import { BrowserRouter } from 'react-router-dom';
const meta: Meta = {
    title: 'organisms/Login',
    component: LoginForm
};
export default meta;

const Template: StoryFn = () => <LoginForm />;
export const Default = Template.bind({});
