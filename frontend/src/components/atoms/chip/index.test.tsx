import React from 'react';
import Chip from '.';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

test('checking the Chip value', async () => {
    render(<Chip label="chip"/>);
    const ChipElement = screen.getByText("chip");
    expect(ChipElement).toBeInTheDocument();
});
test('should call handleClick on Chip click', async () => {
    render(<Chip label="chip" onClick={jest.fn()}/>);
    const ChipElement = screen.getByText("chip");
    fireEvent.click(ChipElement);
});

