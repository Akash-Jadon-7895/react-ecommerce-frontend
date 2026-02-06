import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
import type { Cart, DeliveryOption } from "../../types/types";

type OrderSummaryProps = {
  cart: Cart;
  deliveryOptions: DeliveryOption[];
  loadCart: () => Promise<void>;
};

export function OrderSummary({ cart, deliveryOptions, loadCart }: OrderSummaryProps) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectDeliveryOption =
          deliveryOptions.find(
            (deliveryOption) =>
              deliveryOption.id === cartItem.deliveryOptionId
          ) ?? null;

        return (<div key={cartItem.productId} className="cart-item-container">
          <DeliveryDate selectDeliveryOption={selectDeliveryOption} />

          <CartItemDetails cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
        </div>);
      })}
    </div>
  );
}