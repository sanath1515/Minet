import DashBoardTemplate from '../../components/templates/dashBoardTemplate';
import styled from '@emotion/styled';
import theme from '../../theme';
import Typography from '../../components/atoms/typography';
import Graph from '../../components/molecules/graph';
import MuiIcon from '../../components/atoms/icon';
import CryptoCard from '../../components/molecules/cryptoCard';
import SearchField from '../../components/molecules/searchField';
import Dropdown from '../../../public/assets/icons/dropdown.svg';
import SuccessIcon from '../../../public/assets/icons/verified.svg';
import TransactionCard from '../../components/molecules/transactionCard';
import Arrow from '../../../public/assets/icons/UpArrow.svg';
import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import TradeHeader from '../../components/organisms/tradeHeader';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getPurchasedTradeData,
    getSoldTradeData,
    getTableDataById,
    getransactionDataByCryptoName,
    updateWatchList
} from '../../services';
import { Table } from '../../components/organisms/cryptoTable';
import {
    BALANCE,
    BitcoinText,
    CONVERT_CRYPTO_TO_CASH,
    CURRENT_VALUE,
    INDIVIDUAL_GRAPH_DATA,
    MockTradeData,
    PRICE,
    RESOURCES,
    SINGLE_GRAPH_MOCK_POINTS_DATA,
    TIME_LINE_LIST,
    TradeCoinItems,
    cryptoDetailItems,
    replaceNumberWithCommas,
    trade
} from '../../utils/constants';
import { useAppContext } from '../../context';
import Tabs from '../../components/molecules/tabs';

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

const BORDER_COLOR = theme.palette.minetBorder[100];
const PRIMARY_COLOR = theme.palette.primary[500];

const StyledBody = styled(Box)({
    height: '80vh',
    width: '95vw',
    padding: '24px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
});

const StyledBox = styled(Box)({
    display: 'flex',
    width: '95vw',
    backgroundColor: theme.palette.background.default
});

const StyledBalanceBox = styled(Box)({
    gap: '10px',
    backgroundColor: theme.palette.minetGray[50],
    height: '60px'
});

const StyledResourceBox = styled(Box)({
    gap: '10px',
    paddingTop: '10px'
});

const TimeData = styled(Box)({
    display: 'flex',
    gap: theme.spacing(4),
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: theme.spacing(1),
    padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    width: theme.spacing(79),
    height: theme.spacing(13)
});

const TimeDataList = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    padding: theme.spacing(2),
    textAlign: 'center'
});

const CryptoCardBox = styled(Box)({
    width: '77px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.minetBorder.main}`
});

const StyledTransactionCard = styled(Box)({
    height: '100%',
    border: `1px solid ${BORDER_COLOR}`,
    padding: '24px',
    paddingTop: 0,
    marginTop: '12px',
    backgroundColor: theme.palette.background.default
});

