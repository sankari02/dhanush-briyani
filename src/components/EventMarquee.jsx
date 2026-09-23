import "./EventMarquee.css";

const events = [
  "Wedding Catering",
  "Engagement",
  "Reception",
  "Birthday",
  "Family Functions",
  "Corporate Events",
  "House Warming",
  "Anniversary",
  "Bulk Orders",
  "Special Celebrations",
];

export default function EventMarquee() {
  return (
    <section className="event-marquee" aria-label="Occasions we cater for" tabIndex={0}>
      <div className="event-marquee-track">
        {[0, 1].map(copy => (
          <ul className="event-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {events.map(event => (
              <li className="event-marquee-item" key={event}>
                <span className="event-marquee-name">{event}</span>
                <span className="event-marquee-dot" aria-hidden="true">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
