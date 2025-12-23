import { useParams, useNavigate } from "react-router-dom";
import "./NewsDetail.css";
import { newsData } from "../../data/news";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = newsData.find((n) => n.slug === slug);

  if (!article) {
    return <div className="news-detail">Article not found</div>;
  }

  return (
    <main className="news-detail">
      {/* TOP BAR */}
      <header className="news-detail-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        <span className="news-tag">{article.category}</span>
      </header>

      {/* TITLE */}
     <div className="news-title-block">
        <h1 className="news-title">{article.title}</h1>

        <div className="news-meta">
          {article.date} · {article.author}
        </div>
      </div>


      {/* IMAGE */}
      <div className="news-image">
        <img src={article.image} alt={article.title} />
      </div>

      {/* CONTENT */}
      <div className="news-content">
        {article.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <ul>
          {article.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {article.content2.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <p>{article.closing}</p>
      </div>

      {/* SOCIAL MEDIA */}
      <div className="news-social">
        <div className="news-social-title">Our Social Media:</div>

        <div className="news-social-links">
          <a
            href="https://youtube.com/@8jj_gamesofficial?si=eNSRKuTPdeZcCufS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img src="/images/Youtube.png" alt="YouTube" />
          </a>

          <a
            href="https://www.instagram.com/8jj_gamesofficial?igsh=MWEwamhsaXcwMWNwcw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src="/images/instagram.png" alt="Instagram" />
          </a>

          <a
            href="https://www.facebook.com/8jjofficials"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src="/images/facebook.png" alt="Facebook" />
          </a>

          <a
            href="https://t.me/Official8JJGames"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <img src="/images/telegram1.png" alt="Telegram" />
          </a>
        </div>
      </div>

    </main>
  );
}
