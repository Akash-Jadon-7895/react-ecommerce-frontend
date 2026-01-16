import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Header } from '../../components/Header';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
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

  if(!order) return null;

  const currentProduct = order.products.find((product) => {
    return productId === product.id;
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
            Arriving on {dayjs(order.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {currentProduct.name}
          </div>

          <div className="product-info">
            Quantity: 1
          </div>

          <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />
          
          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}