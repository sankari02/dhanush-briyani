import { useState } from "react";
import reviewQr from "../assets/images/dhanush-google-review-qr.jpeg";
import "./Testimonials.css";

// VERIFIED GOOGLE REVIEWS — transcribed from customer Google reviews.
// Do not edit review wording or add unverified testimonials.
const verifiedReviews = [
  { name: "Jazz", text: "Its a hidden gem for biryani. I was told by the staff, this is Chennai style biryani and i honestly feel it beats Hyderabadi dum biryani as well. The chicken piece was big, sufficient or maybe even more for one person. The Brinjal curry on the side was yummy. Bread halwa was a pleasant addition to your plate to finish off your biryani. For Rs.120, it’s a steal and worth every rupee comparing to other restaurants in Pondi. In Hyderabad, it easily costs double or even triple for this quantity of meat and portion." },
  { name: "Prashanth Madugula", text: "The food is great and good to eat in here with the warmth it has and amazing taste do try it when your in Pondicherry" },
  { name: "Nandha Kumar", text: "Taste is good , flesh are well cooked and the aroma is nice. only the quantity of rice is slightly low" },
  { name: "Kishore V A", text: "One of the best Chennai Style Biriyani in Pondy with Brinjal curry and Raita. The bread alwa was a bit soggy which can be improved." },
  { name: "Marvel K", text: "The biryani is absolutely delicious; no matter how much you eat, you feel like you want to keep eating more." },
  { name: "Sarukesh Guest", text: "Taste is good and chicken is fresh with medium spice its good to its midnight . The Flavour is Good and with medium Chicken Piece" },
  { name: "S Thanasu", text: "Biryani is good and service is also good Nice halwa and tastes good 👍😊" },
  { name: "Dileep Gudepu", text: "One of the best biryani in pondicherry must try...... biryani lovers" },
  { name: "Sakthi Sanjay", text: "Nice time at this shop good service and biryani is ultimate please try at least once at night 😉" },
];

function ReviewCard({ review, index, copy }) {
  const [expanded, setExpanded] = useState(false);
  const needsMore = review.text.length > 190;
  return (
    <li className="db-reviews-card" key={`${copy}-${review.name}-${index}`}>
      <span className="db-reviews-quote" aria-hidden="true">“</span>
      <div className="db-reviews-card-top">
        <span className="db-reviews-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="db-reviews-stars" aria-label="5 out of 5 stars">★★★★★</span>
      </div>
      <blockquote className={expanded ? "is-expanded" : ""}>{review.text}</blockquote>
      {needsMore && (
        <button className="db-reviews-more" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? "See less" : "See more"}
        </button>
      )}
      <div className="db-reviews-attribution">
        <p className="db-reviews-name">{review.name}</p>
        <p className="db-reviews-event">Google Review</p>
      </div>
    </li>
  );
}

export default function Testimonials() {
  return (
    <section className="db-reviews" id="testimonials" aria-labelledby="db-reviews-heading">
      <header className="db-reviews-header">
        <p className="db-reviews-label">GOOGLE REVIEWS</p>
        <h2 id="db-reviews-heading">Loved by Our<br /><em>Customers.</em></h2>
        <p className="db-reviews-subtitle">Real experiences shared by our customers on Google.</p>
        <div className="db-reviews-rating" aria-label="Rated 4.3 out of 5 from 291 Google Reviews">
          <span>4.3 <b aria-hidden="true">★</b></span>
          <span>291 Google Reviews</span>
        </div>
      </header>
      <div className="db-reviews-window" tabIndex={0} role="region" aria-label="Google customer reviews. Hover or focus to pause; scroll horizontally when reduced motion is enabled.">
        <div className="db-reviews-track">
          {[0, 1].map((copy) => (
            <ul className="db-reviews-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {verifiedReviews.map((review, index) => (
                <ReviewCard review={review} index={index} copy={copy} key={`${copy}-${review.name}-${index}`} />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <aside className="db-reviews-cta" aria-label="Share your Google review">
        <div className="db-reviews-cta-copy">
          <p className="db-reviews-cta-label">SHARE YOUR EXPERIENCE</p>
          <h3>Enjoyed Dhanush Briyani?<br />Tell Us What You Think.</h3>
          <p className="db-reviews-cta-description">Your feedback helps us serve you better. Scan the QR code to share your experience on Google.</p>
          <p className="db-reviews-cta-steps">SCAN <span>•</span> RATE <span>•</span> REVIEW</p>
        </div>
        <div className="db-reviews-qr-wrap">
          <img className="db-reviews-qr" src={reviewQr} alt="QR code to share a review for Dhanush Briyani on Google" />
          <p className="db-reviews-qr-title">Scan to Review</p>
          <p className="db-reviews-qr-subtitle">Google Reviews</p>
        </div>
      </aside>
    </section>
  );
}
