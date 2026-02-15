import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiMock } from "../../../tests/mocks/api.mock";
import { UpdateButton } from './UpdateButton';


describe('UpdateButton component', () => {
  const cartItem = {
      id: 1,
      productId: 'product-1',
      quantity: 2,
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
    };

  let loadCart: () => Promise<void>;

  beforeEach(() => {
    loadCart = vi.fn();
    apiMock.put.mockResolvedValue({});
  });

  it('shows quantity and allows updating it', async () => {
    const user = userEvent.setup();

    render(
      <UpdateButton cartItem={cartItem} loadCart={loadCart} />
    );

    expect(screen.getByText('2')).toBeInTheDocument();

    await user.click(screen.getByText('Update'));

    const input = screen.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '5');

    await user.click(screen.getByText('Save'));

    expect(apiMock.put).toHaveBeenCalledWith(
      '/cart-items/product-1',
      { quantity: 5 }
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
