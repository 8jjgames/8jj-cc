import { useEffect, useState } from "react";
import "./EventHero.css";
import slide1 from "../../assets/event-hero1.jpg";
import slide2 from "../../assets/event-hero2.jpg";
import slide3 from "../../assets/event-hero-poster.jpg";
import slide4 from "../../assets/event-hero.jpg";


const slides = [
  slide1,
  slide2,
  slide3,
  slide4,
];

export default function EventHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="EventHero" aria-label="Sponsorship poster">
      <div className="event-hero">
        <div className="event-hero-slides">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`8JJ Sponsorship Poster ${index + 1}`}
              className={`event-hero-img ${
                active === index ? "is-active" : ""
              }`}
            />
          ))}
        </div>

        <div className="event-hero-label">SPONSORSHIP</div>

        <div className="event-hero-partners">
          <div className="event-hero-title"></div>

          <div className="event-hero-dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={active === i ? "is-active" : ""}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
