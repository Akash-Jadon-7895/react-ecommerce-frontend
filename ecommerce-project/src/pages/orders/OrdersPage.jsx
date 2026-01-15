import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrderHeader } from './OrderHeader';
import './OrdersPage.css';
import { OrderDetailsGrid } from './OrderDetailsGrid';



export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);

    }

    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (

              <div key={order.id} className="order-container">

                <OrderHeader order={order} />

                <OrderDetailsGrid order={order} />
              </div>

            );
          })}
        </div>
      </div>
    </>
  );
}