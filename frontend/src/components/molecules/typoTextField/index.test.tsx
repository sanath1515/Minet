import React from 'react';
import TypoTextField from '.';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

describe('TypoTextField Component', () => {
    it('should render the component with text and a placeholder', () => {
        const { getByText, getByPlaceholderText } = render(
            <TypoTextField
                text="Email"
                placeholder="you@company.com"
                value="hello"
            />
        );

        expect(getByText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('you@company.com')).toBeInTheDocument();
    });

    test('should handle onChange event ', async () => {
        const handleChange = jest.fn((event) => {
            return {
                target: {
                    value: event.target.value
                }
            };
        });
        render(
            <TypoTextField
                onChange={handleChange}
                placeholder="Enter email"
                text="Email"
                value="abc@gmail.com"
            />
        );
        const inputField = screen.getByRole('textbox');
        expect(inputField).toBeInTheDocument();
        fireEvent.change(inputField, { target: { value: 'abc@gmail.com' } });
        expect(inputField).toHaveValue('abc@gmail.com');
    });
});
