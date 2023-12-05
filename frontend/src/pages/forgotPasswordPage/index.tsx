import React from 'react';
import LoginSignupTemplate from '../../components/templates/loginSignupTemplate';
import ForgotPageImage from '../../../public/assets/icons/forgotPage.svg';
import ForgotPassword from '../../components/organisms/forgotPassword';

export const ForgotPasswordPage = () => {
    return (
        <LoginSignupTemplate
            bodyNode={<ForgotPassword />}
            imageSrc={ForgotPageImage}
            data-testid="forgot"
        />
    );
};
