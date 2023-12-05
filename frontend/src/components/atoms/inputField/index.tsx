import React from 'react';
import theme from '../../../theme';
import { InputProps, TextField, TextFieldProps, styled } from '@mui/material';

export interface InputFieldProps{
    value: string;
    type?: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sx?: React.CSSProperties;
    inputProps?: InputProps;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    name?: string;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
}

interface StyledProps {
    value: string;
}

export const StyledInput = styled(TextField)((props: StyledProps) => ({
    border: '1px',
    borderColor: theme.palette.minetBorder.main,
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.minetBorder.main
        },
        '&:hover fieldset': {
            borderColor: theme.palette.minetBorder.main
        }
    },
    '& .MuiFormHelperText-root': {
        marginLeft: 0,
        ...theme.typography.caption2
    },
    '& .MuiOutlinedInput-input': {
        ...theme.typography.body2,
        color: props.value
            ? theme.palette.minetText.highEmphasis
            : theme.palette.minetText.lightEmphasis,
        padding: '12px 16px'
    },
    '& .MuiInputBase-root': {
        borderRadius: '8px'
    }
}));

const InputField = ({
    placeholder,
    value,
    ...props
}: InputFieldProps & TextFieldProps) => {
    return (
        <StyledInput
            {...props}
            data-testid="input-field"
            placeholder={placeholder}
            value={value}
            InputProps={props.inputProps}
        />
    );
};

export default InputField;
