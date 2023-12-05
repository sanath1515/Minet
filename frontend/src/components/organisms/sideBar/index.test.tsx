import React from 'react';
import '@testing-library/jest-dom';
import { SideBar } from '.';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-setUp';

describe('sideBar', () => {
    it('should render with icon', () => {
        render(<SideBar />);
        const icon = screen.getByAltText('Portfolio');
        expect(icon).toBeInTheDocument();
    });

    it('should render and handle icon click', () => {
        render(<SideBar />);
        const icon = screen.getByAltText('DashBoard');
        fireEvent.click(icon);
        const text = screen.getAllByAltText('activeIcon')[0];
        expect(text).toBeInTheDocument();
    });
});
