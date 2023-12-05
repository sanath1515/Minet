import React from 'react';
import eyeOff from '../../../../public/assets/icons/eyeOff.svg';
import InputField from '.';
import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { InputAdornment } from '@mui/material';
import { TEXTFIELD_STYLES } from '../../../utils/constants';

export default {
    title: 'Atoms/InputField',
    component: InputField
} as Meta<typeof InputField>;

const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const EmailInputField = Template.bind({});
EmailInputField.args = {
    placeholder: 'you@company.com',
    variant: 'outlined',
    onChange: action('onChange event'),
    value: 'you@company.com',
    sx: TEXTFIELD_STYLES
};

export const PasswordInputField = Template.bind({});
PasswordInputField.args = {
    placeholder: 'Enter Password',
    type: 'password',
    variant: 'outlined',
    value: '',
    sx: TEXTFIELD_STYLES,
    inputProps: {
        endAdornment: (
            <InputAdornment position="start">
                <img src={eyeOff} alt="Image" />
            </InputAdornment>
        )
    }
};

export const PasswordInputFieldWithValue = Template.bind({});
PasswordInputFieldWithValue.args = {
    placeholder: 'Enter Password',
    type: 'password',
    variant: 'outlined',
    value: 'Password@123',
    sx: TEXTFIELD_STYLES,
    inputProps: {
        endAdornment: (
            <InputAdornment position="start">
                <img src={eyeOff} alt="Image" />
            </InputAdornment>
        )
    }
};
