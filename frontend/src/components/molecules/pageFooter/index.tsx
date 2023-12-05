import styled from '@emotion/styled';
import React from 'react';
import theme from '../../../theme';
import Typography from '../../atoms/typography';
import Button from '../../atoms/button';
import MuiIcon from '../../atoms/icon';
import Dropdown from '../../../../public/assets/icons/dropdown.svg';
import { Box, Stack } from '@mui/material';
import {
    careers,
    dashboard,
    english,
    help,
    legal,
    year
} from '../../../utils/constants';

const StyledBox = styled(Box)({
    width: "100%",
    height: '4.3vh',
    display: 'flex',
    justifyContent: 'space-between',
});

const StyledStack = styled(Stack)({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(6),
    paddingTop: '8px'
});

const StyledTypography = styled(Typography)({
    color: theme.palette.primary[500]
});

const StyledContainer = styled(Stack)({
    width: theme.spacing(42.5),
    height: theme.spacing(10.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.minetBorder.main}`
});

const PageFooter = () => {
    return (
        <StyledBox>
            <StyledStack>
                <StyledTypography variant="body2">{dashboard}</StyledTypography>
                <StyledTypography variant="body2">{careers}</StyledTypography>
                <StyledTypography variant="body2">{legal}</StyledTypography>
                <Typography variant="body2">{year}</Typography>
            </StyledStack>

            <Stack display="flex" flexDirection="row" gap={theme.spacing(4)}>
                <StyledContainer>
                    <Typography variant="body2">{english}</Typography>
                    <MuiIcon
                        src={Dropdown}
                        alt="Drop down Image"
                        style={{
                            height: theme.spacing(1.9),
                            width: theme.spacing(3.17)
                        }}
                    />
                </StyledContainer>

                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: theme.spacing(27.25), height: theme.spacing(10) }}
                >{help}</Button>
            </Stack>
        </StyledBox>
    );
};

export default PageFooter;
