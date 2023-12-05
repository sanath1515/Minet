import { Box, Divider, Typography, styled } from '@mui/material';
import React from 'react';
import Button from '../../atoms/button';
import Profile from '../../../../public/assets/icons/Profile.svg';
import ChevronDown from '../../../../public/assets/icons/chevronDown.svg';
import { Avatar } from '../../atoms/avatar';
import { buy, sell } from '../../../utils/constants';
import MuiIcon from '../../atoms/icon';
import theme from '../../../theme';

interface HeaderProps {
    payment: boolean;
    onSell?: () => void;
    onBuy?: () => void;
    header?: string;
}

const Header = (props: HeaderProps) => {
    const Container = styled(Box)({
        width: '100%',
        height: '42px',
        display: 'flex',
        justifyContent: 'space-between'
    });

    const SellButton = styled(Button)({
        backgroundColor: theme.palette.minetWarning[300],
        width: '120px',
        marginRight: '12px',
        '&:hover': {
            backgroundColor: theme.palette.minetWarning[300]
        },
        height: '42px'
    });

    const BuyButton = styled(Button)({
        backgroundColor: theme.palette.primary[500],
        width: '120px',
        marginRight: '21px',
        '&:hover': {
            backgroundColor: theme.palette.primary[500]
        },
        height: '42px'
    });

    return (
        <Container>
            <Typography
                variant="h6"
                color={theme.palette.minetText.highEmphasis}
                sx={{ paddingLeft: '2%' }}
            >
                {props.header}
            </Typography>
            <Box sx={{ display: 'flex' }}>
                {props.payment && (
                    <>
                        <SellButton
                            variant={'contained'}
                            handleClick={props.onSell}
                        >
                            <Typography
                                variant="button"
                                color={theme.palette.minetWarning.contrastText}
                            >
                                {sell}
                            </Typography>
                        </SellButton>
                        <BuyButton
                            variant="contained"
                            handleClick={props.onBuy}
                        >
                            <Typography
                                variant="button"
                                color={theme.palette.minetWarning.contrastText}
                            >
                                {buy}
                            </Typography>
                        </BuyButton>
                    </>
                )}
                <Divider orientation="vertical" />
                <Box sx={{ marginLeft: theme.spacing(5.25), display: 'flex' }}>
                    <Avatar src={Profile} />
                    <MuiIcon src={ChevronDown} alt={'profile options'} />
                </Box>
            </Box>
        </Container>
    );
};

export default Header;
