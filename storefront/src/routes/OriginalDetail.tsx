import { useParams, Link } from 'react-router-dom';
import './OriginalDetail.css';

// Placeholder data - will connect to Shopify later
const originalsData: Record<string, {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  status: 'available' | 'sold';
  price?: string;
  description?: string;
  image: string | null;
}> = {
  'sacred-convergence': {
    id: 'sacred-convergence',
    title: 'Sacred Convergence',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '48 × 60 in',
    status: 'available',
    price: 'Price upon request',
    description: 'A meditation on the intersection of geometric form and organic movement. The central convergence point draws the eye inward while peripheral shapes suggest infinite expansion.',
    image: null,
  },
  'thought-form-i': {
    id: 'thought-form-i',
    title: 'Thought Form I',
    year: 2024,
    medium: 'Acrylic and gold leaf on panel',
    dimensions: '36 × 36 in',
    status: 'available',
    price: 'Price upon request',
    description: 'First in a series exploring the visual manifestation of concentrated intention. Gold leaf elements activate under changing light conditions.',
    image: null,
  },
  'frequency-study': {
    id: 'frequency-study',
    title: 'Frequency Study',
    year: 2023,
    medium: 'Mixed media on canvas',
    dimensions: '24 × 30 in',
    status: 'sold',
    description: 'An investigation into the visual representation of sound frequencies. Sold to a private collection.',
    image: null,
  },
};

export default function OriginalDetail() {
  const { id } = useParams<{ id: string }>();
  const work = id ? originalsData[id] : null;

  if (!work) {
    return (
      <div className="original-detail original-detail--not-found">
        <div className="container">
          <h1>Work not found</h1>
          <Link to="/originals" className="cta">Return to Originals</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="original-detail">
      {/* Back navigation */}
      <nav className="original-detail__nav">
        <div className="container">
          <Link to="/originals" className="original-detail__back">
            <span className="original-detail__back-arrow">←</span>
            <span>Originals</span>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="original-detail__content">
        <div className="container">
          <div className="original-detail__grid">
            {/* Image - dominant */}
            <div className="original-detail__image-column">
              <div className="original-detail__image">
                {work.image ? (
                  <img src={work.image} alt={work.title} />
                ) : (
                  <div className="original-detail__placeholder" />
                )}
              </div>
            </div>

            {/* Info - quiet, supportive */}
            <div className="original-detail__info-column">
              <div className="original-detail__info">
                {/* Status badge */}
                {work.status === 'sold' && (
                  <span className="original-detail__status meta">Sold</span>
                )}

                {/* Title */}
                <h1 className="original-detail__title">{work.title}</h1>

                {/* Meta */}
                <dl className="original-detail__meta">
                  <div className="original-detail__meta-row">
                    <dt>Year</dt>
                    <dd>{work.year}</dd>
                  </div>
                  <div className="original-detail__meta-row">
                    <dt>Medium</dt>
                    <dd>{work.medium}</dd>
                  </div>
                  <div className="original-detail__meta-row">
                    <dt>Dimensions</dt>
                    <dd>{work.dimensions}</dd>
                  </div>
                  {work.price && work.status === 'available' && (
                    <div className="original-detail__meta-row">
                      <dt>Price</dt>
                      <dd>{work.price}</dd>
                    </div>
                  )}
                </dl>

                {/* Description */}
                {work.description && (
                  <p className="original-detail__description">{work.description}</p>
                )}

                {/* CTA */}
                {work.status === 'available' ? (
                  <div className="original-detail__cta">
                    <button className="cta cta--outlined original-detail__inquire">
                      Inquire About This Work
                    </button>
                    <p className="original-detail__cta-note meta">
                      Includes certificate of authenticity
                    </p>
                  </div>
                ) : (
                  <div className="original-detail__sold-notice">
                    <p>This work has found its home.</p>
                    <Link to="/originals" className="cta">
                      View Available Works
                    </Link>
                  </div>
                )}
              </div>

              {/* Provenance section */}
              <div className="original-detail__provenance">
                <h3 className="original-detail__provenance-title meta">Provenance</h3>
                <p className="original-detail__provenance-text">
                  Directly from the artist's studio.
                  <br />
                  Signed and dated on verso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commission prompt */}
      <section className="original-detail__commission section">
        <div className="container container--narrow">
          <div className="commission-prompt">
            <h2 className="commission-prompt__title">Seeking something specific?</h2>
            <p className="commission-prompt__text">
              Commission a work tailored to your vision.
            </p>
            <Link to="/commissions" className="cta">
              Learn About Commissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
