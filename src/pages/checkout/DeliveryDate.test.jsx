import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryDate } from './DeliveryDate';

describe('DeliveryDate component', () => {
  it('displays formatted delivery date', () => {
    const selectDeliveryOption = {
      estimatedDeliveryTimeMs: 1700000000000
    };

    render(
      <DeliveryDate selectDeliveryOption={selectDeliveryOption} />
    );

    expect(screen.getByText(/delivery date:/i)).toBeInTheDocument();
    expect(screen.getByText(/november/i)).toBeInTheDocument();
  });
});
