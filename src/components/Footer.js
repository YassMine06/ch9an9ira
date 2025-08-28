import "./Footer.css";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Section Gauche */}
        <div className="footer-section">
          <p className="footer-contact">
            E-mail : <a href="mailto:matjar.chaoui@gmail.com">matjar.chaoui@gmail.com</a>
          </p>
          <p className="footer-contact">
            Tél : <a href="tel:+212667219566">+212 667 219 566</a>
          </p>
          <p className="footer-contact">
          <Link to="/contact">Contact us</Link>
          </p>
        </div>

        {/* Section Droite */}
        <div className="footer-section">
            <div className="footer-sns">
                <h2>Restez connectés</h2>
                <div className="social-icons">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/images/sns/facebook.png" alt="Facebook" className="social-icon" title="Facebook"/>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/images/sns/instagram.png" alt="Instagram" className="social-icon" title="Instagram"/>
                  </a>
                  <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                    <img src="/images/sns/tiktok.png" alt="TikTok" className="social-icon" title="TikTok"/>
                  </a>
                  <a href="https://www.etsy.com" target="_blank" rel="noopener noreferrer">
                    <img src="/images/sns/etsy.png" alt="Etsy" className="social-icon" title="Etsy"/>
                  </a>
                </div>
            </div>
        </div>

      </div>

      {/* Bas de page */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} <strong>CH9AN9IRA</strong>. Tous droits réservés.
      </div>
    </footer>
  );
}
