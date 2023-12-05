import React from 'react';
import Typography from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import theme from '../../../theme';

describe('Typography tests', () => {
    test('renders the typography component', () => {
        render(<Typography  variant={"body1"}>Minet</Typography>);
        const text = screen.getByText(/Minet/i);
        expect(text).toBeInTheDocument();
    });
});
