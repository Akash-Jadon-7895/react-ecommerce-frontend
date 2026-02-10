import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Header } from './Header';
import type { CartItem } from '../types/types';



describe('Header component', () => {
  it('renders header with correct cart quantity and search functionality', async () => {
    const onSearch = vi.fn();

    const cart: CartItem[] = [
      { id: 1, productId: '1', quantity: 2, deliveryOptionId: 'delivery-option-1', product: { id: '1', name: 'Product 1', image: '', keywords: [], priceCents: 1000, rating: { stars: 4, count: 10 }, createdAt: '', updatedAt: '' }, createdAt: '', updatedAt: '' },
      { id: 2, productId: '2', quantity: 3, deliveryOptionId: 'delivery-option-2', product: { id: '2', name: 'Product 2', image: '', keywords: [], priceCents: 1500, rating: { stars: 5, count: 5 }, createdAt: '', updatedAt: '' }, createdAt: '', updatedAt: '' }
    ];

    render(
      <MemoryRouter>
        <Header cart={cart} onSearch={onSearch} />
      </MemoryRouter>
    );

    expect(screen.getByText('5')).toBeInTheDocument();

    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText('Search');

    await user.type(searchInput, 'socks');

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenLastCalledWith('socks');

    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });
});
