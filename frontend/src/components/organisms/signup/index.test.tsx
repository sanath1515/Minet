import Signup from '.';
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import {
    EMAIL_PLACEHOLDER,
    EMPTY_ERROR_MESSAGE,
    INVALID_EMAIL_MESSAGE,
    INVALID_NAME_MESSAGE,
    INVALID_PASSWORD_MESSAGE,
    NAME_PLACEHOLDER,
    PASSWORD_END_ICON_ALT_TEXT,
    PASSWORD_PLACEHOLDER,
    SHORT_PASSWORD_MESSAGE,
    SIGNUP_HEADER_CONTENT
} from '../../../utils/constants';
import { render } from '../../../test-setUp';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '../../../context';

jest.mock('../../../services/API', () => {
    let emailFound = false;

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

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: jest.fn()
}));

const loginMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
    loginWithRedirect: loginMock
});

describe('Signup Card Test', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            setUserId: jest.fn()
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render signup card properly', () => {
        render(<Signup />);
        expect(screen.getByText(SIGNUP_HEADER_CONTENT)).toBeInTheDocument();
    });

    it('should create account with name,email and password', async () => {
        render(<Signup />);

        const nameField = screen.getByPlaceholderText(NAME_PLACEHOLDER);
        const emailField = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
        const passwordField = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
        const signUpButton = screen.getByRole('button', { name: /Sign up/i });
        expect(signUpButton).toBeDisabled();

        await fireEvent.change(nameField, { target: { value: 'John Doe' } });
        expect(nameField).toHaveValue('John Doe');
        await fireEvent.change(emailField, {
            target: { value: 'sample@gmail.com' }
        });
        expect(emailField).toHaveValue('sample@gmail.com');
        await fireEvent.change(passwordField, {
            target: { value: 'Password@123' }
        });
        expect(passwordField).toHaveValue('Password@123');
        const signButton = screen.getByRole('button', { name: /Sign up/i });
        expect(signButton).toBeEnabled();
        const signUp = screen.getByRole('button', { name: /Sign up/i });
        fireEvent.click(signUp);
    });

    it('should handle helpertext validations for signup card', () => {
        render(<Signup />);
        const signUpButton = screen.getByRole('button', { name: /Sign up/i });
        const nameField = screen.getByPlaceholderText(NAME_PLACEHOLDER);
        const emailField = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
        const passwordField = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);

        fireEvent.change(emailField, { target: { value: 'john@gmail.com' } });
        expect(emailField).toHaveValue('');
        const helperText = screen.getByText(EMPTY_ERROR_MESSAGE);
        expect(helperText).toBeInTheDocument();

        fireEvent.change(passwordField, { target: { value: 'John@123' } });
        expect(passwordField).toHaveValue('');
        expect(helperText).toBeInTheDocument();

        fireEvent.change(nameField, { target: { value: 'John' } });
        expect(screen.getByText(INVALID_NAME_MESSAGE)).toBeInTheDocument();

        fireEvent.change(nameField, { target: { value: 'John Doe' } });
        expect(nameField).toHaveValue('John Doe');

        fireEvent.change(passwordField, { target: { value: 'password' } });
        expect(screen.getByText(EMPTY_ERROR_MESSAGE)).toBeInTheDocument();

        fireEvent.change(emailField, { target: { value: 'johngmail.com' } });
        expect(screen.getByText(INVALID_EMAIL_MESSAGE)).toBeInTheDocument();

        fireEvent.change(emailField, { target: { value: 'john@gmail.com' } });
        expect(emailField).toHaveValue('john@gmail.com');

        fireEvent.change(passwordField, { target: { value: 'pass' } });
        expect(screen.getByText(SHORT_PASSWORD_MESSAGE)).toBeInTheDocument();

        fireEvent.change(passwordField, { target: { value: 'password' } });
        expect(screen.getByText(INVALID_PASSWORD_MESSAGE)).toBeInTheDocument();

        fireEvent.change(passwordField, { target: { value: 'Password@123' } });
        expect(passwordField).toHaveValue('Password@123');

        fireEvent.click(signUpButton);
    });

    it('should toggle the visibility of the password inputfield using end icon', async () => {
        render(<Signup />);

        const passwordElement =
            screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
        expect(passwordElement).toHaveAttribute('type', 'password');

        const passwordEndIcon = screen.getByAltText(PASSWORD_END_ICON_ALT_TEXT);
        expect(passwordEndIcon).toBeInTheDocument();
        await fireEvent.click(passwordEndIcon);
        expect(passwordElement).toHaveAttribute('type', 'text');
    });

    it('should render Google Icon and trigger Signup Auth0 action', () => {
        render(<Signup />);
        const button = screen.getByText('Google');
        fireEvent.click(button);

        expect(loginMock).toHaveBeenCalled();
    });

    it('should render Login Button and handle onClick properly', async () => {
        render(<Signup />);
        const button = screen.getByRole('button', { name: /Login/i });
        expect(button).toBeInTheDocument();
        const Loginbutton = screen.getByRole('button', { name: /Login/i });
        await fireEvent.click(Loginbutton);
        const emailField = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
        expect(emailField).toBeInTheDocument();
    });
    it('should set user ID and localStorage item if user exists', async () => {
        // Mock Auth0 functions and set isAuthenticated to true
        (useAuth0 as jest.Mock).mockReturnValue({
            loginWithRedirect: loginMock,
            isAuthenticated: true,
            user: {
                name: 'Test User',
                email: 'test@example.com'
            }
        });

        jest.mock('../../../services', () => ({
            getUserByEmailId: jest.fn().mockResolvedValue({
                data: [
                    {
                        id: 456, 
                        name: 'Existing User',
                        email: 'existing@example.com',
                        password: 'existing-password',
                        balance: 50000
                    }
                ]
            }),
            registerUser: jest.fn().mockResolvedValue({ id: 123 })
        }));
    
        render(<Signup />);
        await (await screen.findByText('Google')).click();
    });
    
});
