import { useState } from "react";
import { api } from "../../services/api";
import type { CartItem } from "../../types/types";

type UpdateButtonProps = {
  cartItem: CartItem;
  loadCart: () => Promise<void>;
};

export function UpdateButton({ cartItem, loadCart }: UpdateButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const saveQuantity = async () => {
    if (quantity < 1 || quantity > 100) return;

    await api.put(`/cart-items/${cartItem.productId}`, {
      quantity
    });

    setIsUpdating(false);
    await loadCart();
  };

  return (
    <>
      <span>
        Quantity:{" "}
        {isUpdating ? (
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="quantity-label"
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveQuantity();
            } else if (e.key === 'Escape') {
              setQuantity(cartItem.quantity);
              setIsUpdating(false);
            }
          }}
          />
        ) : (
          <span className="quantity-label">
            {cartItem.quantity}
          </span>
        )}
      </span>

      {isUpdating ? (
        <span
          className="update-quantity-link link-primary"
          onClick={saveQuantity}
        >
          Save
        </span>
      ) : (
        <span
          className="update-quantity-link link-primary"
          onClick={() => setIsUpdating(true)}
        >
          Update
        </span>
      )}
    </>
  );
}
