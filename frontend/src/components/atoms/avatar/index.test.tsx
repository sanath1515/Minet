import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from '.';
import Profile from '../../../../public/assets/icons/Profile.svg';

describe('Avatar', () => {

    it(' should render with avatar image', () => {
        render(<Avatar src={Profile} alt="User" />);
        const text = screen.getByTestId('PersonIcon');
        expect(text).toBeInTheDocument();
    });

    it('should render without avatar image', () => {
        render(<Avatar alt="User" />);
        const text = screen.queryByAltText('User');
        expect(text).not.toBeInTheDocument();
    });

    it('should render with onClick avatar image', () => {
        const handleClick = jest.fn();
        render(<Avatar src={Profile} alt="User" onClick={handleClick} />);
        const avatar = screen.getByTestId('PersonIcon');
        fireEvent.click(avatar);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
});
