import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import theme from '../src/theme/index.tsx';
import '../src/App.css';
import React from 'react';
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};
export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <BrowserRouter>{Story()}</BrowserRouter>
        </ThemeProvider>
    )
];
