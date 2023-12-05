import Typography from '../../atoms/typography';
import theme from '../../../theme';
import TypoTextField from '../../molecules/typoTextField';
import Button from '../../atoms/button';
import MuiIcon from '../../atoms/icon';
import eyeOff from '../../../../public/assets/icons/eyeOff.svg';
import eye from '../../../../public/assets/icons/eye.svg';
import { Box, Divider, styled } from '@mui/material';
import React, { useState } from 'react';
import {
    ALREADY_HAVE_AN_ACCOUNT,
    EMAILREG,
    EMAIL_LABEL,
    EMAIL_PLACEHOLDER,
    EMPTY_ERROR_MESSAGE,
    INVALID_EMAIL_MESSAGE,
    INVALID_NAME_MESSAGE,
    INVALID_PASSWORD_MESSAGE,
    LOGIN_BUTTON,
    NAME_LABEL,
    NAME_PLACEHOLDER,
    PASSWORD,
    PASSWORDREG,
    PASSWORD_END_ICON_ALT_TEXT,
    PASSWORD_LABEL,
    PASSWORD_PLACEHOLDER,
    SHORT_PASSWORD_MESSAGE,
    SIGNUP_BUTTON,
    SIGNUP_HEADER_CONTENT,
    SOCIAL_LOGIN_ITEMS
} from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import {
    getToken,
    getUserByEmailId,
    registerUser,
    saveWallet
} from '../../../services';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '../../../context';

export interface SignUpProps {
    name?: string;
    email?: string;
    password: string;
    balance: number;
}

const MainContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),
    width: theme.spacing(128)
});

const StyledSignupButton = styled(Button)({
    backgroundColor: theme.palette.primary[500],
    padding: 0,
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary[500]
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.primary[700]
    }
});

const SocialLoginInnerBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    backgroundColor: theme.palette.primary[100],
    borderRadius: theme.spacing(3),
    gap: theme.spacing(2),
    width: theme.spacing(39),
    height: theme.spacing(24),
    padding: '20px 40px'
});

const SocialLoginContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(5)
});

