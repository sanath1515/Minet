import React from 'react';
import Button from '.';
import theme from '../../../theme';
import watchList from "../../../../public/assets/icons/watchList.svg"
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'atoms/Button',
    component: Button
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ ...args }) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Buy',
    variant: 'contained',
    sx: { backgroundColor: theme.palette.primary[500],width:"90px",height:"30px" }
};

export const ButtonWithIcon=Template.bind({});
ButtonWithIcon.args={
    children:"ADDED TO WATCHLIST",
    variant:"text",
    startIcon:<img src={watchList}/>,
    sx:{border:`1px solid ${theme.palette.primary[500]}`,color:theme.palette.primary[500]}
}

