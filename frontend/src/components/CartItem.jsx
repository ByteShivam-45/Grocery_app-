import { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const [updating, setUpdating] = useState(false);

  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  const handleQtyChange = async (newQty) => {
    setUpdating(true);
    try {
      if (newQty <= 0) {
        await removeItem(product.id);
      } else {
        await updateQuantity(product.id, newQty);
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="item">
      <img src={product.imageUrl} alt={product.name} className="image" />
      <div className="details">
        <h3 className="name">{product.name}</h3>
        <p className="price">${product.price.toFixed(2)} each</p>
        <div className="controls">
          <button
            className="qtyBtn"
            onClick={() => handleQtyChange(quantity - 1)}
            disabled={updating}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty">{quantity}</span>
          <button
            className="qtyBtn"
            onClick={() => handleQtyChange(quantity + 1)}
            disabled={updating || quantity >= product.stock}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <div className="actions">
        <span className="lineTotal">${lineTotal.toFixed(2)}</span>
        <button
          className="btn btn-danger"
          onClick={() => handleQtyChange(0)}
          disabled={updating}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
