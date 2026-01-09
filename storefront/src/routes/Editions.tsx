import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Editions.css';

// Product categories
type Category = 'all' | 'prints' | 'apparel' | 'objects';

// Placeholder products - will connect to Shopify/Printful
const products = [
  {
    id: 'sacred-geometry-print-01',
    title: 'Sacred Geometry I',
    category: 'prints',
    price: 45,
    comparePrice: null,
    edition: 'Open Edition',
    sizes: ['8×10', '11×14', '16×20', '24×30'],
    image: null,
    isNew: true,
  },
  {
    id: 'sacred-geometry-print-02',
    title: 'Sacred Geometry II',
    category: 'prints',
    price: 45,
    comparePrice: null,
    edition: 'Open Edition',
    sizes: ['8×10', '11×14', '16×20', '24×30'],
    image: null,
    isNew: false,
  },
  {
    id: 'portal-series-print',
    title: 'Portal Series',
    category: 'prints',
    price: 85,
    comparePrice: null,
    edition: 'Limited Edition of 50',
    sizes: ['16×20', '24×30'],
    image: null,
    isNew: true,
  },
  {
    id: 'frequency-tee-black',
    title: 'Frequency Tee',
    category: 'apparel',
    price: 38,
    comparePrice: null,
    edition: null,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: null,
    isNew: false,
  },
  {
    id: 'geometric-hoodie',
    title: 'Geometric Hoodie',
    category: 'apparel',
    price: 65,
    comparePrice: null,
    edition: null,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: null,
    isNew: true,
  },
  {
    id: 'minimalist-backpack',
    title: 'Minimalist Backpack',
    category: 'objects',
    price: 60,
    comparePrice: null,
    edition: null,
    sizes: null,
    image: null,
    isNew: false,
  },
  {
    id: 'thought-form-print',
    title: 'Thought Form',
    category: 'prints',
    price: 55,
    comparePrice: null,
    edition: 'Open Edition',
    sizes: ['11×14', '16×20', '24×30'],
    image: null,
    isNew: false,
  },
  {
    id: 'studio-tee-white',
    title: 'Studio Tee',
    category: 'apparel',
    price: 35,
    comparePrice: null,
    edition: null,
    sizes: ['S', 'M', 'L', 'XL'],
    image: null,
    isNew: false,
  },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'prints', label: 'Prints' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'objects', label: 'Objects' },
];

export default function Editions() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  const handleAddToCart = (productId: string) => {
    setAddedToCart(productId);
    // Will connect to Shopify cart later
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const getCategoryCount = (category: Category) => {
    if (category === 'all') return products.length;
    return products.filter((p) => p.category === category).length;
  };

  return (
    <div className="editions">
      {/* Hero */}
      <header className="editions__hero">
        <div className="container">
          <span className="meta">Shop</span>
          <h1 className="editions__title">Editions</h1>
          <p className="editions__subtitle">
            Prints, apparel, and objects. Your entry into the universe.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="editions__filter-bar">
        <div className="container">
          <div className="editions__filters">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`editions__filter ${
                  activeCategory === cat.value ? 'editions__filter--active' : ''
                }`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
                <span className="editions__filter-count">{getCategoryCount(cat.value)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="editions__grid-section">
        <div className="container">
          <div className="editions__grid">
            {filteredProducts.map((product, index) => (
              <article
                key={product.id}
                className="product-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link to={`/editions/${product.id}`} className="product-card__link">
                  {/* Image */}
                  <div className="product-card__image-wrapper">
                    <div className="product-card__image">
                      {product.image ? (
                        <img src={product.image} alt={product.title} />
                      ) : (
                        <div className="product-card__placeholder" />
                      )}
                    </div>
                    {product.isNew && <span className="product-card__badge">New</span>}
                  </div>

                  {/* Info */}
                  <div className="product-card__info">
                    <h2 className="product-card__title">{product.title}</h2>
                    {product.edition && (
                      <span className="product-card__edition meta">{product.edition}</span>
                    )}
                    <div className="product-card__price-row">
                      <span className="product-card__price">${product.price}</span>
                      {product.comparePrice && (
                        <span className="product-card__compare-price">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Quick Add */}
                <button
                  className={`product-card__add ${
                    addedToCart === product.id ? 'product-card__add--added' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product.id);
                  }}
                >
                  {addedToCart === product.id ? 'Added' : 'Quick Add'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prints Info Banner */}
      <section className="editions__info section section--dark">
        <div className="container">
          <div className="info-grid">
            <div className="info-block">
              <h3 className="info-block__title">Print Quality</h3>
              <p className="info-block__text">
                Museum-grade giclée prints on archival paper. Fade-resistant inks.
                Built to last generations.
              </p>
            </div>
            <div className="info-block">
              <h3 className="info-block__title">Shipping</h3>
              <p className="info-block__text">
                Printed on demand and shipped worldwide. Most orders arrive within
                5-10 business days.
              </p>
            </div>
            <div className="info-block">
              <h3 className="info-block__title">Returns</h3>
              <p className="info-block__text">
                30-day satisfaction guarantee. If something's not right, we'll make
                it right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Originals Upsell */}
      <section className="editions__upsell section">
        <div className="container container--narrow">
          <div className="upsell-prompt">
            <h2 className="upsell-prompt__title">Looking for something one-of-a-kind?</h2>
            <p className="upsell-prompt__text">
              Explore original paintings or commission a custom piece.
            </p>
            <div className="upsell-prompt__links">
              <Link to="/originals" className="cta">
                View Originals
              </Link>
              <Link to="/commissions" className="cta">
                Commissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
