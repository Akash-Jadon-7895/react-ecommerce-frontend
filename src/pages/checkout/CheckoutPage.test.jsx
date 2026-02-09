import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { api } from "../../services/api";
import { CheckoutPage } from './CheckoutPage';

vi.mock('api');

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
  const cart = [
    { id: '1', quantity: 1, price: 100 },
    { id: '2', quantity: 1, price: 200 },
  ];

  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    api.get.mockImplementation((url) => {
      if (url.startsWith('/delivery-options')) {
        return Promise.resolve({ data: [] });
      }
      if (url === '/payment-summary') {
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

    expect(api.get).toHaveBeenCalledWith(
      '/delivery-options?expand=estimatedDeliveryTime'
    );
    expect(api.get).toHaveBeenCalledWith('/payment-summary');
  });
});
