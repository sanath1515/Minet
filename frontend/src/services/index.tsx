import API from './API';
import axios from 'axios';
import { MOCK_URL } from '../utils/utils';
import { SignUpProps } from '../components/organisms/signup';
import { UserProps } from '../pages/purchasePage';
import { TransactionDetailProps } from '../pages/currencyDetailPage';
import { CRYPTO_CURRENCIES } from '../utils/constants';


export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    balance: string;
}

export const registerUser = async (userData: SignUpProps) => {
    try {
        const response = await axios.post(MOCK_URL + '/users/save', userData);
        return response.data;
    } catch (error) {
        console.error('Failed to post user data' + error);
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(MOCK_URL + '/users');
        return response.data;
    } catch (e) {
        throw new Error('failed to fetch user details' + e);
    }
};

export const validateUser = async (email: string, password: string) => {
    try {
        const users = await getUsers();
        const user = users.find(
            (u: SignUpProps) => u.email === email && u.password === password
        );
        if (user) {
            return user;
        } else {
            throw new Error('No User Found');
        }
    } catch (err) {
        throw new Error('Validation Failed' + err);
    }
};

export const getUserByEmailId = (email?: string) => {
    return API.get(`/users`, {
        params: {
            email: email
        }
    });
};

export const updatePassword = async (user: User) => {
    try {
        return await API.put(`/users/${user.id}`, {
            ...user
        });
    } catch (error) {
        console.error('Error updating password:', error);
    }
};

export const getUserById = async (id: number) => {
    return await API.get(`/users/${id}`);
};

export const updateWalletData = async (id: number, userData: UserProps) => {
    return await API.put(`wallet/${id}`, userData);
};

export const postTransaction = async (transactionData: any) => {
    return await API.post('/transactions/save', transactionData);
};

export const getTableData = async (userId: number) => {
    const cryptoCurrencies = await API.get('/crypto-currencies');
    const watchListData = await getWatchListedData(userId);
    const data = cryptoCurrencies.data.map((currency: any) => {
        const isWatchListed = watchListData.some(
            (watchlistedCrypto: any) =>
                watchlistedCrypto.abbreviation === currency.abbreviation
        );
        const cryptoIconSrc = CRYPTO_CURRENCIES[currency.name];
        return {
            ...currency,
            isWatchListed: isWatchListed,
            cryptoIconSrc: cryptoIconSrc
        };
    });
    return data;
};

export const getTableDataById = async (id: number,userId: number) => {
    const cryptoCurrency = await API.get(`/crypto-currencies/${id}`);
    const watchListData = await getWatchListedData(userId); 
    const isWatchListed = watchListData.some(
        (watchlistedCrypto: any) =>
            watchlistedCrypto.abbreviation === cryptoCurrency.data.abbreviation
    );
    return {
        ...cryptoCurrency.data,
        isWatchListed: isWatchListed,
        cryptoIconSrc: CRYPTO_CURRENCIES[cryptoCurrency.data.name]
    };
};

export const updateWatchList = async (
    userId: number,
    cryptoCurrencyId: number
) => {
    return await API.post('/crypto-currencies/watchList', {
        userId: userId,
        cryptoCurrencyId: cryptoCurrencyId
    });
};

export const getTransactions = async (userId: number) => {
    return await API.get(`/transactions/${userId}`);
};

export const getransactionDataByCryptoName = async (
    name: string,
    userId: number
) => {
    try {
        const transactions = await getTransactions(userId);
        const filteredTransactions = transactions.data.filter(
            (transaction: TransactionDetailProps) =>
                transaction.currencyName === name  && transaction.userId===userId
        );
        return filteredTransactions;
    } catch (err) {
        throw new Error('Failed to fetch transaction data' + err);
    }
};

export const getTransactionDataById = async (id: number) => {
    return await API.get(`/transactions/${id}`);
};

export const getPurchasedTradeData = async (userId: number) => {
    try {
        const transactions = await getTransactions(userId);
        const purchasedTransactions = transactions.data.filter(
            (transaction: TransactionDetailProps) =>
                transaction.transactionType === 'buy' && transaction.userId===userId
        );
        return purchasedTransactions;
    } catch (err) {
        throw new Error('Failed to fetch purchased transactions' + err);
    }
};

export const getSoldTradeData = async (userId: number) => {
    try {
        const transactions = await getTransactions(userId);
        const soldTransactions = transactions.data.filter(
            (transaction: TransactionDetailProps) =>
                transaction.transactionType === 'sell' && transaction.userId===userId
        );
        return soldTransactions;
    } catch (err) {
        throw new Error('Failed to fetch sold transactions' + err);
    }
};

export const getWatchListedData = async (userId: number) => {
    const response = await API.get(`/crypto-currencies/watchList/${userId}`);
    const data = response.data.map((currency: any) => {
        const cryptoIconSrc = CRYPTO_CURRENCIES[currency.name];
        return {
            ...currency,
            isWatchListed: true,
            cryptoIconSrc: cryptoIconSrc
        };
    });
    return data;
};

export const getWalletData = async (userId: number) => {
    return await API.get(`/wallet/${userId}`);
}

export const getToken = async (data: any) => {
    return  await API.post("/users/login", data);
    
  };

export const saveWallet = async(data:{userId:number,balance:number}) => {
    return axios.post('https://bc136be.bootcamp64.tk/wallet/save',data)
}
