import MuiIcon from '../../atoms/icon';
import theme from '../../../theme';
import Typography from '../../atoms/typography';
import delivery from '../../../../public/assets/icons/delivery.svg';
import chevronDown from '../../../../public/assets/icons/chevronDown.svg';
import chevronUp from '../../../../public/assets/icons/chevronUp.svg';
import React, { useState } from 'react';
import { Box, Menu, Stack, styled } from '@mui/material';
import {
    DROPDOWN_DELIVERY_FEE_CONTENT,
    DROPDOWN_FOOTER_CURRENCY,
    DROPDOWN_HEADER_CONTENT,
    DROPDOWN_HEADER_INFO
} from '../../../utils/constants';

interface ItemListProps {
    id: number;
    header: string;
    content?: string;
    footer?: number;
}

interface DropdownProps {
    itemList: ItemListProps[];
}

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: "51.6vw",
    height: theme.spacing(18.5),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.minetBorder[100]}`,
    padding: theme.spacing(4)
});

const StyledInnerBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: "51.6vw",
    height: theme.spacing(13.5),
    '.menu-content': {
        ...theme.typography.body1
    },
    '&:hover': {
        backgroundColor: theme.palette.minetGray[50]
    },
    padding: '16px 24px 16px 49px',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.minetGray[50]}`
});

const CustomMenu = styled(Menu)({
    '& .MuiPaper-root': {
        maxWidth: "51.6vw",
        borderRadius: theme.spacing(3),
        boxShadow: 'none',
        cursor: 'pointer',
        border: `1px solid ${theme.palette.minetBorder[100]}`
    },
    '& .MuiList-root': {
        padding: '0px !important'
    }
});

const Dropdown = ({ ...props }: DropdownProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleDropDown = (e: {
        currentTarget: React.SetStateAction<null | HTMLElement>;
    }) => {
        if (open) setAnchorEl(null);
        else setAnchorEl(e.currentTarget);
    };

    return (
        <>
            <StyledBox onClick={handleDropDown}>
                <Stack
                    direction={'row'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing(3)
                    }}
                >
                    <MuiIcon
                        src={delivery}
                        alt="delivery icon"
                        style={{
                            width: theme.spacing(5.5),
                            height: theme.spacing(4.0025)
                        }}
                    />
                    <Box>
                        <Typography
                            variant={'body1'}
                            color={theme.palette.minetText.highEmphasis}
                        >
                            {DROPDOWN_HEADER_INFO}
                        </Typography>
                        <Typography
                            variant={'caption1'}
                            color={theme.palette.minetText.mediumEmphasis}
                        >
                            {DROPDOWN_HEADER_CONTENT}
                        </Typography>
                    </Box>
                </Stack>
                <MuiIcon
                    src={open ? chevronUp : chevronDown}
                    alt="Chevron Icon"
                />
            </StyledBox>
            <CustomMenu
                open={open}
                anchorEl={anchorEl}
                onClose={handleDropDown}
                disableAutoFocus={true}
                sx={{
                    '& .MuiPaper-root': {
                        borderTop: open ? 0 : 'none',
                        borderTopLeftRadius: open ? 0 : 'none',
                        borderTopRightRadius: open ? 0 : 'none'
                    }
                }}
            >
                {props.itemList.map((item) => (
                    <StyledInnerBox key={item.id}>
                        <Typography
                            variant="body2"
                            color={theme.palette.minetText.highEmphasis}
                        >
                            <span>{item.header} </span>
                            {item.content && (
                                <span className="menu-content">
                                    : {item.content}
                                </span>
                            )}
                        </Typography>
                        {item.footer && (
                            <Typography
                                variant="caption2"
                                color={theme.palette.minetText.mediumEmphasis}
                            >{`${DROPDOWN_DELIVERY_FEE_CONTENT} : ${item.footer} ${DROPDOWN_FOOTER_CURRENCY}`}</Typography>
                        )}
                    </StyledInnerBox>
                ))}
            </CustomMenu>
        </>
    );
};

export default Dropdown;
