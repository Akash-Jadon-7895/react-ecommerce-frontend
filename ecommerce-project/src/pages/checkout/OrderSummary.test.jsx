import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { OrderSummary } from './OrderSummary';

vi.mock('./DeliveryDate', () => ({
  DeliveryDate: () => {
    return <div data-testid="delivery-date" />;
  }
}));

vi.mock('./CartItemDetails', () => ({
  CartItemDetails: () => {
    return <div data-testid="cart-item-details" />;
  }
}));

describe('OrderSummary component', () => {
  const cart = [
    { productId: '1', deliveryOptionId: 'fast' },
    { productId: '2', deliveryOptionId: 'slow' }
  ];

  const deliveryOptions = [
    { id: 'fast', deliveryDays: 2 },
    { id: 'slow', deliveryDays: 5 }
  ];

  it('renders one cart item container per cart item', () => {
    render(
      <OrderSummary
        cart={cart}
        deliveryOptions={deliveryOptions}
        loadCart={vi.fn()}
      />
    );

    const cartItemContainers =
      document.querySelectorAll('.cart-item-container');

    expect(cartItemContainers.length).toBe(2);
  });

  it('renders DeliveryDate and CartItemDetails for each cart item', () => {
    render(
      <OrderSummary
        cart={cart}
        deliveryOptions={deliveryOptions}
        loadCart={vi.fn()}
      />
    );

    expect(screen.getAllByTestId('delivery-date').length).toBe(2);
    expect(screen.getAllByTestId('cart-item-details').length).toBe(2);
  });

  it('does not render cart items when deliveryOptions is empty', () => {
    render(
      <OrderSummary
        cart={cart}
        deliveryOptions={[]}
        loadCart={vi.fn()}
      />
    );

    const cartItemContainers =
      document.querySelectorAll('.cart-item-container');

    expect(cartItemContainers.length).toBe(0);
  });
});
