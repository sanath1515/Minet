import DashBoardTemplate from '../../components/templates/dashBoardTemplate';
import CryptoTransaction from '../../components/organisms/cryptoTransaction';
import Transaction from '../../components/organisms/transaction';
import theme from '../../theme';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import {
    getTransactions,
    getUserById,
    getWalletData,
    postTransaction,
    updateWalletData
} from '../../services';
import PaymentSuccessCard from '../../components/molecules/paymentSuccessCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context';

export interface TransactionProps {
    currencySymbol: string;
    currencyQuantity: number;
    currencyValue: number;
    currencyName: string;
    amount: number;
}

export interface AllTransactions {
    id: number;
    transactionType: string;
    transactionDate: string;
    currencyName: string;
    currencySymbol: string;
    currencyQuantity: number;
    amount: number;
    userId: number;
    cryptoCurrencyId:number;
}

export interface UserProps {
    id: number;
    balance: number;
    userId: number;
}

const StyledBody = styled(Box)({
    height: '80vh',
    width: '95vw',
    padding: '24px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none'
    }
});

const SellPage = () => {
    const [transactionData, setTransactionData] = useState<TransactionProps>({
        currencySymbol: '',
        currencyQuantity: 0,
        currencyValue: 0,
        currencyName: '',
        amount: 0
    });
    const [userData, setUserData] = useState<UserProps>({
        id: 0,
        balance: 0,
        userId:0
    });

    const [transactions, setTransactions] = useState<AllTransactions[]>([]);
    const [remainingCurrencyQuantities, setRemainingCurrencyQuantities] =
        useState<{ [currencyName: string]: number }>({});
    const [isPaymentSuccessful, setIsPaymentSuccessful] =
        useState<boolean>(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const {userId} = useAppContext()

    useEffect(() => {
        getWalletData(userId)?.then(async (res) => {
            setUserData(res.data)
         });

        getTransactions(userId)?.then(async (res) => {
            setTransactions(res.data);
        });
    }, []);

    useEffect(() => {
        const userTransactions:AllTransactions[] = transactions.filter(
            (transaction) => transaction.userId === userId
        );

        const calculateRemainingQuantities = () => {
            const updatedRemainingQuantities: {
                [currencyName: string]: number;
            } = {};

            userTransactions.forEach((transaction) => {
                const { currencyName, currencyQuantity, transactionType } =
                    transaction;
                const multiplier = transactionType === 'buy' ? 1 : -1;

                updatedRemainingQuantities[currencyName] =
                    (updatedRemainingQuantities[currencyName] || 0) +
                    multiplier * currencyQuantity;
            });

            setRemainingCurrencyQuantities(updatedRemainingQuantities);
        };

        calculateRemainingQuantities();
    }, [transactions]);

    const handleSell = () => {
        const date = new Date();
        const purchaseInformation = {
            transactionType: 'sell',
            transactionDate: `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`,
            currencyName: transactionData.currencyName,
            currencySymbol: transactionData.currencySymbol,
            currencyQuantity: transactionData.amount.toFixed(7),
            amount: transactionData.currencyQuantity,
            userId: userId,
            cryptoCurrencyId: id
        };
        const finalAmount =
            transactionData.currencyQuantity +
            transactionData.currencyQuantity * 0.01;

        if (parseFloat(finalAmount.toFixed(5)) === 0) {
            window.alert('insufficient balance');
        } else {
            postTransaction?.(purchaseInformation)?.then(() => {
                const newBalance = userData.balance + finalAmount;
                const updatedUserInfo = { ...userData, balance: newBalance };
                updateWalletData?.(userId, updatedUserInfo).then(() => {
                    setIsPaymentSuccessful(true);
                });
            });
        }
    };

    const renderBody = () => {
        return !isPaymentSuccessful ? (
            <StyledBody>
                <Box sx={{ display: 'flex', gap: '24px' }}>
                    <CryptoTransaction
                        heading={'Sell Crypto'}
                        paymentType={'sell'}
                        totalBalance={userData?.balance}
                        cryptoBalance={remainingCurrencyQuantities}
                        setTransactionData={setTransactionData}
                    />
                    <Box
                        sx={{
                            border: `2px solid ${theme.palette.grey[100]}`,
                            height: '624px'
                        }}
                    >
                        <Transaction
                            isBuyCrypto={false}
                            currencySymbol={transactionData.currencySymbol}
                            currencyQuantity={transactionData.amount}
                            currencyValue={transactionData.currencyValue}
                            currencyName={transactionData.currencyName}
                            amount={transactionData.currencyQuantity}
                            onClick={handleSell}
                        />
                    </Box>
                </Box>
            </StyledBody>
        ) : (
            <Box
                sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}
            >
                <PaymentSuccessCard
                    amount={`${transactionData.amount.toFixed(7)} ${
                        transactionData.currencySymbol
                    }`}
                    onBuyCryptoClick={() => {}}
                    onGoToUsdCoinClick={() => {
                        navigate('/walletPage');
                    }}
                    paymentType="buy"
                />
            </Box>
        );
    };

    return (
        <DashBoardTemplate
            bodyNode={renderBody()}
            headerContent={'Checkout'}
            isPayment={false}
        />
    );
};

export default SellPage;
