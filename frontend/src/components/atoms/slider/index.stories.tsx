import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import Slider from '.';
import React from 'react';

export default {
    title: 'atoms/Slider',
    component: Slider
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => <Slider {...args} />;

export const SliderValues = Template.bind({});
SliderValues.args = {
    onChange: action('Slider Value Changed'),
    min: 10,
    max: 100,
    value: 50
};

export const VerticalSlider = Template.bind({});
VerticalSlider.args = {
    onChange: action('Slider value changed')
};
