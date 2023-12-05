import React from 'react';
import CryptoTable from '.';
import { Meta, StoryFn } from '@storybook/react';
import { TABLE_DATA } from '../../../utils/constants';

export default {
    title: 'Organisms/CryptoTable',
    component: CryptoTable
} as Meta<typeof CryptoTable>;

const Template: StoryFn<typeof CryptoTable> = () => <CryptoTable table={[]} />;

export const Default = Template.bind({});
Default.args={
    table:TABLE_DATA
}
