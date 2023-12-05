import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Slider } from '@mui/material';
import theme from '../../../theme';

export interface MuiSliderProps {
    min: number;
    max: number;
    value: number;
    onChange?: (event: Event, newValue: number | number[]) => void;
    style?: React.CSSProperties;
    step?: number;
}

const StyledSlider = styled(Slider)({
    color: theme.palette.minetText.lightEmphasis,
    '& .MuiSlider-thumb': {
        height: '12px',
        width: '12px'
    },
    '& .MuiSlider-rail': {
        opacity: 'unset',
        width: '2px'
    },
    '& .MuiSlider-track': {
        width: '0px'
    },
    '&.Mui-active': {
        boxShadow: 'none'
    }
});

const StyledBox = styled(Box)({
    height: '88px'
});

const MuiSlider: React.FC<MuiSliderProps> = ({
    value,
    onChange,
    style,
    min,
    max,
    step
}) => {
    return (
        <StyledBox>
            <StyledSlider
                data-testid="vertical-slider"
                orientation="vertical"
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                style={style}
                step={step}
            />
        </StyledBox>
    );
};

export default MuiSlider;
