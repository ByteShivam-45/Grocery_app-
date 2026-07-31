import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../models/cartStore.js';
import { getProductById, checkStock } from '../models/productStore.js';

const router = Router();

function populateCart(cart) {
  const items = cart.items.map((item) => {
    const product = getProductById(item.productId);
    return { ...item, product };
  }).filter((item) => item.product);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    sessionId: cart.sessionId,
    items,
    itemCount,
    subtotal: Math.round(subtotal * 100) / 100,
    updatedAt: cart.updatedAt,
  };
}

router.get('/', (req, res) => {
  const cart = getCart(req.sessionId);
  res.json({ cart: populateCart(cart) });
});

router.post('/items', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  const product = getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const cart = getCart(req.sessionId);
  const existing = cart.items.find((i) => i.productId === productId);
  const newQty = (existing?.quantity ?? 0) + quantity;

  const stockCheck = checkStock(productId, newQty);
  if (!stockCheck.ok) {
    return res.status(400).json({ error: stockCheck.error });
  }

  const updated = addToCart(req.sessionId, productId, quantity);
  res.status(201).json({ cart: populateCart(updated) });
});

router.patch('/items/:productId', (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity === undefined) {
    return res.status(400).json({ error: 'quantity is required' });
  }

  const stockCheck = checkStock(productId, quantity);
  if (quantity > 0 && !stockCheck.ok) {
    return res.status(400).json({ error: stockCheck.error });
  }

  const updated = updateCartItem(req.sessionId, productId, quantity);
  if (!updated) {
    return res.status(404).json({ error: 'Item not in cart' });
  }

  res.json({ cart: populateCart(updated) });
});

router.delete('/items/:productId', (req, res) => {
  const updated = removeFromCart(req.sessionId, req.params.productId);
  res.json({ cart: populateCart(updated) });
});

router.delete('/', (req, res) => {
  const updated = clearCart(req.sessionId);
  res.json({ cart: populateCart(updated) });
});

export default router;
