import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, formatPrice, isNewProduct, getProductCategory } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import './Editions.css';

// Product categories
type Category = 'all' | 'prints' | 'apparel' | 'objects';

// Placeholder products - used when Shopify isn't configured
const placeholderProducts = [
  {
    id: 'sacred-geometry-print-01',
    handle: 'sacred-geometry-print-01',
    title: 'Sacred Geometry I',
    category: 'prints',
    price: '45.00',
    comparePrice: null,
    edition: 'Open Edition',
    image: null,
    isNew: true,
    variantId: null,
  },
  {
    id: 'sacred-geometry-print-02',
    handle: 'sacred-geometry-print-02',
    title: 'Sacred Geometry II',
    category: 'prints',
    price: '45.00',
    comparePrice: null,
    edition: 'Open Edition',
    image: null,
    isNew: false,
    variantId: null,
  },
  {
    id: 'portal-series-print',
    handle: 'portal-series-print',
    title: 'Portal Series',
    category: 'prints',
    price: '85.00',
    comparePrice: null,
    edition: 'Limited Edition of 50',
    image: null,
    isNew: true,
    variantId: null,
  },
  {
    id: 'frequency-tee-black',
    handle: 'frequency-tee-black',
    title: 'Frequency Tee',
    category: 'apparel',
    price: '38.00',
    comparePrice: null,
    edition: null,
    image: null,
    isNew: false,
    variantId: null,
  },
  {
    id: 'geometric-hoodie',
    handle: 'geometric-hoodie',
    title: 'Geometric Hoodie',
    category: 'apparel',
    price: '65.00',
    comparePrice: null,
    edition: null,
    image: null,
    isNew: true,
    variantId: null,
  },
  {
    id: 'minimalist-backpack',
    handle: 'minimalist-backpack',
    title: 'Minimalist Backpack',
    category: 'objects',
    price: '60.00',
    comparePrice: null,
    edition: null,
    image: null,
    isNew: false,
    variantId: null,
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
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  // Fetch real products from Shopify
  const { products: shopifyProducts, isLoading, isConfigured } = useProducts();
  const { addToCart } = useCart();

  // Transform Shopify products to our format or use placeholders
  const products = useMemo(() => {
    if (!isConfigured || shopifyProducts.length === 0) {
      return placeholderProducts;
    }

    return shopifyProducts.map((product) => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      category: getProductCategory(product),
      price: product.priceRange.minVariantPrice.amount,
      currency: product.priceRange.minVariantPrice.currencyCode,
      comparePrice: product.compareAtPriceRange?.minVariantPrice?.amount || null,
      edition: product.tags.find((tag) => tag.toLowerCase().includes('edition')) || null,
      image: product.featuredImage?.url || null,
      imageAlt: product.featuredImage?.altText || product.title,
      isNew: isNewProduct(product.createdAt),
      variantId: product.variants[0]?.id || null,
    }));
  }, [shopifyProducts, isConfigured]);

  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  const handleQuickAdd = async (product: typeof products[0]) => {
    if (!product.variantId || !isConfigured) {
      // Show feedback even without Shopify
      setAddingToCart(product.id);
      setTimeout(() => setAddingToCart(null), 2000);
      return;
    }

    setAddingToCart(product.id);
    try {
      await addToCart(product.variantId, 1);
    } finally {
      setTimeout(() => setAddingToCart(null), 500);
    }
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
          {isLoading ? (
            <div className="editions__loading">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="editions__grid">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="product-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link to={`/editions/${product.handle}`} className="product-card__link">
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
                        <span className="product-card__price">
                          {formatPrice(product.price, product.currency || 'USD')}
                        </span>
                        {product.comparePrice && (
                          <span className="product-card__compare-price">
                            {formatPrice(product.comparePrice, product.currency || 'USD')}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Quick Add */}
                  <button
                    className={`product-card__add ${
                      addingToCart === product.id ? 'product-card__add--added' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickAdd(product);
                    }}
                  >
                    {addingToCart === product.id ? 'Added' : 'Quick Add'}
                  </button>
                </article>
              ))}
            </div>
          )}

          {!isConfigured && (
            <p className="editions__config-note meta">
              Connect Shopify to load real products. See .env.example for setup.
            </p>
          )}
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
