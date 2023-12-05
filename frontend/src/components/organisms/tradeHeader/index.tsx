import styled from '@emotion/styled';
import theme from '../../../theme';
import MuiIcon from '../../atoms/icon';
import Typography from '../../atoms/typography';
import Arrow from '../../../../public/assets/icons/UpArrow.svg';
import Button from '../../atoms/button';
import WatchListIcon from '../../../../public/assets/icons/watchList.svg';
import NullWatchList from '../../../../public/assets/icons/nullWatchList.svg';
import { PortFolioValue } from '../../molecules/portfolioValue';
import {
    AddWatchList,
    portfolioNames,
    WatchList
} from '../../../utils/constants';
import { Box, Divider } from '@mui/material';
import React from 'react';

interface TradeHeaderProps {
    marketValue: string;
    volume: string;
    supplyValue: string;
    cryptoImage: string;
    cryptoText: string;
    shortName: string;
    cryptoValue: string;
    isWatchListed?: boolean;
    addCrypto:(id:number) => void
    cryptoId:number
}

const StyledBox = styled(Box)({
    width: '97.5%',
    height: '10vh',
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.minetError[100]}`,
    padding: theme.spacing(6),
    display: 'flex',
    gap: theme.spacing(10),
    alignItems: 'center'
});

const StyledCrypto = styled(Box)({
    width: theme.spacing(52),
    height: theme.spacing(14.5),
    display: 'flex',
    gap: theme.spacing(3)
});

const StyledContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(6),
    alignItems: 'center'
});

const StyledWatchList = styled(Box)({
    paddingLeft: '39vw',
    alignSelf: 'center'
});
const StyledInnerBox = styled(Box)({
    width: '5.4vw'
});
const bodyVariant = 'body1';

const TradeHeader = (props: TradeHeaderProps) => {
    return (
        <StyledBox>
            <StyledCrypto>
                <MuiIcon
                    src={props.cryptoImage}
                    alt="Bitcoin Image"
                    style={{ height: '56px', width: '56px' }}
                />
                <Box display="flex" flexDirection="column">
                    <Typography
                        variant="h6"
                        color={theme.palette.minetGray[500]}
                    >
                        {props.cryptoText}
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={1.5}
                        width={theme.spacing(22)}
                        height={theme.spacing(6)}
                        paddingTop={theme.spacing(1)}
                    >
                        <Typography
                            variant="body1"
                            color={theme.palette.minetText.main}
                        >
                            {props.shortName}
                        </Typography>
                        <MuiIcon src={Arrow} alt="UpArrow Image" />
                        <Typography
                            variant="overline"
                            color={theme.palette.minetSuccess[700]}
                            paddingTop={1}
                        >
                            {props.cryptoValue + '%'}
                        </Typography>
                    </Box>
                </Box>
            </StyledCrypto>

            <Divider orientation="vertical" />

            <StyledContainer>
                <StyledInnerBox>
                    <PortFolioValue
                        text={portfolioNames[0]}
                        value={'$' + props.marketValue + 'T'}
                        variant={bodyVariant}
                        bool={false}
                    />
                </StyledInnerBox>
                <StyledInnerBox>
                    <PortFolioValue
                        text={portfolioNames[1]}
                        value={'$' + props.volume + 'T'}
                        variant={bodyVariant}
                        bool={false}
                    />
                </StyledInnerBox>
                <Box width={'170px'}>
                    <PortFolioValue
                        text={portfolioNames[2]}
                        value={props.supplyValue + 'M' + ' BTC'}
                        variant={bodyVariant}
                        bool={false}
                    />
                </Box>
            </StyledContainer>

            <StyledWatchList>
                <Button
                    variant="outlined"
                    disableRipple
                    handleClick={()=>props.addCrypto(props.cryptoId)}
                    sx={{
                        width: theme.spacing(60),
                        height: theme.spacing(10)
                    }}
                    startIcon={
                        <MuiIcon
                            src={props.isWatchListed ? WatchListIcon : NullWatchList}
                            alt={
                                props.isWatchListed
                                    ? 'WatchList Icon'
                                    : 'Empty Watchlist Icon'
                            }
                        />
                    }
                >
                    {props.isWatchListed ? WatchList : AddWatchList}
                </Button>
            </StyledWatchList>
        </StyledBox>
    );
};

export default TradeHeader;
