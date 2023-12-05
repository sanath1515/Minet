import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { ResetPasswordPage } from '.';
import { RESET_PASSWORD } from '../../utils/constants';
import { render } from '../../test-setUp';

describe('ResetPasswordPage', () => {
    it('should render with typography', () => {
        render(<ResetPasswordPage />);
        expect(screen.getAllByText(RESET_PASSWORD)[0]).toBeInTheDocument();
    });
});
