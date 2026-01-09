import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct, formatPrice } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import './EditionDetail.css';

export default function EditionDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error, isConfigured } = useProduct(id);
  const { addToCart, isLoading: cartLoading } = useCart();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Find selected variant based on options
  const selectedVariant = useMemo(() => {
    if (!product) return null;

    // If no options, return first variant
    if (product.options.length === 0 || Object.keys(selectedOptions).length === 0) {
      return product.variants[0];
    }

    return product.variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    );
  }, [product, selectedOptions]);

  // Initialize selected options with first values
  useMemo(() => {
    if (product && Object.keys(selectedOptions).length === 0) {
      const initial: Record<string, string> = {};
      product.options.forEach((option) => {
        initial[option.name] = option.values[0];
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !isConfigured) {
      setIsAdding(true);
      setTimeout(() => {
        setIsAdding(false);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
      }, 1000);
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(selectedVariant.id, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edition-detail edition-detail--loading">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="edition-detail edition-detail--not-found">
        <div className="container">
          <h1>Product not found</h1>
          <Link to="/editions" className="cta">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const hasOptions = product.options.length > 0 && product.options[0].values.length > 1;

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
                {product.featuredImage ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                  />
                ) : (
                  <div className="edition-detail__placeholder" />
                )}
              </div>

              {/* Additional images */}
              {product.images.length > 1 && (
                <div className="edition-detail__thumbnails">
                  {product.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="edition-detail__thumbnail">
                      <img src={image.url} alt={image.altText || ''} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="edition-detail__info-column">
              <div className="edition-detail__info">
                {/* Category */}
                <span className="edition-detail__category meta">
                  {product.productType || 'Product'}
                </span>

                {/* Title */}
                <h1 className="edition-detail__title">{product.title}</h1>

                {/* Price */}
                <div className="edition-detail__price">
                  {selectedVariant ? (
                    <>
                      {formatPrice(
                        selectedVariant.price.amount,
                        selectedVariant.price.currencyCode
                      )}
                      {selectedVariant.compareAtPrice && (
                        <span className="edition-detail__compare-price">
                          {formatPrice(
                            selectedVariant.compareAtPrice.amount,
                            selectedVariant.compareAtPrice.currencyCode
                          )}
                        </span>
                      )}
                    </>
                  ) : (
                    formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="edition-detail__description">{product.description}</p>
                )}

                {/* Options (Size, Color, etc.) */}
                {hasOptions && product.options.map((option) => (
                  <div key={option.name} className="edition-detail__option">
                    <div className="edition-detail__option-header">
                      <span className="edition-detail__option-label">{option.name}</span>
                    </div>
                    <div className="edition-detail__option-values">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          className={`edition-detail__option-btn ${
                            selectedOptions[option.name] === value
                              ? 'edition-detail__option-btn--selected'
                              : ''
                          }`}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                          }
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

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
                  disabled={isAdding || cartLoading || (selectedVariant && !selectedVariant.availableForSale)}
                >
                  {isAdding
                    ? 'Adding...'
                    : isAdded
                    ? 'Added to Cart'
                    : selectedVariant && !selectedVariant.availableForSale
                    ? 'Sold Out'
                    : 'Add to Cart'}
                </button>

                {/* Tags/Details */}
                {product.tags.length > 0 && (
                  <div className="edition-detail__tags">
                    {product.tags.map((tag) => (
                      <span key={tag} className="edition-detail__tag meta">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

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
