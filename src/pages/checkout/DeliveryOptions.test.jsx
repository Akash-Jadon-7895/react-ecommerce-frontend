import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { DeliveryOptions } from './DeliveryOptions';

vi.mock('axios');

describe('DeliveryOptions component', () => {
  const cartItem = {
    productId: 'product-1',
    deliveryOptionId: 'option-1'
  };

  const deliveryOptions = [
    {
      id: 'option-1',
      priceCents: 0,
      estimatedDeliveryTimeMs: 1700000000000
    },
    {
      id: 'option-2',
      priceCents: 499,
      estimatedDeliveryTimeMs: 1700500000000
    }
  ];

  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
    axios.put.mockResolvedValue({});
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

    expect(axios.put).toHaveBeenCalledWith(
      '/api/cart-items/product-1',
      { deliveryOptionId: 'option-2' }
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
