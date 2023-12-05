import theme from '../../../theme';
import Typography from '../../atoms/typography';
import usdCoin from '../../../../public/assets/icons/usdcoin.svg';
import CryptoCard from '../../molecules/cryptoCard';
import Button from '../../atoms/button';
import TransactionCard from '../../molecules/transactionCard';
import verified from '../../../../public/assets/icons/verified.svg';
import emptyTransactions from '../../../../public/assets/icons/emptyTransactions.svg';
import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import {
    MY_WALLETS,
    RECENT_TRANSACTIONS_HEADER,
    TRANSACTION_CARD_STYLES,
    USD_COIN_CODE,
    USD_COIN_TEXT,
    VIEW_ALL_BUTTON,
    VIEW_LESS_BUTTON,
    replaceNumberWithCommas
} from '../../../utils/constants';
import MuiIcon from '../../atoms/icon';

export interface Transaction {
    id: number;
    transactionType: string;
    transactionDate: string;
    currencyName: string;
    currencySymbol: string;
    currencyQuantity: number;
    amount: number;
    userId: number;
}

interface RecentTransactionsProps {
    currentBalance: number;
    transactions: Transaction[];
    isNewUser: boolean;
}

const StyledMainContainer = styled(Box)({
    width: theme.spacing(87.5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6)
});

const StyledBox = styled(Box)({
    width: theme.spacing(95),
    height: theme.spacing(50),
    '&::-webkit-scrollbar': {
        width: theme.spacing(2),
        height: theme.spacing(2)
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.minetGray[300],
        borderRadius: theme.spacing(5),
        height: theme.spacing(2)
    }
});

const StyledInnerBox = styled(Box)({
    display: 'flex',
    width: theme.spacing(95),
    justifyContent: 'space-between'
});

const StyledButton = styled(Button)({
    padding: '0',
    '&:hover': {
        backgroundColor: 'unset'
    }
});

const RecentTransactions = ({ ...props }: RecentTransactionsProps) => {
    const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);

    const handleScrollBarVisiblity = () => {
        setIsScrollBarVisible(!isScrollBarVisible);
    };

    return (
        <StyledMainContainer>
            <Typography
                variant="subtitle1"
                color={theme.palette.minetText.highEmphasis}
            >
                {MY_WALLETS}
            </Typography>
            <CryptoCard
                cryptoIcon={usdCoin}
                amount={`$${replaceNumberWithCommas(props.currentBalance)}`}
                currencyType={USD_COIN_TEXT}
                currencyCode={USD_COIN_CODE}
                isWalletCard
            />

            <StyledInnerBox>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {RECENT_TRANSACTIONS_HEADER}
                </Typography>
                <StyledButton
                    variant="text"
                    disableRipple
                    handleClick={handleScrollBarVisiblity}
                >
                    <Typography
                        variant="caption2"
                        color={theme.palette.primary[500]}
                    >
                        {isScrollBarVisible
                            ? VIEW_LESS_BUTTON
                            : VIEW_ALL_BUTTON}
                    </Typography>
                </StyledButton>
            </StyledInnerBox>

            <StyledBox
                data-testid="transaction-box"
                sx={{ overflow: isScrollBarVisible ? 'auto' : 'hidden' }}
            >
                {props.isNewUser ? (
                    <MuiIcon
                        src={emptyTransactions}
                        alt="empty transactions image"
                        style={{ width: '380px', height: '105px' }}
                    />
                ) : (
                    props.transactions.map((item) => {
                        return (
                            <TransactionCard
                                key={item.id}
                                transactionDate={item.transactionDate.toString().substring(0,10)}
                                currencyName={item.currencyName}
                                currenySymbol={item.currencySymbol}
                                transactionType={item.transactionType === 'buy' ? 'Purchased' : 'Sold'}
                                amount={item.currencyQuantity}
                                balance={item.amount}
                                cardSx={TRANSACTION_CARD_STYLES}
                                transactionStatusIcon={verified}
                                isCryptoWallet={false}
                            />
                        );
                    })
                )}
            </StyledBox>
        </StyledMainContainer>
    );
};

export default RecentTransactions;
