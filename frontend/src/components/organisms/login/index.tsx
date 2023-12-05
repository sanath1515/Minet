import Typography from '../../atoms/typography';
import EyeOff from '../../../../public/assets/icons/eyeOff.svg';
import EyeOn from '../../../../public/assets/icons/eyeOn.svg';
import Button from '../../atoms/button';
import styled from '@emotion/styled';
import theme from '../../../theme';
import { Box, Link, Stack } from '@mui/material';
import React, { useState } from 'react';
import { PASSWORD, objects } from '../../../utils/constants';
import TypoTextField from '../../molecules/typoTextField';
import MuiIcon from '../../atoms/icon';
import { useAppContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import {
    getToken,
    getUserByEmailId,
    registerUser,
    saveWallet
} from '../../../services';
import { useAuth0 } from '@auth0/auth0-react';

const blueColor = theme.palette.primary[500];
const borderColor = theme.palette.minetBorder[100];

const Wrapper = styled(Box)({
    width: '512px'
});

const TextFieldsBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingTop: '32px',
    paddingBottom: '24px'
});

const MuiLink = styled(Link)({
    cursor: 'pointer',
    color: blueColor
});

const ButtonDiv = styled(Button)({
    height: '42px',
    marginTop: '24px',
    marginBottom: '32px',
    ':disabled': {
        backgroundColor: theme.palette.primary[300],
        color: theme.palette.background.default,
        opacity: '56%'
    },
    ':hover': {
        backgroundColor: blueColor
    }
});

const OrDiv = styled(Box)({
    alignItems: 'center',
    display: 'flex',
    paddingBottom: '32px',
    width: '512px',
    '& hr': {},
    '& :nth-child(3)': {
        flexGrow: 1
    },
    '& :nth-child(1)': {
        flexGrow: 1
    }
});

const Line = styled(Box)({
    borderBottom: `1px solid ${borderColor}`
});

const OrTypography = styled(Typography)({
    paddingLeft: '10px',
    paddingRight: '10px'
});

const SocialMediaBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    paddingBottom: '32px'
});

const Websites = styled(Box)({
    height: '96px',
    width: '157px',
    borderRadius: '12px',
    border: `1px solid ${borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary[100]
});

const SignUpBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '5px'
});

export const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [validate, setValidate] = useState(true);
    const { setUserId } = useAppContext();

    const navigate = useNavigate();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDisable = () => {
        return !(credentials.email !== '' && credentials.password !== '');
    };

    const mediumEmphasis = theme.palette.minetText.mediumEmphasis;

    const handleSignIn = async () => {
        await getToken({ ... credentials})
        .then(async (res:any) => {
          localStorage.setItem("token", res.data.token);
          setValidate(true);
          await getUserByEmailId(credentials.email)
                ?.then((userRes) => {
                    const userDetails = userRes.data;
                    setUserId(userDetails.id);
                })
          navigate("/dashBoardPage");
        })
        .catch(() => {
            setValidate(false);
        });
    };

    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    const postUserDataByAuth = async () => {
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

    const SignInWithGoogle = () => {
        postUserDataByAuth();
    };

    return (
        <Wrapper>
            <Typography
                variant="h4"
                color={theme.palette.minetText.highEmphasis}
            >
                Login to Minet
            </Typography>

            <TextFieldsBox>
                <TypoTextField
                    name="email"
                    text="Email"
                    placeholder="you@company.com"
                    value={credentials.email}
                    type="email"
                    onChange={handleChange}
                />

                <TypoTextField
                    name="password"
                    text="Password"
                    placeholder="Enter Password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={handleChange}
                    icon={
                        <MuiIcon
                            src={!showPassword ? EyeOff : EyeOn}
                            alt="Image"
                            onClick={handleTogglePasswordVisibility}
                        />
                    }
                />
            </TextFieldsBox>

            <Stack direction="column" spacing={2}>
                <MuiLink
                    variant="body2"
                    underline="none"
                    onClick={() => {
                        navigate('/forgotPasswordPage');
                    }}
                >
                    Forgot Password
                </MuiLink>

                {!validate && (
                    <Typography
                        variant="caption1"
                        color={"red"}
                        style={{ alignSelf: 'center' }}
                    >
                        Invalid Email or Password
                    </Typography>
                )}
            </Stack>

            <ButtonDiv
                fullWidth
                variant="contained"
                disabled={handleDisable()}
                handleClick={handleSignIn}
            >
                Sign In
            </ButtonDiv>

            <OrDiv>
                <Line />
                <OrTypography variant={'caption1'} color={mediumEmphasis}>
                    Or
                </OrTypography>
                <Line />
            </OrDiv>

            <SocialMediaBox>
                {objects.map((item) => {
                    return (
                        <Websites
                            key={item.icon}
                            onClick={
                                item.name === 'Google'
                                    ? SignInWithGoogle
                                    : undefined
                            }
                        >
                            <MuiIcon src={item.icon} alt={item.name} />
                            <Typography variant="body1" color={mediumEmphasis}>
                                {item.name}
                            </Typography>
                        </Websites>
                    );
                })}
            </SocialMediaBox>

            <SignUpBox>
                <Typography variant="body1" color={mediumEmphasis}>
                    Don`t have an account
                </Typography>
                <MuiLink
                    variant="body1"
                    underline="none"
                    onClick={() => {
                        navigate('/signUp');
                    }}
                >
                    Signup
                </MuiLink>
            </SignUpBox>
        </Wrapper>
    );
};
