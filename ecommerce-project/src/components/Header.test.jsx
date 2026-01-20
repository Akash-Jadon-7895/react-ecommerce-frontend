import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Header } from './Header';

describe('Header component', () => {
  it('renders header with correct cart quantity and search functionality', async () => {
    const onSearch = vi.fn();

    const cart = [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 3 }
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
