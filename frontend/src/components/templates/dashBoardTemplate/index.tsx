import Header from '../../molecules/header';
import PageFooter from '../../molecules/pageFooter';
import React from 'react';
import theme from '../../../theme';
import { Box, styled } from '@mui/material';
import { SideBar } from '../../organisms/sideBar';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context';

interface DashBoardTemplateProps {
    bodyNode: React.ReactNode;
    headerContent: string;
    isPayment: boolean;
    onBuy?: () => void;
    onSell?: () => void;
}

const StyledContainer = styled(Box)({
    display: 'flex',
    width: '100vw',
    height: '100vh'
});

const StyledInnerBox = styled(Box)({
    padding: '20px 24px 24px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6)
});

const StyledBody = styled(Box)({
    display: 'flex',
    border: `1px solid ${theme.palette.minetGray[100]}`,
    borderRight: 'none',
    height: '86%',
    width: '100%',
    backgroundColor:theme.palette.primary[100]
});

const DashBoardTemplate = ({ ...props }: DashBoardTemplateProps) => {
    const navigate = useNavigate();
    const { setUserId } = useAppContext();


    const handleLogout = () => {
        navigate('/');
        setUserId(0);
        localStorage.clear()
    };

    return (
        <StyledContainer data-testid="dashboard-template">
            <SideBar handleLogout={handleLogout} />
            <StyledInnerBox>
                <Header
                    payment={props.isPayment}
                    header={props.headerContent}
                    onBuy={props.onBuy}
                    onSell={props.onSell}
                />
                <StyledBody>{props.bodyNode}</StyledBody>
                <PageFooter />
            </StyledInnerBox>
        </StyledContainer>
    );
};

export default DashBoardTemplate;
