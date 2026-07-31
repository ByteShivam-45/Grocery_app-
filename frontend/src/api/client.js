const SESSION_KEY = 'grocery-session-id';
const API_BASE = import.meta.env.VITE_API_URL || '';

function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

async function request(path, options = {}) {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': sessionId,
      ...options.headers,
    },
  });

  const newSessionId = response.headers.get('X-Session-Id');
  if (newSessionId) {
    localStorage.setItem(SESSION_KEY, newSessionId);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  return data;
}

export const api = {
  getProducts: (category) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/api/products${query}`);
  },

  getProduct: (id) => request(`/api/products/${id}`),

  getCart: () => request('/api/cart'),

  addToCart: (productId, quantity = 1) =>
    request('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),

  updateCartItem: (productId, quantity) =>
    request(`/api/cart/items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),

  removeFromCart: (productId) =>
    request(`/api/cart/items/${productId}`, { method: 'DELETE' }),

  clearCart: () => request('/api/cart', { method: 'DELETE' }),

  placeOrder: (customerName, address) =>
    request('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ customerName, address }),
    }),

  getOrder: (id) => request(`/api/orders/${id}`),
};

export { getSessionId };
