import React from 'react';
import Typography from '../../atoms/typography';
import Chart from '../../../../public/assets/icons/chart.svg';
import List from '../../../../public/assets/icons/list.svg';
import theme from '../../../theme';
import MuiIcon from '../../atoms/icon';
import CryptoCard from '../../molecules/cryptoCard';
import {
    MY_PORTFOLIO,
    TOTAL_BALANCE,
    replaceNumberWithCommas
} from '../../../utils/constants';
import { Box, Divider, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface Currency {
    id: number;
    change: number;
    circulatingSupply: number;
    name: string;
    cryptoIconSrc: string;
    isWatchListed: boolean;
    marketCap: number;
    abbreviation: string;
    price: number;
    volume: number;
}

interface CryptoPortfolioProps {
    totalBalance: number;
    cryptoCurrenciesList: Currency[];
}

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '398px',
    paddingLeft: '24px',
    paddingTop: '24px'
});

const Heading = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const CryptoList = styled(Box)({
    height: '198px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'auto',
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

const BalanceBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    paddingBottom: '20px'
});

const CryptoPortfolio = (props: CryptoPortfolioProps) => {
    const navigate = useNavigate();
    const handleClick = (id?: number) => {
        navigate(`/detailPage/${id}`);
    };
    return (
        <Container>
            <Heading>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {MY_PORTFOLIO}
                </Typography>
                <Box>
                    <MuiIcon src={Chart} alt="chart" />
                    <MuiIcon src={List} alt="currency-list" />
                </Box>
            </Heading>
            <CryptoList>
                {props.cryptoCurrenciesList.map((coin) => (
                    <Box
                        key={coin.id}
                        data-testid="crypto-card"
                        sx={{
                            boxShadow:
                                coin.id === 2
                                    ? `0px 1px 6px 0px ${theme.palette.grey[200]}`
                                    : null,
                            paddingRight: '4%',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            handleClick(coin.id);
                        }}
                    >
                        <CryptoCard
                            cryptoIcon={coin.cryptoIconSrc}
                            amount={`$${replaceNumberWithCommas(coin.price)}`}
                            currencyType={coin.name}
                            currencyCode={coin.abbreviation}
                            growthRate={
                                coin.change < 0
                                    ? `${coin.change}%`
                                    : `+${coin.change}%`
                            }
                            growthStatus={
                                coin.change < 0 ? 'decreased' : 'increased'
                            }
                        />
                    </Box>
                ))}
            </CryptoList>
            <Divider
                sx={{ borderBottom: `3px solid ${theme.palette.grey[100]}` }}
            />
            <BalanceBox>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    {TOTAL_BALANCE}
                </Typography>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >
                    $ {replaceNumberWithCommas(props.totalBalance)}
                </Typography>
            </BalanceBox>
            <Divider
                sx={{ borderBottom: `3px solid ${theme.palette.grey[100]}` }}
            />
        </Container>
    );
};

export default CryptoPortfolio;
