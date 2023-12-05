import React from 'react';
import LoginSignupTemplate from '../../components/templates/loginSignupTemplate';
import signupBanner from '../../../public/assets/icons/signupImage.svg';
import Signup from '../../components/organisms/signup';

const SignUpPage = () => {
    return (
        <LoginSignupTemplate bodyNode={<Signup />} imageSrc={signupBanner} />
    );
};

export default SignUpPage;
