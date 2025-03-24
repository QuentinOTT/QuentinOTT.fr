import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__nav">
          <div className="footer__tech">
            <a href="https://www.ovh.com/fr/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/server.png" alt="OVH" title="Hébergé par OVH" />
            </a>
            <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/database.png" alt="Supabase" title="Base de données Supabase" />
            </a>
          </div>
          <div className="footer__social">
            <a href="https://github.com/QuentinOTT" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/quentin-ott-35687a296/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" />
            </a>
            {/* <a href="https://www.instagram.com/quentinott.dev/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
            </a> */}
          </div>
          <div className="footer__contact">
            <div className="contact-info">
              <a href="mailto:quentin.ott2511@gmail.com" rel="noopener noreferrer" className="contact-link">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/gmail.png" alt="Email" title="Contacter par email" />              </a>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          {new Date().getFullYear()} Design by Quentin OTT. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
