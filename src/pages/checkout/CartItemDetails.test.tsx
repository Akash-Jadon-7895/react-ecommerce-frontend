import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiMock } from "../../../tests/mocks/api.mock";
import { CartItemDetails } from './CartItemDetails';
import type { DeliveryOption } from '../../types/types'

type DeliveryOptions = DeliveryOption[];

vi.mock('./UpdateButton', () => ({
  UpdateButton: () => <div data-testid="update-button" />
}));

vi.mock('./DeliveryOptions', () => ({
  DeliveryOptions: () => <div data-testid="delivery-options" />
}));

describe('CartItemDetails component', () => {
  const mockProduct = {
    id: 'product-1',
    name: 'Test Product',
    image: 'test.jpg',
    keywords: [],
    priceCents: 1999,
    rating: {
      stars: 4,
      count: 10,
    },
    createdAt: '',
    updatedAt: '',
  };

  const cartItem = {
    id: 1,
    productId: 'product-1',
    quantity: 2,
    deliveryOptionId: 'option-1',
    product: mockProduct,
    createdAt: '',
    updatedAt: ''
  };

  const deliveryOptions: DeliveryOptions = [];
  let loadCart: () => Promise<void>;

  beforeEach(() => {
    vi.clearAllMocks();
    loadCart = vi.fn();
    apiMock.delete.mockResolvedValue({});
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

    expect(apiMock.delete).toHaveBeenCalledWith(
      '/cart-items/product-1'
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
