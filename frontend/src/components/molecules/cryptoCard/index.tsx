import React from 'react';
import Typography from '../../atoms/typography';
import MuiIcon from '../../atoms/icon';
import theme from '../../../theme';
import { Box, styled } from '@mui/material';

interface CryptoCardProps {
    cryptoIcon: string;
    amount: string;
    growthRate?: string;
    currencyType: string;
    currencyCode: string;
    growthStatus?: string;
    isWalletCard?: boolean;
    sx?: React.CSSProperties;
}

interface ContainerProps {
    isWalletCard?: boolean;
}

const Container = styled(Box)((props: ContainerProps) => ({
    width: props.isWalletCard ? '105%' : '100%',
    height: theme.spacing(14.5),
    display: 'flex',
    justifyContent: 'space-between'
}));

const InfoBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5)
});

const RightBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: theme.spacing(1)
});

const InnerBox = styled(Box)({
    display: 'flex',
    gap: theme.spacing(1),
    flexDirection: 'column'
});

const CryptoCard = (props: CryptoCardProps) => {
    return (
        <Container isWalletCard={props.isWalletCard}>
            <InfoBox>
                <MuiIcon
                    src={props.cryptoIcon}
                    alt={'bitcoin'}
                    style={{ width: '42px', height: '42px' }}
                />
                <InnerBox>
                    <Typography
                        variant="body1"
                        color={theme.palette.minetText.highEmphasis}
                    >
                        {props.currencyType}
                    </Typography>
                    <Typography
                        variant="caption1"
                        color={theme.palette.minetText.mediumEmphasis}
                    >
                        {props.currencyCode}
                    </Typography>
                </InnerBox>
            </InfoBox>
            <RightBox>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {props.amount}
                </Typography>
                {props.growthRate && (
                    <Typography
                        variant="caption1"
                        color={
                            props.growthStatus === 'increased'
                                ? theme.palette.minetSuccess[500]
                                : theme.palette.minetError[500]
                        }
                        sx={props.sx}
                    >
                        {props.growthRate}
                    </Typography>
                )}
            </RightBox>
        </Container>
    );
};

export default CryptoCard;
