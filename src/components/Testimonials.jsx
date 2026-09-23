import "./Testimonials.css";

// TEMPORARY DEMO REVIEWS — REPLACE WITH VERIFIED CUSTOMER REVIEWS BEFORE LAUNCH
const demoReviews = [
  { event: "Wedding Catering", text: "Wonderful food and a memorable catering experience. The briyani was full of flavour and beautifully served." },
  { event: "Family Celebration", text: "The firewood briyani brought a traditional touch to our celebration. The food was served with great care." },
  { event: "Corporate Catering", text: "A warm and flavourful catering experience that our guests truly enjoyed." },
  { event: "Special Celebration", text: "The aroma, presentation and traditional preparation made the meal feel special." },
];

export default function Testimonials() {
  return (
    <section className="db-reviews" id="testimonials" aria-labelledby="db-reviews-heading">
      <header className="db-reviews-header">
        <p className="db-reviews-label">TESTIMONIALS</p>
        <h2 id="db-reviews-heading">Stories Shared<br /><em>Around Our Table.</em></h2>
        <p className="db-reviews-subtitle">Kind words from celebrations served with Dhanush Briyani.</p>
      </header>
      <div className="db-reviews-window" tabIndex={0} role="region" aria-label="Demo customer reviews. Hover or focus to pause; scroll horizontally when reduced motion is enabled.">
        <div className="db-reviews-track">
          {[0, 1].map(copy => (
            <ul className="db-reviews-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {demoReviews.map((review, index) => (
                <li className="db-reviews-card" key={review.event}>
                  <span className="db-reviews-quote" aria-hidden="true">“</span>
                  <div className="db-reviews-card-top">
                    <span className="db-reviews-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="db-reviews-stars" aria-hidden="true">★★★★★</span>
                  </div>
                  <blockquote>{review.text}</blockquote>
                  <div className="db-reviews-attribution">
                    <p className="db-reviews-name">Customer Review</p>
                    <p className="db-reviews-event">{review.event}</p>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
  
    </section>
  );
}
