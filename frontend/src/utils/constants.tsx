import theme from '../theme';
import DashBoard from '../../public/assets/icons/dashBoard.svg';
import Logo from '../../public/assets/icons/logo.svg';
import Portfolio from '../../public/assets/icons/portfolio.svg';
import Nav from '../../public/assets/icons/nav.svg';
import NavBell from '../../public/assets/icons/navBell.svg';
import Logout from '../../public/assets/icons/logout.svg';
import payment from '../../public/assets/icons/payment.svg';
import currency from '../../public/assets/icons/currency.svg';
import wallet from '../../public/assets/icons/wallet.svg';
import dollar from '../../public/assets/icons/dollar.svg';
import transport from '../../public/assets/icons/transport.svg';
import Google from '../../public/assets/icons/google.svg';
import FaceBook from '../../public/assets/icons/facebook.svg';
import Microsoft from '../../public/assets/icons/microsoft.svg';
import google from '../../public/assets/icons/google.svg';
import microsoft from '../../public/assets/icons/microsoft.svg';
import facebook from '../../public/assets/icons/facebook.svg';
import Bitcoin from '../../public/assets/icons/Bitcoin.svg';
import Ethereum from '../../public/assets/icons/ethereum.svg';
import Binance from '../../public/assets/icons/binance.svg';
import Tether from '../../public/assets/icons/tether.svg';
import Cardano from '../../public/assets/icons/cardano.svg';
import XRP from '../../public/assets/icons/xrp.svg';
import Dogecoin from '../../public/assets/icons/dogecoin.svg';
import Polkadot from '../../public/assets/icons/polkadot.svg';
import Ethereum2 from '../../public/assets/icons/ethereum2.svg';
import Dodgecoin from '../../public/assets/icons/dodgecoin .svg';
import Usd from '../../public/assets/icons/usd.svg';
import BitcoinImage from '../../public/assets/icons/BitcoinImage.svg';
import Website from '../../public/assets/icons/globe.svg';
import Document from '../../public/assets/icons/document.svg';

export const TEXTFIELD_STYLES = {
    width: '512px',
    height: '48px',
    padding: ' 12px 16px',
    borderRadius: '8px',
    gap: '8px'
};

export const ITEM_LIST = [
    {
        id: 1,
        header: 'Instant',
        content: '2-5 minutes',
        footer: 0.001
    },
    {
        id: 2,
        header: 'Faster',
        content: '4 hours',
        footer: 0.0001
    },
    {
        id: 3,
        header: 'Fast',
        content: '120 hours',
        footer: 0.00001
    },
    {
        id: 4,
        header: 'None'
    }
];

export const DROPDOWN_DELIVERY_FEE_CONTENT = 'Delivery fees';
export const DROPDOWN_FOOTER_CURRENCY = 'BTC';
export const DROPDOWN_HEADER_CONTENT = 'Transaction fees : 0.001 BTC';
export const DROPDOWN_HEADER_INFO = 'Instant : 2-5 min';
export const cryptoDetailItems = [
    { id: 0, name: 'Overview', disabled: false },
    { id: 1, name: 'Wallet', disabled: false }
];

export const assetList = [
    { id: 0, name: 'All Assets', disabled: false },
    { id: 1, name: 'Watchlist', disabled: false }
];

export const objects = [
    {
        icon: Google,
        name: 'Google'
    },
    {
        icon: FaceBook,
        name: 'Facebook'
    },
    {
        icon: Microsoft,
        name: 'Microsoft'
    }
];

export const buy = 'BUY';
export const sell = 'SELL';
export const trade = 'Trade';

export const purchaseSuccessMessage =
    'Purchase is completed, please check your balance in your crypto wallet';
export const buyCrypto = 'BUY CRYPTO';
export const usdCoin = 'GO TO USD COIN';

