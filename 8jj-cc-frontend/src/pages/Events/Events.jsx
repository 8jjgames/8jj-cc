import "./Events.css";
import EventHero from "../../components/EventHero/EventHero";

const events = [
  {
    name: "MAAIPL",
    image: "/images/eventmaaipl.jpg",
    link: "https://www.maaipl.win/home/register?id=795597112",
  },
  {
    name: "GNGIPL",
    image: "/images/eventgngipl.jpg",
    link: "https://gngipl.cc/home/event?eventCurrent=1",
  },
  {
    name: "CCUIPL",
    image: "/images/eventccuipl.avif",
    link: "https://ccuipl.cc/home/event?eventCurrent=1",
  },
  {
    name: "BLRIPL",
    image: "/images/eventblripl.avif",
    link: "https://www.blripl.me/?languageCode=en&dl=6v4cyh",
  },
  {
    name: "BMBIPL",
    image: "/images/eventbmbipl.avif",
    link: "https://www.bmbipl.vip/?languageCode=en&dl=ejmqd1",
  },
  {
    name: "9IPL",
    image: "/images/event9ipl.jpg",
    link: "https://9ipl.co/?languageCode=en&dl=31bjvo",
  },
  {
    name: "8IPL",
    image: "/images/event8ipl.avif",
    link: "https://www.8ipl.cc/?languageCode=en&id=375997529",
  },
];

export default function Events() {
  return (
    <>
      <EventHero />

      <section id="EventPage" aria-label="Partner Events">
        <div className="event-card-list">
          {events.map((event, index) => (
            <a
              key={index}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="event-card"
            >
              <img
                src={event.image}
                alt={`${event.name} event`}
                className="event-card-img"
              />

              <div className="event-card-overlay"></div>

              <div className="event-card-text">
                <div className="event-card-name">{event.name}</div>
                <div className="event-card-desc"></div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
