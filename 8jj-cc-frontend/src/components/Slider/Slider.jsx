// src/components/Slider/Slider.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Slider.css";

export default function Slider({ slides = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="home-slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <Link key={slide.id} to={slide.link} className="slide">
            <img src={slide.image} alt="" />
          </Link>
        ))}
      </div>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
