import React from 'react';
import ResetPassword from '.';
import '@testing-library/jest-dom';
import { render, fireEvent,screen} from '@testing-library/react';
import { RESET_PASSWORD } from '../../../utils/constants';
import { useAppContext } from '../../../context';

jest.mock('../../../context', () => {
  return {
      ...jest.requireActual('../../../context'),
      useAppContext: jest.fn()
  };
});

describe('ResetPassword Component', () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockImplementation(() => ({
        email: String
    }));
});

  const setPassWordChangedMock = jest.fn();
  test('should render the ResetPassword component', () => {
    render(<ResetPassword setPassWordChanged={setPassWordChangedMock} />);
    expect(screen.getAllByText(RESET_PASSWORD)[0]).toBeInTheDocument();
  });

  test('should display input fields and eye icons', () => {
    const { getByPlaceholderText, getAllByAltText } = render(<ResetPassword setPassWordChanged={setPassWordChangedMock}/>);
    const passwordInput = getByPlaceholderText('Enter Password');
    const confirmPasswordInput = getByPlaceholderText('Re-Enter Password');
    const eyeIcons = getAllByAltText('show password');
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(eyeIcons.length).toBe(2);
  });

  test('should toggle password visibility on showPassword click', () => {
    const { getByPlaceholderText, getAllByAltText } = render(<ResetPassword setPassWordChanged={setPassWordChangedMock}/>);
    const passwordInput = getByPlaceholderText('Enter Password');
    const confirmPasswordInput = getByPlaceholderText('Re-Enter Password');
    const eyeIcons = getAllByAltText('show password');
    fireEvent.click(eyeIcons[0]);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(eyeIcons[1]);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('should enable the button when password is valid and password,confirm password is matching', async () => {
    const { getByPlaceholderText, getByRole } = render(<ResetPassword setPassWordChanged={setPassWordChangedMock}/>);
    const passwordInput = getByPlaceholderText('Enter Password');
    const confirmPasswordInput = getByPlaceholderText('Re-Enter Password');
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword@123' } });
    expect(passwordInput).toHaveValue('ValidPassword@123');
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword@123'} });
    expect(passwordInput).toHaveValue('ValidPassword@123');
    const button=getByRole('button', { name: RESET_PASSWORD });
    expect(button).toBeEnabled();
    fireEvent.click(button)
  });

  test('should disable the button when password is invalid', () => {
    const { getByPlaceholderText, getByRole } = render(<ResetPassword setPassWordChanged={setPassWordChangedMock} />);
    const passwordInput = getByPlaceholderText('Enter Password');
    const confirmPasswordInput = getByPlaceholderText('Re-Enter Password');
    fireEvent.change(passwordInput, { target: { value: 'InvalidPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'InvalidPassword'} });
    expect(getByRole('button', { name: RESET_PASSWORD })).toBeDisabled();
  });

});
