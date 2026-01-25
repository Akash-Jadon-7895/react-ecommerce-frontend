import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { OrdersGrid } from './OrdersGrid';

vi.mock('./OrderHeader', () => ({
  OrderHeader: ({ order }) => (
    <div data-testid="order-header">{order.id}</div>
  )
}));

vi.mock('./OrderDetailsGrid', () => ({
  OrderDetailsGrid: ({ order }) => (
    <div data-testid="order-details-grid">{order.id}</div>
  )
}));

describe('OrdersGrid component', () => {
  let orders;
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    orders = [
      { id: 'order-1', products: [] },
      { id: 'order-2', products: [] }
    ];
  });

  it('renders all orders correctly', () => {
    render(
      <MemoryRouter>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('order-container')).toHaveLength(2);
    expect(screen.getAllByTestId('order-header')).toHaveLength(2);
    expect(screen.getAllByTestId('order-details-grid')).toHaveLength(2);
  });
});
