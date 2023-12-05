import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Slider from '.';
import '@testing-library/jest-dom';

describe('Slider Component', () => {
    it('should render the Slider component with default values', () => {
        const { container } = render(<Slider value={20} min={10} max={100} />);
        expect(container).toBeInTheDocument();
    });

    it(" should invoke onChange function when slider value changes", () => {
        const handleChange = jest.fn();
        render(<Slider onChange={handleChange} max={100} min={0} value={0} />);
        const slider = screen.getByRole("slider");
        fireEvent.change(slider, { target: { value: "50" } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.anything(), 50, 0);
      });
      
});
