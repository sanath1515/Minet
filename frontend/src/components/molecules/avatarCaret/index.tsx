import styled from '@emotion/styled';
import React from 'react';
import theme from '../../../theme';
import DropDown from '../../../../public/assets/icons/dropdown.svg';
import MuiIcon from '../../atoms/icon';
import { Avatar } from '../../atoms/avatar';
import { Box } from '@mui/material';

interface AvatarCaretProps {
    src: string;
    alt: string;
    onClick?: () => void;
}

const StyledBox = styled(Box)({
    display: 'flex',
    gap: theme.spacing(2.5)
});

const AvatarCaret = (props: AvatarCaretProps) => {
    return (
        <StyledBox>
            <Avatar src={props.src} alt={props.alt} />
            <MuiIcon
                src={DropDown}
                alt={'Dropdown Image'}
                onClick={props.onClick}
            />
        </StyledBox>
    );
};

export default AvatarCaret;
