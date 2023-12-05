import Graph from '.';
import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import {
    INDIVIDUAL_GRAPH_DATA,
    SINGLE_GRAPH_MOCK_POINTS_DATA
} from '../../../utils/constants';
import { Box } from '@mui/material';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: { children: ReactNode }) => (
            <Box>{children}</Box>
        )
    };
});

describe('Graph', () => {
    it('should render the graph', () => {
        const { getByRole } = render(
            <Graph
                GraphPointsData={SINGLE_GRAPH_MOCK_POINTS_DATA}
                GraphsIndividualData={INDIVIDUAL_GRAPH_DATA}
                width="100px"
                height="100px"
            />
        );
        const graph = getByRole('region');
        expect(graph).toBeInTheDocument();
    });
});
