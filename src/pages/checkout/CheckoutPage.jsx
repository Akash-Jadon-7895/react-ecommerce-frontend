import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';



export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutDeliveryData = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }

    fetchCheckoutDeliveryData();
  }, []);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);

    }

    fetchCheckoutData();
  }, [cart]);
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <CheckoutHeader cart={cart} />
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