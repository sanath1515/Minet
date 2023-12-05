import styled from '@emotion/styled';
import Typography from '../../atoms/typography';
import theme from '../../../theme';
import MuiIcon from '../../atoms/icon';
import MarketCapIcon from '../../../../public/assets/icons/MarketCap.svg';
import CryptoTradeRow from '../../molecules/cryptoTradeRow';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { TABLE_HEADERS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

export interface Table {
    id: number;
    change: number;
    circulatingSupply: number;
    name: string;
    cryptoIconSrc: string;
    marketCap: number;
    abbreviation: string;
    isWatchListed: boolean;
    price: number;
    volume: number;
}

export interface CryptoTableProps {
    table: Table[];
    handleWatchList?: (cryptoId: number) => void;
}

const StyledContainer = styled(Box)({
    width: '100%',
    height: '75vh'
});

const StyledHeader = styled(Stack)({
    width: '100%',
    padding: theme.spacing(6),
    paddingBottom:"13px",
    display: 'flex',
    flexDirection: 'row'
});

const StyledTypography = styled(Typography)({
    color: theme.palette.minetGray[500]
});

const StyledMuiIcon = styled(MuiIcon)({
    height: theme.spacing(3.8),
    width: theme.spacing(3.8),
    paddingTop: theme.spacing(0.5)
});

const StyledStack = styled(Stack)({
    height: '62.5vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'thin',
    '&::-webkit-scrollbar': {
        width: '0'
    }
});

const TEXT_VARIANT = 'caption1';

const CryptoTable = ({ ...props }: CryptoTableProps) => {
    const navigate = useNavigate();

    const handleRowClick = (id: number) => {
        navigate(`/detailPage/${id}`);
    };

    return (
        <StyledContainer>
            <StyledHeader>
                {TABLE_HEADERS.map((header, index) => {
                    return (
                        <Box
                            key={header.id}
                            sx={{
                                width: `${header.width}vw`,
                                display: 'flex',
                                alignSelf: 'flex-start'
                            }}
                        >
                            {index === 3 ? (
                                <Box
                                    display="flex"
                                    gap={2}
                                    sx={{ width: '7.5vw' }}
                                >
                                    <StyledTypography variant={TEXT_VARIANT}>
                                        {header.name}
                                    </StyledTypography>
                                    <StyledMuiIcon
                                        src={MarketCapIcon}
                                        alt="Market Cap Icon"
                                    />
                                </Box>
                            ) : (
                                <StyledTypography variant={TEXT_VARIANT}>
                                    {header.name}
                                </StyledTypography>
                            )}
                        </Box>
                    );
                })}
            </StyledHeader>

            <StyledStack spacing={3}>
                {props.table.map((data) => (
                    <CryptoTradeRow
                        key={data.id}
                        price={data.price}
                        changeValue={data.change}
                        marketCap={data.marketCap}
                        cryptoWatchlist={data.isWatchListed}
                        src={data.cryptoIconSrc}
                        mainText={data.name}
                        subText={data.abbreviation}
                        iconClick={() => props.handleWatchList?.(data.id)}
                        rowClick={() => handleRowClick(data.id)}
                    />
                ))}
            </StyledStack>
        </StyledContainer>
    );
};

export default CryptoTable;
