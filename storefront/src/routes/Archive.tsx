import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Archive.css';

interface ArchivedWork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  series?: string;
  image: string | null;
  soldDate: string;
  collector?: string; // Optional - some collectors prefer anonymity
}

// Placeholder archived works
const archivedWorks: ArchivedWork[] = [
  {
    id: 'emergence-i',
    title: 'Emergence I',
    year: '2023',
    medium: 'Oil on canvas',
    dimensions: '36" × 48"',
    series: 'Emergence',
    image: null,
    soldDate: '2023-09-15',
    collector: 'Private Collection, Los Angeles',
  },
  {
    id: 'void-meditation-03',
    title: 'Void Meditation 03',
    year: '2023',
    medium: 'Acrylic and gold leaf on panel',
    dimensions: '24" × 24"',
    series: 'Void Meditations',
    image: null,
    soldDate: '2023-07-22',
  },
  {
    id: 'portal-study-alpha',
    title: 'Portal Study Alpha',
    year: '2022',
    medium: 'Mixed media on canvas',
    dimensions: '30" × 40"',
    series: 'Portal Studies',
    image: null,
    soldDate: '2023-04-10',
    collector: 'Private Collection, New York',
  },
  {
    id: 'sacred-form-ii',
    title: 'Sacred Form II',
    year: '2022',
    medium: 'Oil on linen',
    dimensions: '48" × 60"',
    image: null,
    soldDate: '2022-12-01',
  },
  {
    id: 'frequency-01',
    title: 'Frequency 01',
    year: '2022',
    medium: 'Acrylic on canvas',
    dimensions: '20" × 30"',
    series: 'Frequency',
    image: null,
    soldDate: '2022-11-18',
    collector: 'Private Collection, London',
  },
  {
    id: 'inner-landscape-dawn',
    title: 'Inner Landscape: Dawn',
    year: '2022',
    medium: 'Oil on panel',
    dimensions: '18" × 24"',
    series: 'Inner Landscapes',
    image: null,
    soldDate: '2022-08-05',
  },
  {
    id: 'threshold-iii',
    title: 'Threshold III',
    year: '2021',
    medium: 'Mixed media on canvas',
    dimensions: '40" × 50"',
    series: 'Thresholds',
    image: null,
    soldDate: '2022-03-20',
    collector: 'Corporate Collection',
  },
  {
    id: 'meditation-in-blue',
    title: 'Meditation in Blue',
    year: '2021',
    medium: 'Oil on canvas',
    dimensions: '36" × 36"',
    image: null,
    soldDate: '2021-10-15',
  },
];

// Get unique years from archived works
const years = [...new Set(archivedWorks.map((w) => w.year))].sort((a, b) => b.localeCompare(a));

export default function Archive() {
  const [selectedYear, setSelectedYear] = useState<string | 'all'>('all');
  const [selectedWork, setSelectedWork] = useState<ArchivedWork | null>(null);

  const filteredWorks = archivedWorks.filter((work) => {
    if (selectedYear === 'all') return true;
    return work.year === selectedYear;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="archive">
      {/* Hero */}
      <header className="archive__hero">
        <div className="container">
          <span className="meta">Collection</span>
          <h1 className="archive__title">Archive</h1>
          <p className="archive__subtitle">
            Works that have found their homes. A record of creative journeys completed.
          </p>
        </div>
      </header>

      {/* Year Filter */}
      <div className="archive__filter-bar">
        <div className="container">
          <div className="archive__filters">
            <button
              className={`archive__filter ${selectedYear === 'all' ? 'archive__filter--active' : ''}`}
              onClick={() => setSelectedYear('all')}
            >
              All Years
              <span className="archive__filter-count">{archivedWorks.length}</span>
            </button>
            {years.map((year) => (
              <button
                key={year}
                className={`archive__filter ${selectedYear === year ? 'archive__filter--active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
                <span className="archive__filter-count">
                  {archivedWorks.filter((w) => w.year === year).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Works Grid */}
      <section className="archive__grid-section">
        <div className="container">
          <div className="archive__grid">
            {filteredWorks.map((work, index) => (
              <article
                key={work.id}
                className="archive-card"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedWork(work)}
              >
                {/* Image */}
                <div className="archive-card__image">
                  {work.image ? (
                    <img src={work.image} alt={work.title} />
                  ) : (
                    <div className="archive-card__placeholder" />
                  )}
                  <div className="archive-card__overlay">
                    <span className="archive-card__view">View Details</span>
                  </div>
                  <span className="archive-card__badge">Sold</span>
                </div>

                {/* Info */}
                <div className="archive-card__info">
                  <h2 className="archive-card__title">{work.title}</h2>
                  <div className="archive-card__meta">
                    <span className="archive-card__year">{work.year}</span>
                    {work.series && (
                      <span className="archive-card__series">{work.series}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredWorks.length === 0 && (
            <div className="archive__empty">
              <p>No archived works from this period.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="archive__cta section">
        <div className="container container--narrow">
          <div className="archive__cta-content">
            <h2 className="archive__cta-title">Looking for available works?</h2>
            <p className="archive__cta-text">
              Explore original paintings currently seeking their forever homes,
              or commission a custom piece.
            </p>
            <div className="archive__cta-links">
              <Link to="/originals" className="cta">
                Available Originals
              </Link>
              <Link to="/commissions" className="cta cta--outlined">
                Commission a Piece
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedWork && (
        <div className="archive-modal" onClick={() => setSelectedWork(null)}>
          <div className="archive-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="archive-modal__close" onClick={() => setSelectedWork(null)}>
              ×
            </button>

            <div className="archive-modal__grid">
              {/* Image */}
              <div className="archive-modal__image">
                {selectedWork.image ? (
                  <img src={selectedWork.image} alt={selectedWork.title} />
                ) : (
                  <div className="archive-modal__placeholder" />
                )}
              </div>

              {/* Details */}
              <div className="archive-modal__details">
                <span className="archive-modal__sold-badge">
                  Sold {formatDate(selectedWork.soldDate)}
                </span>

                <h2 className="archive-modal__title">{selectedWork.title}</h2>

                {selectedWork.series && (
                  <p className="archive-modal__series">From the {selectedWork.series} series</p>
                )}

                <dl className="archive-modal__specs">
                  <div className="archive-modal__spec">
                    <dt>Year</dt>
                    <dd>{selectedWork.year}</dd>
                  </div>
                  <div className="archive-modal__spec">
                    <dt>Medium</dt>
                    <dd>{selectedWork.medium}</dd>
                  </div>
                  <div className="archive-modal__spec">
                    <dt>Dimensions</dt>
                    <dd>{selectedWork.dimensions}</dd>
                  </div>
                  {selectedWork.collector && (
                    <div className="archive-modal__spec">
                      <dt>Collection</dt>
                      <dd>{selectedWork.collector}</dd>
                    </div>
                  )}
                </dl>

                <div className="archive-modal__note">
                  <p>
                    This original work has found its home. Interested in a similar piece?
                  </p>
                  <Link to="/commissions" className="cta cta--small">
                    Discuss a Commission
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
