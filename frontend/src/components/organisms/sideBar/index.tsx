import MuiIcon from '../../atoms/icon';
import styled from '@emotion/styled';
import ClickDashBoard from '../../../../public/assets/icons/clickDashboard.svg';
import { Box } from '@mui/material';
import { sideBarIcons } from '../../../utils/constants';
import theme from '../../../theme';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface SideBarIcons {
    icon: string;
    text: string;
}

export interface SideBarProps {
    handleLogout?: () => void;
}

const Wrapper = styled(Box)({
    width: theme.spacing(20),
    height: theme.spacing(182),
    paddingTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(12),
    alignItems: 'center'
});

const SideBarIcon = styled(MuiIcon)({
    cursor: 'pointer'
});

export const SideBar = ({ handleLogout }: SideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        navigate('/dashBoardPage');
    };

    const renderSidebarItem = (item: SideBarIcons) => {
        const isDashBoard = item.text === 'DashBoard';
        const isLogout = item.text === 'Logout';
        const src =
            location.pathname === '/dashBoardPage' && isDashBoard
                ? ClickDashBoard
                : item.icon;
        const alt =
            location.pathname === '/dashBoardPage' ? 'activeIcon' : item.text;
        const onClick = isDashBoard
            ? handleClick
            : isLogout
            ? handleLogout
            : undefined;
        const cursor = isDashBoard || isLogout ? 'pointer' : 'default';

        return (
            <Box key={item.text}>
                <SideBarIcon
                    src={src}
                    alt={alt}
                    onClick={onClick}
                    style={{
                        cursor: cursor
                    }}
                />
            </Box>
        );
    };

    return (
        <Wrapper>{sideBarIcons.map((item) => renderSidebarItem(item))}</Wrapper>
    );
};
