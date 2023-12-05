import React from 'react';
import Graph, { IGraphProps } from '.';
import { StoryFn, Meta } from '@storybook/react';
import {
    GRAPH_MOCK_POINTS_DATA,
    INDIVIDUAL_GRAPH_DATA,
    SINGLE_GRAPH_MOCK_POINTS_DATA
} from '../../../utils/constants';

const meta: Meta = {
    component: Graph,
    title: 'molecules/Graph'
};

export default meta;

const TEMPLATE: StoryFn<IGraphProps> = (args) => <Graph {...args} />;

export const Default = TEMPLATE.bind({});
Default.args = {
    GraphPointsData: GRAPH_MOCK_POINTS_DATA,
    GraphsIndividualData: INDIVIDUAL_GRAPH_DATA,
    width: '600px',
    height: '300px'
};

export const SingleGraph = TEMPLATE.bind({});
SingleGraph.args = {
    GraphPointsData: SINGLE_GRAPH_MOCK_POINTS_DATA,
    GraphsIndividualData: INDIVIDUAL_GRAPH_DATA,
    width: '600px',
    height: '200px'
};
