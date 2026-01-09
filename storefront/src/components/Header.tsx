import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const navItems = [
  { path: '/originals', label: 'Originals' },
  { path: '/commissions', label: 'Commissions' },
  { path: '/editions', label: 'Editions' },
  { path: '/digital', label: 'Digital' },
  { path: '/archive', label: 'Archive' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, openCart } = useCart();

  const cartCount = cart?.totalQuantity || 0;

  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo / Wordmark */}
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Tonic Thought Studios</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-link ${
                location.pathname === item.path ? 'header__nav-link--active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <div className="header__actions">
          <button className="header__cart" aria-label="Open cart" onClick={openCart}>
            <span className="header__cart-text">Cart</span>
            <span className="header__cart-count">{cartCount}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`header__menu-toggle ${menuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="header__menu-line" />
          <span className="header__menu-line" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`header__mobile-nav ${menuOpen ? 'header__mobile-nav--open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className="header__mobile-link"
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
