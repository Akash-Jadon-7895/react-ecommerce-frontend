import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router';
import { TrackingPage } from './TrackingPage';

vi.mock('axios');

describe('TrackingPage component', () => {

  const cart = [
    { id: 'p1', quantity: 1 }
  ];

  const order = {
    id: 'order-1',
    orderTimeMs: 1767205800000,
    products: [
      {
        quantity: 2,
        estimatedDeliveryTimeMs: 1767378600000,
        product: {
          id: 'p1',
          name: 'Test Product',
          image: 'images/products/test-product.jpg',
        },
      },
    ],
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: order });
  });

  it('renders tracking page with product info and progress', async () => {
    render(
      <MemoryRouter initialEntries={['/tracking/order-1/p1']}>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/orders/order-1?expand=products');
    });

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/test-product.jpg');

    const labels = screen.getAllByText(/Preparing|Shipped|Delivered/i);
    expect(labels.length).toBe(3);

    const deliveredLabel = labels.find((el) => el.textContent === 'Delivered');
    expect(deliveredLabel).toHaveClass('current-status');
  });
});
