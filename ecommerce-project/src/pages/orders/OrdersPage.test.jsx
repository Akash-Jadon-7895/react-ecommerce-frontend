import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { OrdersPage } from './OrdersPage';

vi.mock('axios');

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

    axios.get.mockResolvedValue({
      data: []
    });
  });

  it('renders orders page and fetches orders', async () => {
    render(<OrdersPage cart={{}} loadCart={loadCart} />);

    expect(await screen.findByText(/your orders/i)).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('orders-grid')).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith(
      '/api/orders?expand=products'
    );
  });
});
