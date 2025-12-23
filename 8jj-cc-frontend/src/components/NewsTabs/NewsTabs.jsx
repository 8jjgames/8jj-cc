import { useState } from "react";
import "./NewsTabs.css";
import NewsList from "./NewsList";
import { newsData } from "../../data/newsData";

export default function NewsTabs() {
  const [active, setActive] = useState("news");

  const filteredData = newsData.filter(
    (item) => item.type === active
  );

  return (
    <section id="News">
      {/* Tabs */}
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

      {/* List */}
      <NewsList items={filteredData} />
    </section>
  );
}
