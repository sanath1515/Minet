import styled from '@emotion/styled';
import React from 'react';
import MuiIcon from '../../atoms/icon';
import LeftIcon from '../../../../public/assets/icons/leftArrow.svg';
import RightIcon from '../../../../public/assets/icons/rightArrow.svg';
import theme from '../../../theme';
import Chip from '../../atoms/chip';
import Typography from '../../atoms/typography';
import { chipList } from '../../../utils/constants';
import { Grid } from '@mui/material';

interface CryptoTabsProps {
    onClick: (name: string) => void;
    selectedChip?: string;
}

const StyledChip = styled(Chip)({
    borderRadius: '4px',
    cursor: 'pointer',
    color: theme.palette.minetText.highEmphasis,
    width: '100%'
});

const StyledIcon = styled(MuiIcon)({
    height: theme.spacing(3.2),
    width: theme.spacing(1.9),
    marginTop: '10px'
});

const CryptoTabs = (props: CryptoTabsProps) => {
    return (
        <Grid container columnGap={4}>
            <StyledIcon src={LeftIcon} alt="Left Arrow Icon" />
            {chipList.map((chip) => (
                <Grid key={chip.id} flexGrow={1} item>
                    <StyledChip
                        label={
                            <Typography variant="body2">{chip.name}</Typography>
                        }
                        variant="outlined"
                        sx={{
                            backgroundColor: chip.color,
                            '&.MuiChip-root': {
                                '&:hover': {
                                    backgroundColor: chip.color
                                },
                                border:
                                    props.selectedChip === chip.name
                                        ? `2px solid ${chip.color}`
                                        : 'none'
                            }
                        }}
                        onClick={() => props.onClick(chip.name)}
                    />
                </Grid>
            ))}

            <StyledIcon src={RightIcon} alt="Right Arrow Icon" />
        </Grid>
    );
};

export default CryptoTabs;
