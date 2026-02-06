import { api } from "../../services/api";
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import type { Cart } from '../../types/types';

type CheckoutPageProps = {
  cart: Cart;
  loadCart: () => Promise<void>;
};


export function CheckoutPage({ cart, loadCart }: CheckoutPageProps) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutDeliveryData = async () => {
      const response = await api.get('/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }

    fetchCheckoutDeliveryData();
  }, []);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await api.get('/payment-summary');
      setPaymentSummary(response.data);

    }

    fetchCheckoutData();
  }, [cart]);

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <CheckoutHeader totalQuantity={totalQuantity} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} loadCart={loadCart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}