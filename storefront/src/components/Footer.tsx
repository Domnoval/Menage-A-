import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            Tonic Thought Studios
          </Link>
          <p className="footer__tagline">
            Where the frequency of creativity is allowed to come to fruition.
          </p>
        </div>

        {/* Navigation */}
        <nav className="footer__nav">
          <div className="footer__nav-group">
            <span className="footer__nav-label">Studio</span>
            <Link to="/originals" className="footer__link">Originals</Link>
            <Link to="/commissions" className="footer__link">Commissions</Link>
            <Link to="/editions" className="footer__link">Editions</Link>
            <Link to="/digital" className="footer__link">Digital</Link>
            <Link to="/archive" className="footer__link">Archive</Link>
          </div>

          <div className="footer__nav-group">
            <span className="footer__nav-label">Connect</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__link">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__link">
              YouTube
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__link">
              Twitter
            </a>
          </div>

          <div className="footer__nav-group">
            <span className="footer__nav-label">Info</span>
            <Link to="/about" className="footer__link">About</Link>
            <Link to="/contact" className="footer__link">Contact</Link>
            <Link to="/shipping" className="footer__link">Shipping</Link>
          </div>
        </nav>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            {currentYear} Tonic Thought Studios
          </span>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy</Link>
            <Link to="/terms" className="footer__legal-link">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
