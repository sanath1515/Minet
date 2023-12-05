import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { ForgotPasswordPage } from '.';
import { render } from '../../test-setUp';

describe('ForgotPasswordPage', () => {
    it('should render the page with data-testId', () => {
        render(<ForgotPasswordPage />);
        const testId = screen.getByTestId('login-signup-template');
        expect(testId).toBeInTheDocument();
    });
});
