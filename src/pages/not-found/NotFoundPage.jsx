import { Header } from '../../components/Header';
import { Link } from 'react-router';
import './NotFoundPage.css';

export function NotFoundPage({cart}) {
  return (
    <>
      <Header cart={cart} />
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="not-found-link">
          Go back to Home
        </Link>
      </div>
    </>
  );
}

