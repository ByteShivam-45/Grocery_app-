import { Router } from 'express';
import { createOrder, getOrderById } from '../models/orderStore.js';
import { getCart, clearCart } from '../models/cartStore.js';
import { getProductById, reduceStock, checkStock } from '../models/productStore.js';

const router = Router();

function populateCartItems(cart) {
  return cart.items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);
}

router.post('/', (req, res) => {
  const { customerName, address } = req.body;

  if (!customerName?.trim()) {
    return res.status(400).json({ error: 'customerName is required' });
  }
  if (!address?.trim()) {
    return res.status(400).json({ error: 'address is required' });
  }

  const cart = getCart(req.sessionId);
  if (cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  for (const item of cart.items) {
    const stockCheck = checkStock(item.productId, item.quantity);
    if (!stockCheck.ok) {
      return res.status(400).json({ error: stockCheck.error });
    }
  }

  const populatedItems = populateCartItems(cart);
  const total = populatedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  for (const item of cart.items) {
    reduceStock(item.productId, item.quantity);
  }

  const order = createOrder({
    sessionId: req.sessionId,
    items: populatedItems,
    customerName: customerName.trim(),
    address: address.trim(),
    total: Math.round(total * 100) / 100,
  });

  clearCart(req.sessionId);

  res.status(201).json({ order });
});

router.get('/:id', (req, res) => {
  const order = getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ order });
});

export default router;
