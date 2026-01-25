import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { CheckoutPage } from './CheckoutPage';

vi.mock('axios');

vi.mock('./CheckoutHeader', () => ({
  CheckoutHeader: () => <div data-testid="checkout-header" />
}));

vi.mock('./OrderSummary', () => ({
  OrderSummary: () => <div data-testid="order-summary" />
}));

vi.mock('./PaymentSummary', () => ({
  PaymentSummary: () => <div data-testid="payment-summary" />
}));

describe('CheckoutPage component', () => {
  const cart = {
    totalQuantity: 2,
    items: []
  };

  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation((url) => {
      if (url.startsWith('/api/delivery-options')) {
        return Promise.resolve({ data: [] });
      }
      if (url === '/api/payment-summary') {
        return Promise.resolve({ data: {} });
      }
    });
  });

  it('renders checkout page and fetches data', async () => {
    render(<CheckoutPage cart={cart} loadCart={loadCart} />);

    expect(await screen.findByText(/review your order/i)).toBeInTheDocument();

    expect(screen.getByTestId('checkout-header')).toBeInTheDocument();
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    expect(screen.getByTestId('payment-summary')).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith(
      '/api/delivery-options?expand=estimatedDeliveryTime'
    );
    expect(axios.get).toHaveBeenCalledWith('/api/payment-summary');
  });
});
