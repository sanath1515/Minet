import * as React from 'react';
import '@testing-library/jest-dom';
import InputField from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import { TEXTFIELD_STYLES } from '../../../utils/constants';

describe('InputField Component', () => {
    test('should render textfield with value prop', () => {
        render(
            <InputField
                placeholder="Enter email"
                sx={TEXTFIELD_STYLES}
                value="sample@gmail.com"
            />
        );
        const inputField = screen.getByTestId('input-field');
        expect(inputField).toBeInTheDocument();
    });

    test('should render textfield', async () => {
        const handleChange = jest.fn();
        const { getByRole} = render(
            <InputField
                placeholder="Enter email"
                sx={TEXTFIELD_STYLES}
                value=""
                onChange={handleChange}
            />
        );
        const inputElement = getByRole("textbox")
        fireEvent.change(inputElement,{target:{value:"john@gmail.com"}})
        expect(handleChange).toHaveBeenCalledTimes(1)
    });
});
