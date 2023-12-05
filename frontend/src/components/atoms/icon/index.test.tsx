import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MuiIcon, { MuiIconProps } from '.';
import '@testing-library/jest-dom';
import Logout from '../../../../public/assets/icons/logout.svg';

describe('MuiIcon Component', () => {
    it('should render Icon properly with styles', () => {
        const iconProps: MuiIconProps = {
            src: Logout,
            alt: 'Logout Icon',
            style: { width: '50px', height: '50px' }
        };
        render(<MuiIcon {...iconProps} />);
        const icon = screen.getByAltText('Logout Icon');
        expect(icon).toBeInTheDocument;
        expect(icon.style.width).toBe('50px');
        expect(icon.style.height).toBe('50px');
    });

    it(' should handle click events', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };
        const iconProps: MuiIconProps = {
            src: Logout,
            alt: 'Logout Icon',
            onClick: handleClick
        };
        const { getByAltText } = render(<MuiIcon {...iconProps} />);
        const image = getByAltText('Logout Icon') as HTMLImageElement;
        fireEvent.click(image);
        expect(clicked).toBe(true);
    });
});
