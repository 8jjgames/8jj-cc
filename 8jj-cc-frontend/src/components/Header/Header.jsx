import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 20;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if click is outside the dropdown and share button
      if (isShareModalOpen && 
          !e.target.closest('.social-dropdown') && 
          !e.target.closest('.header-action-wrapper')) {
        setIsShareModalOpen(false);
      }
    };

    if (isShareModalOpen) {
      // Small delay to prevent immediate closing on button click
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isShareModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isShareModalOpen) {
        setIsShareModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isShareModalOpen]);

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/8jjofficials', icon: '/images/facebook.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/8jj_gamesofficial?igsh=MWEwamhsaXcwMWNwcw==', icon: '/images/instagram.png' },
    { name: 'WhatsApp', url: 'https://chat.whatsapp.com/EP5RmVKop9rHPrmCxP5Krp?mode=wwc', icon: '/images/whatsapp.png' },
    { name: 'Telegram', url: 'https://t.me/Official8JJGames', icon: '/images/telegram1.png' },
    { name: 'YouTube', url: 'https://youtube.com/@8jj_gamesofficial?si=eNSRKuTPdeZcCufS', icon: '/images/Youtube.png' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@8jjofficials', icon: '/images/Tiktok.png' },
    { name: 'X', url: 'https://x.com/8JJ_Games?t=4GAWbf3qpFkbP4y8mrmWwQ&s=08', icon: '/images/x.png' },
    { name: 'Twitch', url: 'https://www.twitch.tv/8jj_gamesofficial', icon: '/images/twitch.png' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-inner">
        
        {/* Centered Logo */}
        <a className="header-logo" href="/" aria-label="8JJ Home">
          <img
            className="header-logo__img"
            src="/images/8JJ LOGO.png"
            alt="8JJ Logo"
            loading="eager"
          />
        </a>

        {/* Right Action Buttons */}
        <div className="header-actions">
          <a 
            className="header-action" 
            href="#download"
            aria-label="Download App"
          >
            <img
              className="header-action__icon"
              src="/images/Download.png"
              alt=""
              loading="lazy"
            />
          </a>

          <div className="header-action-wrapper">
            <button 
              className="header-action" 
              aria-label="Share"
              onClick={() => setIsShareModalOpen(!isShareModalOpen)}
            >
              <img
                className="header-action__icon"
                src="/images/Share.png"
                alt=""
                loading="lazy"
              />
            </button>

            {/* Dropdown */}
            {isShareModalOpen && (
              <div className="social-dropdown open" id="socialDropdown" aria-hidden="false">
                <div className="social-dropdown-arrow"></div>
                <div className="social-dropdown-panel">
                  <div className="social-grid">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="social-item"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <img
                          src={social.icon}
                          alt={social.name}
                          className="social-icon"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}