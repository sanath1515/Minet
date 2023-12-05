import React from 'react';
import Header from '.';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('Header tests', () => {
    test('should render the Header component', () => {
        render(<Header payment={false} onSell={jest.fn()} onBuy={jest.fn()} header='Trade'/>);
        const text = screen.getByText('Trade');
        expect(text).toBeInTheDocument();
    });
    test('should trigger onBuy and onSell functions when Buy and Sell buttons are clicked', async () => {
        const onBuyMock = jest.fn();
        const onSellMock = jest.fn();
        render(<Header payment={true} onSell={onSellMock} onBuy={onBuyMock} />);
        const buyButton = screen.getByText('BUY');
        fireEvent.click(buyButton);
        const sellButton = screen.getByText('SELL');
        fireEvent.click(sellButton);
    });
});
