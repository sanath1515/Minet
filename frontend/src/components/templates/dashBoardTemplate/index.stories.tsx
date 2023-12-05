import React from 'react';
import AmountDetails from '../../organisms/amountDetails';
import DashBoardTemplate from '.';
import { Meta, StoryFn } from '@storybook/react';
import { trade } from '../../../utils/constants';

export default {
    title: 'Templates/Dashboard Template',
    component: DashBoardTemplate
} as Meta<typeof DashBoardTemplate>;

const Template: StoryFn<typeof DashBoardTemplate> = (args) => (
    <DashBoardTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {
    headerContent: trade,
    isPayment: true,
    bodyNode: (
        <AmountDetails
            currencyType={'Bitcoin'}
            totalBalance={34000}
            currencyValue={23457698.87} setAmountDetails={()=>{} }        />
    )
};
