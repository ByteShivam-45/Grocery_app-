import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], itemCount: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshCart = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getCart();
      setCart(data.cart);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId, quantity = 1) => {
    const data = await api.addToCart(productId, quantity);
    setCart(data.cart);
    return data.cart;
  };

  const updateQuantity = async (productId, quantity) => {
    const data = await api.updateCartItem(productId, quantity);
    setCart(data.cart);
    return data.cart;
  };

  const removeItem = async (productId) => {
    const data = await api.removeFromCart(productId);
    setCart(data.cart);
    return data.cart;
  };

  const clearCart = async () => {
    const data = await api.clearCart();
    setCart(data.cart);
    return data.cart;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        refreshCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
