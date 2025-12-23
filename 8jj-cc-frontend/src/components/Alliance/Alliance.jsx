import { useState } from 'react';
import './Alliance.css';

const ALLIANCE_LIST = [
  {
    name: "CCUIPL",
    image: "/images/CCUIPL.png",
    primaryLink: "/event",
    secondaryLink: "https://ccuipl.win/home/register?id=582339460",
  },
  {
    name: "MAAIPL",
    image: "/images/MAAIPL.jpg",
    primaryLink: "/event",
    secondaryLink: "https://www.maaipl.win/home/register?id=795597112",
  },
  {
    name: "GNGIPL",
    image: "/images/GNG.jpg",
    primaryLink: "/event",
    secondaryLink: "https://www.gngipl.cc/?dl=9csexh",
  },
  {
    name: "BLRIPL",
    image: "/images/BLR.png",
    primaryLink: "/event",
    secondaryLink: "https://www.blripl.me/?languageCode=en&dl=6v4cyh",
  },
  {
    name: "9IPL",
    image: "/images/9IPL.png",
    primaryLink: "/event",
    secondaryLink: "https://9ipl.co/?languageCode=en&dl=31bjvo",
  },
  {
    name: "BMPIPL",
    image: "/images/BMB.png",
    primaryLink: "/event",
    secondaryLink: "https://www.bmbipl.vip/?languageCode=en&dl=ejmqd1",
  },
  {
    name: "8IPL",
    image: "/images/8IPL-B.png",
    primaryLink: "/event",
    secondaryLink: "https://www.8ipl.cc/?languageCode=en&id=375997529",
  },
];

export default function Alliance() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="ContactUs" className="alliance-section">
      <div className="brands-wrap">
        <div
          className="alliance-card"
          style={{ backgroundImage: "url(/images/AllianceBg.jpg)" }}
        >
          {/* Header with Pulse Animation */}
          <div className="alliance-header-container">
            <div className="alliance-head">
              <span className="alliance-icon">
                <span className="alliance-icon-pulse"></span>
              </span>
              <span className="alliance-title">Alliance Members</span>
              <span className="alliance-count">{ALLIANCE_LIST.length}</span>
            </div>
          </div>

          {/* Grid with Stagger Animation */}
          <ul className="alliance-grid">
            {ALLIANCE_LIST.map((item, index) => (
              <li 
                className="alliance-item" 
                key={item.name}
                style={{ '--stagger-index': index }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={item.secondaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`tile ${hoveredIndex === index ? 'tile-active' : ''}`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                  />
                  <div className="tile-shimmer"></div>
                  <div className="tile-glow"></div>
                </a>
                <span className="alliance-name">{item.name}</span>
              </li>
            ))}

            {/* Coming Soon Slot with Breathing Animation */}
            <li 
              className="alliance-item alliance-item-empty"
              style={{ '--stagger-index': ALLIANCE_LIST.length }}
            >
              <div className="tile tile-empty">
                <span className="tile-plus">+</span>
                <span className="tile-empty-text">Coming Soon</span>
                <div className="tile-empty-rings">
                  <span className="ring ring-1"></span>
                  <span className="ring ring-2"></span>
                  <span className="ring ring-3"></span>
                </div>
              </div>
              <span className="alliance-name">&nbsp;</span>
            </li>
          </ul>

          {/* Floating Particles Background Effect */}
          <div className="alliance-particles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="particle" style={{ '--particle-index': i }}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
