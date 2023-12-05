import React from 'react';
import MuiIcon from '../../atoms/icon';
import theme from '../../../theme';
import styled from '@emotion/styled';
import Tick from '../../../../public/assets/icons/Tick.svg';
import { Box, Typography } from '@mui/material';

export interface ChooseCryptoCardProps {
    src: string;
    alt: string;
    text: string;
    value: string;
    bool: boolean;
}

export const ChooseCryptoCard = (props: ChooseCryptoCardProps) => {
    
    const Wrapper = styled(Box)({
        border: props.bool ? `2px solid ${theme.palette.primary[500]}` : 'none',
        borderRadius: '4px',
        width: "12vw",
        height: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        position: 'relative'
    });

    const TickIcon = styled(MuiIcon)({
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '21px',
        height: '20px'
    });

    return (
        <Wrapper>
            {props.bool && <TickIcon src={Tick} alt={'tick'} />}
            <MuiIcon
                src={props.src}
                alt={props.alt}
                style={{ height: '56px', width: '56px', paddingBottom: '12px' }}
            />
            <Typography
                sx={{ color: theme.palette.minetGray[500] }}
                variant="body1"
            >
                {props.text}
            </Typography>
            <Typography
                sx={{ color: theme.palette.minetText.mediumEmphasis }}
                variant="caption1"
            >
                {props.value}
            </Typography>
        </Wrapper>
    );
};
