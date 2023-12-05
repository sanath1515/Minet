import '@testing-library/jest-dom';
import React from 'react';
import PageFooter from '.';
import { render } from '@testing-library/react';

describe('Page Footer Component', () => {
  test('should render PageFooter component correctly without errors', () => {
      render(<PageFooter />);
  });

  test('should render PageFooter text content correctly', () => {
      const { getByText } = render(<PageFooter />);
      expect(getByText('Dashboard')).toBeInTheDocument();
      expect(getByText('Careers')).toBeInTheDocument();
      expect(getByText('Legal & Privacy')).toBeInTheDocument();
      expect(getByText('© 2021 Minet')).toBeInTheDocument();
      expect(getByText('English')).toBeInTheDocument();
      expect(getByText('NEED HELP')).toBeInTheDocument();
  });
});

