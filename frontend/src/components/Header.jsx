import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import './Header.css';

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="container inner">
        <Link to="/" className="logo">
          <span className="logoIcon">🛒</span>
          FreshMart
        </Link>
        <nav className="nav">
          <Link to="/" className="navLink">Shop</Link>
          <Link to="/cart" className="cartLink">
            Cart
            {cart.itemCount > 0 && (
              <span className="badge">{cart.itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
