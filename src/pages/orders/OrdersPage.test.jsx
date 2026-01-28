import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { api } from "../../services/api";
import { OrdersPage } from './OrdersPage';

vi.mock('api');

vi.mock('../../components/Header', () => ({
  Header: () => <div data-testid="header" />
}));

vi.mock('./OrdersGrid', () => ({
  OrdersGrid: () => <div data-testid="orders-grid" />
}));

describe('OrdersPage component', () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    api.get.mockResolvedValue({
      data: []
    });
  });

  it('renders orders page and fetches orders', async () => {
    render(<OrdersPage cart={{}} loadCart={loadCart} />);

    expect(await screen.findByText(/your orders/i)).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('orders-grid')).toBeInTheDocument();

    expect(api.get).toHaveBeenCalledWith(
      '/orders?expand=products'
    );
  });
});
