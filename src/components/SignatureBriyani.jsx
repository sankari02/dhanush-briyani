function SignatureBriyani() {
  return (
    <section className="signature-section">
      <div className="signature-image">
        <img
          src="https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=1400&q=90"
          alt="Dhanush Firewood Briyani"
        />
      </div>

      <div className="signature-content">
        <p className="section-label">OUR SIGNATURE</p>

        <h2>
          Dhanush
          <br />
          Firewood Briyani
        </h2>

        <p className="signature-tagline">
          Crafted Over Fire. Served With Heart.
        </p>

        <p className="signature-text">
          Our signature briyani is prepared with carefully selected ingredients,
          aromatic spices, and the richness of traditional firewood cooking.
          Every batch is made to bring warmth, flavour, and celebration to the
          table.
        </p>

        <div className="signature-points">
          <div>
            <span>01</span>
            <p>Traditional Firewood Cooking</p>
          </div>

          <div>
            <span>02</span>
            <p>Freshly Prepared Ingredients</p>
          </div>

          <div>
            <span>03</span>
            <p>Made for Celebrations</p>
          </div>
        </div>

        <a href="#menu" className="signature-button">
          Explore Our Menu
        </a>
      </div>
    </section>
  );
}

export default SignatureBriyani;