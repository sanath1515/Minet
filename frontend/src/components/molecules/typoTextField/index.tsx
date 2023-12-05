import React from 'react';
import { Stack, InputProps, InputBaseComponentProps, InputAdornment } from '@mui/material';
import Typography from '../../atoms/typography';
import theme from '../../../theme';
import InputField, { InputFieldProps } from '../../atoms/inputField';
import styled from '@emotion/styled';

interface TypoTextFieldProps extends InputFieldProps{
    text: string;
    placeholder: string;
    type?: string;
    inputProps?: InputProps & InputBaseComponentProps;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?:React.ReactNode;
}

const StyledStack = styled(Stack)({
    height: theme.spacing(18.5),
    width: theme.spacing(128),
    gap: theme.spacing(1.5)
});

const TypoTextField: React.FC<TypoTextFieldProps> = (props) => {
    return (
        <StyledStack data-testid="text-field">
            <Typography
                variant="h5"
                sx={{
                    color: theme.palette.minetGray[200],
                    paddingLeft: theme.spacing(0.3)
                }}
            >
                {props.text}
            </Typography>
            <InputField
                name={props.name}
                {...props}
                placeholder={props.placeholder}
                variant="outlined"
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                inputProps={{
                    endAdornment: (
                       <InputAdornment position="end">
                       {props.icon}
                        </InputAdornment>
                    )
                }}
            />
        </StyledStack>
    );
};

export default TypoTextField;
