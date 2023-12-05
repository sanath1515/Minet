import React from 'react';
import '@testing-library/jest-dom';
import Dropdown from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import { ITEM_LIST } from '../../../utils/constants';

describe('Dropdown Component', () => {
    beforeEach(()=>{
        render(<Dropdown itemList={ITEM_LIST} />);
    })

    it('should render dropdown properly', () => {
        expect(screen.getByAltText('delivery icon')).toBeInTheDocument();
        const chevronIcon = screen.getByAltText('Chevron Icon');
        expect(chevronIcon).toBeInTheDocument();
        expect(screen.queryByText('Delivery fees')).not.toBeInTheDocument();
    });

    it('should render menuitems on clicking on dropdown', async () => {
        const chevronIcon = screen.getByAltText('Chevron Icon');
        await fireEvent.click(chevronIcon);
        expect(screen.getAllByText(/Delivery fees/i)).toHaveLength(3);
    });

    it('should close dropdown properly', async () => {
        const chevronIcon = screen.getByAltText('Chevron Icon');
        await fireEvent.click(chevronIcon);
        expect(screen.getAllByText(/Delivery fees/i)).toHaveLength(3);
        await fireEvent.click(screen.getByText(/Transaction fees/i));
        expect(screen.queryByText('Delivery fees')).not.toBeInTheDocument();
    });
});
