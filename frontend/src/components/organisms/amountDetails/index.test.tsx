import React from 'react';
import AmountDetails from '.';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('AmountDetails Component', () => {
  it('should render the AmountDetails component', () => {
    render(<AmountDetails currencyType="Bitcoin" totalBalance={34000} currencyValue={3406069.54} currencyCode='BTC' transactionType='sell' setAmountDetails={jest.fn()}/>);
    expect(screen.getByText('Amount details')).toBeInTheDocument();
  });

  it('should update the displayed amount when the slider is changed', () => {
    render(<AmountDetails currencyType="Ethereum" totalBalance={34000} currencyValue={3406069.54} currencyCode='ETH' transactionType='buy' setAmountDetails={jest.fn()}/>);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 20000 } });
    expect(screen.getByText('$20,000.00')).toBeInTheDocument();
  });

  it('should reset the amount when Buy max button is clicked', () => {
    render(<AmountDetails currencyType="Bitcoin" totalBalance={34000} currencyValue={3406069.54} currencyCode='BTC' transactionType='buy' setAmountDetails={jest.fn()}/>);
    const buyMaxButton = screen.getByText('Buy max');
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 20000 } });
    fireEvent.click(buyMaxButton);
    expect(screen.getByText('$20,000.00')).toBeInTheDocument();
  });

  it('should display the converted crypto currency amount', () => {
    render(<AmountDetails currencyType="Ethereum" totalBalance={0.0234510} currencyValue={1297.93} currencyCode='ETH' transactionType='sell' setAmountDetails={jest.fn()}/>);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 0.02063688 } });
    expect(screen.getByText('$26.79')).toBeInTheDocument(); 
    fireEvent.click(screen.getByText("Sell max"))
  });

});
