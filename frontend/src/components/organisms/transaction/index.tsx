import theme from '../../../theme';
import React from 'react';
import Typography from '../../atoms/typography';
import MuiIcon from '../../atoms/icon';
import Button from '../../atoms/button';
import { Box, Divider, Grid, Stack, styled } from '@mui/material';
import {
    BUY_CRYPTO_BUTTON,
    SELL_CRYPTO_BUTTON,
    TRANSACTION_STEPPER_ICON_ALT_TEXT,
    getTransactionItems,
    getTransactionSummary,
    replaceNumberWithCommas
} from '../../../utils/constants';

interface TransactionProps {
    isBuyCrypto: boolean;
    currencySymbol: string;
    currencyQuantity: number;
    currencyValue: number;
    currencyName: string;
    amount: number;
    onClick?:()=>void;
}

interface StyledButtonProps {
    isBuyCrypto: boolean;
}

const StyledMainContainer = styled(Box)({
    width: "37.5vw",
    height: theme.spacing(161),
    backgroundColor:theme.palette.background.default
});

const HeaderContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6),
    gap: theme.spacing(3)
});

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(6)}`,
    gap: theme.spacing(1)
});

const StyledGrid = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1)
});

const StyledDivider = styled(Divider)({
    borderRight: `1px dashed ${theme.palette.minetGray[300]}`,
    width: '1px',
    height: theme.spacing(8),
    paddingLeft: theme.spacing(5)
});

const StyledButton = styled(Button)((props: StyledButtonProps) => ({
    backgroundColor: props.isBuyCrypto
        ? theme.palette.primary[500]
        : theme.palette.minetWarning.dark,
    height: '42px',
    '&:hover': {
        backgroundColor: props.isBuyCrypto
            ? theme.palette.primary[500]
            : theme.palette.minetWarning.dark
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.primary[700],
        color: theme.palette.minetText.contrastText
    }
}));

const Transaction = ({ ...props }: TransactionProps) => {
    return (
        <StyledMainContainer>
            <HeaderContainer>
                <Typography
                    variant="caption1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    {`You are ${props.isBuyCrypto ? 'buying' : 'selling'}`}
                </Typography>
                <Typography
                    variant="h6"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {`${props.currencyQuantity.toFixed(7)} ${props.currencySymbol}`}
                </Typography>
                <Typography
                    variant="caption1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    {`1 ${props.currencySymbol} = $${replaceNumberWithCommas(
                        props.currencyValue
                    )}`}
                </Typography>
            </HeaderContainer>

            <Divider
                sx={{
                    borderBottom: `1px solid ${theme.palette.minetBorder[100]}`
                }}
            />

            <StyledBox>
                {getTransactionItems(
                    props.isBuyCrypto,
                    props.currencyName,
                    props.currencySymbol
                ).map((item) => {
                    return (
                        <StyledGrid container key={item.id} xs={12}>
                            <Box
                                sx={{ display: 'flex', gap: theme.spacing(2) }}
                            >
                                <MuiIcon
                                    src={item.iconSrc}
                                    alt={TRANSACTION_STEPPER_ICON_ALT_TEXT}
                                />
                                <Stack>
                                    <Typography
                                        variant="caption1"
                                        color={
                                            theme.palette.minetText
                                                .mediumEmphasis
                                        }
                                    >
                                        {item.header}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color={
                                            theme.palette.minetText.highEmphasis
                                        }
                                    >
                                        {item.content}
                                    </Typography>
                                </Stack>
                            </Box>
                            {item.id != 3 && (
                                <StyledDivider orientation="vertical" />
                            )}
                        </StyledGrid>
                    );
                })}
            </StyledBox>

            <Divider
                sx={{
                    borderBottom: `1px solid ${theme.palette.minetBorder[100]}`
                }}
            />

            <StyledBox sx={{ gap: theme.spacing(4) }}>
                {getTransactionSummary(
                    props.currencySymbol,
                    props.amount,
                    props.currencyQuantity
                ).map((item) => {
                    return (
                        <Grid
                            container
                            key={item.id}
                            xs={12}
                            gap={theme.spacing(1)}
                            alignItems={"center"}
                        >
                            <Typography
                                variant={item.id === 3 ? 'body1' : 'overline'}
                                color={theme.palette.minetText.highEmphasis}
                            >
                                {item.header}
                            </Typography>
                            <Grid item flexGrow={1}>
                                <Divider
                                    sx={{
                                        borderBottom: `1px dashed ${theme.palette.minetBorder[100]}`
                                    }}
                                    variant="fullWidth"
                                />
                            </Grid>
                            <Typography
                                variant={item.id === 3 ? 'body1' : 'overline'}
                                color={theme.palette.minetText.highEmphasis}
                            >
                                {item.value}
                            </Typography>
                        </Grid>
                    );
                })}
            </StyledBox>

            <Box sx={{ padding: `0 ${theme.spacing(6)}` }}>
                <StyledButton
                    variant="contained"
                    fullWidth
                    disableRipple
                    disableElevation
                    isBuyCrypto={props.isBuyCrypto}
                    handleClick={props.onClick}
                >
                    {props.isBuyCrypto ? BUY_CRYPTO_BUTTON : SELL_CRYPTO_BUTTON}
                </StyledButton>
            </Box>
        </StyledMainContainer>
    );
};

export default Transaction;
