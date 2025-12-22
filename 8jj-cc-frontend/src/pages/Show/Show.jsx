import "./Show.css";
import ShowHero from "../../components/ShowHero/ShowHero";

export default function Show() {
  return (
    <main className="show-page">
      {/* PAGE TITLE */}
      <header className="show-header" aria-label="Game Show page title">
        <h1 className="show-title">GAME SHOW</h1>
      </header>

      {/* HERO */}
      <ShowHero />

      {/* HOT SECTION */}
      <section className="show-section" id="ShowHot">
        <div className="show-section-title">HOT</div>

        <div className="show-hot-list">
          <a href="#okvin" className="show-card">
            <img
              src="/images/Hotslide1.jpg"
              alt="OKVIN Fortune Coins"
              className="show-card-img"
            />
          </a>

          <a href="#enter-code" className="show-card">
            <img
              src="/images/Hotslide2.jpg"
              alt="Enter Code For Free"
              className="show-card-img"
            />
          </a>

          <a href="#lucky-chest" className="show-card">
            <img
              src="/images/Hotslide3.jpg"
              alt="Open Lucky Chest"
              className="show-card-img"
            />
          </a>
        </div>
      </section>

      {/* OTHERS */}
      <section className="show-section">
        <div className="show-section-title">OTHERS</div>

        <div className="show-others-grid">
          <ShowQuick icon="events.png" label="All events" />
          <ShowQuick icon="history.png" label="History" />
          <ShowQuick icon="invite.png" label="Invite" />
          <ShowQuick icon="address.png" label="Address" />
        </div>
      </section>
    </main>
  );
}

function ShowQuick({ icon, label }) {
  return (
    <button className="show-quick" type="button">
      <span className="show-quick-icon">
        <img
          src={`/images/${icon}`}
          alt={label}
          className="show-quick-img"
        />
      </span>
      <span className="show-quick-label">{label}</span>
    </button>
  );
}
