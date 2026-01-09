import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    isLoading,
    closeCart,
    updateQuantity,
    removeFromCart,
    isConfigured,
  } = useCart();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  const formatPrice = (amount: string, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(parseFloat(amount));
  };

  if (!isConfigured) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--open' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Cart</h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
            <span className="cart-drawer__close-icon">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer__content">
          {!cart || cart.lines.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is empty</p>
              <button className="cta" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {cart.lines.map((line) => (
                <li key={line.id} className="cart-item">
                  {/* Image */}
                  <div className="cart-item__image">
                    {line.merchandise.product.featuredImage ? (
                      <img
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText || ''}
                      />
                    ) : (
                      <div className="cart-item__placeholder" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="cart-item__info">
                    <h3 className="cart-item__title">
                      {line.merchandise.product.title}
                    </h3>
                    {line.merchandise.selectedOptions.length > 0 && (
                      <span className="cart-item__variant meta">
                        {line.merchandise.selectedOptions
                          .map((opt) => opt.value)
                          .join(' / ')}
                      </span>
                    )}
                    <span className="cart-item__price">
                      {formatPrice(
                        line.merchandise.price.amount,
                        line.merchandise.price.currencyCode
                      )}
                    </span>

                    {/* Quantity */}
                    <div className="cart-item__quantity">
                      <button
                        className="cart-item__quantity-btn"
                        onClick={() =>
                          line.quantity > 1
                            ? updateQuantity(line.id, line.quantity - 1)
                            : removeFromCart(line.id)
                        }
                        disabled={isLoading}
                      >
                        −
                      </button>
                      <span className="cart-item__quantity-value">{line.quantity}</span>
                      <button
                        className="cart-item__quantity-btn"
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        disabled={isLoading}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(line.id)}
                    disabled={isLoading}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span>
                {formatPrice(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode
                )}
              </span>
            </div>
            <p className="cart-drawer__note meta">
              Shipping and taxes calculated at checkout
            </p>
            <a
              href={cart.checkoutUrl}
              className="cart-drawer__checkout cta cta--outlined"
            >
              Checkout
            </a>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="cart-drawer__loading">
            <span>Updating...</span>
          </div>
        )}
      </div>
    </>
  );
}
