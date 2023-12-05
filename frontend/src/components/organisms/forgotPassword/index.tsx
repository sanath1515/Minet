import styled from '@emotion/styled';
import theme from '../../../theme';
import Typography from '../../atoms/typography';
import TypoTextField from '../../molecules/typoTextField';
import Button from '../../atoms/button';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import {
    Back,
    Code,
    Email,
    Forgot,
    Login,
    Placeholder,
    ResetCode,
    ResetLink,
    ResetPassword
} from '../../../utils/constants';
import { getUserByEmailId } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context';

const StyledBox = styled(Stack)({
    width: theme.spacing(128),
    height: theme.spacing(70),
    padding: '0px, 32px, 0px, 32px',
    gap: theme.spacing(6)
});

const StyledContainer = styled(Box)({
    display: 'flex'
});

const StyledResetButton = styled(Button)({
    borderRadius: theme.spacing(1),
    height: theme.spacing(10.5),
    '&.Mui-disabled': {
        backgroundColor: theme.palette.primary[700]
    },
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none'
    }
});

const StyledButton = styled(Button)({
    padding: '0',
    '&:hover': {
        backgroundColor: 'unset'
    }
});

const ForgotPassword = () => {
    const [value, setValue] = useState({
        email: '',
        resetcode: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [disable, setDisable] = useState(true);
    const [reset, setReset] = useState(true);
    const navigate = useNavigate()
    const {setEmail} = useAppContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setDisable(false);
        setErrorMessage('');
    };

    const handleClick = () => {
        if (reset) {
            getUserByEmailId(value.email).then(() => {
                setReset(false);
                setDisable(true);
                setEmail(value.email);
            })
            .catch(()=>{
                setErrorMessage('Email not found in the database');
            })
        } else {
            navigate("/resetPasswordPage")
        }
    };

    return (
        <StyledBox>
            <Typography
                variant="h4"
                color={theme.palette.minetText.highEmphasis}
                sx={{ paddingBottom: theme.spacing(2) }}
            >
                {Forgot}
            </Typography>

            {reset ? (
                <TypoTextField
                    name="email"
                    text={Email}
                    placeholder={Placeholder}
                    value={value.email}
                    onChange={handleChange}
                    helperText={errorMessage}
                />
            ) : (
                <TypoTextField
                    name="resetcode"
                    text={ResetCode}
                    placeholder={Code}
                    value={value.resetcode}
                    onChange={handleChange}
                    type="number"
                />
            )}

            <StyledResetButton
                variant="contained"
                disableRipple
                disabled={disable}
                handleClick={handleClick}
            >
                <Typography
                    variant="body2"
                    color={theme.palette.background.default}
                >
                    {reset ? ResetLink : ResetPassword}
                </Typography>
            </StyledResetButton>

            <StyledContainer>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    {Back}
                </Typography>

                <StyledButton variant="text" disableRipple handleClick={()=>{navigate("/")}}>
                    <Typography
                        variant="body1"
                        color={theme.palette.primary.main}
                    >
                        {Login}
                    </Typography>
                </StyledButton>
            </StyledContainer>
        </StyledBox>
    );
};

export default ForgotPassword;
