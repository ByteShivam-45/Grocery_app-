const carts = new Map();

function createEmptyCart(sessionId) {
  return {
    sessionId,
    items: [],
    updatedAt: new Date().toISOString(),
  };
}

export function getCart(sessionId) {
  if (!carts.has(sessionId)) {
    carts.set(sessionId, createEmptyCart(sessionId));
  }
  return carts.get(sessionId);
}

export function addToCart(sessionId, productId, quantity) {
  const cart = getCart(sessionId);
  const existing = cart.items.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  cart.updatedAt = new Date().toISOString();
  return cart;
}

export function updateCartItem(sessionId, productId, quantity) {
  const cart = getCart(sessionId);
  const item = cart.items.find((i) => i.productId === productId);

  if (!item) {
    return null;
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  cart.updatedAt = new Date().toISOString();
  return cart;
}

export function removeFromCart(sessionId, productId) {
  const cart = getCart(sessionId);
  cart.items = cart.items.filter((i) => i.productId !== productId);
  cart.updatedAt = new Date().toISOString();
  return cart;
}

export function clearCart(sessionId) {
  const cart = createEmptyCart(sessionId);
  carts.set(sessionId, cart);
  return cart;
}

export function getCartItemCount(sessionId) {
  const cart = getCart(sessionId);
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}
