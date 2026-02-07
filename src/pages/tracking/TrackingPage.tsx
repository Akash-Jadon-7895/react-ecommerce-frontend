import { useEffect, useState } from 'react';
import { api } from "../../services/api";
import { Link } from 'react-router';
import { Header } from '../../components/Header';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { TrackingProgress } from './TrackingProgress';
import './TrackingPage.css'
import type { Cart } from '../../types/types';
import type { Order } from '../../types/types';


type TrackingPageProps = {
  cart: Cart;
}



export function TrackingPage({ cart }: TrackingPageProps) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {

    const fetchOrderData = async () => {
      const { data } = await api.get<Order>(
        `/orders/${orderId}?expand=products`
      );

      setOrder(data);


    }

    fetchOrderData();
  }, [orderId]);
  console.log(order);

  if (!order) return null;

  const currentItem = order.products.find(
    (item) => item.product.id === productId
  );

  if (!currentItem) return null;

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