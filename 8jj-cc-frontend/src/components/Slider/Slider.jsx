import { useEffect, useState } from "react";
import "./Slider.css";

import slide1 from "../../../public/images/slide1.jpg";
import slide2 from "../../../public/images/slide2.jpg";
import slide3 from "../../../public/images/slide3.jpg";


const slides = [
  {
    id: 1,
    image: slide1,
    link: "/article/8jj-official-announcement",
  },
  {
    id: 2,
    image: slide2,
    link: "/article/deepak-chahar-brand-ambassador",
  },
  {
    id: 3,
    image: slide3,
    link: "/article/harbhajan-singh-brand-ambassador",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home-slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <a key={slide.id} href={slide.link} className="slide">
            <img src={slide.image} alt="" />
          </a>
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
