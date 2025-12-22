import "./Alliance.css";

export default function Alliance() {
  return (
    <section id="ContactUs">
      <div className="brands-wrap">
        <div
          className="alliance-card"
          style={{ backgroundImage: "url(/images/AllianceBg.jpg)" }}
        >
          <div className="alliance-head">
            <span className="alliance-icon"></span>
            <span className="alliance-title">ALLIANCE MEMBER</span>
          </div>

          <ul className="alliance-grid">
            <li className="alliance-item">
              <button className="tile">
                <img src="/images/CCUIPL.png" alt="CCUIPL" />
              </button>
              <span className="alliance-name">CCUIPL</span>
            </li>

            {/* repeat */}
          </ul>
        </div>
      </div>
    </section>
  );
}
