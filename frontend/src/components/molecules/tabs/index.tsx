import React from 'react';
import Typography from '../../atoms/typography';
import { Tab, Tabs as MuiTabs, SxProps, TypographyProps } from '@mui/material';

interface ItemProps {
    id: number;
    name: string;
    disabled: boolean;
}

interface TabsProps {
    tabItems: ItemProps[];
    sx: SxProps;
    value: number;
    handleChange?: (e: React.SyntheticEvent, newValue: number) => void;
    typographyVariant: TypographyProps['variant'];
    tabStyle?: SxProps;
}

const Tabs = ({ ...props }: TabsProps) => {
    return (
        <MuiTabs
            value={props.value}
            onChange={props.handleChange}
            sx={props.tabStyle}
        >
            {props.tabItems.map((item) => {
                return (
                    <Tab
                        key={item.id}
                        disabled={item.disabled}
                        label={
                            <Typography variant={props.typographyVariant}>
                                {item.name}
                            </Typography>
                        }
                        disableRipple
                        sx={props.sx}
                    />
                );
            })}
        </MuiTabs>
    );
};

export default Tabs;
