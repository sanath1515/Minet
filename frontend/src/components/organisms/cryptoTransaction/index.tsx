import Typography from '../../atoms/typography';
import theme from '../../../theme';
import UsdCoin from '../../../../public/assets/icons/us.svg';
import MuiIcon from '../../atoms/icon';
import AmountDetails from '../amountDetails';
import Dropdown from '../../molecules/dropDown';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { ChooseCrypto } from '../chooseCrypto';
import { ITEM_LIST, replaceNumberWithCommas } from '../../../utils/constants';
import { TransactionProps } from '../../../pages/purchasePage';
import { useParams } from 'react-router-dom';
import { Currency } from '../cryptoPortfolio';
import { getTableData } from '../../../services';
import { useAppContext } from '../../../context';

export interface CryptoInterface {
    icon: string;
    currencySymbol: string;
    text: string;
    value: number;
}

interface CryptoTransactionProps {
    heading: string;
    paymentType: string;
    totalBalance: number;
    cryptoBalance?: any;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionProps>>;
}

const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    width: '51.6vw',
    border: `2px solid ${theme.palette.grey[100]}`,
    borderRadius: '4px'
});

const StyledContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    border: `2px solid ${theme.palette.grey[100]}`,
    backgroundColor:theme.palette.background.default
});

const CryptoIconContainer = styled(Box)({
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'flex-start'
});

const CryptoTransaction = (props: CryptoTransactionProps) => {
    const { id } = useParams();
    const [amountDetails, setAmountDetails] = useState({
        amount: props.totalBalance,
        cryptoCurrency: ''
    });
    const [cryptoBalance, setCryptoBalance] = useState<number>(0);
    const [cryptoCoins, setCryptoCoins] = useState<Currency[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<Currency>(
        cryptoCoins[Number(id)]
    );
    const { userId } = useAppContext();

    useEffect(() => {
        const transactionData = {
            currencySymbol: selectedCrypto?.abbreviation,
            currencyQuantity: parseFloat(amountDetails.cryptoCurrency),
            currencyValue: selectedCrypto?.price,
            currencyName: selectedCrypto?.name,
            amount: amountDetails.amount
        };
        props.setTransactionData(transactionData);
    }, [amountDetails]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const matchingKey = Object.keys(props.cryptoBalance ?? {}).find(
                (key) => key === selectedCrypto?.name
            );
            if (matchingKey) {
                const balanceValue = props.cryptoBalance[matchingKey];
                setCryptoBalance(balanceValue);
            } else {
                setCryptoBalance(0);
            }
        }, 50);
        return () => clearTimeout(timeoutId);
    }, [selectedCrypto, props.cryptoBalance]);

    useEffect(() => {
        setSelectedCrypto(cryptoCoins[Number(id) - 1]);
    }, [cryptoCoins]);

    useEffect(() => {
        const getCurrencies = async() => {
            const currencyList = await getTableData(userId);
            setCryptoCoins(currencyList);
        };
        getCurrencies();
    }, []);

    const renderPaymentMethod = (
        heading: string,
        cryptoIcon: string,
        currency: string,
        depositTo: string,
        balance?: string
    ) => {
        return (
            <StyledContainer>
                <Typography
                    variant="body1"
                    color={theme.palette.minetText.highEmphasis}
                >
                    {heading}
                </Typography>
                <StyledBox>
                    <CryptoIconContainer>
                        <MuiIcon
                            src={cryptoIcon}
                            style={{ height: '32px', width: '32px' }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',gap:theme.spacing(1) }}>
                            <Typography
                                variant="caption1"
                                color={theme.palette.minetText.highEmphasis}
                            >
                                {currency}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color={theme.palette.minetText.mediumEmphasis}
                            >
                                {balance}
                            </Typography>
                        </Box>
                    </CryptoIconContainer>
                    <Typography
                        variant="caption1"
                        color={theme.palette.minetText.highEmphasis}
                    >
                        {depositTo}
                    </Typography>
                </StyledBox>
            </StyledContainer>
        );
    };

    return (
        <Box
            sx={{
                width: '55.04vw',
                gap: '20px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography
                variant="body1"
                color={theme.palette.minetText.highEmphasis}
            >
                {props.heading}
            </Typography>
            <StyledContainer
                sx={{
                    border: `2px solid ${theme.palette.grey[100]}`,
                    padding: '24px',
                    backgroundColor:theme.palette.background.default
                }}
            >
                <ChooseCrypto
                    setSelectedCrypto={setSelectedCrypto}
                    selectedCryptoId={Number(id) - 1}
                />
            </StyledContainer>
            <Box>
                {props.paymentType === 'buy'
                    ? renderPaymentMethod(
                          'Payment Method',
                          UsdCoin,
                          'USD Coin (Cash)',
                          'Default',
                          `Total Balance - ${replaceNumberWithCommas(
                              props.totalBalance?.toFixed(7)
                          )}`
                      )
                    : renderPaymentMethod(
                          'Total Balance',
                          selectedCrypto?.cryptoIconSrc,
                          selectedCrypto?.name,
                          `${cryptoBalance.toFixed(7)} ${
                              selectedCrypto?.abbreviation
                          }`
                      )}
            </Box>

            <AmountDetails
                currencyType={selectedCrypto?.name}
                currencyCode={selectedCrypto?.abbreviation}
                totalBalance={
                    props.paymentType === 'buy'
                        ? props.totalBalance
                        : cryptoBalance
                }
                currencyValue={selectedCrypto?.price}
                transactionType={props.paymentType}
                setAmountDetails={setAmountDetails}
            />
            {props.paymentType === 'sell' ? (
                renderPaymentMethod(
                    'Deposit to',
                    UsdCoin,
                    'USD Coin (Cash)',
                    'Default'
                )
            ) : (
                <StyledContainer>
                    <Typography
                        variant="body1"
                        color={theme.palette.minetText.highEmphasis}
                    >
                        Select speed delivery
                    </Typography>
                    <Dropdown itemList={ITEM_LIST} />
                </StyledContainer>
            )}
        </Box>
    );
};

export default CryptoTransaction;
