function OurStory() {
  return (
    <section className="our-story" id="our-story">
      <div className="story-image-wrap">
        <img
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90"
          alt="Traditional food preparation"
        />

        <div className="story-badge">
          <span>AUTHENTIC</span>
          <strong>FIREWOOD</strong>
          <span>COOKING</span>
        </div>
      </div>

      <div className="story-content">
        <p className="section-label">OUR STORY</p>

        <h2>
          More Than Briyani.
          <br />
          A Tradition Served
          <br />
          With Pride.
        </h2>

        <p>
          Dhanush Briyani brings together traditional cooking, carefully chosen
          ingredients, and the unmistakable character of firewood preparation.
        </p>

        <p>
          Our food is created for celebrations — from intimate family occasions
          to large events — with the same attention to flavour, consistency,
          presentation, and hospitality.
        </p>

        <a href="#catering" className="text-link">
          Discover Our Catering
          <span>→</span>
        </a>
      </div>
    </section>
  );
}

export default OurStory;
