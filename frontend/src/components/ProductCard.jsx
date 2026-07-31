import { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const outOfStock = product.stock === 0;

  const handleAdd = async () => {
    setAdding(true);
    setError('');
    setMessage('');
    try {
      await addToCart(product.id, 1);
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="card">
      <div className="imageWrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="image"
          loading="lazy"
        />
        <span className="category">{product.category}</span>
      </div>
      <div className="body">
        <h3 className="name">{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className={`stock ${outOfStock ? 'outOfStock' : ''}`}>
            {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </span>
        </div>
        <button
          className={`btn btn-primary addBtn ${message ? 'added' : ''}`}
          onClick={handleAdd}
          disabled={adding || outOfStock}
        >
          {adding ? 'Adding...' : outOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
        {message && <p className="message">{message}</p>}
        {error && <p className="message" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      </div>
    </article>
  );
}
