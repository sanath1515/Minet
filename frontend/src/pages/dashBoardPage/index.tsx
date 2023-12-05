import CryptoTabs from '../../components/molecules/cryptoTabs';
import info from '../../../public/assets/icons/info.svg';
import DashBoardTemplate from '../../components/templates/dashBoardTemplate';
import WatchListCard from '../../components/molecules/watchListCard';
import Typography from '../../components/atoms/typography';
import theme from '../../theme';
import arrow from '../../../public/assets/icons/Arrow.svg';
import edit from '../../../public/assets/icons/edit.svg';
import MuiIcon from '../../components/atoms/icon';
import grid from '../../../public/assets/icons/grid.svg';
import growthGraph from '../../../public/assets/icons/growthGraph.svg';
import dashBoardList from '../../../public/assets/icons/dashboardList.svg';
import chart from '../../../public/assets/icons/chart.svg';
import graph from '../../../public/assets/icons/graph.svg';
import React, { useEffect, useState } from 'react';
import RecentTransactions, {
    Transaction
} from '../../components/organisms/recentTransactions';
import { Box, Divider, Grid, Stack, styled } from '@mui/material';
import { Card } from '../../components/molecules/card';
import CryptoPortfolio, {
    Currency
} from '../../components/organisms/cryptoPortfolio';
import { OverViewGraph } from '../../components/organisms/overViewGraph';
import { getTableData, getTransactions, getWalletData, getWatchListedData } from '../../services';
import {
    BITCOIN_PERCENTAGE,
    BITCOIN_VALUE,
    DISCOVERY_ASSETS_CONTENT,
    DISCOVER_ASSETS_ICON_ALT_TEXT,
    INFO_FOOTER_CONTENT,
    INFO_HEADER_CONTENT,
    INFO_MIDDLE_CONTENT,
    INVESTMENT_PERCENTAGE,
    INVESTMENT_VALUE,
    WATCHLIST_CONTENT,
    WATCHLIST_ICON_ALT_TEXT
} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context';
import { UserProps } from '../purchasePage';

const StyledContainer = styled(Box)({
    display: 'flex',
    height: '80vh',
    width: '94vw'
});

const StyledLeftContainer = styled(Box)({
    width: '100%',
    height: '100%',
    overflow: 'auto',
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'thin',
    '&::-webkit-scrollbar': {
        width: '0'
    },
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    borderBottom: 0,
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6)
});

const StyledStack = styled(Stack)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
});

const StyledDivider = styled(Divider)({
    width: '1px',
    height: theme.spacing(5.5),
    borderRight: `1px solid ${theme.palette.minetBorder[100]}`
});

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    cursor: 'pointer'
});

const StyledInfoBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
});

const TransactionContainer = styled(Box)({
    width: '100%',
    padding: theme.spacing(6),
    paddingRight: 0
});

