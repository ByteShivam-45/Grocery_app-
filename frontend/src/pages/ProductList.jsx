import { useState, useEffect } from 'react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .getProducts(selectedCategory || undefined)
      .then((data) => {
        setProducts(data.products);
        setCategories(data.categories);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="heroTitle">Fresh Groceries, Delivered</h1>
          <p className="heroText">
            Browse our selection of fresh fruits, vegetables, dairy, and more.
          </p>
        </div>
      </section>

      <main className="main container">
        <div className="filters">
          <button
            className={`filterBtn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filterBtn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h2>No products found</h2>
            <p>Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
