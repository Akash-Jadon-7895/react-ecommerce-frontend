import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutHeader } from './CheckoutHeader';

describe('CheckoutHeader component', () => {
  it('displays checkout title and item count', () => {
    const cart = {
      totalQuantity: 3
    };

    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
      </MemoryRouter>
    );

    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/3\s*items/i)).toBeInTheDocument();
  });
});
