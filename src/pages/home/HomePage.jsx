import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css'

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }

    getHomeData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <Header cart={cart} onSearch={setSearch} />
      <div className="home-page">
        <ProductsGrid products={filteredProducts} loadCart={loadCart} />
      </div>
    </>
  );
}