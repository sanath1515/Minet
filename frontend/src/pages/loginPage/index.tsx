import React from 'react';
import LoginSignupTemplate from '../../components/templates/loginSignupTemplate';
import { LoginForm } from '../../components/organisms/login';
import loginBanner from '../../../public/assets/icons/loginBanner.svg';

const LoginPage = () => {
    return (
        <LoginSignupTemplate bodyNode={<LoginForm />} imageSrc={loginBanner} />
    );
};

export default LoginPage;