const CurrencyDetailPage = () => {
    const [coinData, setCoinData] = useState<Table>({
        id: 0,
        name: '',
        abbreviation: '',
        price: 0,
        change: 0,
        marketCap: 0,
        cryptoIconSrc: '',
        isWatchListed: false,
        volume: 0,
        circulatingSupply: 0
    });
    const [changeTab, setChangeTab] = useState<number>(0);
    const [transactionData, setTransactionData] = useState<
        TransactionDetailProps[]
    >([]);
    const [buyQuantity, setBuyQuantity] = useState(0);
    const [sellQuantity, setSellQuantity] = useState(0);

    const {userId} = useAppContext()
    const { id } = useParams();
    const navigate = useNavigate();

    const handleValueChange = (e: React.SyntheticEvent, newValue: number) => {
        setChangeTab(newValue);
    };

    const handleWatchList = async (coinId: number) => {
        const updatedCrypto = await updateWatchList(
            userId,coinId
            );
        setCoinData((prevCoinData: Table) => {
            return {
                ...prevCoinData,
                isWatchListed: updatedCrypto.data.isWatchListed
            };
        });
    };

    useEffect(() => {
        const getCryptoCurrency = async () => {
            const cryptoCurrency = await getTableDataById(Number(id),userId)
            setCoinData(cryptoCurrency);
        }
        getCryptoCurrency();
    }, [id]);

    useEffect(() => {
        getransactionDataByCryptoName(coinData.name,userId).then((response) => {
            setTransactionData(response);
        });
    }, [coinData]);

    const calculateTotalQuantity = (data: TransactionDetailProps[]): number => {
        return data.reduce(
            (accumulator: number, currentValue: TransactionDetailProps) => {
                const { currencyQuantity } = currentValue;
                console.log(currencyQuantity)
                return accumulator + currencyQuantity;
            },
            0
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPurchasedTradeData(userId);
            const totalBuyQuantity = calculateTotalQuantity(data);
            setBuyQuantity(totalBuyQuantity);

            const soldData = await getSoldTradeData(userId);
            const totalSellQuantity = calculateTotalQuantity(soldData);
            setSellQuantity(totalSellQuantity);

            console.log(totalBuyQuantity, totalSellQuantity)
        };
        fetchData();
    }, []);

    const balance = parseFloat((buyQuantity - sellQuantity).toFixed(6));
    const amount = CONVERT_CRYPTO_TO_CASH(balance, coinData.price);
    const cash = replaceNumberWithCommas(amount);

    const renderBody = () => {
        return (
            <StyledBody data-testid="dashboard-body">
                <StyledBox>
                    {coinData && (
                        <TradeHeader
                            marketValue={coinData.marketCap.toString()}
                            volume={coinData.volume.toString()}
                            supplyValue={coinData.circulatingSupply.toString()}
                            cryptoImage={coinData.cryptoIconSrc}
                            cryptoText={coinData.name}
                            shortName={coinData.abbreviation}
                            cryptoValue={coinData.change.toString()}
                            isWatchListed={coinData.isWatchListed}
                            addCrypto={handleWatchList}
                            cryptoId={coinData.id}
                        />
                    )}
                </StyledBox>
                <Box
                    sx={{
                        borderBottom: `1px solid ${theme.palette.minetBorder[100]}`,
                        marginRight: theme.spacing(1)
                    }}
                >
                    <Tabs
                        tabItems={cryptoDetailItems}
                        sx={{
                            textTransform: 'none',
                            color: theme.palette.minetText.mediumEmphasis,
                            width: '7vw',
                            borderBottom: `1px solid ${theme.palette.minetGray[50]}`
                        }}
                        value={changeTab}
                        typographyVariant={'subtitle2'}
                        handleChange={handleValueChange}
                    />
                </Box>
                {changeTab === 0 ? (
                    <Stack
                        gap={theme.spacing(6)}
                        sx={{
                            backgroundColor: theme.palette.primary[100]
                        }}
                    >
                        <Box
                            width={'100%'}
                            padding="20px"
                            border={`1px solid ${BORDER_COLOR}`}
                            sx={{
                                backgroundColor:
                                    theme.palette.background.default
                            }}
                        >
                            <Stack
                                direction={'row'}
                                justifyContent="space-between"
                            >
                                <Stack spacing={1.5}>
                                    <Typography
                                        variant="caption1"
                                        color={
                                            theme.palette.minetText
                                                .mediumEmphasis
                                        }
                                    >
                                        {CURRENT_VALUE}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color={
                                            theme.palette.minetText.highEmphasis
                                        }
                                    >
                                        {`$${replaceNumberWithCommas(
                                            coinData.price
                                        )}`}
                                    </Typography>
                                    <Box gap={'5px'} display={'flex'}>
                                        <MuiIcon
                                            src={Arrow}
                                            alt="UpArrow Image"
                                            style={{ padding: 'px' }}
                                        />
                                        <Typography
                                            variant="overline"
                                            color={
                                                theme.palette.minetSuccess[700]
                                            }
                                            paddingTop={1}
                                        >
                                            {coinData.change + '%'}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack>
                                    <TimeData>
                                        {TIME_LINE_LIST.map((item) => (
                                            <TimeDataList
                                                key={item.id}
                                                sx={{
                                                    backgroundColor:
                                                        item.id === 4
                                                            ? theme.palette
                                                                  .primary[700]
                                                            : 'none',
                                                    borderRadius:
                                                        item.id === 4
                                                            ? '50%'
                                                            : 'none'
                                                }}
                                            >
                                                <Typography
                                                    variant={
                                                        item.id === 4
                                                            ? 'caption1'
                                                            : 'caption2'
                                                    }
                                                    color={
                                                        item.id === 4
                                                            ? PRIMARY_COLOR
                                                            : theme.palette
                                                                  .minetText
                                                                  .mediumEmphasis
                                                    }
                                                >
                                                    {item.name}
                                                </Typography>
                                            </TimeDataList>
                                        ))}
                                    </TimeData>
                                </Stack>
                            </Stack>

                            <Stack paddingTop="100px">
                                <Graph
                                    GraphPointsData={SINGLE_GRAPH_MOCK_POINTS_DATA}
                                    GraphsIndividualData={INDIVIDUAL_GRAPH_DATA}
                                    width="100%"
                                    height="40vh"
                                />
                            </Stack>
                        </Box>

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                {BitcoinText.map((item) => (
                                    <Typography
                                        variant={
                                            item.id === 0 ? 'body1' : 'body2'
                                        }
                                        key={item.id}
                                        sx={{
                                            paddingBottom:
                                                item.id === 0 ? '10px' : ''
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                ))}
                                <Typography
                                    variant={'body1'}
                                    paddingTop={'20px'}
                                >
                                    {RESOURCES}
                                </Typography>

                                {MockTradeData.map((item) => (
                                    <StyledResourceBox
                                        display={'flex'}
                                        key={item.id}
                                    >
                                        <MuiIcon
                                            src={item.icon}
                                            alt={item.alt}
                                        />
                                        <Typography
                                            variant={'body2'}
                                            color={theme.palette.primary.main}
                                        >
                                            {item.name}
                                        </Typography>
                                    </StyledResourceBox>
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.minetGray[100]}`,
                                    padding: '16px 24px 24px 28.5px',
                                    backgroundColor:
                                        theme.palette.background.default,
                                    gap: '16px'
                                }}
                            >
                                <Typography variant={'subtitle1'}>
                                    {PRICE}
                                </Typography>
                                {TradeCoinItems.map((item) => (
                                    <CryptoCard
                                        key={item.id}
                                        cryptoIcon={item.src}
                                        amount={'$' + item.price}
                                        currencyType={item.coinName}
                                        currencyCode={item.coinContent}
                                        growthRate={item.percentage + '%'}
                                        sx={{
                                            color: theme.palette.minetText
                                                .mediumEmphasis
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                ) : (
                    <Box>
                        <StyledBalanceBox display={'flex'}>
                            <Typography
                                variant={'subtitle1'}
                                color={theme.palette.minetText.highEmphasis}
                                sx={{ paddingTop: '18px', paddingLeft: '10px' }}
                            >
                                {BALANCE}
                            </Typography>
                            <Typography
                                variant={'subtitle1'}
                                color={theme.palette.minetText.highEmphasis}
                                sx={{ paddingTop: '18px' }}
                            >
                                {balance +
                                    ' ' +
                                    coinData.abbreviation +
                                    ' ' +
                                    '($' +
                                    cash +
                                    ')'}
                            </Typography>
                        </StyledBalanceBox>

                        <Box
                            display={'flex'}
                            justifyContent={'flex-end'}
                            paddingTop={'12px'}
                            gap={'10px'}
                        >
                            <SearchField
                                value={''}
                                onChange={() => {}}
                            />
                            <CryptoCardBox
                                paddingX="10px"
                                sx={{
                                    backgroundColor:
                                        theme.palette.background.default
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color={theme.palette.minetGray[500]}
                                >
                                    1M
                                </Typography>
                                <MuiIcon
                                    src={Dropdown}
                                    alt="Drop down Image"
                                    style={{
                                        height: theme.spacing(1.9),
                                        width: theme.spacing(3)
                                    }}
                                />
                            </CryptoCardBox>
                        </Box>
                        <StyledTransactionCard data-testid="transactions">
                            {transactionData.map((item, index) => (
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
                                        minHeight: theme.spacing(15.5),
                                        alignItems: 'center',
                                        borderBottom:
                                            index === transactionData.length - 1
                                                ? 'none'
                                                : `1px solid ${BORDER_COLOR}`,
                                        paddingY: '10px'
                                    }}
                                    transactionStatusIcon={SuccessIcon}
                                    isCryptoWallet={true}
                                    userName="Badgley"
                                />
                            ))}
                        </StyledTransactionCard>
                    </Box>
                )}
            </StyledBody>
        );
    };

    return (
        <DashBoardTemplate
            headerContent={trade}
            isPayment={true}
            bodyNode={renderBody()}
            onBuy={() => {
                navigate(`/purchasePage/${coinData.id}`);
            }}
            onSell={() => {
                navigate(`/sellPage/${coinData.id}`);
            }}
        />
    );
};

export default CurrencyDetailPage;
