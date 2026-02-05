import { Product } from "./Product";
import type { Products } from "../../types/checkout";

type ProductsGridProps = {
  products: Products;
  loadCart: () => Promise<void>;
};

export function ProductsGrid({products, loadCart}: ProductsGridProps) {

  return (
    <div className="products-grid">
      {products.map((product) => {

        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}