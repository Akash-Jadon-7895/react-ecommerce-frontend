import { CartItemDetailsGrid } from "./CartItemDetailsGrid";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectDeliveryOption = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id === cartItem.deliveryOptionId;
        });

        return (<div key={cartItem.productId} className="cart-item-container">
          <DeliveryDate selectDeliveryOption={selectDeliveryOption} />

          <CartItemDetailsGrid cartItem={cartItem} deliveryOptions={deliveryOptions} />
        </div>);
      })}
    </div>
  );
}