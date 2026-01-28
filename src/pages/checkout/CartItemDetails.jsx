import { api } from "../../services/api";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { UpdateButton } from "./UpdateButton";

export function CartItemDetails({ cartItem, deliveryOptions, loadCart}) {

  const deleteCartItem = async () => {
    await api.delete(`/cart-items/${cartItem.productId}`)
    await loadCart();
  }


  return (
    <div className="cart-item-details-grid">
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <UpdateButton cartItem={cartItem} loadCart={loadCart} />
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>

      <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
    </div>
  );
}