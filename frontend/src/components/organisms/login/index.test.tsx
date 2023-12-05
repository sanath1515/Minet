import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-setUp';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '../../../context';
import { LoginForm } from '.';

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: jest.fn()
}));
const loginMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
    loginWithRedirect: loginMock
});

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

describe('loginForm', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            setUserId: jest.fn()
        }));
    });

    it('should render with Typography', () => {
        render(<LoginForm />);
        const text = screen.getByText('Login to Minet');
        expect(text).toBeInTheDocument();
    });

    it('should render and handle email input changes', () => {
        render(<LoginForm />);
        const emailField = screen.getByPlaceholderText('you@company.com');
        fireEvent.change(emailField, { target: { value: 'john@gmail.com' } });
        expect(emailField).toHaveValue('john@gmail.com');
    });

    it('should render and handle password input changes', () => {
        render(<LoginForm />);
        const passwordField = screen.getByPlaceholderText('Enter Password');
        fireEvent.change(passwordField, { target: { value: 'John@123' } });
        expect(passwordField).toHaveValue('John@123');
    });

    it('should render button', () => {
        render(<LoginForm />);
        const button = screen.getByRole('button', { name: /Sign In/i });
        expect(button).toBeInTheDocument();
    });

    it('should toggle the visibility of the password inputfield using end icon', async () => {
        render(<LoginForm />);

        const passwordElement = screen.getByPlaceholderText('Enter Password');
        expect(passwordElement).toHaveAttribute('type', 'password');

        const passwordEndIcon = screen.getByAltText('Image');
        expect(passwordEndIcon).toBeInTheDocument();
        await fireEvent.click(passwordEndIcon);
        expect(passwordElement).toHaveAttribute('type', 'text');
    });

    it('should handle signIn for valid credentials', async () => {
        render(<LoginForm />);
        const emailField = screen.getByPlaceholderText('you@company.com');
        fireEvent.change(emailField, { target: { value: 'john@gmail.com' } });
        expect(emailField).toHaveValue('john@gmail.com');

        const passwordField = screen.getByPlaceholderText('Enter Password');
        fireEvent.change(passwordField, { target: { value: 'John@123' } });
        expect(passwordField).toHaveValue('John@123');

        const button = screen.getByRole('button', { name: /Sign In/i });
        expect(button).toBeInTheDocument();

        await fireEvent.click(button);
    });

    it('should display an error message for invalid credentials', async () => {
        render(<LoginForm />);
        const emailField = screen.getByPlaceholderText('you@company.com');
        fireEvent.change(emailField, { target: { value: 'john@gmail.com' } });
        expect(emailField).toHaveValue('john@gmail.com');

        const passwordField = screen.getByPlaceholderText('Enter Password');
        fireEvent.change(passwordField, { target: { value: 'John@12' } });
        expect(passwordField).toHaveValue('John@12');

        const button = screen.getByRole('button', { name: /Sign In/i });
        expect(button).toBeInTheDocument();

        await fireEvent.click(button);

    });

    it('should render Google Icon and trigger login Auth0 action', () => {
        render(<LoginForm />);
        const button = screen.getByText('Google');
        fireEvent.click(button);
        const link = screen.getByText('Forgot Password');
        fireEvent.click(link);
        const signUpLink = screen.getByText('Signup');
        fireEvent.click(signUpLink);
        expect(loginMock).toHaveBeenCalled();
    });
    it('should post user data by Auth0 authentication', async () => {
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
            getUserByEmailId: jest.fn().mockResolvedValue({ data: [] }),
            registerUser: jest.fn().mockResolvedValue({ id: 123 })
        }));   
        render(<LoginForm />);
        await (await screen.findByText('Google')).click();
    
    });
    
});
