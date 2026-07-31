import { Router } from 'express';
import { getAllProducts, getProductById, getCategories } from '../models/productStore.js';

const router = Router();

router.get('/', (req, res) => {
  const { category } = req.query;
  const products = getAllProducts(category);
  res.json({ products, categories: getCategories() });
});

router.get('/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ product });
});

export default router;
