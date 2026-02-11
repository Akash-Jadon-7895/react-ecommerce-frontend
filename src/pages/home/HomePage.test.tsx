
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { apiMock } from "../../../tests/mocks/api.mock";
import { HomePage } from './HomePage';



describe('HomePage component', () => {
  let loadCart: () => Promise<void>;

  beforeEach(() => {
    vi.clearAllMocks();
    loadCart = vi.fn();

    apiMock.get.mockResolvedValue({
      data: [
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: { stars: 4.5, count: 87 },
          priceCents: 1090,
          keywords: ["socks", "sports", "apparel"],
        },
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: { stars: 4, count: 127 },
          priceCents: 2095,
          keywords: ["sports", "basketballs"],
        },
      ],
    });
  });



  it('displays the products correct', async () => {
    render(<MemoryRouter>
      <HomePage cart={[]} loadCart={loadCart} />
    </MemoryRouter>);
    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(2);

    expect(within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();

    expect(within(productContainers[1]).getByText('Intermediate Size Basketball')).toBeInTheDocument();
  });

  it('filters products based on search input', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    await screen.findAllByTestId('product-container');

    const searchInput = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.type(searchInput, 'basketball');

    const productContainers = screen.getAllByTestId('product-container');

    expect(productContainers.length).toBe(1);
    expect(
      within(productContainers[0]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });

});
