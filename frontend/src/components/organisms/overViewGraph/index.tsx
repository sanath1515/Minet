import React from 'react';
import UpArrow from '../../../../public/assets/icons/UpArrow.svg';
import DownArrow from '../../../../public/assets/icons/downArrow.svg';
import emptyPortfolio from '../../../../public/assets/icons/emptyPortfolio.svg';
import theme from '../../../theme';
import styled from '@emotion/styled';
import Graph from '../../molecules/graph';
import Typography from '../../atoms/typography';
import {
    ETHEREUM_GRAPH_MOCK_POINTS_DATA,
    GRAPH_MOCK_POINTS_DATA,
    INDIVIDUAL_GRAPH_DATA,
    TIME_LINE_LIST
} from '../../../utils/constants';
import { PortFolioValue } from '../../molecules/portfolioValue';
import { Box } from '@mui/material';
import MuiIcon from '../../atoms/icon';

export interface OverViewGraphProps {
    investmentValue: string;
    investmentPercentage: string;
    bitcoinValue: string;
    bitcoinPercentage: string;
    isNewUser: boolean;
    crytpoCoin?: string;
}

const BORDER_COLOR = theme.palette.minetBorder[100];
const PRIMARY_COLOR = theme.palette.primary[500];

const Wrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.default
});

const PortFolioValueDiv = styled(Box)({
    display: 'flex',
    gap: theme.spacing(6)
});

const Line = styled(Box)({
    borderLeft: `1px solid ${BORDER_COLOR}`,
    height: theme.spacing(13)
});

const Dot = styled(Box)({
    height: theme.spacing(2),
    width: theme.spacing(2),
    borderRadius: '50%',
    marginTop: theme.spacing(0.5)
});

const GraphPoints = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1)
});

const GraphPointsDiv = styled(Box)({
    display: 'flex',
    gap: theme.spacing(6),
    justifyContent: 'flex-end'
});

const TimeLine = styled(Box)({
    display: 'flex',
    gap: '3%',
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: theme.spacing(1),
    padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    width: '18vw',
    height: '5vh'
});

const TimeLineList = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '2.5vw',
    height: '2.5vh',
    padding: '3%'
});

const RightHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    gap: theme.spacing(6)
});

const Header = styled(Box)({
    display: 'flex',
    gap: theme.spacing(27),
    justifyContent: 'space-between'
});

export const OverViewGraph = ({
    investmentValue,
    investmentPercentage,
    bitcoinValue,
    bitcoinPercentage,
    isNewUser,
    crytpoCoin
}: OverViewGraphProps) => {
    const renderPortfolioValue = (
        text: string,
        src: string,
        alt: string,
        value: string,
        percentValue: string,
        textColor?: string
    ) => {
        return (
            <PortFolioValue
                text={text}
                value={value}
                variant={'h6'}
                bool={true}
                textColor={textColor}
                src={src}
                alt={alt}
                percentValue={percentValue}
            />
        );
    };

    const renderGraphPoints = (color: string, text?: string) => {
        return (
            <GraphPoints>
                <Dot sx={{ backgroundColor: color }} />
                <Typography variant={'overline'}>{text}</Typography>
            </GraphPoints>
        );
    };

    return (
        <Wrapper>
            <Header>
                <PortFolioValueDiv>
                    {renderPortfolioValue(
                        'Total Investment',
                        DownArrow,
                        'downArrow',
                        investmentValue,
                        investmentPercentage,
                        theme.palette.minetError[500]
                    )}
                    {!isNewUser && (
                        <>
                            <Line />
                            {renderPortfolioValue(
                                crytpoCoin ?? '',
                                UpArrow,
                                'upArrow',
                                bitcoinValue,
                                bitcoinPercentage,
                                theme.palette.minetSuccess[700]
                            )}
                        </>
                    )}
                </PortFolioValueDiv>
                <RightHeader>
                    <TimeLine>
                        {TIME_LINE_LIST.map((item) => (
                            <TimeLineList key={item.id}>
                                <Typography
                                    variant={
                                        item.id === 4 ? 'caption1' : 'caption2'
                                    }
                                    color={
                                        item.id === 4
                                            ? PRIMARY_COLOR
                                            : theme.palette.minetText
                                                  .mediumEmphasis
                                    }
                                    borderBottom={
                                        item.id === 4
                                            ? `1px solid ${PRIMARY_COLOR}`
                                            : 'none'
                                    }
                                >
                                    {item.name}
                                </Typography>
                            </TimeLineList>
                        ))}
                    </TimeLine>
                    {!isNewUser && (
                        <GraphPointsDiv>
                            {renderGraphPoints(
                                theme.palette.minetWarning.main,
                                crytpoCoin
                            )}
                            {renderGraphPoints(
                                theme.palette.primary.main,
                                'Total Investment'
                            )}
                        </GraphPointsDiv>
                    )}
                </RightHeader>
            </Header>
            {isNewUser ? (
                <MuiIcon
                    src={emptyPortfolio}
                    alt="empty portfolio image"
                    style={{
                        width: '300px',
                        height: '250px',
                        alignSelf: 'center'
                    }}
                />
            ) : (
                <Graph
                    GraphPointsData={
                        crytpoCoin === 'Ethereum'
                            ? ETHEREUM_GRAPH_MOCK_POINTS_DATA
                            : GRAPH_MOCK_POINTS_DATA
                    }
                    GraphsIndividualData={INDIVIDUAL_GRAPH_DATA}
                    width={'100%'}
                    height={'40vh'}
                />
            )}
        </Wrapper>
    );
};
