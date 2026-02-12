import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { apiMock } from "../../../tests/mocks/api.mock";
import { CheckoutPage } from './CheckoutPage';


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
  const mockProduct = {
    id: 'product-1',
    name: 'Test Product',
    image: 'test.jpg',
    keywords: [],
    priceCents: 100,
    rating: {
      stars: 4,
      count: 10,
    },
    createdAt: '',
    updatedAt: '',
  };

  const cart = [
    {
      id: 1,
      productId: 'product-1',
      quantity: 1,
      deliveryOptionId: 'option-1',
      product: mockProduct,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      productId: 'product-1',
      quantity: 1,
      deliveryOptionId: 'option-1',
      product: mockProduct,
      createdAt: '',
      updatedAt: '',
    },
  ];


  let loadCart: () => Promise<void>;

  beforeEach(() => {
    vi.clearAllMocks();
    loadCart = vi.fn();

    apiMock.get.mockImplementation((url) => {
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

    expect(apiMock.get).toHaveBeenCalledWith(
      '/delivery-options?expand=estimatedDeliveryTime'
    );
    expect(apiMock.get).toHaveBeenCalledWith('/payment-summary');
  });
});