const StyledLoginButton = styled(Button)({
    padding: '0',
    '&:hover': {
        backgroundColor: 'unset'
    }
});

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [signUpEmailHelperText, setSignUpEmailHelperText] =
        useState<string>('');
    const [signUpPasswordHelperText, setSignUpPasswordHelperText] =
        useState<string>('');
    const [nameHelperText, setNameHelperText] = useState<string>('');
    const navigate = useNavigate();
    const [validateUser, setValidateUser] = useState(true);
    const { setUserId } = useAppContext();

    const mediumEmphasis = theme.palette.minetText.mediumEmphasis;

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameHelperText(
            e.target.value.length >= 5 && e.target.value.length <= 20
                ? ''
                : INVALID_NAME_MESSAGE
        );
    };

    const handleEmailValidations = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setSignUpEmailHelperText(
            !EMAILREG.test(e.target.value) ? INVALID_EMAIL_MESSAGE : ''
        );
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        name === ''
            ? setNameHelperText(EMPTY_ERROR_MESSAGE)
            : handleEmailValidations(e);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (name === '') setNameHelperText(EMPTY_ERROR_MESSAGE);
        else if (email === '') setSignUpEmailHelperText(EMPTY_ERROR_MESSAGE);
        else {
            setPassword(e.target.value);
            if (e.target.value.length < 8) {
                setSignUpPasswordHelperText(SHORT_PASSWORD_MESSAGE);
            } else if (!PASSWORDREG.test(e.target.value)) {
                setSignUpPasswordHelperText(INVALID_PASSWORD_MESSAGE);
            } else {
                setSignUpPasswordHelperText('');
            }
        }
    };

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const addUser = () => {
        const newUser = {
            name: name,
            email: email,
            password: password,
            balance: 50000
        };

        const user = {
            email: email,
            password: password
        };

        getUserByEmailId(email)
            .then(() => {
                setValidateUser(false);
            })
            .catch(async () => {
                await registerUser(newUser).then(async (response) => {
                    setUserId(response.id);
                    await saveWallet({
                        userId: response.id,
                        balance: 50000
                    });
                });
                await getToken(user).then((res: any) =>
                    localStorage.setItem('token', res.data.token)
                );
                navigate('/dashBoardPage');
            });
    };

    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    const postUserByAuth = async () => {
        loginWithRedirect({
            appState: {
                returnTo: '/dashBoardPage'
            },
            authorizationParams: {
                connection: 'google-oauth2'
            }
        });
        console.log(isAuthenticated);
        if (isAuthenticated) {
            const newUser = {
                name: user?.name,
                email: user?.email,
                password: PASSWORD,
                balance: 50000
            };
            const tempUser = {
                email: user?.email,
                password: PASSWORD
            };
            console.log(newUser);

            await getUserByEmailId(user?.email)
                .then(async (response) => {
                    console.log(response);
                    setUserId(response.data.id);
                    localStorage.setItem(
                        'userId',
                        JSON.stringify(response.data.id)
                    );
                    await getToken(tempUser).then((res: any) =>{
                    localStorage.setItem('token', res.data.token)
                    }
                   ).catch(()=>{
                    console.log("hello")
                   })
                })
                .catch(async () => {
                    await registerUser(newUser).then(async (response) => {
                        setUserId(response.id);
                        await saveWallet({
                            userId: response.id,
                            balance: 50000
                        });
                        localStorage.setItem(
                            'userId',
                            JSON.stringify(response.id)
                        );
                    });
                    await getToken(tempUser).then((res: any) =>{
                        console.log(res)
                        localStorage.setItem('token', res.data.token)
                    }
                    );
                });
        }
    };

    const SignUpWithGoogle = () => {
        postUserByAuth();
    };

    return (
        <MainContainer>
            <Typography
                variant="h4"
                color={theme.palette.minetText.highEmphasis}
            >
                {SIGNUP_HEADER_CONTENT}
            </Typography>

            <TypoTextField
                text={NAME_LABEL}
                placeholder={NAME_PLACEHOLDER}
                value={name}
                onChange={handleNameChange}
                helperText={nameHelperText}
                error={!!nameHelperText}
            />
            <TypoTextField
                text={EMAIL_LABEL}
                placeholder={EMAIL_PLACEHOLDER}
                value={email}
                onChange={handleEmailChange}
                helperText={signUpEmailHelperText}
                error={!!signUpEmailHelperText}
            />
            <TypoTextField
                text={PASSWORD_LABEL}
                placeholder={PASSWORD_PLACEHOLDER}
                value={password}
                type={isPasswordVisible ? 'text' : 'password'}
                onChange={handlePasswordChange}
                helperText={signUpPasswordHelperText}
                error={!!signUpPasswordHelperText}
                icon={
                    <MuiIcon
                        onClick={handlePasswordVisibility}
                        src={isPasswordVisible ? eye : eyeOff}
                        alt={PASSWORD_END_ICON_ALT_TEXT}
                    />
                }
            />
            {!validateUser && (
                <Typography
                    variant="caption1"
                    color={"red"}
                    style={{ alignSelf: 'center' }}
                >
                    User Already Exists
                </Typography>
            )}
            <StyledSignupButton
                variant="contained"
                disabled={
                    !(
                        name &&
                        EMAILREG.test(email) &&
                        PASSWORDREG.test(password)
                    )
                }
                disableRipple
                handleClick={addUser}
            >
                <Typography
                    variant="button"
                    color={theme.palette.primary.contrastText}
                >
                    {SIGNUP_BUTTON}
                </Typography>
            </StyledSignupButton>

            <Divider orientation="horizontal">
                <Typography
                    variant="caption1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    Or
                </Typography>
            </Divider>

            <SocialLoginContainer>
                {SOCIAL_LOGIN_ITEMS.map((item) => {
                    return (
                        <SocialLoginInnerBox
                            key={item.id}
                            onClick={
                                item.id === 1 ? SignUpWithGoogle : undefined
                            }
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            <MuiIcon
                                src={item.iconSrc}
                                alt={`${item.name} icon`}
                                style={{
                                    width: theme.spacing(5),
                                    height: theme.spacing(5)
                                }}
                            />
                            <Typography
                                variant="body1"
                                color={theme.palette.minetText.mediumEmphasis}
                            >
                                {item.name}
                            </Typography>
                        </SocialLoginInnerBox>
                    );
                })}
            </SocialLoginContainer>

            <Box sx={{ display: 'flex' }}>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    {ALREADY_HAVE_AN_ACCOUNT}
                </Typography>
                <StyledLoginButton
                    variant="text"
                    disableRipple
                    handleClick={() => {
                        navigate('/');
                    }}
                >
                    <Typography
                        variant="body1"
                        color={theme.palette.primary[500]}
                    >
                        {LOGIN_BUTTON}
                    </Typography>
                </StyledLoginButton>
            </Box>
        </MainContainer>
    );
};

export default Signup;
