import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { apiMock } from '../../../tests/mocks/api.mock';
import { MemoryRouter, Route, Routes } from 'react-router';
import { TrackingPage } from './TrackingPage';
import type { Cart } from '../../types/types';


describe('TrackingPage component', () => {

  const mockProduct = {
    id: 'p1',
    name: 'Test Product',
    image: 'images/products/test-product.jpg',
    keywords: [],
    priceCents: 1000,
    rating: { stars: 5, count: 10 },
    createdAt: '',
    updatedAt: '',
  };

  const cart: Cart = [
    {
      id: 1,
      productId: 'p1',
      quantity: 1,
      deliveryOptionId: '1',
      product: mockProduct,
      createdAt: '',
      updatedAt: '',
    },
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
    apiMock.get.mockResolvedValue({ data: order });
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
      expect(apiMock.get).toHaveBeenCalledWith('/orders/order-1?expand=products');
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
