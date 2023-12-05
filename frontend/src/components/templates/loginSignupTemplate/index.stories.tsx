import signupBanner from '../../../../public/assets/icons/signupImage.svg';
import LoginSignupTemplate from '.';
import React from 'react';
import Signup from '../../organisms/signup';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Templates/LoginSignupTemplate',
    component: LoginSignupTemplate
} as Meta<typeof LoginSignupTemplate>;

const Template: StoryFn<typeof LoginSignupTemplate> = (args) => (
    <LoginSignupTemplate {...args} />
);

export const SignupTemplate = Template.bind({});
SignupTemplate.args = {
    bodyNode: <Signup />,
    imageSrc: signupBanner
};
