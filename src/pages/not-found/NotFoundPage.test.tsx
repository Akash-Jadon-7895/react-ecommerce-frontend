import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFoundPage } from './NotFoundPage';

vi.mock('../../components/Header', () => ({
  Header: () => <div data-testid="header" />
}));

describe('NotFoundPage component', () => {
  it('renders 404 message and back link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage cart={[]} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText("Sorry, the page you're looking for doesn't exist.")).toBeInTheDocument();

    const backLink = screen.getByRole('link', { name: /go back to home/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
