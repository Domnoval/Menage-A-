import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Commissions.css';

// Example past commissions
const pastCommissions = [
  {
    id: 1,
    title: 'Private Collection, Los Angeles',
    year: 2024,
    description: 'Large-scale geometric meditation for residential space',
    image: null,
  },
  {
    id: 2,
    title: 'Corporate Installation, New York',
    year: 2023,
    description: 'Triptych exploring sacred proportions',
    image: null,
  },
  {
    id: 3,
    title: 'Private Collection, London',
    year: 2023,
    description: 'Portal series piece with custom color palette',
    image: null,
  },
];

export default function Commissions() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    timeline: '',
    budget: '',
    vision: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission - will connect to real backend later
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="commissions">
      {/* Hero */}
      <header className="commissions__hero">
        <div className="container container--narrow">
          <span className="meta">Collaboration</span>
          <h1 className="commissions__title">Commissions</h1>
          <p className="commissions__subtitle">
            A commissioned work is not a transaction.
            <br />
            It is a collaboration between vision and craft.
          </p>
        </div>
      </header>

      {/* Philosophy / What to Expect */}
      <section className="commissions__philosophy section">
        <div className="container container--narrow">
          <div className="philosophy-grid">
            <div className="philosophy-block">
              <h2 className="philosophy-block__title">What This Is</h2>
              <ul className="philosophy-block__list">
                <li>A collaborative process guided by your vision</li>
                <li>Original artwork created specifically for your space</li>
                <li>Direct communication throughout the journey</li>
                <li>A piece that exists nowhere else</li>
              </ul>
            </div>

            <div className="philosophy-block">
              <h2 className="philosophy-block__title">What This Isn't</h2>
              <ul className="philosophy-block__list philosophy-block__list--negative">
                <li>Rush orders or unrealistic timelines</li>
                <li>Reproductions of existing work</li>
                <li>Unlimited revisions without scope</li>
                <li>Work that compromises artistic integrity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="commissions__process section section--dark">
        <div className="container container--narrow">
          <header className="section-header">
            <span className="meta">The Journey</span>
            <h2 className="section-title">Process</h2>
          </header>

          <div className="process-steps">
            <div className="process-step">
              <span className="process-step__number">01</span>
              <h3 className="process-step__title">Inquiry</h3>
              <p className="process-step__description">
                Submit your application. Share your vision, space, and intentions.
                I review each inquiry personally.
              </p>
            </div>

            <div className="process-step">
              <span className="process-step__number">02</span>
              <h3 className="process-step__title">Consultation</h3>
              <p className="process-step__description">
                If there's alignment, we'll have a conversation. We discuss scope,
                timeline, and establish mutual understanding.
              </p>
            </div>

            <div className="process-step">
              <span className="process-step__number">03</span>
              <h3 className="process-step__title">Proposal</h3>
              <p className="process-step__description">
                I'll prepare a detailed proposal including concept sketches,
                materials, dimensions, timeline, and investment.
              </p>
            </div>

            <div className="process-step">
              <span className="process-step__number">04</span>
              <h3 className="process-step__title">Creation</h3>
              <p className="process-step__description">
                With a 50% deposit, work begins. You'll receive progress updates
                at key milestones throughout the process.
              </p>
            </div>

            <div className="process-step">
              <span className="process-step__number">05</span>
              <h3 className="process-step__title">Completion</h3>
              <p className="process-step__description">
                Final balance due upon completion. Includes certificate of
                authenticity, documentation, and care instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Timeline */}
      <section className="commissions__details section">
        <div className="container container--narrow">
          <div className="details-grid">
            <div className="detail-block">
              <h3 className="detail-block__title meta">Investment</h3>
              <p className="detail-block__value">Starting at $3,000</p>
              <p className="detail-block__note">
                Final investment depends on size, complexity, materials, and timeline.
                Custom framing available.
              </p>
            </div>

            <div className="detail-block">
              <h3 className="detail-block__title meta">Timeline</h3>
              <p className="detail-block__value">4–12 weeks</p>
              <p className="detail-block__note">
                Varies by scope and current studio capacity.
                Rush timelines considered on case-by-case basis.
              </p>
            </div>

            <div className="detail-block">
              <h3 className="detail-block__title meta">Availability</h3>
              <p className="detail-block__value">Limited Slots</p>
              <p className="detail-block__note">
                I accept a limited number of commissions to ensure
                each piece receives full attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Commissions */}
      <section className="commissions__past section section--dark">
        <div className="container">
          <header className="section-header">
            <span className="meta">Previous Work</span>
            <h2 className="section-title">Past Commissions</h2>
          </header>

          <div className="past-commissions-grid">
            {pastCommissions.map((commission) => (
              <article key={commission.id} className="past-commission">
                <div className="past-commission__image">
                  {commission.image ? (
                    <img src={commission.image} alt={commission.title} />
                  ) : (
                    <div className="past-commission__placeholder" />
                  )}
                </div>
                <div className="past-commission__info">
                  <h3 className="past-commission__title">{commission.title}</h3>
                  <span className="past-commission__year meta">{commission.year}</span>
                  <p className="past-commission__description">{commission.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="commissions__apply section" id="apply">
        <div className="container container--narrow">
          <header className="section-header">
            <span className="meta">Begin</span>
            <h2 className="section-title">Apply for a Commission</h2>
            <p className="commissions__apply-intro">
              Tell me about your vision. All fields help me understand
              if we're the right fit for each other.
            </p>
          </header>

          {isSubmitted ? (
            <div className="commission-form__success">
              <h3>Application Received</h3>
              <p>
                Thank you for your inquiry. I review each application personally
                and will respond within 5–7 business days.
              </p>
              <Link to="/originals" className="cta">
                View Available Originals
              </Link>
            </div>
          ) : (
            <form className="commission-form" onSubmit={handleSubmit}>
              <div className="commission-form__row">
                <div className="commission-form__field">
                  <label htmlFor="name" className="commission-form__label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="commission-form__input"
                  />
                </div>

                <div className="commission-form__field">
                  <label htmlFor="email" className="commission-form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="commission-form__input"
                  />
                </div>
              </div>

              <div className="commission-form__row">
                <div className="commission-form__field">
                  <label htmlFor="projectType" className="commission-form__label">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    required
                    className="commission-form__select"
                  >
                    <option value="">Select...</option>
                    <option value="residential">Residential / Private Collection</option>
                    <option value="corporate">Corporate / Commercial Space</option>
                    <option value="public">Public Installation</option>
                    <option value="gift">Gift / Special Occasion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="commission-form__field">
                  <label htmlFor="timeline" className="commission-form__label">
                    Ideal Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={handleChange}
                    required
                    className="commission-form__select"
                  >
                    <option value="">Select...</option>
                    <option value="flexible">Flexible / No Rush</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="specific">Specific date (explain below)</option>
                  </select>
                </div>
              </div>

              <div className="commission-form__field">
                <label htmlFor="budget" className="commission-form__label">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  required
                  className="commission-form__select"
                >
                  <option value="">Select...</option>
                  <option value="3-5k">$3,000 – $5,000</option>
                  <option value="5-10k">$5,000 – $10,000</option>
                  <option value="10-20k">$10,000 – $20,000</option>
                  <option value="20k+">$20,000+</option>
                  <option value="discuss">Prefer to discuss</option>
                </select>
              </div>

              <div className="commission-form__field">
                <label htmlFor="vision" className="commission-form__label">
                  Tell me about your vision
                </label>
                <textarea
                  id="vision"
                  name="vision"
                  value={formState.vision}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="commission-form__textarea"
                  placeholder="Describe the space, your intentions, any specific ideas or feelings you want the piece to evoke..."
                />
              </div>

              <div className="commission-form__submit">
                <button
                  type="submit"
                  className="cta cta--outlined commission-form__button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
                <p className="commission-form__note meta">
                  I respond to all inquiries within 5–7 business days.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="commissions__alternative section section--dark">
        <div className="container container--narrow">
          <div className="alternative-prompt">
            <h2 className="alternative-prompt__title">Not ready for a commission?</h2>
            <p className="alternative-prompt__text">
              Explore available originals or limited edition prints.
            </p>
            <div className="alternative-prompt__links">
              <Link to="/originals" className="cta">
                View Originals
              </Link>
              <Link to="/editions" className="cta">
                Browse Editions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
