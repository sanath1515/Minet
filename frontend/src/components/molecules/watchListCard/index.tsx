import React from 'react';
import Typography from '../../atoms/typography';
import theme from '../../../theme';
import IncreasedGrowth from '../../../../public/assets/icons/increasedGrowth.svg';
import DecreasedGrowth from '../../../../public/assets/icons/decreasedGrowth.svg';
import Chip from '../../atoms/chip';
import MuiIcon from '../../atoms/icon';
import { Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface WatchListCardProps {
    cryptoIcon: string;
    currencyType: string;
    amount: string;
    growthGraph: string;
    growthRate: string;
    growthStatus: string;
    coinId?: number;
}

const Container = styled(Box)({
    display: 'flex',
    height: theme.spacing(33.75),
    padding: theme.spacing(6),
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `2px solid  ${theme.palette.grey[100]}`,
    background: theme.palette.minetText.contrastText,
    textTransform: 'none',
    cursor: 'pointer'
});

const IconBox = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2.5)
});

const TextInfoBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(4.5)
});

const ChipBox = styled(Box)({
    height: theme.spacing(4.5)
});

const GrowthInfoBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
});

const GrowthIconBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5)
});

const WatchListCard = (props: WatchListCardProps) => {
    const navigate = useNavigate();

    const handleClick = (id?: number) => {
        navigate(`/detailPage/${id}`);
    };

    return (
        <Container 
            data-testid="container"
            onClick={() => {
                handleClick(props.coinId);
            }}
        >
            <IconBox>
                <MuiIcon
                    src={props.cryptoIcon}
                    alt="crypto currency"
                    style={{
                        width: theme.spacing(10.5),
                        height: theme.spacing(10.5)
                    }}
                />
                <TextInfoBox>
                    <Box>
                        <Typography
                            variant="body1"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {props.currencyType}
                        </Typography>
                        <Typography
                            variant="body1"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {props.amount}
                        </Typography>
                    </Box>
                    <ChipBox>
                        <Chip
                            label={
                                <Typography
                                    variant="overline"
                                    color={
                                        theme.palette.minetText.mediumEmphasis
                                    }
                                    sx={{ textTransform: 'none' }}
                                >
                                    24 h
                                </Typography>
                            }
                            sx={{ height: theme.spacing(4.5) }}
                        />
                    </ChipBox>
                </TextInfoBox>
            </IconBox>
            <GrowthInfoBox>
                <GrowthIconBox>
                    <MuiIcon
                        src={
                            props.growthStatus === 'increased'
                                ? IncreasedGrowth
                                : DecreasedGrowth
                        }
                        alt="graph"
                    />
                    <Typography
                        variant="overline"
                        color={
                            props.growthStatus === 'increased'
                                ? theme.palette.minetSuccess[500]
                                : theme.palette.minetError[500]
                        }
                    >
                        {props.growthRate}
                    </Typography>
                </GrowthIconBox>
                <MuiIcon src={props.growthGraph} alt="graph" />
            </GrowthInfoBox>
        </Container>
    );
};

export default WatchListCard;
