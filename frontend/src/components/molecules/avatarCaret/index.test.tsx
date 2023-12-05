import React from 'react';
import AvatarCaret from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const testProps = {
  src: 'avatarImage.svg',
  alt: 'Avatar Image',
};

describe('AvatarCaret', () => {
  it('should render the Avatar component with the provided image source and alt text', () => {
    render(<AvatarCaret {...testProps} />);
    const avatar = screen.getByAltText(testProps.alt);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', testProps.src);
  });

  it('should render the MuiIcon component with the dropdown image', () => {
    render(<AvatarCaret {...testProps} />);
    const dropdownIcon = screen.getByAltText('Dropdown Image');
    expect(dropdownIcon).toBeInTheDocument();
  });

});
