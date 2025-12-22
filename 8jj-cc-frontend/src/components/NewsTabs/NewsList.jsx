export default function NewsList({ items }) {
  return (
    <div className="news-list">
      {items.map(item => (
        <a
          key={item.id}
          href={`/article/${item.slug}`}
          className="news-item"
        >
          <div className="news-thumb">
            <img src={item.image} alt={item.title} />
          </div>

          <div className="news-body">
            <div className="news-title">{item.title}</div>

            <div className="news-meta">
              <span className="meta-date">{item.date}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
