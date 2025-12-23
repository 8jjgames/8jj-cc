import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 20;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optional: Handle share button click
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '8JJ',
          text: 'Check out 8JJ!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-inner">
        
        {/* Centered Logo */}
        <a className="header-logo" href="/" aria-label="8JJ Home">
          <img
            className="header-logo__img"
            src="/images/8JJ LOGO.png"
            alt="8JJ Logo"
            loading="eager" // Prioritize logo loading
          />
        </a>

        {/* Right Action Buttons */}
        <div className="header-actions">
          <a 
            className="header-action" 
            href="#download" // Or actual app store link
            aria-label="Download App"
          >
            <img
              className="header-action__icon"
              src="/images/Download.png"
              alt=""
              loading="lazy"
            />
          </a>

          <button 
            className="header-action"
            onClick={handleShare}
            aria-label="Share"
          >
            <img
              className="header-action__icon"
              src="/images/Share.png"
              alt=""
              loading="lazy"
            />
          </button>
        </div>

      </div>
    </header>
  );
}