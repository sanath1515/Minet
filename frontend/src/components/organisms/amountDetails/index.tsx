import Button from '../../atoms/button';
import MuiSlider from '../../atoms/slider';
import Typography from '../../atoms/typography';
import theme from '../../../theme';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import {
    replaceNumberWithCommas,
    CONVERT_CASH_TO_CRYPTO,
    BUY_MAX,
    AMOUNT_DETAILS,
    SELL_MAX,
    CONVERT_CRYPTO_TO_CASH
} from '../../../utils/constants';

interface AmountDetailsProps {
    currencyType: string;
    totalBalance: number;
    currencyValue: number;
    currencyCode?:string;
    transactionType?:string;
    setAmountDetails:React.Dispatch<React.SetStateAction<any>>;
}

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: "55.05vw",
    alignItems: 'flex-start',
    padding: '24px',
    border: `2px solid ${theme.palette.grey[100]}`,
    borderRadius: '4px',
    backgroundColor:theme.palette.background.default
});

const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    width: '51.6vw',
    border: `2px solid ${theme.palette.grey[100]}`,
    borderRadius: '4px'
});

const SliderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginLeft: '50px'
});

const StyledButton = styled(Button)({
    border: `1px solid ${theme.palette.primary[500]}`,
    color: theme.palette.primary[500],
    width: '90px',
    height: '40px'
});

const AmountDetails = (props: AmountDetailsProps) => {
    const [amount, setAmount] = useState<number>(props.totalBalance/50);
    const [cryptoCurrency, setCryptoCurrency] = useState<string>('');

    useEffect(() => {
        if(props.transactionType=="sell"){
          const cash=CONVERT_CRYPTO_TO_CASH(amount,props.currencyValue)
          props.setAmountDetails({amount:amount,cryptoCurrency:cash})
          setCryptoCurrency(cash)
        }
        else{
            const crypto=CONVERT_CASH_TO_CRYPTO(amount, props.currencyValue)
            props.setAmountDetails({amount:amount,cryptoCurrency:crypto})
            setCryptoCurrency(crypto);
        }
        
    }, [amount, props.currencyType]);
    useEffect(()=>{
        setAmount(props.totalBalance/50)
    },[props.totalBalance])
    const handleAmountChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setAmount(value);
        }
    };

    const handleBuy = () => {
        setAmount(props.totalBalance-0.01*props.totalBalance);
    };
    
    return (
        <Container>
            <Typography
                variant="body1"
                color={theme.palette.minetText.highEmphasis}
                sx={{ marginBottom: '12px' }}
            >
                {AMOUNT_DETAILS}
            </Typography>
            <StyledBox>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >{props.transactionType=="sell"?amount.toFixed(7):
                    `$${replaceNumberWithCommas(amount)}`}
                </Typography>
                <StyledButton variant="text" handleClick={handleBuy}>
                    {props.transactionType=="sell"?SELL_MAX:BUY_MAX}
                </StyledButton>
            </StyledBox>
            <SliderBox>
                <MuiSlider
                    min={props.totalBalance/50}
                    max={props.totalBalance}
                    value={amount}
                    step={props.totalBalance/50}
                    onChange={handleAmountChange}
                />
                <Typography
                    variant="caption1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                   {`1${props.currencyCode} = $${replaceNumberWithCommas(props.currencyValue)}`}
                </Typography>
            </SliderBox>
            <StyledBox>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {props.transactionType=="sell"?`$${replaceNumberWithCommas(cryptoCurrency)}`:cryptoCurrency}
                </Typography>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.mediumEmphasis}
                >
                    {props.transactionType=="sell"?"USD coin (cash)":props.currencyCode}
                </Typography>
            </StyledBox>
        </Container>
    );
};

export default AmountDetails;
