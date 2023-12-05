import React from 'react';
import MuiIcon from '../../atoms/icon';
import { Box, Stack, styled } from '@mui/material';

interface LoginSignupTemplateProps {
    bodyNode: React.ReactNode;
    imageSrc: string;
}

const StyledDiv = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 13rem;
    @media (max-width: 1800px) {
        margin-left: 5rem;
    }
`;

const StyledImage = styled(MuiIcon)({
    width: '50%',
    height: '100vh',
    objectFit: 'cover'
});

const LoginSignupTemplate = ({ ...props }: LoginSignupTemplateProps) => {
    return (
        <Box width="100vw" height="100vh" data-testid="login-signup-template">
            <Stack direction="row">
                <StyledImage src={props.imageSrc} alt={'login-panel image'} />
                <StyledDiv>{props.bodyNode}</StyledDiv>
            </Stack>
        </Box>
    );
};

export default LoginSignupTemplate;
