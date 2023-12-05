import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ChooseCrypto } from '.';
import { CryptoInterface } from '../cryptoTransaction';

const meta: Meta = {
    title: 'organisms/ChooseCypto',
    component: ChooseCrypto
};
export default meta;

const Template: StoryFn = () => <ChooseCrypto setSelectedCrypto={()=>{}} />;
export const Default = Template.bind({});
