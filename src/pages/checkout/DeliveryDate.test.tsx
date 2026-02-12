import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryDate } from './DeliveryDate';

describe('DeliveryDate component', () => {
  it('displays formatted delivery date', () => {
    const mockDeliveryOption = {
      id: 'option-1',
      deliveryDays: 5,
      priceCents: 0,
      estimatedDeliveryTimeMs: 1700000000000,
      createdAt: '',
      updatedAt: '',
    };


    render(
      <DeliveryDate selectDeliveryOption={mockDeliveryOption} />
    );

    expect(screen.getByText(/delivery date:/i)).toBeInTheDocument();
    expect(screen.getByText(/november/i)).toBeInTheDocument();
  });
});
