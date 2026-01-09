import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Digital.css';

type DigitalCategory = 'all' | 'wallpapers' | 'textures' | 'tools';

interface DigitalItem {
  id: string;
  title: string;
  category: 'wallpapers' | 'textures' | 'tools';
  description: string;
  price: string | 'free';
  format: string;
  resolution?: string;
  image: string | null;
  downloadUrl?: string;
}

// Placeholder digital products
const digitalItems: DigitalItem[] = [
  {
    id: 'sacred-geometry-wallpaper-pack',
    title: 'Sacred Geometry Wallpaper Pack',
    category: 'wallpapers',
    description: '12 high-resolution wallpapers featuring sacred geometry patterns. Desktop and mobile versions included.',
    price: '15.00',
    format: 'PNG, JPG',
    resolution: '4K & Mobile',
    image: null,
  },
  {
    id: 'void-series-wallpapers',
    title: 'Void Series Wallpapers',
    category: 'wallpapers',
    description: 'Minimalist dark wallpapers from the Void series. Perfect for focus and clarity.',
    price: 'free',
    format: 'PNG',
    resolution: '4K',
    image: null,
  },
  {
    id: 'organic-texture-pack',
    title: 'Organic Texture Pack',
    category: 'textures',
    description: '24 seamless organic textures for digital art and design projects. Tileable and high-resolution.',
    price: '25.00',
    format: 'PNG, PSD',
    resolution: '4096x4096',
    image: null,
  },
  {
    id: 'noise-grain-overlays',
    title: 'Noise & Grain Overlays',
    category: 'textures',
    description: 'Film grain and noise overlays for adding texture to digital work. 20 variations.',
    price: '12.00',
    format: 'PNG',
    resolution: '4K',
    image: null,
  },
  {
    id: 'procreate-sacred-brushes',
    title: 'Procreate Sacred Geometry Brushes',
    category: 'tools',
    description: 'Custom Procreate brush set for creating sacred geometry patterns. 30 brushes included.',
    price: '18.00',
    format: 'Brushset',
    image: null,
  },
  {
    id: 'color-palette-collection',
    title: 'Studio Color Palettes',
    category: 'tools',
    description: 'Curated color palettes used in original works. Compatible with all major design software.',
    price: 'free',
    format: 'ASE, CLR, JSON',
    image: null,
  },
];

const categories: { value: DigitalCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wallpapers', label: 'Wallpapers' },
  { value: 'textures', label: 'Textures' },
  { value: 'tools', label: 'Tools' },
];

export default function Digital() {
  const [activeCategory, setActiveCategory] = useState<DigitalCategory>('all');
  const [selectedItem, setSelectedItem] = useState<DigitalItem | null>(null);

  const filteredItems = digitalItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getCategoryCount = (category: DigitalCategory) => {
    if (category === 'all') return digitalItems.length;
    return digitalItems.filter((item) => item.category === category).length;
  };

  const handleDownload = (item: DigitalItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="digital">
      {/* Hero */}
      <header className="digital__hero">
        <div className="container">
          <span className="meta">Downloads</span>
          <h1 className="digital__title">Digital Artifacts</h1>
          <p className="digital__subtitle">
            Wallpapers, textures, and creative tools. Bring the studio into your workflow.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="digital__filter-bar">
        <div className="container">
          <div className="digital__filters">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`digital__filter ${
                  activeCategory === cat.value ? 'digital__filter--active' : ''
                }`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
                <span className="digital__filter-count">{getCategoryCount(cat.value)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <section className="digital__grid-section">
        <div className="container">
          <div className="digital__grid">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className="digital-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Preview */}
                <div className="digital-card__preview">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className="digital-card__placeholder">
                      <span className="digital-card__icon">
                        {item.category === 'wallpapers' && '◇'}
                        {item.category === 'textures' && '▤'}
                        {item.category === 'tools' && '⚙'}
                      </span>
                    </div>
                  )}
                  {item.price === 'free' && (
                    <span className="digital-card__badge">Free</span>
                  )}
                </div>

                {/* Info */}
                <div className="digital-card__info">
                  <span className="digital-card__category meta">{item.category}</span>
                  <h2 className="digital-card__title">{item.title}</h2>
                  <p className="digital-card__description">{item.description}</p>

                  <div className="digital-card__meta">
                    <span className="digital-card__format">{item.format}</span>
                    {item.resolution && (
                      <span className="digital-card__resolution">{item.resolution}</span>
                    )}
                  </div>

                  <div className="digital-card__footer">
                    <span className="digital-card__price">
                      {item.price === 'free' ? 'Free' : `$${item.price}`}
                    </span>
                    <button
                      className="digital-card__btn cta cta--small"
                      onClick={() => handleDownload(item)}
                    >
                      {item.price === 'free' ? 'Download' : 'Purchase'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="digital__info section section--dark">
        <div className="container">
          <div className="info-grid">
            <div className="info-block">
              <h3 className="info-block__title">Instant Delivery</h3>
              <p className="info-block__text">
                Downloads are delivered instantly to your email after purchase.
                Access anytime from your account.
              </p>
            </div>
            <div className="info-block">
              <h3 className="info-block__title">Commercial License</h3>
              <p className="info-block__text">
                All paid items include a commercial license for personal and
                client projects.
              </p>
            </div>
            <div className="info-block">
              <h3 className="info-block__title">Updates Included</h3>
              <p className="info-block__text">
                Future updates and additions to purchased packs are included at
                no extra cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="digital__newsletter section">
        <div className="container container--narrow">
          <div className="newsletter-prompt">
            <h2 className="newsletter-prompt__title">Get notified of new releases</h2>
            <p className="newsletter-prompt__text">
              Be the first to know when new digital artifacts drop.
            </p>
            <form className="newsletter-prompt__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-prompt__input"
              />
              <button type="submit" className="cta">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Download/Purchase Modal */}
      {selectedItem && (
        <div className="digital-modal" onClick={closeModal}>
          <div className="digital-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="digital-modal__close" onClick={closeModal}>
              ×
            </button>
            <h2 className="digital-modal__title">{selectedItem.title}</h2>
            <p className="digital-modal__description">{selectedItem.description}</p>

            <div className="digital-modal__details">
              <div className="digital-modal__detail">
                <span className="digital-modal__label">Format</span>
                <span className="digital-modal__value">{selectedItem.format}</span>
              </div>
              {selectedItem.resolution && (
                <div className="digital-modal__detail">
                  <span className="digital-modal__label">Resolution</span>
                  <span className="digital-modal__value">{selectedItem.resolution}</span>
                </div>
              )}
              <div className="digital-modal__detail">
                <span className="digital-modal__label">Price</span>
                <span className="digital-modal__value">
                  {selectedItem.price === 'free' ? 'Free' : `$${selectedItem.price}`}
                </span>
              </div>
            </div>

            {selectedItem.price === 'free' ? (
              <div className="digital-modal__free">
                <p>Enter your email to receive the download link:</p>
                <form className="digital-modal__form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="your@email.com" />
                  <button type="submit" className="cta">
                    Get Download Link
                  </button>
                </form>
              </div>
            ) : (
              <div className="digital-modal__purchase">
                <p className="digital-modal__note">
                  This item will be available for purchase through Shopify soon.
                </p>
                <Link to="/editions" className="cta">
                  Browse Shop
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