const DashBoardPage = () => {
    const [cryptoCoins, setCryptoCoins] = useState<Currency[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [watchListedCryptoCoins, setWatchListedCryptoCoins] = useState<
        Currency[]
    >([]);
    const [userData, setUserData] = useState<UserProps>({
        id: 0,
        balance: 0,
        userId:0
    });
    const [cryptoChip, setCryptoChip] = useState('Bitcoin');
    const navigate = useNavigate();
    const { userId } = useAppContext();

    useEffect(() => {
        const getCurrencies = async() => {
            const currencyList = await getTableData(userId);
            const watchListedCurrencies = await getWatchListedData(userId);
            setCryptoCoins(currencyList);
            setWatchListedCryptoCoins(watchListedCurrencies);
        };
        getCurrencies();

        getWalletData(userId).then(async (res) => {
            setUserData(res.data)
         });

        getTransactions(userId).then((res) => {
            const filterTransactions = res.data.filter(
                (transaction: Transaction) => transaction.userId === userId
            );
            setTransactions(filterTransactions);
        });
    }, []);

    const handleCryptoClick = (cryptoName: string) => {
        setCryptoChip(cryptoName);
    };

    const leftNodeHeader = () => {
        return (
            <StyledStack>
                <StyledBox>
                    <Typography
                        variant="subtitle1"
                        color={theme.palette.minetText.highEmphasis}
                    >
                        Watchlist
                    </Typography>
                    <StyledDivider />
                    <Card
                        layout={'reverse'}
                        mainText={DISCOVERY_ASSETS_CONTENT}
                        mainVariant={'body1'}
                        src={arrow}
                        alt={DISCOVER_ASSETS_ICON_ALT_TEXT}
                        sx={{
                            mainText: theme.palette.primary.main
                        }}
                        onClick={() => {
                            navigate('/allAssetsTradePage');
                        }}
                    />
                </StyledBox>
                <StyledBox sx={{ gap: theme.spacing(5) }}>
                    <Card
                        layout={'reverse'}
                        mainText={WATCHLIST_CONTENT}
                        mainVariant={'body1'}
                        src={edit}
                        alt={WATCHLIST_ICON_ALT_TEXT}
                        sx={{
                            mainText: theme.palette.primary.main,
                            height: theme.spacing(5.5),
                            width: '10.5px'
                        }}
                        onClick={() => {
                            navigate('/WatchListTradePage');
                        }}
                    />
                    <StyledDivider />
                    <MuiIcon src={grid} alt="grid icon" />
                    <MuiIcon src={dashBoardList} alt="list icon" />
                </StyledBox>
            </StyledStack>
        );
    };

    const getWatchListedCryptoCoins = () => {
        return (
            <Grid container spacing={theme.spacing(6)}>
                {watchListedCryptoCoins.map((coin: Currency, index) => {
                    return (
                        <Grid
                            key={coin.id}
                            lg={
                                index === watchListedCryptoCoins.length - 1 &&
                                watchListedCryptoCoins.length % 2 != 0
                                    ? 12
                                    : 6
                            }
                            item
                        >
                            <WatchListCard
                                cryptoIcon={coin.cryptoIconSrc}
                                currencyType={coin.name}
                                amount={coin.price.toString()}
                                growthGraph={growthGraph}
                                growthRate={coin.change.toString()}
                                growthStatus={'increased'}
                                coinId={coin.id}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    const leftNode = () => {
        return (
            <StyledLeftContainer>
                {leftNodeHeader()}
                {getWatchListedCryptoCoins()}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(3)
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {INFO_HEADER_CONTENT}
                        </Typography>
                        <Box>
                            <MuiIcon
                                src={chart}
                                alt="chart icon"
                                style={{
                                    width: theme.spacing(8),
                                    height: theme.spacing(8)
                                }}
                            />
                            <MuiIcon
                                src={graph}
                                alt="graph icon"
                                style={{
                                    width: theme.spacing(8),
                                    height: theme.spacing(8)
                                }}
                            />
                        </Box>
                    </Box>
                    <OverViewGraph
                        investmentValue={
                            transactions.length === 0
                                ? '$ 0.00'
                                : `$${(50000-userData.balance).toFixed(2)}`
                        }
                        investmentPercentage={INVESTMENT_PERCENTAGE}
                        bitcoinValue={BITCOIN_VALUE}
                        bitcoinPercentage={BITCOIN_PERCENTAGE}
                        isNewUser={transactions.length === 0}
                        crytpoCoin={cryptoChip}
                    />
                </Box>
                {transactions.length !== 0 && (
                <>
                    <StyledInfoBox>
                        <Typography
                            variant="body1"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {INFO_MIDDLE_CONTENT}
                        </Typography>
                        <StyledBox gap={theme.spacing(2)}>
                            <MuiIcon src={info} alt="info icon" />
                            <Typography
                                variant="caption2"
                                color={theme.palette.minetText.highEmphasis}
                            >
                                {INFO_FOOTER_CONTENT}
                            </Typography>
                        </StyledBox>
                    </StyledInfoBox>
                    <CryptoTabs
                        onClick={handleCryptoClick}
                        selectedChip={cryptoChip}
                    />
                </>
                )}
            </StyledLeftContainer>
        );
    };

    const rightNode = () => {
        return (
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default
                }}
            >
                <CryptoPortfolio
                    totalBalance={50000-userData.balance}
                    cryptoCurrenciesList={cryptoCoins}
                />
                <TransactionContainer>
                    <RecentTransactions
                        currentBalance={userData.balance}
                        transactions={transactions}
                        isNewUser={transactions.length === 0}
                    />
                </TransactionContainer>
            </Box>
        );
    };

    return (
        <DashBoardTemplate
            bodyNode={
                <StyledContainer data-testid="dashboard-body">
                    {leftNode()}
                    {rightNode()}
                </StyledContainer>
            }
            headerContent={'Dashboard'}
            isPayment
        />
    );
};

export default DashBoardPage;
