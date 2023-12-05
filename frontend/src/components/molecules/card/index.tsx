import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '../../atoms/typography';
import MuiIcon from '../../atoms/icon';
import styled from '@emotion/styled';
import { Box, TypographyProps } from '@mui/material';
import theme from '../../../theme';

interface SxProps {
    mainText?: string;
    subText?: string;
    height?: string;
    width?: string;
}

export interface CardProps {
    src?: string;
    alt?: string;
    mainText?: string;
    subText?: string;
    mainVariant?: TypographyProps['variant'];
    subVariant?: TypographyProps['variant'];
    layout: 'iconText' | 'iconDualText' | 'reverse';
    sx: SxProps;
    onClick?:()=>void;
}
const TextDiv = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    paddingTop: '2px',
    cursor: 'pointer'
});

const StyleDiv = styled(Box)({
    display:'flex',
    gap:theme.spacing(2)
})

const IconDualTextDiv=styled(Box)({
    display:'flex',
    gap:'10px'
})

export const Card = (props: CardProps) => {
    const renderText = () => {
        return (
            <Typography
                sx={{ color: props.sx.mainText }}
                variant={props.mainVariant}
            >
                {props.mainText}
            </Typography>
        );
    };

    const renderMui = () => {
        return (
            <MuiIcon
                src={props.src}
                style={{
                    height: props.sx.height,
                    width: props.sx.width
                }}
                alt={props.alt}
            />
        );
    };

    const renderContent = () => {
        if (props.layout === 'reverse') {
            return <StyleDiv onClick={props.onClick}>
            {renderText()}
            {renderMui()}
            </StyleDiv>;
        } else if (props.layout.includes('iconText')) {
            return (
                <StyleDiv onClick={props.onClick}>
                    {renderMui()}
                    {renderText()}
                </StyleDiv>
            );
        } else if (props.layout.includes('iconDualText') && props.subText) {
            return (
                <IconDualTextDiv>
                    {renderMui()}
                    <TextDiv onClick={props.onClick}>
                        {renderText()}
                        <Typography
                            sx={{ color: props.sx.subText}}
                            variant={props.subVariant}
                        >
                            {props.subText}
                        </Typography>
                    </TextDiv>
                </IconDualTextDiv>
            );
        }
    };

    return (
        <Stack direction="row" spacing={1}>
            {renderContent()}
        </Stack>
    );
};
