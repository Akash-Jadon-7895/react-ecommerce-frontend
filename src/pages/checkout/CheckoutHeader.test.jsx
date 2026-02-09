import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutHeader } from './CheckoutHeader';

describe('CheckoutHeader component', () => {
  it('displays checkout title and item count', () => {
    render(
      <MemoryRouter>
        <CheckoutHeader totalQuantity={3} />
      </MemoryRouter>
    );

    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/3\s*items/i)).toBeInTheDocument();
  });
});
