import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero - Cinematic, breathing, not shouting */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">Where the frequency</span>
            <span className="hero__title-line">of creativity is allowed</span>
            <span className="hero__title-line">to come to fruition</span>
          </h1>
          <p className="hero__subtitle meta">
            Tonic Thought Studios
          </p>
        </div>
        <div className="hero__scroll-indicator">
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* Featured Work - The crown jewel preview */}
      <section className="featured section">
        <div className="container">
          <header className="section-header">
            <span className="meta">Featured</span>
            <h2 className="section-title">Latest Work</h2>
          </header>

          <div className="featured__grid">
            {/* Placeholder for featured artwork */}
            <article className="featured__item featured__item--large">
              <Link to="/originals/featured-piece" className="featured__link">
                <div className="featured__image">
                  <div className="featured__image-placeholder" />
                </div>
                <div className="featured__info">
                  <h3 className="featured__title">Untitled Original</h3>
                  <span className="featured__meta meta">2024 — Original Painting</span>
                </div>
              </Link>
            </article>

            <article className="featured__item">
              <Link to="/originals/piece-two" className="featured__link">
                <div className="featured__image">
                  <div className="featured__image-placeholder" />
                </div>
                <div className="featured__info">
                  <h3 className="featured__title">Sacred Form II</h3>
                  <span className="featured__meta meta">2024 — Original</span>
                </div>
              </Link>
            </article>

            <article className="featured__item">
              <Link to="/editions/limited-print" className="featured__link">
                <div className="featured__image">
                  <div className="featured__image-placeholder" />
                </div>
                <div className="featured__info">
                  <h3 className="featured__title">Geometric Study</h3>
                  <span className="featured__meta meta">Edition of 50</span>
                </div>
              </Link>
            </article>
          </div>

          <div className="section-footer">
            <Link to="/originals" className="cta">
              View All Originals
            </Link>
          </div>
        </div>
      </section>

      {/* Studio Wings - The navigation hint */}
      <section className="wings section section--dark">
        <div className="container">
          <header className="section-header">
            <span className="meta">Enter</span>
            <h2 className="section-title">The Studio</h2>
          </header>

          <nav className="wings__grid">
            <Link to="/originals" className="wing">
              <span className="wing__number meta">01</span>
              <h3 className="wing__title">Originals</h3>
              <p className="wing__description">
                One-of-one paintings. Crown jewels of the studio.
              </p>
            </Link>

            <Link to="/commissions" className="wing">
              <span className="wing__number meta">02</span>
              <h3 className="wing__title">Commissions</h3>
              <p className="wing__description">
                Collaborative creation. Limited availability.
              </p>
            </Link>

            <Link to="/editions" className="wing">
              <span className="wing__number meta">03</span>
              <h3 className="wing__title">Editions</h3>
              <p className="wing__description">
                Prints and objects. Your entry into the universe.
              </p>
            </Link>

            <Link to="/digital" className="wing">
              <span className="wing__number meta">04</span>
              <h3 className="wing__title">Digital</h3>
              <p className="wing__description">
                Artifacts and experiments. Signals, not content.
              </p>
            </Link>

            <Link to="/archive" className="wing">
              <span className="wing__number meta">05</span>
              <h3 className="wing__title">Archive</h3>
              <p className="wing__description">
                Past works. A record of what has passed through.
              </p>
            </Link>
          </nav>
        </div>
      </section>

      {/* About Glimpse */}
      <section className="about-glimpse section">
        <div className="container container--narrow">
          <blockquote className="about-glimpse__quote">
            <p>
              "The interface is not the destination. It is the condition under which ideas appear."
            </p>
          </blockquote>
          <div className="about-glimpse__cta">
            <Link to="/about" className="cta">
              About the Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture - Joining a cult, but a friendly one */}
      <section className="newsletter section section--dark">
        <div className="container container--narrow">
          <header className="newsletter__header">
            <h2 className="newsletter__title">Stay in the frequency</h2>
            <p className="newsletter__description">
              Occasional transmissions. New work, limited drops, studio dispatches.
            </p>
          </header>

          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="newsletter__input"
              required
            />
            <button type="submit" className="newsletter__submit cta cta--outlined">
              Subscribe
            </button>
          </form>

          <p className="newsletter__note meta">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
