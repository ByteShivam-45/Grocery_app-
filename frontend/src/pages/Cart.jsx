import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import CartItem from '../components/CartItem';
import './Cart.css';

export default function Cart() {
  const { cart, loading } = useCart();

  if (loading) {
    return <div className="loading container">Loading cart...</div>;
  }

  return (
    <main className="page container">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-subtitle">
        {cart.itemCount > 0
          ? `${cart.itemCount} item${cart.itemCount !== 1 ? 's' : ''} in your cart`
          : 'Your cart is empty'}
      </p>

      {cart.items.length === 0 ? (
        <div className="empty-state">
          <h2>No items yet</h2>
          <p>Add some groceries to get started!</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="items">
            {cart.items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          <div className="summary">
            <p className="summaryTotal">
              Subtotal: <span>${cart.subtotal.toFixed(2)}</span>
            </p>
            <Link to="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
