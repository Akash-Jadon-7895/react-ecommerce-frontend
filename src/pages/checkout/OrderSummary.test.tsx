import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderSummary } from './OrderSummary';
import type { CartItem, DeliveryOption } from '../../types/types';

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
  const cart: CartItem[] = [
    {
      id: 1,
      productId: '1',
      quantity: 1,
      deliveryOptionId: 'fast',
      product: {
        id: '1',
        name: 'Product 1',
        image: '',
        keywords: [],
        priceCents: 100,
        rating: { stars: 4, count: 10 },
        createdAt: '',
        updatedAt: '',
      },
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      productId: '2',
      quantity: 1,
      deliveryOptionId: 'slow',
      product: {
        id: '2',
        name: 'Product 2',
        image: '',
        keywords: [],
        priceCents: 200,
        rating: { stars: 5, count: 5 },
        createdAt: '',
        updatedAt: '',
      },
      createdAt: '',
      updatedAt: '',
    },
  ];


  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'fast',
      deliveryDays: 2,
      priceCents: 0,
      estimatedDeliveryTimeMs: 1700000000000,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'slow',
      deliveryDays: 5,
      priceCents: 499,
      estimatedDeliveryTimeMs: 1700500000000,
      createdAt: '',
      updatedAt: '',
    },
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
