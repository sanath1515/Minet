import DashBoardTemplate from '../../components/templates/dashBoardTemplate';
import Tabs from '../../components/molecules/tabs';
import theme from '../../theme';
import SearchField from '../../components/molecules/searchField';
import Typography from '../../components/atoms/typography';
import MuiIcon from '../../components/atoms/icon';
import DownArrow from '../../../public/assets/icons/dropdown.svg';
import CryptoTable, { Table } from '../../components/organisms/cryptoTable';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { assetList, trade } from '../../utils/constants';
import {
    getTableData,
    getWatchListedData,
    updateWatchList
} from '../../services';
import { useAppContext } from '../../context';

interface TradePageProps {
    tabValue: number;
}

interface TradePageProps {
    tabValue: number;
}

const StyledBody = styled(Box)({
    height: '90%',
    width: '95vw',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6)
});

const StyledContainer = styled(Box)({
    height: theme.spacing(10),
    display: 'flex',
    justifyContent: 'space-between',
    padding: '9px 12px 9px 12px',
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.minetBorder.main}`
});

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between'
});

const StyledDropDown = styled(Box)({
    display: 'flex',
    gap: theme.spacing(3),
    paddingTop: theme.spacing(3.5)
});

export const TradePage = ({ tabValue }: TradePageProps) => {
    const [value, setValue] = useState<number>(tabValue);
    const [cryptoName, setCryptoName] = useState<string>('');
    const [data, setData] = useState<Table[]>([]);
    const [watchListData, setWatchListData] = useState<Table[]>([]);
    const [filteredTableData, setFilteredTableData] = useState<Table[]>(data);
    const [filteredWatchListData, setFilteredWatchListData] =
        useState<Table[]>(watchListData);
    const [cryptoId, setCryptoId] = useState(-1);
    const { userId } = useAppContext();

    const handleValueChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCryptoName(event.target.value);
        filterTableData(data, event.target.value);
        filterTableData(watchListData, event.target.value, true);
    };

    const handleClick = () => {
        setCryptoName('');
        setFilteredTableData(data);
        setFilteredWatchListData(watchListData);
    };

    const filterTableData = (
        tableData: Table[],
        filterValue: string,
        isWatchList = false
    ) => {
        const trimmedFilterValue = filterValue.trim(); 
        const filteredData = tableData.filter((row) =>
            row.name.toLowerCase().includes(trimmedFilterValue.toLowerCase())
        ); 
        if (isWatchList) {
            setFilteredWatchListData(filteredData);
        } else {
            setFilteredTableData(filteredData);
        }
    };
    

    const handleWatchList = async (cryptoId: number) => {
        const updatedCrypto = await updateWatchList(userId, cryptoId);        
        setFilteredTableData((prevTradeData) => {
            return prevTradeData.map((coin) =>
                coin.id === cryptoId
                    ? {
                          ...coin,
                          isWatchListed: updatedCrypto.data.isWatchListed
                      }
                    : coin
            );
        });
        setCryptoId(cryptoId);
    };

    useEffect(() => {
        const getCurrencies = async () => {
            const currencyList = await getTableData(userId);
            setData(currencyList);
            setFilteredTableData(currencyList);

            const watchListedCurrencies = await getWatchListedData(userId);
            setWatchListData(watchListedCurrencies);
            setFilteredWatchListData(watchListedCurrencies);
        };
        getCurrencies();
    }, []);

    useEffect(() => {
        setFilteredTableData(data);
        setFilteredWatchListData(watchListData);
    }, [data, watchListData]);

    useEffect(() => {
        const getCurrencies = async () => {            
            const currencyList = await getTableData(userId);
            setData(currencyList);
            setFilteredTableData(currencyList);

            const watchListedCurrencies = await getWatchListedData(userId);
            setWatchListData(watchListedCurrencies);
            setFilteredWatchListData(watchListedCurrencies);
        };
        getCurrencies();
    }, [cryptoId]);

    const dropDown = (text: string, width: string) => {
        return (
            <StyledContainer
                sx={{
                    width: width,
                    backgroundColor: theme.palette.background.default
                }}
            >
                <Typography
                    variant="body1"
                    color={theme.palette.minetGray[500]}
                >
                    {text}
                </Typography>
                <MuiIcon
                    src={DownArrow}
                    alt="DropDown"
                    style={{
                        height: theme.spacing(2),
                        width: theme.spacing(3.2),
                        marginTop: theme.spacing(1.7)
                    }}
                />
            </StyledContainer>
        );
    };

    return (
        <Box>
            <DashBoardTemplate
                headerContent={trade}
                isPayment={true}
                bodyNode={
                    <StyledBody>
                        <Header>
                            <Tabs
                                tabItems={assetList}
                                sx={{
                                    textTransform: 'none',
                                    color: theme.palette.minetText
                                        .mediumEmphasis,
                                    borderBottom: `1px solid ${theme.palette.minetBorder[100]}`
                                }}
                                value={value}
                                typographyVariant="subtitle2"
                                handleChange={handleValueChange}
                            />
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    borderBottom: `1px solid ${theme.palette.minetBorder[100]}`,
                                    marginRight: theme.spacing(1)
                                }}
                            />
                            <StyledDropDown>
                                <SearchField
                                    value={cryptoName}
                                    onChange={handleChange}
                                    onClick={handleClick}
                                />
                                {dropDown('24', theme.spacing(19.5))}
                                {dropDown('All assets', theme.spacing(30.5))}
                            </StyledDropDown>
                        </Header>
                        <CryptoTable
                            table={
                                value === 0
                                    ? filteredTableData
                                    : filteredWatchListData
                            }
                            handleWatchList={handleWatchList}
                        />
                    </StyledBody>
                }
            />
        </Box>
    );
};
