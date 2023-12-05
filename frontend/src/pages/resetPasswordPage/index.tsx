import LoginSignupTemplate from '../../components/templates/loginSignupTemplate';
import ResetImage from '../../../public/assets/icons/resetImage.svg';
import ResetPassword from '../../components/organisms/resetPassword';
import Typography from '../../components/atoms/typography';
import SuccessTic from '../../../public/assets/icons/successTic.svg';
import theme from '../../theme';
import Button from '../../components/atoms/button';
import React, { useState } from 'react';
import { Card } from '../../components/molecules/card';
import { Box, styled } from '@mui/material';
import { ALT_TEXT, PROCEED_TO_LOGIN, SUCCESS_MESSAGE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const SuccessDiv=styled(Box)({
display:'flex',
flexDirection:'column',
gap:theme.spacing(6)
})

const SuccessMessageDiv =styled(Box)({
    width:'25vw',
    height:'9vh',
    border:`1px solid ${theme.palette.minetGray[100]}`,
    borderRadius:theme.spacing(3),
    padding:'24px',
    display:'flex',
    alignItems:'center',
   marginTop:theme.spacing(2)
})

const LoginButton=styled(Button)({
    height:'42px',
    ':hover': {
        backgroundColor:theme.palette.primary[500]
    }
})

export const ResetPasswordPage = () => {
    const [passwordChanged,setPasswordChanged]=useState<boolean>(true);
    const navigate = useNavigate();

    return (
        <LoginSignupTemplate
            imageSrc={ResetImage}
            bodyNode={
                <Box>
                    {passwordChanged ?
                   <ResetPassword setPassWordChanged={setPasswordChanged}/> 
                        :
                    <SuccessDiv>
                        <Typography variant="h4">Reset Password</Typography>
                        <SuccessMessageDiv>
                        <Card
                            layout={'iconDualText'}
                            mainText={SUCCESS_MESSAGE}
                            subText={PROCEED_TO_LOGIN}
                            src={SuccessTic}
                            alt={ALT_TEXT}
                            mainVariant="body1"
                            subVariant="body2"
                            sx={{
                                mainText: theme.palette.minetText.highEmphasis,
                                subText: theme.palette.minetText.mediumEmphasis
                            }}
                        />
                        </SuccessMessageDiv>
                        <LoginButton variant={'contained'} fullWidth handleClick={()=>{navigate("/")}} >Login</LoginButton>
                    </SuccessDiv>
             } 
                </Box>
            }
        />
    );
};
