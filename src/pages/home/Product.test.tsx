import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiMock } from "../../../tests/mocks/api.mock";
import { Product as ProductComponent } from './Product';
import type { Product } from '../../types/types';



describe('Product component', () => {
  let product: Product;

  let loadcart: () => Promise<void>;

  beforeEach(() => {
    vi.clearAllMocks();

    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
      createdAt: "",
      updatedAt: "",
    };

    loadcart = vi.fn();
  });


  it('displays the product details correctly', () => {

    render(<ProductComponent product={product} loadCart={loadcart} />);

    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();

    expect(screen.getByText('$10.90')).toBeInTheDocument();

    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute('src', 'images/ratings/rating-45.png');

    expect(
      screen.getByText('87')
    ).toBeInTheDocument();

  });
  it('adds a product to the cart', async () => {

    render(<ProductComponent product={product} loadCart={loadcart} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(apiMock.post).toHaveBeenCalledWith(
      '/cart-items',
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
      }
    );
    expect(loadcart).toHaveBeenCalled();
  });

  it('sends selected quantity when adding to cart', async () => {
    render(<ProductComponent product={product} loadCart={loadcart} />);

    const user = userEvent.setup();

    await user.selectOptions(
      screen.getByRole('combobox'),
      '3'
    );

    await user.click(screen.getByTestId('add-to-cart-button'));

    expect(apiMock.post).toHaveBeenCalledWith(
      '/cart-items',
      {
        productId: product.id,
        quantity: 3
      }
    );
  });

  it('shows added confirmation after adding to cart', async () => {
    render(<ProductComponent product={product} loadCart={loadcart} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('add-to-cart-button'));

    expect(screen.getByText('Added')).toBeInTheDocument();
  });


});