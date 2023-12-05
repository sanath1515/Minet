import styled from '@emotion/styled';
import theme from '../../../theme';
import Typography from '../../atoms/typography';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChooseCryptoCard } from '../../molecules/chooseCryptoCard';
import { replaceNumberWithCommas } from '../../../utils/constants';
import { getTableData } from '../../../services';
import { Currency } from '../cryptoPortfolio';
import { useAppContext } from '../../../context';

interface ChooseCryptoProps {
    setSelectedCrypto: React.Dispatch<React.SetStateAction<Currency>>;
    selectedCryptoId?: number;
}
export const ChooseCrypto = (props: ChooseCryptoProps) => {
    const CryptoCards = styled(Box)({
        display: 'flex',
        flexWrap: 'wrap',
        width: '51vw',
        height: '35vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: theme.spacing(2),
            height: theme.spacing(2)
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.minetGray[300],
            borderRadius: theme.spacing(5),
            height: theme.spacing(2)
        }
    });

    const TypographyBox = styled(Typography)({
        paddingBottom: theme.spacing(4)
    });

    const [selected, setSelected] = useState(props.selectedCryptoId);
    const [cryptoCoins, setCryptoCoins] = useState<Currency[]>([]);
    const { userId } = useAppContext();

    const handleClick = (index: number) => {
        setSelected(index);
        props.setSelectedCrypto(cryptoCoins[index]);
    };

    useEffect(() => {
        const getCurrencies = async() => {
            const currencyList = await getTableData(userId);
            setCryptoCoins(currencyList);
        };
        getCurrencies();
    }, []);

    return (
        <Box>
            <TypographyBox
                variant="body1"
                color={theme.palette.minetText.highEmphasis}
            >
                Choose crypto
            </TypographyBox>
            <CryptoCards>
                {cryptoCoins.map((item, index) => (
                    <Box
                        onClick={() => handleClick(index)}
                        data-testid="crypto-card"
                        key={item.id}
                    >
                        <ChooseCryptoCard
                            src={item.cryptoIconSrc}
                            alt={item.name}
                            text={item.name}
                            value={`$${replaceNumberWithCommas(item.price)}`}
                            bool={selected === index}
                        />
                    </Box>
                ))}
            </CryptoCards>
        </Box>
    );
};
