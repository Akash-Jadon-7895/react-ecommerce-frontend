import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { OrderDetailsGrid } from './OrderDetailsGrid';

vi.mock('axios');

describe('OrderDetailsGrid component', () => {
  let order;
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    order = {
      id: 'order-123',
      products: [
        {
          quantity: 2,
          estimatedDeliveryTimeMs: dayjs('2026-02-10').valueOf(),
          product: {
            id: 'prod-1',
            name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
            image: 'images/products/athletic-cotton-socks-6-pairs.jpg'
          }
        }
      ]
    };
  });

  it('displays order product details correctly', () => {
    render(
      <MemoryRouter>
        <OrderDetailsGrid order={order} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Quantity: 2')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `Arriving on: ${dayjs(order.products[0].estimatedDeliveryTimeMs).format('MMMM D')}`
      )
    ).toBeInTheDocument();
  });

  it('adds product to cart when "Add to Cart" is clicked', async () => {
    render(
      <MemoryRouter>
        <OrderDetailsGrid order={order} loadCart={loadCart} />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: 'prod-1',
      quantity: 2
    });

    expect(loadCart).toHaveBeenCalled();
  });

  it('renders correct tracking link', () => {
    render(
      <MemoryRouter>
        <OrderDetailsGrid order={order} loadCart={loadCart} />
      </MemoryRouter>
    );

    const trackButton = screen.getByRole('button', { name: /track package/i });
    const link = trackButton.closest('a');

    expect(link).toHaveAttribute(
      'href',
      '/tracking/order-123/prod-1'
    );
  });
});
