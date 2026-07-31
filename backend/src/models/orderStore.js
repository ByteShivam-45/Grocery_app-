import { v4 as uuidv4 } from 'uuid';

const orders = new Map();

export function createOrder({ sessionId, items, customerName, address, total }) {
  const order = {
    id: uuidv4(),
    sessionId,
    items: items.map((item) => ({ ...item })),
    customerName,
    address,
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  return order;
}

export function getOrderById(id) {
  return orders.get(id) ?? null;
}

export function getAllOrders() {
  return Array.from(orders.values());
}
