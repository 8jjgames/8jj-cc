import "./Alliance.css";

const ALLIANCE_LIST = [
  {
    name: "CCUIPL",
    image: "/images/CCUIPL.png",
    primaryLink: "/event",
    secondaryLink: "https://ccuipl.win/home/register?id=582339460",
  },
  {
    name: "MAAIPL",
    image: "/images/MAAIPL.jpg",
    primaryLink: "/event",
    secondaryLink: "https://www.maaipl.win/home/register?id=795597112",
  },
  {
    name: "GNGIPL",
    image: "/images/GNG.jpg",
    primaryLink: "/event",
    secondaryLink: "https://www.gngipl.cc/?dl=9csexh",
  },
  {
    name: "BLRIPL",
    image: "/images/BLR.png",
    primaryLink: "/event",
    secondaryLink: "https://www.blripl.me/?languageCode=en&dl=6v4cyh",
  },
  {
    name: "9IPL",
    image: "/images/9IPL.png",
    primaryLink: "/event",
    secondaryLink: "https://9ipl.co/?languageCode=en&dl=31bjvo",
  },
  {
    name: "BMPIPL",
    image: "/images/BMB.png",
    primaryLink: "/event",
    secondaryLink: "https://www.bmbipl.vip/?languageCode=en&dl=ejmqd1",
  },
  {
    name: "8IPL",
    image: "/images/8IPL-B.png",
    primaryLink: "/event",
    secondaryLink: "https://www.8ipl.cc/?languageCode=en&id=375997529",
  },
];

export default function Alliance() {
  return (
    <section id="ContactUs">
      <div className="brands-wrap">
        <div
          className="alliance-card"
          style={{ backgroundImage: "url(/images/AllianceBg.jpg)" }}
        >
          {/* Header */}
          <div className="alliance-head">
            <span className="alliance-icon"></span>
            <span className="alliance-title">ALLIANCE MEMBER</span>
          </div>

          {/* Grid */}
          <ul className="alliance-grid">
            {ALLIANCE_LIST.map((item) => (
              <li className="alliance-item" key={item.name}>
                <a
                  href={item.secondaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tile"
                >
                  <img src={item.image} alt={item.name} />
                </a>
                <span className="alliance-name">{item.name}</span>
              </li>
            ))}

            {/* Empty slot (Coming Soon) */}
            <li className="alliance-item">
              <div className="tile tile-empty">
                <span className="tile-plus">+</span>
              </div>
              <span className="alliance-name">&nbsp;</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
