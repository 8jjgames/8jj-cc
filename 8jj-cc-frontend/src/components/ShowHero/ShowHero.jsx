import { useEffect, useState } from "react";
import "./ShowHero.css";

const slides = [
  "/images/Showbanner1.jpg",
  "/images/Showbanner2.jpg",
  "/images/Showbanner3.jpg",
];

export default function ShowHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ShowHero" aria-label="Game Show promotions">
      <div className="show-hero">
        <div className="show-hero-slides">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Game Show Banner ${index + 1}`}
              className={`show-hero-img ${
                active === index ? "is-active" : ""
              }`}
            />
          ))}
        </div>

        <div className="show-hero-dots" aria-hidden="true">
          {slides.map((_, i) => (
            <span
              key={i}
              className={active === i ? "is-active" : ""}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
