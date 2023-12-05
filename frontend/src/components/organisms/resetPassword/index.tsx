import Typography from '../../atoms/typography';
import TypoTextField from '../../molecules/typoTextField';
import EyeOff from '../../../../public/assets/icons/eyeOff.svg';
import EyeOn from '../../../../public/assets/icons/eyeOn.svg';
import theme from '../../../theme';
import Button from '../../atoms/button';
import MuiIcon from '../../atoms/icon';
import React, { useEffect, useState } from 'react';
import {
    PASSWORD_ERROR,
    PASSWORD_REGEX,
    RESET_PASSWORD
} from '../../../utils/constants';
import { styled, Box } from '@mui/material';
import { User, getUserByEmailId, updatePassword } from '../../../services';
import { useAppContext } from '../../../context';

interface ResetPasswordProps {
    setPassWordChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled(Box)({
    width: '520px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
});

const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: theme.palette.primary[500]
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.primary[700],
        color: theme.palette.minetText.contrastText
    }
});

const ResetPassword = ({ setPassWordChanged }: ResetPasswordProps) => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] =
        useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(true);
    const {email} = useAppContext()

    useEffect(() => {
        setIsNewPasswordValid(PASSWORD_REGEX.test(newPassword));
        setIsPasswordValid(
            newPassword !== '' &&
                confirmPassword !== '' &&
                newPassword === confirmPassword &&
                PASSWORD_REGEX.test(newPassword)
        );
    }, [newPassword, confirmPassword]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handlePasswordVisibility = (field: string) => {
        if (field === 'newPassword') {
            setIsNewPasswordVisible(!isNewPasswordVisible);
        } else if (field === 'confirmPassword') {
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
        }
    };

    const getInputProps = (field: string) => (
        <MuiIcon
            onClick={() => handlePasswordVisibility(field)}
            src={
                (isNewPasswordVisible && field === 'newPassword') ||
                (isConfirmPasswordVisible && field === 'confirmPassword')
                    ? EyeOn
                    : EyeOff
            }
            alt="show password"
        />
    );

    const handlePatchClick = () => {
         getUserByEmailId(email).then((res) => {
            const userData: User = res.data;
            userData.password = newPassword;
            if (userData) {
                updatePassword(userData);
                setPassWordChanged(false);
            }
        });
    };

    return (
        <Container>
            <Typography
                variant="h4"
                color={theme.palette.minetText.highEmphasis}
            >
                {RESET_PASSWORD}
            </Typography>
            <TypoTextField
                text="Enter Password"
                name="newPassword"
                placeholder="Enter Password"
                value={newPassword}
                onChange={handleChange}
                type={isNewPasswordVisible ? 'text' : 'password'}
                icon={getInputProps('newPassword')}
            />
            <TypoTextField
                text="Re-Enter Password"
                name="confirmPassword"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={handleChange}
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                icon={getInputProps('confirmPassword')}
            />
            {!isNewPasswordValid && newPassword && (
                <Typography
                    variant="caption2"
                    sx={{ textTransform: 'none' }}
                    color={"red"}
                >
                    {PASSWORD_ERROR}
                </Typography>
            )}
            <StyledButton
                variant="contained"
                disabled={!isPasswordValid}
                handleClick={handlePatchClick}
            >
                {RESET_PASSWORD}
            </StyledButton>
        </Container>
    );
};

export default ResetPassword;
