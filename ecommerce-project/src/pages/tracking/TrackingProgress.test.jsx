import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { TrackingProgress } from './TrackingProgress';

describe('TrackingProgress component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows Preparing status when delivery time is far', () => {
    const orderTimeMs = dayjs('2026-01-01').valueOf();
    const deliveryTimeMs = dayjs('2026-01-10').valueOf();

    vi.setSystemTime(dayjs('2026-01-02').valueOf());

    render(<TrackingProgress deliveryTimeMs={deliveryTimeMs} orderTimeMs={orderTimeMs} />);
    expect(screen.getByText('Preparing')).toHaveClass('current-status');
  });

  it('shows Shipped status when progress is between 33% and 100%', () => {
    const orderTimeMs = dayjs('2026-01-01').valueOf();
    const deliveryTimeMs = dayjs('2026-01-10').valueOf();

    vi.setSystemTime(dayjs('2026-01-05').valueOf());

    render(<TrackingProgress deliveryTimeMs={deliveryTimeMs} orderTimeMs={orderTimeMs} />);
    expect(screen.getByText('Shipped')).toHaveClass('current-status');
  });

  it('shows Delivered status when delivery time passed', () => {
    const orderTimeMs = dayjs('2026-01-01').valueOf();
    const deliveryTimeMs = dayjs('2026-01-10').valueOf();

    vi.setSystemTime(dayjs('2026-01-12').valueOf());

    render(<TrackingProgress deliveryTimeMs={deliveryTimeMs} orderTimeMs={orderTimeMs} />);
    expect(screen.getByText('Delivered')).toHaveClass('current-status');
  });

  it('sets progress bar width correctly', () => {
    const orderTimeMs = dayjs('2026-01-01').valueOf();
    const deliveryTimeMs = dayjs('2026-01-10').valueOf();

    vi.setSystemTime(dayjs('2026-01-05').valueOf());

    render(<TrackingProgress deliveryTimeMs={deliveryTimeMs} orderTimeMs={orderTimeMs} />);
    const progressBar = document.querySelector('.progress-bar');
    const width = parseFloat(progressBar.style.width);

    expect(width).toBeGreaterThan(0);
    expect(width).toBeLessThanOrEqual(100);
  });
});