import React from 'react';
import ForgotPassword from '.';
import '@testing-library/jest-dom';
import { Code, Forgot, Placeholder, ResetCode } from '../../../utils/constants';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-setUp';
import { useAppContext } from '../../../context';


jest.mock('../../../services/API', () => {
    let emailFound = true;

    return {
        get: jest.fn().mockImplementation((url) => {
            if (emailFound) {
                emailFound = false;
                return Promise.resolve({
                    data: [
                        {
                            id: 1,
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: 'John@123',
                            balance: 50000
                        }
                    ]
                });
            } else {
                return Promise.resolve({
                    data: []
                });
            }
        })
    };
});

jest.mock('../../../context', () => {
    return {
        ...jest.requireActual('../../../context'),
        useAppContext: jest.fn()
    };
});

describe('Forgot password card Test', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            setEmail: jest.fn()
        }));
    });
    
    test('Should render forgot password card properly', () => {
        render(<ForgotPassword />);
        expect(screen.getByText(Forgot)).toBeInTheDocument();
    });

    test('Should enable reset link button after entering email and reset code button after entering code', async () => {
        render(<ForgotPassword />);
        const emailField = screen.getByPlaceholderText(
            Placeholder
        ) as HTMLInputElement;

        const resetButton = screen.getByRole('button', {
            name: 'Send Reset Link'
        });
        expect(resetButton).toBeDisabled();

        fireEvent.change(emailField, {
            target: { value: 'john@gmail.com' }
        });
        expect(emailField.value).toBe('john@gmail.com');

        const resetLinkButton = screen.getByRole('button', {
            name: 'Send Reset Link'
        });

        expect(resetLinkButton).toBeEnabled();
        fireEvent.click(resetLinkButton);

        await new Promise((r) => setTimeout(r, 2000));

        const HeadingText = screen.getByText(ResetCode);

        expect(HeadingText).toBeInTheDocument();

        const resetCodeField = screen.getByPlaceholderText(
            Code
        ) as HTMLInputElement;
        expect(resetCodeField).toBeInTheDocument();

        const resetPasswordButton = screen.getByRole('button', {
            name: 'Reset Password'
        });

        fireEvent.click(screen.getByText('Login'))

        expect(resetPasswordButton).toBeDisabled();

        fireEvent.change(resetCodeField, {
            target: { value: '12345678' }
        });
        expect(resetCodeField.value).toBe('12345678');

        const resetCodeButton = screen.getByRole('button', {
            name: 'Reset Password'
        });

        expect(resetCodeButton).toBeEnabled();
        fireEvent.click(resetCodeButton);
    });

    test('Should handle email not found in the database', async () => {
        render(<ForgotPassword />);
        const emailField = screen.getByPlaceholderText(
            Placeholder
        ) as HTMLInputElement;

        const resetButton = screen.getByRole('button', {
            name: 'Send Reset Link'
        });
        expect(resetButton).toBeDisabled();

        fireEvent.change(emailField, {
            target: { value: 'nonexistent@gmail.com' }
        });
        expect(emailField.value).toBe('nonexistent@gmail.com');

        const resetLinkButton = screen.getByRole('button', {
            name: 'Send Reset Link'
        });

        expect(resetLinkButton).toBeEnabled();
    });
});
