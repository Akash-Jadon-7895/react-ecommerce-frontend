import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiMock } from "../../../tests/mocks/api.mock";
import { DeliveryOptions } from './DeliveryOptions';
import type { CartItem, DeliveryOption } from '../../types/types';


describe('DeliveryOptions component', () => {
  const cartItem: CartItem = {
  id: 1,
  productId: 'product-1',
  quantity: 1,
  deliveryOptionId: 'option-1',
  product: {
    id: 'product-1',
    name: 'Test Product',
    image: 'test.jpg',
    keywords: [],
    priceCents: 100,
    rating: { stars: 4, count: 10 },
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
};


  const deliveryOptions: DeliveryOption[] = [
  {
    id: 'option-1',
    deliveryDays: 5,
    priceCents: 0,
    estimatedDeliveryTimeMs: 1700000000000,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'option-2',
    deliveryDays: 7,
    priceCents: 499,
    estimatedDeliveryTimeMs: 1700500000000,
    createdAt: '',
    updatedAt: '',
  },
];


  let loadCart: () => Promise<void>;

  beforeEach(() => {
    vi.clearAllMocks();
    loadCart = vi.fn();
    apiMock.put.mockResolvedValue({});
  });

  it('renders delivery options and updates selection', async () => {
    const user = userEvent.setup();

    render(
      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
        loadCart={loadCart}
      />
    );

    expect(screen.getAllByRole('radio')).toHaveLength(2);

    expect(screen.getAllByRole('radio')[0]).toBeChecked();

    await user.click(screen.getAllByRole('radio')[1]);

    expect(apiMock.put).toHaveBeenCalledWith(
      '/cart-items/product-1',
      { deliveryOptionId: 'option-2' }
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
