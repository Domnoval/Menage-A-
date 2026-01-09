import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EditionDetail.css';

// Placeholder product data - will connect to Shopify
const productsData: Record<string, {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  edition: string | null;
  sizes: string[] | null;
  details: string[];
  image: string | null;
}> = {
  'sacred-geometry-print-01': {
    id: 'sacred-geometry-print-01',
    title: 'Sacred Geometry I',
    category: 'prints',
    price: 45,
    description: 'A study in fundamental geometric relationships. Clean lines and precise proportions create a meditation on mathematical harmony.',
    edition: 'Open Edition',
    sizes: ['8×10', '11×14', '16×20', '24×30'],
    details: [
      'Giclée print on archival matte paper',
      'Fade-resistant pigment inks',
      'Ships flat in protective packaging',
      'Printed on demand',
    ],
    image: null,
  },
  'portal-series-print': {
    id: 'portal-series-print',
    title: 'Portal Series',
    category: 'prints',
    price: 85,
    description: 'From the Portal Series exploring thresholds between spaces. Each print is numbered and includes a certificate of authenticity.',
    edition: 'Limited Edition of 50',
    sizes: ['16×20', '24×30'],
    details: [
      'Giclée print on museum-grade cotton rag',
      'Hand-numbered and signed',
      'Certificate of authenticity included',
      'Ships in archival tube',
    ],
    image: null,
  },
  'frequency-tee-black': {
    id: 'frequency-tee-black',
    title: 'Frequency Tee',
    category: 'apparel',
    price: 38,
    description: 'Minimal geometric design on premium cotton. Comfortable enough for the studio, sharp enough for anywhere.',
    edition: null,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    details: [
      '100% ring-spun cotton',
      'Pre-shrunk, true to size',
      'Screen printed in USA',
      'Machine washable',
    ],
    image: null,
  },
  'minimalist-backpack': {
    id: 'minimalist-backpack',
    title: 'Minimalist Backpack',
    category: 'objects',
    price: 60,
    description: 'Clean lines, functional design. Enough room for your essentials without the bulk.',
    edition: null,
    sizes: null,
    details: [
      'Water-resistant polyester exterior',
      'Padded laptop sleeve (fits 15")',
      'Interior organizer pockets',
      'Adjustable padded straps',
    ],
    image: null,
  },
};

const sizeGuide: Record<string, Record<string, string>> = {
  apparel: {
    'S': 'Chest 34-36"',
    'M': 'Chest 38-40"',
    'L': 'Chest 42-44"',
    'XL': 'Chest 46-48"',
    '2XL': 'Chest 50-52"',
  },
};

export default function EditionDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? productsData[id] : null;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="edition-detail edition-detail--not-found">
        <div className="container">
          <h1>Product not found</h1>
          <Link to="/editions" className="cta">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const needsSize = product.sizes && product.sizes.length > 0;

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) return;

    setIsAdding(true);
    // Will connect to Shopify cart later
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    }, 1000);
  };

  return (
    <div className="edition-detail">
      {/* Back navigation */}
      <nav className="edition-detail__nav">
        <div className="container">
          <Link to="/editions" className="edition-detail__back">
            <span className="edition-detail__back-arrow">←</span>
            <span>Shop</span>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="edition-detail__content">
        <div className="container">
          <div className="edition-detail__grid">
            {/* Image */}
            <div className="edition-detail__image-column">
              <div className="edition-detail__image">
                {product.image ? (
                  <img src={product.image} alt={product.title} />
                ) : (
                  <div className="edition-detail__placeholder" />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="edition-detail__info-column">
              <div className="edition-detail__info">
                {/* Category */}
                <span className="edition-detail__category meta">
                  {product.category}
                </span>

                {/* Title */}
                <h1 className="edition-detail__title">{product.title}</h1>

                {/* Edition */}
                {product.edition && (
                  <span className="edition-detail__edition">{product.edition}</span>
                )}

                {/* Price */}
                <div className="edition-detail__price">${product.price}</div>

                {/* Description */}
                <p className="edition-detail__description">{product.description}</p>

                {/* Size Selector */}
                {needsSize && (
                  <div className="edition-detail__sizes">
                    <div className="edition-detail__sizes-header">
                      <span className="edition-detail__sizes-label">
                        {product.category === 'apparel' ? 'Size' : 'Print Size'}
                      </span>
                      {product.category === 'apparel' && (
                        <button className="edition-detail__size-guide">Size Guide</button>
                      )}
                    </div>
                    <div className="edition-detail__size-options">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          className={`edition-detail__size ${
                            selectedSize === size ? 'edition-detail__size--selected' : ''
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {product.category === 'apparel' && selectedSize && sizeGuide.apparel[selectedSize] && (
                      <span className="edition-detail__size-info meta">
                        {sizeGuide.apparel[selectedSize]}
                      </span>
                    )}
                  </div>
                )}

                {/* Quantity */}
                <div className="edition-detail__quantity">
                  <span className="edition-detail__quantity-label">Quantity</span>
                  <div className="edition-detail__quantity-controls">
                    <button
                      className="edition-detail__quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="edition-detail__quantity-value">{quantity}</span>
                    <button
                      className="edition-detail__quantity-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  className={`edition-detail__add-to-cart cta cta--outlined ${
                    isAdded ? 'edition-detail__add-to-cart--added' : ''
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAdding || (needsSize && !selectedSize)}
                >
                  {isAdding ? 'Adding...' : isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>

                {needsSize && !selectedSize && (
                  <span className="edition-detail__select-size-hint meta">
                    Please select a size
                  </span>
                )}

                {/* Details */}
                <div className="edition-detail__details">
                  <h3 className="edition-detail__details-title">Details</h3>
                  <ul className="edition-detail__details-list">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {/* Shipping note */}
                <div className="edition-detail__shipping">
                  <p>
                    <strong>Shipping:</strong> Printed on demand. Ships within 3-5 business days.
                    Worldwide delivery available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
