import { Link } from 'react-router-dom'
import sasiraLogo from '../assets/sasira_logo.webp'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={sasiraLogo} alt="Sasira" className="footer-logo" />
            <h2 className="footer-title">SASIRA</h2>
          </div>
          <p className="footer-tagline">TRADITION REBORN. STREETWEAR EVOLVED.</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-col-links">
              <li><Link to="/">Home</Link></li>
              <li><a href="/#about">About</a></li>
              <li><a href="/#philosophy">Philosophy</a></li>
              <li><Link to="/store">Store</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Socials</h3>
            <ul className="footer-col-links">
              <li>
                <a href="https://instagram.com/hidayathul_fikri" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> @fikri
                </a>
              </li>
              <li>
                <a href="https://instagram.com/putrii3e_" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> @putri
                </a>
              </li>
              <li>
                <a href="https://wa.me/6282287930695" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://github.com/barzzly/" target="_blank" rel="noopener noreferrer">
                  <GithubIcon /> barzzly
                </a>
              </li>
              <li>
                <a href="https://github.com/rukashirekaa" target="_blank" rel="noopener noreferrer">
                  <GithubIcon /> rukashirekaa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 SASIRA APPAREL. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}

export default Footer
