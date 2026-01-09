import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Originals.css';

// Placeholder data - will connect to Shopify later
const originals = [
  {
    id: 'sacred-convergence',
    title: 'Sacred Convergence',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '48 × 60 in',
    status: 'available',
    image: null,
  },
  {
    id: 'thought-form-i',
    title: 'Thought Form I',
    year: 2024,
    medium: 'Acrylic and gold leaf on panel',
    dimensions: '36 × 36 in',
    status: 'available',
    image: null,
  },
  {
    id: 'frequency-study',
    title: 'Frequency Study',
    year: 2023,
    medium: 'Mixed media on canvas',
    dimensions: '24 × 30 in',
    status: 'sold',
    image: null,
  },
  {
    id: 'geometric-meditation',
    title: 'Geometric Meditation',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '40 × 50 in',
    status: 'available',
    image: null,
  },
  {
    id: 'portal-series-iii',
    title: 'Portal Series III',
    year: 2023,
    medium: 'Acrylic on canvas',
    dimensions: '60 × 72 in',
    status: 'sold',
    image: null,
  },
  {
    id: 'silent-architecture',
    title: 'Silent Architecture',
    year: 2024,
    medium: 'Oil and charcoal on canvas',
    dimensions: '30 × 40 in',
    status: 'available',
    image: null,
  },
];

type FilterStatus = 'all' | 'available' | 'sold';

export default function Originals() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredOriginals = originals.filter((work) => {
    if (filter === 'all') return true;
    return work.status === filter;
  });

  const availableCount = originals.filter((w) => w.status === 'available').length;
  const soldCount = originals.filter((w) => w.status === 'sold').length;

  return (
    <div className="originals">
      {/* Hero */}
      <header className="originals__hero">
        <div className="container">
          <span className="meta">The Collection</span>
          <h1 className="originals__title">Originals</h1>
          <p className="originals__description">
            One-of-one paintings. Each piece exists once, by intention.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="originals__filter-bar">
        <div className="container">
          <div className="originals__filters">
            <button
              className={`originals__filter ${filter === 'all' ? 'originals__filter--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All <span className="originals__filter-count">{originals.length}</span>
            </button>
            <button
              className={`originals__filter ${filter === 'available' ? 'originals__filter--active' : ''}`}
              onClick={() => setFilter('available')}
            >
              Available <span className="originals__filter-count">{availableCount}</span>
            </button>
            <button
              className={`originals__filter ${filter === 'sold' ? 'originals__filter--active' : ''}`}
              onClick={() => setFilter('sold')}
            >
              Archive <span className="originals__filter-count">{soldCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="originals__gallery">
        <div className="container">
          <div className="originals__grid">
            {filteredOriginals.map((work, index) => (
              <article
                key={work.id}
                className={`original-card ${work.status === 'sold' ? 'original-card--sold' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/originals/${work.id}`} className="original-card__link">
                  {/* Image */}
                  <div className="original-card__image-wrapper">
                    <div className="original-card__image">
                      {work.image ? (
                        <img src={work.image} alt={work.title} />
                      ) : (
                        <div className="original-card__placeholder" />
                      )}
                    </div>
                    {work.status === 'sold' && (
                      <span className="original-card__status">Sold</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="original-card__info">
                    <h2 className="original-card__title">{work.title}</h2>
                    <div className="original-card__meta">
                      <span>{work.year}</span>
                      <span className="original-card__separator">·</span>
                      <span>{work.medium}</span>
                    </div>
                    <span className="original-card__dimensions meta">{work.dimensions}</span>
                  </div>

                  {/* CTA hint on hover */}
                  <div className="original-card__cta">
                    {work.status === 'available' ? 'View Work' : 'View Archive'}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Commission CTA */}
      <section className="originals__commission-cta section">
        <div className="container container--narrow">
          <div className="commission-prompt">
            <h2 className="commission-prompt__title">Looking for something specific?</h2>
            <p className="commission-prompt__text">
              Commissions are open for collectors seeking a collaborative creation.
            </p>
            <Link to="/commissions" className="cta cta--outlined">
              Inquire About Commissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
