import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { apiMock } from '../../../tests/mocks/api.mock';
import { OrdersPage } from './OrdersPage';
import type { Cart } from '../../types/types';

vi.mock('../../components/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

vi.mock('./OrdersGrid', () => ({
  OrdersGrid: () => <div data-testid="orders-grid" />,
}));

describe('OrdersPage component', () => {
  let loadCart: ReturnType<typeof vi.fn>;
  let cart: Cart;

  beforeEach(() => {
    loadCart = vi.fn();

    cart = [] as Cart;

    apiMock.get.mockResolvedValue({
      data: [],
    });
  });

  it('renders orders page and fetches orders', async () => {
    render(<OrdersPage cart={cart} loadCart={loadCart} />);

    expect(await screen.findByText(/your orders/i))
      .toBeInTheDocument();

    expect(screen.getByTestId('header'))
      .toBeInTheDocument();

    expect(screen.getByTestId('orders-grid'))
      .toBeInTheDocument();

    expect(apiMock.get).toHaveBeenCalledWith(
      '/orders?expand=products'
    );
  });
});
