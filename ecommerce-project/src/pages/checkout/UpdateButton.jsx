import { useState } from "react";
import axios from "axios";

export function UpdateButton({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const saveQuantity = async () => {
    if (quantity < 1 || quantity > 100) return;

    await axios.put(`/api/cart-items/${cartItem.productId}`, {
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
