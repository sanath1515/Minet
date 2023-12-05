import React from 'react';
import '@testing-library/jest-dom';
import DashBoardTemplate from '.';
import { fireEvent, screen } from '@testing-library/react';
import { trade } from '../../../utils/constants';
import { render } from '../../../test-setUp';
import { useAppContext } from '../../../context';

jest.mock('../../../context', () => {
    return {
        ...jest.requireActual('../../../context'),
        useAppContext: jest.fn()
    };
});

describe('Dashboard Template', () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockImplementation(() => ({
            setUserId: jest.fn()
        }));
    });
    
    it('should renders Dashboard Template', () => {
        render(
            <DashBoardTemplate
                isPayment
                headerContent={trade}
                bodyNode={<div>Main</div>}
            />
        );
        const icon=screen.getByAltText("Logout");
        fireEvent.click(icon)
        expect(screen.getByTestId('dashboard-template')).toBeInTheDocument();
        expect(screen.getByText(trade)).toBeInTheDocument()
        expect(screen.getAllByRole("button")).toHaveLength(3)
    });
});
