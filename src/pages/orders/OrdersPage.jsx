import { api } from "../../services/api";
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';



export function OrdersPage({cart, loadCart}) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await api.get('/orders?expand=products');
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

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}