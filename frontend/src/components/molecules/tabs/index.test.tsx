import Tabs from '.';
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { assetList } from '../../../utils/constants';

describe('Tabs Component', () => {
    it('should render tabs properly', () => {
        render(
            <Tabs
                typographyVariant="subtitle2"
                tabItems={assetList}
                value={1}
                sx={{ width: '200px' }}
            />
        );
        const tabs = screen.getAllByRole('tab');
        expect(tabs.length).toBe(assetList.length);
    });

    it('shoudld change tab values', () => {
        render(
            <Tabs
                typographyVariant="subtitle2"
                tabItems={assetList}
                value={0}
                sx={{ width: '200px' }}
            />
        );
        const slidesTab = screen.getByRole('tab', { name: 'All Assets' });
        fireEvent.click(slidesTab);
        expect(slidesTab).toHaveClass('Mui-selected');
    });
});
