import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { OrdersGrid } from './OrdersGrid';
import type { Orders } from '../../types/types';

vi.mock('./OrderHeader', () => ({
  OrderHeader: ({ order }: { order: { id: string } }) => (
    <div data-testid="order-header">{order.id}</div>
  ),
}));


vi.mock('./OrderDetailsGrid', () => ({
  OrderDetailsGrid: ({ order }: { order: { id: string } }) => (
    <div data-testid="order-details-grid">{order.id}</div>
  ),
}));

describe('OrdersGrid component', () => {
  let orders: Orders;
  let loadCart: () => Promise<void>;

  beforeEach(() => {
    loadCart = vi.fn();

    orders = [
      {
        id: 'order-1',
        orderTimeMs: Date.now(),
        totalCostCents: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [],
      },
      {
        id: 'order-2',
        orderTimeMs: Date.now(),
        totalCostCents: 2000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [],
      },
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
