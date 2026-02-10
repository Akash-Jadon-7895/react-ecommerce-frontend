import { describe, it, expect, vi } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { useLocation } from 'react-router';
import { api } from "../../services/api";

import { PaymentSummary } from './PaymentSummary';
import { formatMoney } from '../../utils/money';

vi.mock('api');

function Location() {
  const location = useLocation();
  return (
    <div data-testid="url-path">
      {location.pathname}
    </div>
  );
}

describe('PaymentSummary component', () => {
  const paymentSummary = {
    totalItems: 3,
    productCostCents: 3000,
    shippingCostCents: 499,
    totalCostBeforeTaxCents: 3499,
    taxCents: 350,
    totalCostCents: 3849
  };

  it('displays all payment summary values correctly', () => {
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(
      within(screen.getByTestId('items-row'))
        .getByText(formatMoney(paymentSummary.productCostCents))
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('shipping-row'))
        .getByText(formatMoney(paymentSummary.shippingCostCents))
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('subtotal-row'))
        .getByText(formatMoney(paymentSummary.totalCostBeforeTaxCents))
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('tax-row'))
        .getByText(formatMoney(paymentSummary.taxCents))
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('total-row'))
        .getByText(formatMoney(paymentSummary.totalCostCents))
    ).toBeInTheDocument();
  });

  it('places order, loads cart, and navigates to /orders', async () => {
    const loadCart = vi.fn();
    api.post.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
        <Location />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: /place your order/i })
    );

    expect(api.post).toHaveBeenCalledWith('/orders');
    expect(loadCart).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByTestId('url-path'))
        .toHaveTextContent('/orders');
    });
  });
});
