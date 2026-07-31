import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useCart } from '../hooks/useCart.jsx';
import './Checkout.css';

export default function Checkout() {
  const { cart, loading, refreshCart } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await api.placeOrder(customerName, address);
      await refreshCart();
      navigate(`/order/${data.order.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading container">Loading...</div>;
  }

  if (cart.items.length === 0) {
    return (
      <main className="page container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add items before checking out.</p>
          <Link to="/" className="btn btn-primary">Browse Products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page container">
      <h1 className="page-title">Checkout</h1>
      <p className="page-subtitle">Enter your delivery details to place your order.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="layout">
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label" htmlFor="name">Full Name</label>
            <input
              id="name"
              className="input"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, State, ZIP"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary placeBtn"
            disabled={submitting}
          >
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <aside className="orderSummary">
          <h2>Order Summary</h2>
          {cart.items.map((item) => (
            <div key={item.productId} className="summaryItem">
              <span>{item.product.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="divider" />
          <div className="total">
            <span>Total</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
