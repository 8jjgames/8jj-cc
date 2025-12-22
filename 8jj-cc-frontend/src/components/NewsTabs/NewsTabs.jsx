import { useState } from "react";
import "./NewsTabs.css";

export default function NewsTabs() {
  const [active, setActive] = useState("news");

  return (
    <section id="News">
      <div className="news-tabs">
        <button
          className="news-tab"
          aria-selected={active === "news"}
          onClick={() => setActive("news")}
        >
          News
        </button>
        <button
          className="news-tab"
          aria-selected={active === "events"}
          onClick={() => setActive("events")}
        >
          Events
        </button>
        <button
          className="news-tab"
          aria-selected={active === "offers"}
          onClick={() => setActive("offers")}
        >
          Offers
        </button>
      </div>

      {active === "news" && <div>NEWS LIST</div>}
      {active === "events" && <div>EVENT LIST</div>}
      {active === "offers" && <div>OFFER LIST</div>}
    </section>
  );
}