export const replaceNumberWithCommas = (value: number | string) => {
    return Number(value)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const TRANSACTION_CARD_ALT_TEXT = 'transaction status icon';

export const dashboard = 'Dashboard';
export const careers = 'Careers';
export const legal = 'Legal & Privacy';
export const year = '© 2021 Minet';
export const english = 'English';
export const help = 'NEED HELP';

export const sideBarIcons = [
    {
        icon: Logo,
        text: 'Logo'
    },
    {
        icon: DashBoard,
        text: 'DashBoard'
    },
    {
        icon: Portfolio,
        text: 'Portfolio'
    },
    {
        icon: Nav,
        text: 'Nav'
    },
    {
        icon: NavBell,
        text: 'NavBell'
    },
    {
        icon: Logout,
        text: 'Logout'
    }
];

export const Forgot = 'Forgot Password';
export const ResetLink = 'Send Reset Link';
export const Back = 'Back to';
export const Login = 'Login';
export const ResetCode = 'Reset Code';
export const Code = '8 digits code';
export const Email = 'Email';
export const Placeholder = 'you@company.com';
export const ResetPassword = 'Reset Password';

export const Search = 'Search all assets';
export const SearchAltText = 'Search Icon Image';
export const CrossAltText = 'Cross Icon Image';

export const SIGNUP_HEADER_CONTENT = 'Signup with Minet';
export const SIGNUP_BUTTON = 'Sign up';
export const LOGIN_BUTTON = 'Login';
export const ALREADY_HAVE_AN_ACCOUNT = 'Already have an account?';
export const PASSWORD_END_ICON_ALT_TEXT = 'password visibility status icon';
export const NAME_LABEL = 'Full Name';
export const NAME_PLACEHOLDER = 'Eg: John Doe';
export const EMAIL_LABEL = 'Email';
export const EMAIL_PLACEHOLDER = 'you@company.com';
export const PASSWORD_LABEL = 'Password';
export const PASSWORD_PLACEHOLDER = 'Create Password';
export const PASSWORDREG =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
export const EMAILREG =
    /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const EMPTY_ERROR_MESSAGE = 'This field cannot be empty';
export const INVALID_NAME_MESSAGE = 'Name should be of 5-20 characters';
export const INVALID_EMAIL_MESSAGE = 'Enter valid email address';
export const SHORT_PASSWORD_MESSAGE =
    'Password should contain atleast 8 characters';
export const INVALID_PASSWORD_MESSAGE =
    'Password must contain atleast one Uppercase,Lowercase,Digit,Special Character';
export const SOCIAL_LOGIN_ITEMS = [
    {
        id: 1,
        name: 'Google',
        iconSrc: google
    },
    {
        id: 2,
        name: 'Facebook',
        iconSrc: facebook
    },
    {
        id: 3,
        name: 'Microsoft',
        iconSrc: microsoft
    }
];

export const portfolioNames: string[] = [
    'Market cap',
    'Vol. 24H',
    'Circulating Supply'
];

export const chipList = [
    { id: 0, name: 'Bitcoin', color: `${theme.palette.minetText[100]}` },
    { id: 1, name: 'XRP', color: `${theme.palette.minetText[200]}` },
    { id: 2, name: 'Polkadot', color: `${theme.palette.minetText[300]}` },
    { id: 3, name: 'Ethereum', color: '#627EEA33' },
    { id: 4, name: 'Tether', color: `${theme.palette.minetText[500]}` },
    { id: 5, name: 'Ethereum 2', color: `${theme.palette.minetText[900]}` },
    { id: 6, name: 'Dodge Coin', color: `${theme.palette.minetText[700]}` }
];
export const PASSWORD_ERROR =
    'A minimum of 8 characters with at least 1 special character and number included';
export const RESET_PASSWORD = 'Reset Password';
export const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PURCHASE_SUCCESS_MESSAGE =
    'Purchase is completed, please check your balance in your crypto wallet';
export const BUY_CRYPTO = 'BUY CRYPTO';
export const USD_COIN = 'GO TO USD COIN';

export const cryptoIcons = [
    {
        icon: Bitcoin,
        currencySymbol: 'BTC',
        text: 'Bitcoin',
        value: 3406067.54
    },
    {
        icon: Ethereum,
        currencySymbol: 'ETH',
        text: 'Ethereum',
        value: 1297.93
    },
    {
        icon: Binance,
        currencySymbol: 'BNB',
        text: 'Binance',
        value: 30059.43
    },
    {
        icon: Tether,
        currencySymbol: 'THE',
        text: 'Tether',
        value: 74.21
    },
    {
        icon: Cardano,
        currencySymbol: 'ADA',
        text: 'cardano',
        value: 132.83
    },
    {
        icon: XRP,
        currencySymbol: 'XRP',
        text: 'xrp',
        value: 76.32
    },
    {
        icon: Dogecoin,
        currencySymbol: 'DOGE',
        text: 'Dogecoin',
        value: 21.37
    },
    {
        icon: Polkadot,
        currencySymbol: 'DOT',
        text: 'Polkadot',
        value: 1642.32
    }
];

export const BUY_CRYPTO_BUTTON = 'BUY NOW';
export const SELL_CRYPTO_BUTTON = 'SELL NOW';
export const TRANSACTION_STEPPER_ICON_ALT_TEXT = 'transaction stepper icon';
export const getTransactionItems = (
    isBuyCrypto: boolean,
    currencyName: string,
    currencySymbol: string
) => {
    const TRANSACTION_STEPPER_ITEMS = [
        {
            id: 1,
            iconSrc: isBuyCrypto ? payment : currency,
            header: isBuyCrypto ? 'Payment method' : 'Paying through',
            content: isBuyCrypto
                ? 'Visa credit ...8845'
                : `${currencyName} Wallet`
        },
        {
            id: 2,
            iconSrc: transport,
            header: 'Delivery fees',
            content: `0.001 ${currencySymbol}`
        },
        {
            id: 3,
            iconSrc: isBuyCrypto ? wallet : dollar,
            header: 'Deposit to',
            content: isBuyCrypto ? `${currencyName} Wallet` : 'Rupee Coin'
        }
    ];
    return TRANSACTION_STEPPER_ITEMS;
};

export const getTransactionSummary = (
    currencySymbol: string,
    amount: number,
    currencyQuantity: number
) => {
    const TRANSACTION_FOOTER_LIST = [
        {
            id: 1,
            header: `${currencyQuantity.toFixed(7)} ${currencySymbol}`,
            value: `$${replaceNumberWithCommas(amount)}`
        },
        {
            id: 2,
            header: 'transaction fee',
            value: `$${replaceNumberWithCommas(amount * 0.01)}`
        },
        {
            id: 3,
            header: 'Total',
            value: `$${replaceNumberWithCommas(amount + amount * 0.01)}`
        }
    ];
    return TRANSACTION_FOOTER_LIST;
};

export const SINGLE_GRAPH_MOCK_POINTS_DATA = [
    {
        name: 'JUNE 8',
        pv: 2000
    },
    {
        name: 'JUNE 15',
        pv: 5000
    },
    {
        name: 'JUNE 22',
        pv: 3000
    },
    {
        name: 'JUNE 29',
        pv: 7090
    },
    {
        name: 'JULY 6',
        pv: 6000
    },
    {
        name: 'JUL 13',
        pv: 8090
    }
];

export const INDIVIDUAL_GRAPH_DATA = [
    {
        dataKey: 'uv',
        stroke: theme.palette.primary.main,
        fill: theme.palette.primary[300]
    },
    {
        dataKey: 'pv',
        stroke: theme.palette.minetWarning.main,
        fill: theme.palette.minetWarning[100]
    }
];

export const GRAPH_MOCK_POINTS_DATA = [
    {
        name: 'JUN 8',
        uv: 4000,
        pv: 2400
    },
    {
        name: 'JUN 15',
        uv: 3000,
        pv: 1398
    },
    {
        name: 'JUN 22',
        uv: 2000,
        pv: 6000
    },
    {
        name: 'JUN 29',
        uv: 2780,
        pv: 1900
    },
    {
        name: 'JUL 6',
        uv: 1890,
        pv: 4800
    },
    {
        name: 'JUL 13',
        uv: 2390,
        pv: 3800
    }
];

export const ETHEREUM_GRAPH_MOCK_POINTS_DATA = [
    {
        name: 'JUN 8',
        uv: 1000,
        pv: 3000
    },
    {
        name: 'JUN 15',
        uv: 4000,
        pv: 6000
    },
    {
        name: 'JUN 22',
        uv: 2000,
        pv: 3000
    },
    {
        name: 'JUN 29',
        uv: 4780,
        pv: 7000
    },
    {
        name: 'JUL 6',
        uv: 1890,
        pv: 4800
    },
    {
        name: 'JUL 13',
        uv: 6000,
        pv: 3000
    }
];

export const TIME_LINE_LIST = [
    {
        id: 1,
        name: '1H'
    },
    {
        id: 2,
        name: '24H'
    },
    {
        id: 3,
        name: '1W'
    },
    {
        id: 4,
        name: '1M'
    },
    {
        id: 5,
        name: '1Y'
    },
    {
        id: 6,
        name: 'ALL'
    }
];
export const RECENT_TRANSACTIONS_HEADER = 'Recent transactions';
export const MY_WALLETS = 'My wallets';
export const USD_COIN_TEXT = 'USD Coin';
export const USD_COIN_CODE = 'US Dollar';
export const VIEW_ALL_BUTTON = 'View All';
export const VIEW_LESS_BUTTON = 'View Less';
export const TRANSACTION_CARD_STYLES = {
    flexDirection: 'column',
    maxWidth: theme.spacing(100),
    minHeight: theme.spacing(24.75),
    padding: '0px, 24px, 24px, 24px',
    gap: theme.spacing(2)
};
export const RECENT_TRANSACTIONS = [
    {
        id: 1,
        date: 'June 23',
        currencyName: 'Bitcoin BTC',
        currencySymbol: 'BTC',
        transactionType: 'Sold',
        amount: 0.023451,
        balance: 34000
    },
    {
        id: 2,
        date: 'Feb 20',
        currencyName: 'Bitcoin BTC',
        currencySymbol: 'BTC',
        transactionType: 'Purchased',
        amount: 0.0345,
        balance: 25000
    },
    {
        id: 3,
        date: 'June 15',
        currencyName: 'Ethereum ETH',
        currencySymbol: 'ETH',
        transactionType: 'Sold',
        amount: 0.0123,
        balance: 12000
    },
    {
        id: 4,
        date: 'May 10',
        currencyName: 'Bitcoin BTC',
        currencySymbol: 'BTC',
        transactionType: 'Purchased',
        amount: 0.0657,
        balance: 45000
    },
    {
        id: 5,
        date: 'July 17',
        currencyName: 'Ethereum ETH',
        currencySymbol: 'ETH',
        transactionType: 'Sold',
        amount: 0.056,
        balance: 19500
    },
    {
        id: 6,
        date: 'Aug 16',
        currencyName: 'Bitcoin BTC',
        currencySymbol: 'BTC',
        transactionType: 'Purchased',
        amount: 0.0783,
        balance: 21000
    }
];

export const WatchList = 'ADDED TO WATCHLIST';
export const AddWatchList = 'ADD TO WATCHLIST';

export const BITCOIN_RATE = '1BTC = $3,406,069.54';
export const ETH_RATE = '1ETH = $1,297.93';
export const BUY_MAX = 'Buy max';
export const AMOUNT_DETAILS = 'Amount details';
export const CONVERT_CASH_TO_CRYPTO = (cash: number, crypto: number) => {
    const result = cash / crypto;
    return result.toFixed(7);
};

export const CRYPTO_LIST = [
    {
        id: 1,
        icon: Bitcoin,
        cryptoCurrency: 'Bitcoin',
        abbreviation: 'BTC',
        amount: 34000,
        growthRate: 1.06
    },
    {
        id: 2,
        icon: Ethereum,
        cryptoCurrency: 'Ethereum',
        abbreviation: 'ETH',
        amount: 1297.85,
        growthRate: 6.85
    },
    {
        id: 3,
        icon: Tether,
        cryptoCurrency: 'Tether',
        abbreviation: 'USDT',
        amount: 74.28,
        growthRate: -0.01
    },
    {
        id: 4,
        icon: Binance,
        cryptoCurrency: 'Binance',
        abbreviation: 'BNB',
        amount: 220.56,
        growthRate: -3.69
    },
    {
        id: 5,
        icon: Cardano,
        cryptoCurrency: 'Cardano',
        abbreviation: 'ADA',
        amount: 34.87,
        growthRate: 2.45
    },
    {
        id: 6,
        icon: XRP,
        cryptoCurrency: 'XRP',
        abbreviation: 'XRP',
        amount: 18.76,
        growthRate: 1.06
    },
    {
        id: 7,
        icon: Dogecoin,
        cryptoCurrency: 'Dogecoin',
        abbreviation: 'DOGE',
        amount: 86.57,
        growthRate: -0.68
    },
    {
        id: 8,
        icon: Polkadot,
        cryptoCurrency: 'Polkadot',
        abbreviation: 'DOT',
        amount: 38.14,
        growthRate: 1.06
    }
];
export const MY_PORTFOLIO = 'My portfolio';
export const TOTAL_BALANCE = 'Total Balance';
export const TABLE_HEADERS = [
    {
        id: 0,
        name: 'Name',
        width:250
    },
    {
        id: 1,
        name: 'Price',
        width:250
    },
    {
        id: 2,
        name: 'Change',
        width:245
    },
    {
        id: 3,
        name: 'Market Cap',
        width:245
    },
    {
        id: 4,
        name: 'Watch',
        width:63
    }
];

export const TABLE_DATA = [
    {
        id: 1,
        name: 'Bitcoin',
        abbreviation: 'BTC',
        price: 3285553.73,
        change: 1.06,
        marketCap: 60.1,
        cryptoIconSrc: Bitcoin,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 2,
        name: 'Ethereum',
        abbreviation: 'ETH',
        price: 216678.1,
        change: -5.49,
        marketCap: 25.4,
        cryptoIconSrc: Ethereum,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 3,
        name: 'Ethereum2',
        abbreviation: 'ETH2',
        price: 216678.1,
        change: -5.49,
        marketCap: 25.4,
        cryptoIconSrc: Ethereum2,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 4,
        name: 'Tether',
        abbreviation: 'USDT',
        price: 74.31,
        change: 0.11,
        marketCap: 4.6,
        cryptoIconSrc: Tether,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 5,
        name: 'Bitcoin coin',
        abbreviation: 'BNB',
        price: 24942.54,
        change: -3.69,
        marketCap: 4.2,
        cryptoIconSrc: Binance,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 6,
        name: 'Cardano',
        abbreviation: 'ADA',
        price: 104.52,
        change: -1.82,
        marketCap: 3.4,
        cryptoIconSrc: Cardano,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 7,
        name: 'XRP',
        abbreviation: 'XRP',
        price: 57.21,
        change: 1.11,
        marketCap: 2.7,
        cryptoIconSrc: XRP,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 8,
        name: 'Dodge Coin',
        abbreviation: 'DOGE',
        price: 17.64,
        change: -6.96,
        marketCap: 2.3,
        cryptoIconSrc: Dodgecoin,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 9,
        name: 'USD Coin',
        abbreviation: 'USD',
        price: 74.26,
        change: 1.01,
        marketCap: 2.01,
        cryptoIconSrc: Usd,
        isWatchListed: false,
        volume: 4.2,
        circulatingSupply: 60.5
    }
];
export const SELL_MAX = 'Sell max';
export const CONVERT_CRYPTO_TO_CASH = (
    cryptoAmount: number,
    cryptoPrice: number
) => {
    const cashAmount = cryptoAmount * cryptoPrice;
    return cashAmount.toFixed(2);
};
  
export const SELL_SUCCESS_MESSAGE =
    'Sell is completed, please check your balance in your crypto wallet';
export const SELL_CRYPTO = 'SELL CRYPTO';
export const USER_DATA = {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'John@123',
    balance: 63151.59654719999
};
export const TRANSACTION_DATA = [
    {
        id: 1,
        transactionType: 'buy',
        transactionDate: '2023-06-23',
        currencyName: 'Bitcoin',
        currencySymbol: 'BTC',
        currencyQuantity: 0.07,
        amount: 34000,
        userId: 1
    },
    {
        id: 2,
        transactionType: 'sell',
        transactionDate: '2023-10-15',
        currencyName: 'Bitcoin',
        currencySymbol: 'BTC',
        currencyQuantity: 0.456,
        amount: 20000,
        userId: 1
    },
    {
        id: 3,
        transactionType: 'buy',
        transactionDate: '2023-07-17',
        currencyName: 'Bitcoin',
        currencySymbol: 'BTC',
        currencyQuantity: 0.034,
        amount: 15000,
        userId: 1
    },
    {
        id: 4,
        transactionType: 'sell',
        transactionDate: '2023-10-15',
        currencyName: 'Ethreum',
        currencySymbol: 'ETH',
        currencyQuantity: 0.056,
        amount: 2000,
        userId: 1
    }
];

export const MOCK_TRANSACTIONS = [
    {
        id: 1,
        transactionType: 'Sold',
        transactionDate: '2023-06-23',
        currencyName: 'Bitcoin',
        currencySymbol: 'BTC',
        currencyQuantity: 0.023451,
        amount: 34000,
        userId: 1
    },
    {
        id: 2,
        transactionType: 'Purchased',
        transactionDate: '2023-10-15',
        currencyName: 'Ethereum',
        currencySymbol: 'ETH',
        currencyQuantity: 0.456,
        amount: 20000,
        userId: 1
    },
    {
        id: 3,
        transactionType: 'Sold',
        transactionDate: '2023-07-17',
        currencyName: 'Bitcoin',
        currencySymbol: 'BTC',
        currencyQuantity: 0.5,
        amount: 15000,
        userId: 1
    }
];

export const MOCK_CRYPTO_LIST = [
    {
        id: 1,
        name: 'Bitcoin',
        abbreviation: 'BTC',
        price: 3285553.73,
        change: 1.06,
        marketCap: 60.1,
        cryptoIconSrc: Bitcoin,
        isWatchListed: true,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 2,
        name: 'Ethereum',
        abbreviation: 'ETH',
        price: 216678.1,
        change: -5.49,
        marketCap: 25.4,
        cryptoIconSrc: Ethereum,
        isWatchListed: true,
        volume: 4.2,
        circulatingSupply: 60.5
    },
    {
        id: 8,
        name: 'Dodge Coin',
        abbreviation: 'DOGE',
        price: 17.64,
        change: -6.96,
        marketCap: 2.3,
        cryptoIconSrc: Dodgecoin,
        isWatchListed: true,
        volume: 4.2,
        circulatingSupply: 60.5
    }
];

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const DISCOVERY_ASSETS_CONTENT = 'Discovery assets';
export const DISCOVER_ASSETS_ICON_ALT_TEXT = 'right arrow coin';
export const WATCHLIST_CONTENT = 'View Watchlist';
export const WATCHLIST_ICON_ALT_TEXT = 'edit coin';
export const INFO_HEADER_CONTENT = 'My Portfolio Value';
export const INFO_MIDDLE_CONTENT = '10 coins (3 active)';
export const INFO_FOOTER_CONTENT =
    ' Click on currency name below to display it on the graph';
export const INVESTMENT_VALUE = '$ 500000';
export const INVESTMENT_PERCENTAGE = '-1.2%';
export const BITCOIN_VALUE = '$ 12,400';
export const BITCOIN_PERCENTAGE = '+8.2%';

export const SUCCESS_MESSAGE = 'Password reset successful';
export const PROCEED_TO_LOGIN = 'Click on button below to proceed to login';
export const ALT_TEXT = 'successTic';

export const PASSWORD='Minet@678'
export const TradeCoinItems = [
    {
        id: 0,
        coinName: 'Bitcoin',
        coinContent: 'Moves tightly together',
        price: '3,285,553.73',
        percentage: '100',
        src: BitcoinImage
    },
    {
        id: 1,
        coinName: 'Ethereum',
        coinContent: 'Moves tightly together',
        price: '230,966.85',
        percentage: '86',
        src: Ethereum
    },
    {
        id: 2,
        coinName: 'XRP',
        coinContent: 'Moves tightly together',
        price: '60.20',
        percentage: '10',
        src: XRP
    },
    {
        id: 3,
        coinName: 'Tether',
        coinContent: 'Moves tightly together',
        price: '74.28',
        percentage: '2',
        src: Tether
    }
];

export const MockTradeData = [
    {
        id: 0,
        icon: Website,
        name: 'Official Website',
        alt: 'Website Image'
    },
    {
        id: 1,
        icon: Document,
        name: 'White Paper',
        alt: 'Paper Image'
    }
];

export const BitcoinText = [
    {
        id: 0,
        name: 'About Bitcoin'
    },
    {
        id: 1,
        name: 'The worlds first cryptocurrency, Bitcoin is stored and exchanged securely on theinternet through a'
    },
    {
        id: 2,
        name: 'digital ledger known as a blockchain.Bitcoins are divisible into smaller units known as satoshis each'
    },
    {
        id: 3,
        name: 'satoshi is worth 0.00000001 bitcoin.'
    }
];

export const RESOURCES ='Resources'

export const PRICE = 'Price correlation with'

export const BALANCE = 'Total Balance'

export const SHORT_MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const CURRENT_VALUE = 'Current Value'
export const USD_COINS = "USD Coin"
export const CASH = "Cash"
export const CASH_DEPOSIT = "CASH DEPOSIT"
export const WITHDRAWAL= "WITHDRAWAL"
export const WALLET= "Wallet"
interface CryptoCurrencies {
    [key: string]: string;
  }
export const CRYPTO_CURRENCIES:CryptoCurrencies={
    "Bitcoin":Bitcoin,
    "Ethereum":Ethereum,
    "Ethereum2":Ethereum2,
    "Tether":Tether,
    "Bitcoin Coin":Binance,
    "Cardano":Cardano,
    "XRP":XRP,
    "Dodge Coin":Dodgecoin,
    "USD Coin":Usd,
}

export const WALLET_DATA = [
    {
        id:1,
        userId:1,
        balance:50000
    }
]

export const TOKEN ={
    "message": "JWT secret token",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXRpc2hAZ21haWwuY29tIiwiaWF0IjoxNzAwODMxNTgwLCJleHAiOjE3MDA5MTc5ODB9.2NQRlbpZAOXsT1cJKv4YnZ8pHpxveA1yCyk8dZchL80"
  }