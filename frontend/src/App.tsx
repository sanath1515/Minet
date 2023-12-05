import React from 'react';
import './App.css';
import theme from './theme';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import PurchasePage from './pages/purchasePage';
import DashBoardPage from './pages/dashBoardPage';
import CurrencyDetailPage from './pages/currencyDetailPage';
import SellPage from './pages/sellPage';
import WalletPage from './pages/walletPage';
import { ThemeProvider } from '@mui/material';
import { TradePage } from './pages/tradePage';
import { ResetPasswordPage } from './pages/resetPasswordPage';
import { ForgotPasswordPage } from './pages/forgotPasswordPage';
import { Route, Routes } from 'react-router-dom';
import { useAppContext } from './context';

const App = () => { 
    const { userId } = useAppContext();
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route
                    path="/forgotPasswordPage"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/resetPasswordPage"
                    element={<ResetPasswordPage />}
                />
                <Route
                    path="/dashBoardPage"
                    element={<DashBoardPage/> }
                />
                <Route
                    path="/allAssetsTradePage"
                    element={<TradePage tabValue={0} />}
                />
                <Route
                    path="/WatchListTradePage"
                    element={<TradePage tabValue={1} />}
                />
                <Route
                    path="/detailPage/:id"
                    element={<CurrencyDetailPage />}
                />
                <Route path="/purchasePage/:id" element={<PurchasePage />} />
                <Route path="/sellPage/:id" element={<SellPage />} />
                <Route path='/walletPage' element={<WalletPage/>}/>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
