const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=90",
    alt: "Briyani presentation",
    className: "gallery-large",
  },
  {
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=90",
    alt: "Catering food",
  },
  {
    src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=90",
    alt: "Traditional Indian food",
  },
  {
    src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=90",
    alt: "Food preparation",
  },
  {
    src: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=90",
    alt: "Celebration food",
  },
];

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-heading">
        <div>
          <p className="section-label">FROM OUR KITCHEN</p>

          <h2>
            Made For
            <br />
            Memorable Tables.
          </h2>
        </div>

        <p>
          A glimpse of the food, preparation, and celebration experience behind
          Dhanush Briyani.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div
            className={`gallery-item ${image.className || ""}`}
            key={index}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      <div className="gallery-bottom">
        <p>Follow our food journey and latest celebrations.</p>

        <a
          href="https://www.instagram.com/dhanush_.briyani/"
          target="_blank"
          rel="noreferrer"
        >
          View Instagram
          <span>→</span>
        </a>
      </div>
    </section>
  );
}

export default Gallery;