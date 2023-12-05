import React from 'react';
import theme from '../../../theme';
import Typography from '../../atoms/typography';
import WatchListIcon from '../../../../public/assets/icons/starclicked.svg';
import MuiIcon from '../../atoms/icon';
import NullWatchList from '../../../../public/assets/icons/nullWatchList.svg';
import { Box, styled } from '@mui/material';
import { Card } from '../card';
import { replaceNumberWithCommas } from '../../../utils/constants';

interface CryptoTradeRowProps {
    price: number;
    changeValue: number;
    marketCap: number;
    rowClick?: () => void;
    iconClick?: () => void;
    cryptoWatchlist: boolean;
    mainText: string;
    subText: string;
    src: string;
    alt?: string;
}

const StyledBox = styled(Box)({
    width: '100%',
    height: '8vh',
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    padding: '16px 24px 16px 24px',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-between'
});

const StyledTypography = styled(Typography)({
    alignSelf: 'center',
    width: '10.8vw'
});

const StyledIcon = styled('div')({
    alignSelf: 'center'
});

const Textvariant = 'body2';
const CryptoTradeRow = (props: CryptoTradeRowProps) => {
    return (
        <StyledBox data-testid="cryptoTradeRow">
            <Box width={'10.8vw'}>
                <Card
                    layout="iconDualText"
                    sx={{
                        mainText: theme.palette.minetText.highEmphasis,
                        subText: theme.palette.minetText.mediumEmphasis,
                        height: theme.spacing(10.5),
                        width: theme.spacing(10.5)
                    }}
                    mainText={props.mainText}
                    subText={props.subText}
                    mainVariant="body1"
                    subVariant="overline"
                    src={props.src}
                    alt={props.alt}
                    onClick={props.rowClick}
                />
            </Box>
            <StyledTypography variant={Textvariant}>
                {`$${replaceNumberWithCommas(props.price)}`}
            </StyledTypography>

            <StyledTypography
                variant={Textvariant}
                color={
                    props.changeValue > 0
                        ? theme.palette.minetSuccess[700]
                        : theme.palette.minetError[500]
                }
            >
                {props.changeValue > 0
                    ? `+${props.changeValue}%`
                    : `${props.changeValue}%`}
            </StyledTypography>

            <StyledTypography variant={Textvariant}>
                {'$' + props.marketCap + 'T'}
            </StyledTypography>

            <StyledIcon sx={{ paddingRight: '4vw' }}>
                <MuiIcon
                    src={props.cryptoWatchlist ? WatchListIcon : NullWatchList}
                    alt={
                        props.cryptoWatchlist
                            ? 'Watchlist Icon'
                            : 'Null Watchlist Icon'
                    }
                    onClick={props.iconClick}
                />
            </StyledIcon>
        </StyledBox>
    );
};

export default CryptoTradeRow;
