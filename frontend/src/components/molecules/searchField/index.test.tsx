import React from 'react';
import SearchField from '.';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

describe('SearchField', () => {
    it('should render the component correctly', () => {
        const { getByPlaceholderText } = render(
            <SearchField value='Text Field' onChange={() => {}} />
        );
        const inputElement = getByPlaceholderText('Search all assets');
        expect(inputElement).toBeInTheDocument();
    });

    it('should display the search icon by default', () => {
        const { getByAltText } = render(
            <SearchField value='' onChange={() => {}} />
        );
        const searchIcon = getByAltText('Search Icon Image');
        expect(searchIcon).toBeInTheDocument();
    });

    it('should render the cross icon when text is entered', () => {
        const { getByPlaceholderText, getByAltText } = render(
            <SearchField value='Text Field' onChange={() => {}} />
        );
        const inputElement = getByPlaceholderText('Search all assets');

        fireEvent.change(inputElement, { target: { value: 'sample text' } });

        const crossIcon = getByAltText('Cross Icon Image');
        expect(crossIcon).toBeInTheDocument();
    });

    it('should call the onChange and onClick handlers', () => {
        const handleChange = jest.fn();
        const handleClick = jest.fn();

        const { getByPlaceholderText, getByAltText } = render(
            <SearchField
                value='Text Field'
                onChange={handleChange}
                onClick={handleClick}
            />
        );

        const inputElement = getByPlaceholderText('Search all assets');
        const iconElement = getByAltText('Cross Icon Image');

        fireEvent.change(inputElement, { target: { value: 'sample text' } });
        fireEvent.click(iconElement);

        expect(handleChange).toHaveBeenCalled();
        expect(handleClick).toHaveBeenCalled();
    });
});

