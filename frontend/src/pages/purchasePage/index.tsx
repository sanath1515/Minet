import DashBoardTemplate from '../../components/templates/dashBoardTemplate';
import CryptoTransaction from '../../components/organisms/cryptoTransaction';
import Transaction from '../../components/organisms/transaction';
import theme from '../../theme';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { getUserById, getWalletData, postTransaction, updateWalletData } from '../../services';
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
const PurchasePage = () => {
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

    const [isPaymentSuccessful, setIsPaymentSuccessful] =
        useState<boolean>(false);

    useEffect(() => {
        getWalletData(userId)?.then(async (res) => {
           setUserData(res.data)
        });
    }, []);
    const { id } = useParams();
    const navigate = useNavigate();
    const {userId} = useAppContext()

    const handleBuy = () => {
        const date = new Date();
        const purchaseInformation = {
            transactionType: 'buy',
            transactionDate: `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`,
            currencyName: transactionData.currencyName,
            currencySymbol: transactionData.currencySymbol,
            currencyQuantity: transactionData.currencyQuantity,
            amount: transactionData.amount,
            userId: userId,
            cryptoCurrencyId:id
        };

        const finalAmount =
            transactionData.amount + transactionData.amount * 0.01;

        if (finalAmount > userData.balance ||
            parseFloat(finalAmount.toFixed(5)) === 0) {
            window.alert('insufficiant balance');
        } else {
            postTransaction(purchaseInformation)?.then(() => {
                const newBalance = userData.balance - finalAmount;
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
                        heading={'Buy Crypto'}
                        paymentType={'buy'}
                        totalBalance={userData.balance}
                        setTransactionData={setTransactionData}
                    />
                    <Box
                        sx={{
                            border: `2px solid ${theme.palette.grey[100]}`,
                            height: '624px'
                        }}
                    >
                        <Transaction
                            isBuyCrypto={true}
                            currencySymbol={transactionData.currencySymbol}
                            currencyQuantity={transactionData.currencyQuantity}
                            currencyValue={transactionData.currencyValue}
                            currencyName={transactionData.currencyName}
                            amount={transactionData.amount}
                            onClick={handleBuy}
                        />
                    </Box>
                </Box>
            </StyledBody>
        ) : (
            <Box
                sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}
            >
                <PaymentSuccessCard
                    amount={`${transactionData.currencyQuantity} ${transactionData.currencySymbol}`}
                    onBuyCryptoClick={() => {}}
                    onGoToUsdCoinClick={() => {
                        navigate('/walletPage');
                    }}
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

export default PurchasePage;
