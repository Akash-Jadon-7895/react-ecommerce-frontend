import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from "../../services/api";
import { CartItemDetails } from './CartItemDetails';

vi.mock('api');

vi.mock('./UpdateButton', () => ({
  UpdateButton: () => <div data-testid="update-button" />
}));

vi.mock('./DeliveryOptions', () => ({
  DeliveryOptions: () => <div data-testid="delivery-options" />
}));

describe('CartItemDetails component', () => {
  const cartItem = {
    productId: 'product-1',
    quantity: 2,
    deliveryOptionId: 'option-1',
    product: {
      name: 'Test Product',
      priceCents: 1999,
      image: 'test.jpg'
    }
  };

  const deliveryOptions = [];
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
    api.delete.mockResolvedValue({});
  });

  it('renders product info and deletes item', async () => {
    const user = userEvent.setup();

    render(
      <CartItemDetails
        cartItem={cartItem}
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();

    expect(screen.getByTestId('update-button')).toBeInTheDocument();
    expect(screen.getByTestId('delivery-options')).toBeInTheDocument();

    await user.click(screen.getByText('Delete'));

    expect(api.delete).toHaveBeenCalledWith(
      '/cart-items/product-1'
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
