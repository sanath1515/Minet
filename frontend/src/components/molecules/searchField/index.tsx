import styled from '@emotion/styled';
import React from 'react';
import InputField from '../../atoms/inputField';
import SearchIcon from '../../../../public/assets/icons/search.svg';
import MuiIcon from '../../atoms/icon';
import theme from '../../../theme';
import CrossIcon from '../../../../public/assets/icons/Cross.svg';
import { InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { CrossAltText, Search, SearchAltText } from '../../../utils/constants';

interface SearchFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
}

const StyledBox = styled(Box)({
    width: theme.spacing(58),
    height: theme.spacing(10),
    backgroundColor: theme.palette.background.default
});

const SearchField = (props: SearchFieldProps) => {
    return (
        <StyledBox>
            <InputField
                placeholder={Search}
                onChange={props.onChange}
                variant="outlined"
                value={props.value}
                inputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <MuiIcon
                                src={
                                    props.value.length > 0
                                        ? CrossIcon
                                        : SearchIcon
                                }
                                alt={
                                    props.value.length > 0
                                        ? CrossAltText
                                        : SearchAltText
                                }
                                onClick={props.onClick}
                            />
                        </InputAdornment>
                    )
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        height: '40px',
                        borderRadius: theme.spacing(1),
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            color: theme.palette.minetText.mediumEmphasis
                        }
                    }
                }}
            />
        </StyledBox>
    );
};

export default SearchField;
