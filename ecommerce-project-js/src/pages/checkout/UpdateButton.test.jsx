import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { UpdateButton } from './UpdateButton';

vi.mock('axios');

describe('UpdateButton component', () => {
  const cartItem = {
    productId: 'product-1',
    quantity: 2
  };

  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
    axios.put.mockResolvedValue({});
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

    expect(axios.put).toHaveBeenCalledWith(
      '/api/cart-items/product-1',
      { quantity: 5 }
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
