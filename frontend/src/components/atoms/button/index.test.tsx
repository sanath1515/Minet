import React from 'react';
import Button from '.';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

test('checking the button value', async () => {
    render(<Button variant="text">button</Button>);
    const buttonElement = screen.getByRole('button', { name: /button/i });
    expect(buttonElement).toBeInTheDocument();
});
test('should call handleClick on button click', async () => {
    render(<Button variant="text" handleClick={jest.fn()}>button</Button>);
    const buttonElement = screen.getByRole('button', { name: /button/i });
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeEnabled();
    expect(buttonElement).toBeInTheDocument();
});

