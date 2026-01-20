import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Header } from '../../components/Header';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { TrackingProgress } from './TrackingProgress';
import './TrackingPage.css'



export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      let response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);

    }

    fetchOrderData();
  }, [orderId]);
  console.log(order);

  if (!order) return null;

  const currentItem = order.products.find((item) => {
    return item.product.id === productId;
  });

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png.svg" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(currentItem.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {currentItem.product.name}
          </div>

          <div className="product-info">
            Quantity: {currentItem.quantity}
          </div>

          <img className="product-image" data-testid="product-image" src={currentItem.product.image} />

          <TrackingProgress deliveryTimeMs={currentItem.estimatedDeliveryTimeMs} orderTimeMs={order.orderTimeMs} />
        </div>
      </div>
    </>
  );
}