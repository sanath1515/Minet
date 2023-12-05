import DashBoardTemplate from '../../components/templates/dashBoardTemplate';
import Typography from '../../components/atoms/typography';
import Button from '../../components/atoms/button';
import SearchField from '../../components/molecules/searchField';
import MuiIcon from '../../components/atoms/icon';
import Dropdown from '../../../public/assets/icons/dropdown.svg';
import Verified from '../../../public/assets/icons/verified.svg';
import Usd from '../../../public/assets/icons/usdcoin.svg';
import TransactionCard from '../../components/molecules/transactionCard';
import theme from '../../theme';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { getTransactions, getWalletData } from '../../services';
import {
    CASH,
    CASH_DEPOSIT,
    TOTAL_BALANCE,
    USD_COINS,
    WALLET,
    WITHDRAWAL,
    replaceNumberWithCommas
} from '../../utils/constants';
import { useAppContext } from '../../context';

export interface TransactionDetailProps {
    id: number;
    transactionType: string;
    transactionDate: string;
    currencyName: string;
    currencySymbol: string;
    currencyQuantity: number;
    amount: number;
    userId: number;
}

const StyledBody = styled(Box)({
    height: '80vh',
    width: '95vw',
    padding: '24px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none'
    }
});

const StyledBalanceBox = styled(Box)({
    gap: '10px',
    backgroundColor: theme.palette.minetGray[50],
    height: '60px',
    marginTop: '16px',
    paddingLeft: '24px',
    paddingRight: '24px',
    justifyContent: 'space-between'
});

const CryptoCardBox = styled(Box)({
    width: '77px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    backgroundColor:theme.palette.background.default
});

const StyledTransactionsCard = styled(Box)({
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    paddingLeft: '30px',
    paddingTop:"24px",
    marginTop: '12px'
});

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    padding: '24px',
    backgroundColor:theme.palette.background.default
});

const WalletPage = () => {
    
    const [transactionData, setTransactionData] = useState<
        TransactionDetailProps[]
    >([]);
    const [balance, setBalance] = useState<number>(0);
    const {userId} = useAppContext()

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await getWalletData(userId);
            setBalance(userResponse.data.balance);
            const transactionsResponse = await getTransactions(userId);
            setTransactionData(transactionsResponse.data);
        };

        fetchData();
    }, []);

    const renderBody = () => (
        <StyledBody>
            <Header>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing(2.5)
                    }}
                >
                    <MuiIcon
                        src={Usd}
                        alt={'bitcoin'}
                        style={{ width: '42px', height: '42px' }}
                    />
                    <Box>
                        <Typography
                            variant="body1"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {USD_COINS}
                        </Typography>
                        <Typography
                            variant="caption1"
                            color={theme.palette.minetText.mediumEmphasis}
                        >
                            {CASH}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        disableRipple
                        sx={{
                            width: '150px',
                            height: '42px',
                            marginRight: '12px'
                        }}
                    >
                        {CASH_DEPOSIT}
                    </Button>
                    <Button
                        variant="outlined"
                        disableRipple
                        sx={{ width: '135px', height: '42px' }}
                    >
                        {WITHDRAWAL}
                    </Button>
                </Box>
            </Header>
            <Typography
                variant={'subtitle2'}
                color={theme.palette.grey[500]}
                sx={{ paddingTop: '18px', paddingLeft: '10px' }}
            >
                {WALLET}
            </Typography>
            <StyledBalanceBox display={'flex'}>
                <Typography
                    variant={'subtitle1'}
                    color={theme.palette.minetText.highEmphasis}
                    sx={{ paddingTop: '18px', paddingLeft: '10px' }}
                >
                    {TOTAL_BALANCE}
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    color={theme.palette.minetText.highEmphasis}
                    sx={{ paddingTop: '18px' }}
                >
                    $ {replaceNumberWithCommas(balance)}
                </Typography>
            </StyledBalanceBox>
            <Box
                display={'flex'}
                justifyContent={'flex-end'}
                paddingTop={'12px'}
                gap={'10px'}
            >
                <SearchField value={''} onChange={()=>{} } />
                <CryptoCardBox paddingX="10px" >
                    <Typography variant="body1" color={theme.palette.minetGray[500]}>1M</Typography>
                    <MuiIcon
                        src={Dropdown}
                        alt="Drop down Image"
                        style={{
                            width: theme.spacing(3),
                            height: theme.spacing(1.9),
                        }}
                    />
                </CryptoCardBox>
            </Box>
            <StyledTransactionsCard>
                {transactionData.map((item,index) => (
                    <TransactionCard
                        key={item.currencyName}
                        transactionDate={item.transactionDate.toString().substring(0,10)}
                        currencyName={item.currencyName}
                        currenySymbol={item.currencySymbol}
                        transactionType={
                            item.transactionType === 'buy'
                                ? 'Purchased'
                                : 'Sold'
                        }
                        amount={item.currencyQuantity}
                        balance={item.amount}
                        cardSx={{
                            flexDirection: 'row',
                            maxWidth: '100%',
                            minHeight: theme.spacing(15),
                            alignItems: 'center',
                            borderBottom:
                            index === transactionData.length - 1
                                ? 'none'
                                : `1px solid ${theme.palette.minetBorder[100]}`,
                            paddingY: '10px',
                            paddingRight:"2%"
                        }}
                        transactionStatusIcon={Verified}
                        isCryptoWallet={true}
                        userName="Badgley"
                    />
                ))}
            </StyledTransactionsCard>
        </StyledBody>
    );

    return (
        <DashBoardTemplate
            headerContent={'Trade'}
            isPayment={true}
            bodyNode={renderBody()}
        />
    );
};

export default WalletPage;
