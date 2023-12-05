import React from 'react';
import MuiIcon from '../../atoms/icon';
import SuccessSvg from '../../../../public/assets/icons/success.svg';
import Typography from '../../atoms/typography';
import theme from '../../../theme';
import Button from '../../atoms/button';
import { Box, styled } from '@mui/material';
import {
    BUY_CRYPTO,
    PURCHASE_SUCCESS_MESSAGE,
    SELL_CRYPTO,
    SELL_SUCCESS_MESSAGE,
    USD_COIN
} from '../../../utils/constants';

interface PaymentSuccessCardProps {
    amount: string;
    paymentType?:string;
    onBuyCryptoClick: () => void;
    onGoToUsdCoinClick: () => void;
}

const Container = styled(Box)({
    width: '396px',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
});

const HeaderContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center'
});

const ContentContainer = styled(Box)({
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    gap: '44px',
    width: '332px',
    alignItems: 'center',
    textAlign: 'center'
});

const PaymentSuccessCard = (props: PaymentSuccessCardProps) => {
    return (
        <Container>
            <HeaderContainer>
                <MuiIcon
                    src={SuccessSvg}
                    alt="purchase completed"
                    style={{ height: '64px', width: '64px' }}
                />
                <Typography
                    variant="h4"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {props.amount}
                </Typography>
            </HeaderContainer>
            <ContentContainer>
                <Typography variant="body2">
                    {props.paymentType === "sell" ?  SELL_SUCCESS_MESSAGE : PURCHASE_SUCCESS_MESSAGE}
                </Typography>
                <Box>
                    <Button
                        variant="text"
                        sx={{
                            border: `1px solid ${theme.palette.primary[500]}`,
                            color: theme.palette.primary[500],
                            marginRight: '24px',
                            width: '120px',
                            height: '42px'
                        }}
                        handleClick={props.onBuyCryptoClick}
                    >
                        {props.paymentType === "sell"? SELL_CRYPTO: BUY_CRYPTO}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            height: '42px',
                            '&:hover': {
                                backgroundColor: theme.palette.primary[500]
                            }
                        }}
                        handleClick={props.onGoToUsdCoinClick}
                    >
                        {USD_COIN}
                    </Button>
                </Box>
            </ContentContainer>
        </Container>
    );
};

export default PaymentSuccessCard;
