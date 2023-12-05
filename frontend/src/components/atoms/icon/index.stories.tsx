import type { Meta, StoryObj } from '@storybook/react';
import MuiIcon from '.';
import Google from '../../../../public/assets/icons/google.svg';

const meta = {
    title: 'atoms/Icon',
    component: MuiIcon
} satisfies Meta<typeof MuiIcon>;

type Story = StoryObj<typeof meta>;

export const GoogleIcon: Story = {
    args: {
        src: Google,
        alt: 'Google Icon',
        style: {
            height: '50px',
            width: '50px'
        }
    }
};

export default meta;
