import '@testing-library/jest-dom';
import React from 'react';
import LoginSignupTemplate from '.';
import loginBanner from '../../../../public/assets/icons/loginBanner.svg';
import { LoginForm } from '../../organisms/login';
import { screen } from '@testing-library/react';
import { render } from '../../../test-setUp';

describe('LoginSignup Template', () => {
    it('should render Login Template properly', () => {
        render(
            <LoginSignupTemplate
                imageSrc={loginBanner}
                bodyNode={<LoginForm />}
            />
        );
        expect(screen.getByTestId('login-signup-template')).toBeInTheDocument();
        expect(screen.getByAltText("login-panel image")).toBeInTheDocument()
    });
});
