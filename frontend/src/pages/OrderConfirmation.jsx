import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getOrder(id)
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="loading container">Loading order...</div>;
  }

  if (error || !order) {
    return (
      <main className="page container">
        <div className="empty-state">
          <h2>Order not found</h2>
          <p>{error || 'This order does not exist.'}</p>
          <Link to="/" className="btn btn-primary">Back to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page container">
      <div className="card">
        <div className="successIcon">✅</div>
        <h1 className="page-title" style={{ textAlign: 'center' }}>
          Order Confirmed!
        </h1>
        <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: 0 }}>
          Thank you, {order.customerName}. Your order has been placed.
        </p>

        <div className="orderId">
          Order ID: {order.id}
        </div>

        <div className="details">
          <div className="detailRow">
            <span>Status</span>
            <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--color-primary)' }}>
              {order.status}
            </span>
          </div>
          <div className="detailRow">
            <span>Delivery Address</span>
            <span>{order.address}</span>
          </div>
          <div className="detailRow">
            <span>Order Date</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="items">
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Items Ordered</h2>
          {order.items.map((item) => (
            <div key={item.productId} className="item">
              <span>{item.product.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="total">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
