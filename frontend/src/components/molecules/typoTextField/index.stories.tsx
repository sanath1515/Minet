import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import TypoTextField from '.';
import eyeOff from '../../../../public/assets/icons/eyeOff.svg';
import { InputAdornment } from '@mui/material';

export default {
    title: 'Molecules/TypoTextField',
    component: TypoTextField
} as Meta;

const Template: StoryFn = (args) => (
    <TypoTextField
        value={'Hello'}
        text={'Email'}
        placeholder={'abc@gmail.com'}
        {...args}
    />
);

export const EmailField = Template.bind({});
EmailField.args = {
    text: 'Email',
    placeholder: 'you@company.com',
    value: 'abc@gmail.com'
};

export const PasswordField = Template.bind({});
PasswordField.args = {
    text: 'Password',
    placeholder: 'Create Password',
    type: 'password',
    value: 'abc123',
    icon: <img src={eyeOff} alt="Image" />
};
