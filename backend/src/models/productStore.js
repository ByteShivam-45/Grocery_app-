import seedProducts from '../data/seedProducts.json' with { type: 'json' };

const products = seedProducts.map((p) => ({ ...p }));

export function getAllProducts(category) {
  if (category) {
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

export function reduceStock(productId, quantity) {
  const product = products.find((p) => p.id === productId);
  if (!product) return false;
  if (product.stock < quantity) return false;
  product.stock -= quantity;
  return true;
}

export function checkStock(productId, quantity) {
  const product = products.find((p) => p.id === productId);
  if (!product) return { ok: false, error: 'Product not found' };
  if (product.stock < quantity) {
    return { ok: false, error: `Only ${product.stock} in stock for ${product.name}` };
  }
  return { ok: true, stock: product.stock };
}
