import { useEffect, useState } from "react";
import "./EventHero.css";

const slides = [
  "../../../public/images/event-hero1.jpg",
  "../../../public/images/event-hero2.jpg",
  "../../../public/images/event-hero-poster.jpg",
  "../../../public/images/event-hero.jpg",
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
