function Contact() {
  return (
    <>
      <div className="planning-contact-info">
        <div>
          <span>PHONE / WHATSAPP</span>
          <a href="tel:+919344496756">+91 93444 96756</a>
        </div>

        <div>
          <span>INSTAGRAM</span>

          <a
            href="https://www.instagram.com/dhanush_.briyani/"
            target="_blank"
            rel="noreferrer"
          >
            @dhanush_.briyani
          </a>
        </div>

        <div>
          <span>SPECIALITY</span>
          <p>Authentic Firewood Briyani & Catering</p>
        </div>
      </div>
      <a href="https://wa.me/919344496756" target="_blank" rel="noreferrer" className="planning-whatsapp">
        WhatsApp Us <span aria-hidden="true">&rarr;</span>
      </a>
    </>
  );
}

export default Contact;
