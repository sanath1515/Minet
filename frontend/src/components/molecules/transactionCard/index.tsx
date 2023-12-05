import React from 'react';
import theme from '../../../theme';
import Typography from '../../atoms/typography';
import MuiIcon from '../../atoms/icon';
import Chip from '../../atoms/chip';
import { Box, Stack, SxProps, styled } from '@mui/material';
import {
    SHORT_MONTHS,
    TRANSACTION_CARD_ALT_TEXT,
    months,
    replaceNumberWithCommas
} from '../../../utils/constants';

export interface TransactionCardProps {
    transactionDate: string;
    currencyName?: string;
    currenySymbol?: string;
    transactionType: string;
    amount?: number;
    balance: number;
    cardSx: SxProps;
    transactionStatusIcon?: string;
    isCryptoWallet: boolean;
    userName?: string;
}

const StyledContainer = styled(Box)({
    display: 'flex',
    '.transaction-date': {
        ...theme.typography.subtitle2
    }
});

const StyledInnerBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
});

const CryptoWalletContainer = styled(Box)({
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
});

const StyledChip = styled(Chip)({
    '& .MuiChip-label': {
        padding: '2px 8px'
    },
    height: theme.spacing(5)
});

const TransactionCard = ({ ...props }: TransactionCardProps) => {
    return (
        <StyledContainer sx={props.cardSx} data-testid="transaction-card">
            <Typography
                variant="caption2"
                color={theme.palette.minetText.highEmphasis}
            >
                <span
                    style={{
                        color: props.isCryptoWallet
                            ? theme.palette.minetText.mediumEmphasis
                            : 'un-set'
                    }}
                >
                    {props.isCryptoWallet
                        ? SHORT_MONTHS[
                              Number(props.transactionDate.split('-')[1]) - 1
                          ]
                        : months[
                              Number(props.transactionDate.split('-')[1]) - 1
                          ]}
                </span>
                <span
                    className={`${
                        props.isCryptoWallet ? 'transaction-date' : ''
                    }`}
                >{` ${props.transactionDate.split('-')[2]}`}</span>
            </Typography>
            <StyledInnerBox
                sx={{ paddingRight: props.isCryptoWallet ? 0 : '2%' }}
            >
                <Box sx={{ display: 'flex', gap: '12px' }}>
                    <MuiIcon
                        src={props.transactionStatusIcon}
                        alt={TRANSACTION_CARD_ALT_TEXT}
                    />
                    <Stack direction="column" gap={theme.spacing(1)}>
                        <Typography
                            variant="body1"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {props.currencyName}
                        </Typography>
                        <CryptoWalletContainer>
                            {props.isCryptoWallet && (
                                <Typography
                                    variant="caption2"
                                    color={
                                        theme.palette.minetText.mediumEmphasis
                                    }
                                >{`From ${props.userName}`}</Typography>
                            )}
                            <StyledChip
                                label={
                                    <Typography
                                        variant="caption1"
                                        color={theme.palette.minetGray[500]}
                                    >
                                        {props.transactionType}
                                    </Typography>
                                }
                            />
                        </CryptoWalletContainer>
                    </Stack>
                </Box>
                <Stack
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: theme.spacing(1)
                    }}
                >
                    <Typography
                        variant="body1"
                        color={theme.palette.minetText.highEmphasis}
                    >{`${props.transactionType === 'sold' ? '-' : '+'}  ${
                        props.amount
                    } ${props.currenySymbol}`}</Typography>
                    <Typography
                        variant="caption2"
                        color={theme.palette.minetText.mediumEmphasis}
                    >{`${
                        props.transactionType === 'sold' ? '+' : '-'
                    }$ ${replaceNumberWithCommas(props.balance)}`}</Typography>
                </Stack>
            </StyledInnerBox>
        </StyledContainer>
    );
};

export default TransactionCard;
