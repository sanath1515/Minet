import React from 'react';
import theme from '../../../theme';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { Box } from '@mui/material';

type GraphStyleType = {
    dataKey: string;
    stroke: string;
    fill?: string;
};

type GraphPointsDataType = {
    name: string;
    [key: number]: number;
};

export interface IGraphProps {
    GraphPointsData: GraphPointsDataType[];
    GraphsIndividualData: GraphStyleType[];
    width?: string;
    height?: string;
}

const Graph = ({
    GraphsIndividualData,
    GraphPointsData,
    ...props
}: IGraphProps) => {
    return (
        <Box width={props.width} height={props.height}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    {...props}
                    width={50}
                    height={50}
                    data={GraphPointsData}
                    id="area-chart"
                    data-testid="graph"
                >
                    <CartesianGrid
                        vertical={false}
                        stroke={theme.palette.minetGray[300]}
                    />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis
                        allowDataOverflow={false}
                        tickLine={false}
                        axisLine={false}
                        hide={true}
                    />
                    {GraphsIndividualData.map((item: GraphStyleType) => (
                        <Area
                            type="monotone"
                            dataKey={item.dataKey}
                            stackId="1"
                            stroke={item.stroke}
                            fill={item.fill}
                            key={item.dataKey}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Graph;
